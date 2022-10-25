// Import model Product
import Penyuluhs from "../models/PenyuluhModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const getPenyuluh = async(req, res) =>{
    Penyuluhs.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Penyuluhs.count({
        where: {
            deletedAt: null
        },
        where:{
            deletedAt: null,
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}, {nip:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Penyuluhs.findAll({
        include: [
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
        ],

        where:{
            deletedAt: null,
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}, {nip:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        
        attributes: { exclude: ['createdAt','updatedAt', 'deletedAt'] },
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


// Get semua penyuluhs
export const getPenyuluhAll = async (req, res) => {
    try {
        Penyuluhs.belongsTo(Kabkotas, { targetKey:'id', foreignKey: 'kabkota_id'});
        const penyuluhs = await Penyuluhs.findAll({
            include: [
                {
                    model: Kabkotas,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                }
                ],
            where: {
                deletedAt: null
            },
            attributes: { exclude: ['createdAt','updatedAt', 'deletedAt'] },

        });

        if(penyuluhs.length > 0){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penyuluh[0]['name'],
                'data' : penyuluhs,
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
            'message': err
        });
    }
}

// Get detail penyuluhs
export const getPenyuluhDetail = async (req, res) => {
    try {
        const penyuluhs = await Penyuluhs.findOne({
            where: {
                id: req.body.id,
                deletedAt: null
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditemukan',
            // 'data': Penyuluh[0]['name'],
            'data' : penyuluhs,
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            'message': err['errors'][0]['message']
        });
    }
}

// Add penyuluhs
export const PenyuluhCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const penyuluhs = await Penyuluhs.create(
            {
				nama: req.body.nama,
				nip: req.body.nip,
                kabkota_id: req.body.kabkota_id,
				gender: req.body.gender,
                pangkat: req.body.pangkat,
                pendidikan : req.body.pendidikan,
                golongan : req.body.golongan,
                jabatan : req.body.jabatan,
                lokasi_tugas : req.body.lokasi_tugas,
                sub_sektor : req.body.sub_sektor,
                wilayah_binaan : req.body.wilayah_binaan,
                no_hp : req.body.no_hp,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Penyuluh[0]['name'],
            'data' : penyuluhs,
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': err,
            'message': err['errors'][0]['message']
        });
    }
}

// Delete penyuluhs
export const PenyuluhDelete = async (req, res) => {
    var datetime = new Date();
    try {
        const penyuluhs = await Penyuluhs.update({deletedAt: datetime},{
            where:{
                id: req.body.id
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil dihapus',
            // 'data': Penyuluh[0]['name'],
            'data' : "",
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            'message': err['errors'][0]['message']
        });
    }
}