// Import model Product
import Pedagangs from "../models/PedagangModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import Kecamatans from "../models/KecamatanModel.js";
import Kelurahans from "../models/KelurahanModel.js";
import Komoditass from "../models/KomoditasModel.js";
import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const getPedagang = async(req, res) =>{
     Pedagangs.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

     Pedagangs.belongsTo(Kecamatans, {
        targetKey:'id',
        foreignKey: 'kecamatan_id'
     });

     Pedagangs.belongsTo(Kelurahans, {
        targetKey:'id',
        foreignKey: 'kelurahan_id'
     });

     Pedagangs.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas'
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Pedagangs.count({
        where:{
            deletedAt: null,
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Pedagangs.findAll({
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
        }
        ],

        where:{
            deletedAt: null,
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        
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


// Get semua Pedagangs
export const getPedagangAll = async (req, res) => {
    try {
        Pedagangs.belongsTo(Kabkotas, {
            targetKey:'id',
            foreignKey: 'kabkota_id'
         });
    
         Pedagangs.belongsTo(Kecamatans, {
            targetKey:'id',
            foreignKey: 'kecamatan_id'
         });
    
         Pedagangs.belongsTo(Kelurahans, {
            targetKey:'id',
            foreignKey: 'kelurahan_id'
         });
        const pedagang = await Pedagangs.findAll({
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

        if(pedagang.length > 0){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : pedagang,
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

// Get detail pedagang
export const getPedagangDetail = async (req, res) => {
    try {
        const pedagang = await Pedagangs.findOne({
            where: {
                id: req.body.id,
                deletedAt: null
            }
        });

        if(pedagang){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : pedagang,
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : pedagang,
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

// Add pedagang
export const PedagangCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const pedagang = await Pedagangs.create(
            {
				nama: req.body.nama,
                kabkota_id: req.body.kabkota_id,
				kecamatan_id: req.body.kecamatan_id,
                kelurahan_id: req.body.kelurahan_id,
                alamat : req.body.alamat,
                komoditas : req.body.komoditas,
                nomor : req.body.nomor,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Pedagang[0]['name'],
            'data' : pedagang,
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


// Delete pedagang
export const PedagangUpdate = async (req, res) => {
    var datetime = new Date();
    try {
        const pedagang = await Pedagangs.update({
                nama: req.body.nama,
                kabkota_id: req.body.kabkota_id,
				kecamatan_id: req.body.kecamatan_id,
                kelurahan_id: req.body.kelurahan_id,
                alamat : req.body.alamat,
                komoditas : req.body.komoditas,
                nomor : req.body.nomor,
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
            // 'data': Pedagang[0]['name'],
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

// Delete pedagang
export const PedagangDelete = async (req, res) => {
    var datetime = new Date();
    try {
        const pedagang = await Pedagangs.update({deletedAt: datetime},{
            where:{
                id: req.body.id
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil dihapus',
            // 'data': Pedagang[0]['name'],
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