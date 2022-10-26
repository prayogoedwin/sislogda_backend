// Import model Product
import Koperasis from "../models/KoperasiModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const getKoperasi = async(req, res) =>{
     Koperasis.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Koperasis.count({
        where:{
            deletedAt: null,
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Koperasis.findAll({
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


// Get semua Koperasis
export const getKoperasiAll = async (req, res) => {
    try {
        Koperasis.belongsTo(Kabkotas, {
            targetKey:'id',
            foreignKey: 'kabkota_id'
         });
        const koperasis = await Koperasis.findAll({
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

        if(Koperasis.length > 0){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : koperasis,
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

// Get detail Koperasis
export const getKoperasiDetail = async (req, res) => {
    try {
        const koperasis = await Koperasis.findOne({
            where: {
                id: req.body.id,
                deletedAt: null
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditemukan',
            // 'data': Penggilingan[0]['name'],
            'data' : koperasis,
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

// Add Koperasis
export const KoperasiCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const koperasis = await Koperasis.create(
            {
				nama: req.body.nama,
                kabkota_id: req.body.kabkota_id,
                alamat: req.body.alamat,
                kebutuhan : req.body.kebutuhan,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Koperasi[0]['name'],
            'data' : koperasis,
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


// Delete Koperasis
export const KoperasiUpdate = async (req, res) => {
    var datetime = new Date();
    try {
        const koperasis = await Koperasis.update({
            nama: req.body.nama,
            kabkota_id: req.body.kabkota_id,
            alamat: req.body.alamat,
            kebutuhan : req.body.kebutuhan,
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
            // 'data': Koperasi[0]['name'],
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

// Delete Koperasis
export const KoperasiDelete = async (req, res) => {
    var datetime = new Date();
    try {
        const koperasis = await Koperasis.update({deletedAt: datetime},{
            where:{
                id: req.body.id
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil dihapus',
            // 'data': Koperasi[0]['name'],
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