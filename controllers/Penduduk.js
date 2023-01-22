// Import model Product
import PendudukModel from "../models/PendudukModel.js";
import Kabkotas from "../models/KabkotaModel.js";
// import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// get angka susenas/
export const getAngkap = async(req, res) =>{

    PendudukModel.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    var whereClause;
    
    if(req.query.kabkota_id != '' && req.query.tahun != ''){

        whereClause = {
            kabkota_id: req.query.kabkota_id,
            tahun: req.query.tahun,
            deletedAt: null,
        };   

    } else if(req.query.kabkota_id != ''){

        whereClause = {
            kabkota_id: req.query.kabkota_id,
            deletedAt: null,
        };   

    } else if(req.query.tahun != ''){

        whereClause = {
            tahun: req.query.tahun,
            deletedAt: null,
        };   

    }else{

        whereClause = {
            deletedAt: null,
        };

    }
    
    const totalRows = await PendudukModel.count({
        where:whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await PendudukModel.findAll({
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

// Add angka susenas
export const createAngkap = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produksi = await PendudukModel.create(
            {
                tahun: req.body.tahun,
                jumlah : req.body.jumlah,
                kabkota_id: req.body.kabkota_id,
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

// Add angka susenas
export const createBulkAngkap = async (req, res) => {
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
        const produksi = await PendudukModel.bulkCreate(p);

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

// Delete pedagang
export const deleteAngkap = async (req, res) => {
    var datetime = new Date();
    try {
        const pedagang = await PendudukModel.update({deletedAt: datetime},{
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