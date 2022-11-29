// Import model Product
import KondisiPangans from "../models/KondisiPanganModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import Komoditass from "../models/KomoditasModel.js";
// import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Get detail pedagang
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

    if (req.query.kabkota_id != '' && req.query.komoditas != '') {
        whereClause = {
            jenis_laporan : 1,
            kabkota_id: req.query.kabkota_id,
            komoditas: req.query.komoditas,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };
    }else if(req.query.kabkota_id != '' ){

        whereClause = {
            jenis_laporan : 1,
            kabkota_id: req.query.kabkota_id,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else{

        whereClause = {
            jenis_laporan : 1,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
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

