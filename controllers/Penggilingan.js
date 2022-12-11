// Import model Product
import Penggilingans from "../models/PenggilinganModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import Kecamatans from "../models/KecamatanModel.js";
import Kelurahans from "../models/KelurahanModel.js";
import Komoditass from "../models/KomoditasModel.js";
import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const getPenggilingan = async(req, res) =>{
     Penggilingans.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

     Penggilingans.belongsTo(Kecamatans, {
        targetKey:'id',
        foreignKey: 'kecamatan_id'
     });

     Penggilingans.belongsTo(Kelurahans, {
        targetKey:'id',
        foreignKey: 'kelurahan_id'
     });
     
     Penggilingans.belongsTo(Komoditass, {
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

    const totalRows = await Penggilingans.count({
        where: whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Penggilingans.findAll({
        include: [
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Kecamatans,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Kelurahans,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Komoditass,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }, 
        ],

        where:whereClause,
        
        attributes: { exclude: ['updatedAt', 'deletedAt', 'password'] },
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


// Get semua penggilingans
export const getPenggilinganAll = async (req, res) => {
    try {
        Penggilingans.belongsTo(Kabkotas, {
            targetKey:'id',
            foreignKey: 'kabkota_id'
         });
    
         Penggilingans.belongsTo(Kecamatans, {
            targetKey:'id',
            foreignKey: 'kecamatan_id'
         });
    
         Penggilingans.belongsTo(Kelurahans, {
            targetKey:'id',
            foreignKey: 'kelurahan_id'
         });
        const penggilingans = await Penggilingans.findAll({
            include: [
                {
                    model: Kabkotas,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                },
                {
                    model: Kecamatans,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                },
                {
                    model: Kelurahans,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                }
                ],
            where: {
                deletedAt: null
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password'] }

        });

        if(penggilingans.length > 0){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : penggilingans,
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

// Get detail penggilingans
export const getPenggilinganDetail = async (req, res) => {
    try {
        const penggilingans = await Penggilingans.findOne({
            where: {
                id: req.body.id,
                deletedAt: null
            }
        });

        if(penggilingans){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : penggilingans,
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : penggilingans,
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

// Add penggilingans
export const PenggilinganCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const penggilingans = await Penggilingans.create(
            {
				nama: req.body.nama,
                kabkota_id: req.body.kabkota_id,
				kecamatan_id: req.body.kecamatan_id,
                kelurahan_id: req.body.kelurahan_id,
                alamat: req.body.alamat,
                kapasitas : req.body.kapasitas,
                lokasi : req.body.lokasi,
                komoditas : "1",
                lat : req.body.lat,
                lng : req.body.lng,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Penggilingan[0]['name'],
            'data' : penggilingans,
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


// Delete penggilingans
export const PenggilinganUpdate = async (req, res) => {
    var datetime = new Date();
    try {
        const penggilingans = await Penggilingans.update({
            nama: req.body.nama,
            kabkota_id: req.body.kabkota_id,
            kecamatan_id: req.body.kecamatan_id,
            kelurahan_id: req.body.kelurahan_id,
            alamat: req.body.alamat,
            kapasitas : req.body.kapasitas,
            lokasi : req.body.lokasi,
            komoditas : "1",
            lat : req.body.lat,
            lng : req.body.lng,
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
            // 'data': Penggilingan[0]['name'],
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

// Delete penggilingans
export const PenggilinganDelete = async (req, res) => {
    var datetime = new Date();
    try {
        const penggilingans = await Penggilingans.update({deletedAt: datetime},{
            where:{
                id: req.body.id
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil dihapus',
            // 'data': Penggilingan[0]['name'],
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