// Import model Product
import KondisiPangans from "../models/KondisiPanganModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import Komoditass from "../models/KomoditasModel.js";
// import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Get detail kondisi untuk maps
export const getKondisi = async (req, res) => {

    KondisiPangans.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

     KondisiPangans.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas'
     });

    try {
        const kondisi = await KondisiPangans.findAll({

            include: [
                {
                    model: Kabkotas,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                },
                {
                    model: Komoditass,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                }
                ],

            where: {
                kabkota_id : req.body.kabkota_id,
                tahun: req.body.tahun,
                bulan: req.body.bulan,
                deletedAt: null
            },
            order: [
                ['komoditas', 'ASC']
            ],
        });

        if(kondisi){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : kondisi,
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : kondisi,
            });

        }    
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            'message': err
            // 'message': 'Error'
        });
    }
}

export const getKondisiProduksi = async(req, res) =>{
    KondisiPangans.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

     KondisiPangans.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas'
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    var whereClause;

    if (req.query.kabkota_id != '' && req.query.komoditas != '' && req.query.tahun != '' &&  req.query.bulan != '') {
        whereClause = {
            jenis_laporan : 1,
            kabkota_id: req.query.kabkota_id,
            komoditas: req.query.komoditas,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };
    }else if(req.query.kabkota_id != '' && req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 1,
            kabkota_id: req.query.kabkota_id,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else if(req.query.komoditas != '' && req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 1,
            komoditas: req.query.komoditas,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else if(req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 1,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else{

        whereClause = {
            jenis_laporan : 1,
            deletedAt: null,
        };

    }
    
    const totalRows = await KondisiPangans.count({
        where:whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await KondisiPangans.findAll({
        include: [
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Komoditass,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
        ],

        where:whereClause,
        
        attributes: { exclude: ['updatedAt', 'deletedAt', 'luas_tanam', 'luas_panen', 'luas_puso', 'stok'] },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    });

    if(result.length > 0){

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Berhasil Ambil Data',
            'limit' : limit,
            'totalRows' : totalRows,
            'totalPage' : totalPage,
            'page' : page,
            'data' : result,
            
        });

    }else{

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data Kosong',
            'data' : Array()
        });

    }    
}

// Add kondisi produksi
export const createKondisiProduksi = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produksi = await KondisiPangans.create(
            {
				jenis_laporan: 1,
                tahun: req.body.tahun,
				bulan: req.body.bulan,
                komoditas: req.body.komoditas,
                kabkota_id : req.body.kabkota_id,
                total_produksi : req.body.total_produksi,
                createdby : req.body.createdby,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Pedagang[0]['name'],
            'data' : produksi,
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Add kondisi produksi
export const createBulkKondisiProduksi = async (req, res) => {
    var datetime = new Date();
    try {
        const p = req.body;
        // const produksi = await KondisiPangans.create(
        //     {
		// 		   jenis_laporan: 1,
        //         tahun: req.body.tahun,
		// 		   bulan: req.body.bulan,
        //         komoditas: req.body.komoditas,
        //         kabkota_id : req.body.kabkota_id,
        //         total_produksi : req.body.total_produksi,
        //         createdby : req.body.createdby,
        //         createdAt: datetime,
        //         updatedAt: datetime
        //     });

        const up = await KondisiPangans.update(
            {
                deletedAt: datetime 
            },{
                where:{
                    jenis_laporan: req.body[0].jenis_laporan,
                    tahun: req.body[0].tahun,
                    bulan: req.body[0].bulan,
                    komoditas: req.body[0].komoditas,
                }
            });
        if(up){

            const produksi = await KondisiPangans.bulkCreate(p);
            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditambahkan',
                // 'data': Pedagang[0]['name'],
                'data' : produksi,
            });

        }else{
            res.statusCode = 404;
            res.json({
                'status' : 0,
                // 'message': err,
                // 'message': err['errors'][0]['message']
                'message': 's'
            });
        }

        

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': req.body[0].jenis_laporan,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Get detail kondisi produksi
export const detailKondisiProduksi = async (req, res) => {
    try {
        const totalPage = await KondisiPangans.findOne({
            where: {
                id: req.query.id,
                deletedAt: null
            }
        });



        if(totalPage){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                'data' :   totalPage,
                'halaman' : req.query.halaman,
                
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                'data' : Array(),
            });

        }
        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Add kondisi produksi
export const editKondisiProduksi = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produksi = await KondisiPangans.update(
            {
                total_produksi : req.body.total_produksi
            },{
                where:{
                    id: req.body.id
                }
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil diupdate',
            // 'data': Pedagang[0]['name'],
            'data' : produksi,
            'halaman' : req.body.halaman
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

//get cpp
export const getKondisiCpp = async(req, res) =>{
    KondisiPangans.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

     KondisiPangans.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas'
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    var whereClause;

    if (req.query.kabkota_id != '' && req.query.komoditas != '' && req.query.tahun != '' &&  req.query.bulan != '') {
        whereClause = {
            jenis_laporan : 3,
            kabkota_id: req.query.kabkota_id,
            komoditas: req.query.komoditas,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };
    }else if(req.query.kabkota_id != '' && req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 3,
            kabkota_id: req.query.kabkota_id,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else if(req.query.komoditas != '' && req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 3,
            komoditas: req.query.komoditas,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else if(req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 3,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else{

        whereClause = {
            jenis_laporan : 3,
            deletedAt: null,
        };

    }
    
    const totalRows = await KondisiPangans.count({
        where:whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await KondisiPangans.findAll({
        include: [
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Komoditass,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
        ],

        where:whereClause,
        
        attributes: { exclude: ['updatedAt', 'deletedAt', 'luas_tanam', 'luas_panen', 'luas_puso', 'stok'] },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    });

    if(result.length > 0){

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Berhasil Ambil Data',
            'limit' : limit,
            'totalRows' : totalRows,
            'totalPage' : totalPage,
            'page' : page,
            'data' : result,
            
        });

    }else{

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data Kosong',
            'data' : Array()
        });

    }    
}

// Add kondisi CPP
export const createKondisiCpp = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produksi = await KondisiPangans.create(
            {
				jenis_laporan: 3,
                tahun: req.body.tahun,
				bulan: req.body.bulan,
                komoditas: req.body.komoditas,
                kabkota_id : req.body.kabkota_id,
                total_produksi : req.body.total_produksi,
                createdby : req.body.createdby,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Pedagang[0]['name'],
            'data' : produksi,
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Add kondisi cpp
export const createBulkKondisiCpp = async (req, res) => {
    var datetime = new Date();
    try {
        const p = req.body;
        // const produksi = await KondisiPangans.create(
        //     {
		// 		jenis_laporan: 1,
        //         tahun: req.body.tahun,
		// 		bulan: req.body.bulan,
        //         komoditas: req.body.komoditas,
        //         kabkota_id : req.body.kabkota_id,
        //         total_produksi : req.body.total_produksi,
        //         createdby : req.body.createdby,
        //         createdAt: datetime,
        //         updatedAt: datetime
        //     });

        const up = await KondisiPangans.update(
            {
                deletedAt: datetime 
            },{
                where:{
                    jenis_laporan: req.body[0].jenis_laporan,
                    tahun: req.body[0].tahun,
                    bulan: req.body[0].bulan,
                    komoditas: req.body[0].komoditas,
                }
            });
        if(up){

            const produksi = await KondisiPangans.bulkCreate(p);

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditambahkan',
                // 'data': Pedagang[0]['name'],
                'data' : produksi,
            });

        }else{

            // console.log(err);
            res.statusCode = 404;
            res.json({
                'status' : 0,
                // 'message': err,
                // 'message': err['errors'][0]['message']
                'message': 'Error'
            });

        }
        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Get detail kondisi cpp
export const detailKondisiCpp = async (req, res) => {
    try {
        const totalPage = await KondisiPangans.findOne({
            where: {
                id: req.query.id,
                deletedAt: null
            }
        });

        if(totalPage){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : totalPage,
                'halaman' : req.query.halaman
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : Array(),
            });

        }
        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Add kondisi produksi
export const editKondisiCpp = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produksi = await KondisiPangans.update(
            {
                total_produksi : req.body.total_produksi
            },{
                where:{
                    id: req.body.id
                }
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil diupdate',
            // 'data': Pedagang[0]['name'],
            'data' : produksi,
            'halaman' : req.body.halaman
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}



//luas tanam panen
export const getKondisiLuas = async(req, res) =>{
    KondisiPangans.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

     KondisiPangans.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas'
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    var whereClause;

    if (req.query.kabkota_id != '' && req.query.komoditas != '' && req.query.tahun != '' &&  req.query.bulan != '') {
        whereClause = {
            jenis_laporan : 2,
            kabkota_id: req.query.kabkota_id,
            komoditas: req.query.komoditas,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };
    }else if(req.query.kabkota_id != '' && req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 2,
            kabkota_id: req.query.kabkota_id,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else if(req.query.komoditas != '' && req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 2,
            komoditas: req.query.komoditas,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else if(req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 2,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else{

        whereClause = {
            jenis_laporan : 2,
            deletedAt: null,
        };

    }
    
    const totalRows = await KondisiPangans.count({
        where:whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await KondisiPangans.findAll({
        include: [
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Komoditass,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
        ],

        where:whereClause,
        
        attributes: { exclude: ['updatedAt', 'deletedAt', 'luas_tanam', 'luas_panen', 'luas_puso', 'stok'] },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    });

    if(result.length > 0){

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Berhasil Ambil Data',
            'limit' : limit,
            'totalRows' : totalRows,
            'totalPage' : totalPage,
            'page' : page,
            'data' : result,
            
        });

    }else{

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data Kosong',
            'data' : Array()
        });

    }    
}

// Add kondisi luas
export const createKondisiLuas = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produksi = await KondisiPangans.create(
            {
				jenis_laporan: 2,
                tahun: req.body.tahun,
				bulan: req.body.bulan,
                komoditas: req.body.komoditas,
                kabkota_id : req.body.kabkota_id,
                total_produksi : req.body.total_produksi,
                createdby : req.body.createdby,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Pedagang[0]['name'],
            'data' : produksi,
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Add kondisi luas
export const createBulkKondisiLuas = async (req, res) => {
    var datetime = new Date();
    try {
        const p = req.body;
        // const produksi = await KondisiPangans.create(
        //     {
		// 		jenis_laporan: 1,
        //         tahun: req.body.tahun,
		// 		bulan: req.body.bulan,
        //         komoditas: req.body.komoditas,
        //         kabkota_id : req.body.kabkota_id,
        //         total_produksi : req.body.total_produksi,
        //         createdby : req.body.createdby,
        //         createdAt: datetime,
        //         updatedAt: datetime
        //     });
        const produksi = await KondisiPangans.bulkCreate(p);

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Pedagang[0]['name'],
            'data' : produksi,
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Get detail kondisi kebutuhan
export const detailKondisiLuas = async (req, res) => {
    try {
        const totalPage = await KondisiPangans.findOne({
            where: {
                id: req.query.id,
                deletedAt: null
            }
        });

        if(totalPage){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : totalPage,
                'halaman' : req.query.halaman
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : Array(),
            });

        }
        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Add kondisi kebutuhan
export const editKondisiLuas = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produksi = await KondisiPangans.update(
            {
                total_produksi : req.body.total_produksi
            },{
                where:{
                    id: req.body.id
                }
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil diupdate',
            // 'data': Pedagang[0]['name'],
            'data' : produksi,
            'halaman' : req.body.halaman
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}



// get kondisi kebutuhan
export const getKondisiKebutuhan = async(req, res) =>{
    KondisiPangans.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

     KondisiPangans.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas'
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    var whereClause;

    if (req.query.kabkota_id != '' && req.query.komoditas != '' && req.query.tahun != '' &&  req.query.bulan != '') {
        whereClause = {
            jenis_laporan : 4,
            kabkota_id: req.query.kabkota_id,
            komoditas: req.query.komoditas,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };
    }else if(req.query.kabkota_id != '' && req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 4,
            kabkota_id: req.query.kabkota_id,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else if(req.query.komoditas != '' && req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 4,
            komoditas: req.query.komoditas,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else if(req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            jenis_laporan : 4,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else{

        whereClause = {
            jenis_laporan : 4,
            deletedAt: null,
        };

    }
    
    const totalRows = await KondisiPangans.count({
        where:whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await KondisiPangans.findAll({
        include: [
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Komoditass,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
        ],

        where:whereClause,
        
        attributes: { exclude: ['updatedAt', 'deletedAt', 'luas_tanam', 'luas_panen', 'luas_puso', 'stok'] },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    });

    if(result.length > 0){

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Berhasil Ambil Data',
            'limit' : limit,
            'totalRows' : totalRows,
            'totalPage' : totalPage,
            'page' : page,
            'data' : result,
            
        });

    }else{

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data Kosong',
            'data' : Array()
        });

    }    
}

// Add kondisi kebutuhan
export const createKondisiKebutuhan= async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const kebutuhans = await KondisiPangans.create(
            {
				jenis_laporan: 4,
                tahun: req.body.tahun,
				bulan: req.body.bulan,
                komoditas: req.body.komoditas,
                kabkota_id : req.body.kabkota_id,
                total_produksi : req.body.total_produksi,
                createdby : req.body.createdby,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 4,
            'message': 'Data berhasil ditambahkan',
            // 'data': Pedagang[0]['name'],
            'data' : produksi,
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Add kondisi kebutuhan
export const createBulkKondisiKebutuhan = async (req, res) => {
    var datetime = new Date();
    try {
        const k = req.body;
        // const produksi = await KondisiPangans.create(
        //     {
		// 		jenis_laporan: 1,
        //         tahun: req.body.tahun,
		// 		bulan: req.body.bulan,
        //         komoditas: req.body.komoditas,
        //         kabkota_id : req.body.kabkota_id,
        //         total_produksi : req.body.total_produksi,
        //         createdby : req.body.createdby,
        //         createdAt: datetime,
        //         updatedAt: datetime
        //     });

        const up = await KondisiPangans.update(
            {
                deletedAt: datetime 
            },{
                where:{
                    jenis_laporan: req.body[0].jenis_laporan,
                    tahun: req.body[0].tahun,
                    bulan: req.body[0].bulan,
                    komoditas: req.body[0].komoditas,
                }
            });
        if(up){

            const kebutuhan = await KondisiPangans.bulkCreate(k);

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditambahkan',
                // 'data': Pedagang[0]['name'],
                'data' : kebutuhan,
            });

        }else{

            res.statusCode = 404;
            res.json({
                'status' : 0,
                // 'message': err,
                // 'message': err['errors'][0]['message']
                'message': 'Error'
            });

        }
        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Get detail kondisi kebutuhan
export const detailKondisiKebutuhan = async (req, res) => {
    try {
        const totalPage = await KondisiPangans.findOne({
            where: {
                id: req.query.id,
                deletedAt: null
            }
        });

        if(totalPage){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : totalPage,
                'halaman' : req.query.halaman
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : Array(),
            });

        }
        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

// Add kondisi kebutuhan
export const editKondisiKebutuhan = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produksi = await KondisiPangans.update(
            {
                total_produksi : req.body.total_produksi
            },{
                where:{
                    id: req.body.id
                }
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil diupdate',
            // 'data': Pedagang[0]['name'],
            'data' : produksi,
            'halaman' : req.body.halaman
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            // 'message': err['errors'][0]['message']
            'message': 'Error'
        });
    }
}

