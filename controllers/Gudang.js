// Import model Product
import Gudangs from "../models/GudangModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import Komoditass from "../models/KomoditasModel.js";
import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const getGudang = async(req, res) =>{
     Gudangs.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });
     Gudangs.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas',
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;

    var whereClause;

    if (req.query.kabkota_id != '' && req.query.komoditas != '') {
        whereClause = {
            kabkota_id: req.query.kabkota_id,
            komoditas: req.query.komoditas,
            deletedAt: null,
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}]
        };
    }else if(req.query.kabkota_id != '' ){

        whereClause = {
            kabkota_id: req.query.kabkota_id,
            
            deletedAt: null,
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}]
        };   
    }else{

        whereClause = {
            deletedAt: null,
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}]
        };

    }

    const totalRows = await Gudangs.count({
        where: whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Gudangs.findAll({
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
        
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
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


// Get semua Gudangs
export const getGudangAll = async (req, res) => {
    try {
        Gudangs.belongsTo(Kabkotas, {
            targetKey:'id',
            foreignKey: 'kabkota_id'
         });
        const gudangs = await Gudangs.findAll({
            include: [
                {
                    model: Kabkotas,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                }
                ],
            where: {
                deletedAt: null
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }

        });

        if(gudangs.length > 0){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : gudangs,
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Kosong',
                'data' : Array()
            });

        }
        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err['errors'][0]['message']
            // 'message': err
            'message': 'Error'
        });
    }
}

// Get detail Gudangs
export const getGudangDetail = async (req, res) => {
    try {
        const gudangs = await Gudangs.findOne({
            where: {
                id: req.body.id,
                deletedAt: null
            }
        });

        if(gudangs){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : gudangs,
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : gudangs,
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

// Add Gudangs
export const GudangCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const gudangs = await Gudangs.create(
            {
				nama: req.body.nama,
                kabkota_id: req.body.kabkota_id,
                alamat: req.body.alamat,
                kapasitas : req.body.kapasitas,
                lat : req.body.lat,
                lng : req.body.lng,
                komoditas : req.body.komoditas,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Gudang[0]['name'],
            'data' : gudangs,
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


// Delete Gudangs
export const GudangUpdate = async (req, res) => {
    var datetime = new Date();
    try {
        const gudangs = await Gudangs.update({
            nama: req.body.nama,
            kabkota_id: req.body.kabkota_id,
            alamat: req.body.alamat,
            kapasitas : req.body.kapasitas,
            lat : req.body.lat,
            lng : req.body.lng,
            komoditas : req.body.komoditas,
            updatedAt: datetime
        },{
            where:{
                id: req.body.id
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil diupdate',
            // 'data': Gudang[0]['name'],
            'data' : "",
        });

        
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

// Delete Gudangs
export const GudangDelete = async (req, res) => {
    var datetime = new Date();
    try {
        const gudangs = await Gudangs.update({deletedAt: datetime},{
            where:{
                id: req.body.id
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil dihapus',
            // 'data': Gudang[0]['name'],
            'data' : "",
        });

        
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