// Import model Product
import Lumbungs from "../models/LumbungModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import Kecamatans from "../models/KecamatanModel.js";
import Kelurahans from "../models/KelurahanModel.js";
import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const getLumbung = async(req, res) =>{
     Lumbungs.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

     Lumbungs.belongsTo(Kecamatans, {
        targetKey:'id',
        foreignKey: 'kecamatan_id'
     });

     Lumbungs.belongsTo(Kelurahans, {
        targetKey:'id',
        foreignKey: 'kelurahan_id'
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

    const totalRows = await Lumbungs.count({
        where: whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Lumbungs.findAll({
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


// Get semua Lumbungs
export const getLumbungAll = async (req, res) => {
    try {
        Lumbungs.belongsTo(Kabkotas, {
            targetKey:'id',
            foreignKey: 'kabkota_id'
         });
    
         Lumbungs.belongsTo(Kecamatans, {
            targetKey:'id',
            foreignKey: 'kecamatan_id'
         });
    
         Lumbungs.belongsTo(Kelurahans, {
            targetKey:'id',
            foreignKey: 'kelurahan_id'
         });
        const lumbungs = await Lumbungs.findAll({
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
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }

        });

        if(lumbungs.length > 0){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : lumbungs,
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

// Get detail lumbungs
export const getLumbungDetail = async (req, res) => {
    try {
        const lumbungs = await Lumbungs.findOne({
            where: {
                id: req.body.id,
                deletedAt: null
            }
        });

        if(lumbungs){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : lumbungs,
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : lumbungs,
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

// Get detail produsen
export const getLumbungCount = async (req, res) => {
    try {
        const lumb = await Lumbungs.count({
            where: {
                // komoditas: req.body.komoditas,
                kabkota_id: req.body.kabkota_id,
                deletedAt: null
            }
        });

        if(lumb){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'hasil' : lumb,
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'hasil' : lumb,
            });

        }
        

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            'message': err['errors'][0]['message']
            // 'message': 'Error'
        });
    }
}

// Add Lumbungs
export const LumbungCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const lumbungs = await Lumbungs.create(
            {
				nama: req.body.nama,
                kabkota_id: req.body.kabkota_id,
				kecamatan_id: req.body.kecamatan_id,
                kelurahan_id: req.body.kelurahan_id,
                kapasitas : req.body.kapasitas,
                tipe : req.body.tipe,
                lat : req.body.lat,
                lng : req.body.lng,
                komoditas : "1",
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Lumbung[0]['name'],
            'data' : lumbungs,
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


// Delete Lumbungs
export const LumbungUpdate = async (req, res) => {
    var datetime = new Date();
    try {
        const lumbungs = await Lumbungs.update({
            nama: req.body.nama,
            kabkota_id: req.body.kabkota_id,
            kecamatan_id: req.body.kecamatan_id,
            kelurahan_id: req.body.kelurahan_id,
            kapasitas : req.body.kapasitas,
            tipe : req.body.tipe,
            lat : req.body.lat,
            lng : req.body.lng,
            komoditas : "1",
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
            // 'data': Lumbung[0]['name'],
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

// Delete Lumbungs
export const LumbungDelete = async (req, res) => {
    var datetime = new Date();
    try {
        const lumbungs = await Lumbungs.update({deletedAt: datetime},{
            where:{
                id: req.body.id
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil dihapus',
            // 'data': Lumbung[0]['name'],
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