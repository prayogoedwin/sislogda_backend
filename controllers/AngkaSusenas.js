// Import model Product
import AngkaSusenas from "../models/AngkaSusenasModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import Komoditass from "../models/KomoditasModel.js";
// import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// get angka susenas/
export const getAngka = async(req, res) =>{
    AngkaSusenas.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

     AngkaSusenas.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas_id'
     });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    var whereClause;

    if (req.query.kabkota_id != '' && req.query.komoditas_id != '' && req.query.tahun != '' &&  req.query.triwulan != '') {
        whereClause = {
            kabkota_id: req.query.kabkota_id,
            komoditas_id: req.query.komoditas_id,
            tahun: req.query.tahun,
            triwulan: req.query.triwulan,
            deletedAt: null,
        };
    }else if(req.query.kabkota_id != '' && req.query.tahun != '' &&  req.query.bulan != ''){

        whereClause = {
            kabkota_id: req.query.kabkota_id,
            tahun: req.query.tahun,
            bulan: req.query.bulan,
            deletedAt: null,
        };   

    }else if(req.query.komoditas_id != '' && req.query.tahun != '' &&  req.query.triwulan != ''){

        whereClause = {
            komoditas_id: req.query.komoditas_id,
            tahun: req.query.tahun,
            triwulan: req.query.triwulan,
            deletedAt: null,
        };   

    }else if(req.query.tahun != '' &&  req.query.triwulan != ''){

        whereClause = {
            tahun: req.query.tahun,
            triwulan: req.query.triwulan,
            deletedAt: null,
        };   

    }else{

        whereClause = {
            deletedAt: null,
        };

    }

    
    const totalRows = await AngkaSusenas.count({
        where:whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await AngkaSusenas.findAll({
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

// Add angka susenas
export const createAngka = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produksi = await AngkaSusenas.create(
            {
                tahun: req.body.tahun,
				triwulan: req.body.triwulan,
                komoditas_id: req.body.komoditas_id,
                angka : req.body.angka,
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
export const createBulkAngka = async (req, res) => {
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
        const produksi = await AngkaSusenas.bulkCreate(p);

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
export const deleteAngka = async (req, res) => {
    var datetime = new Date();
    try {
        const pedagang = await AngkaSusenas.update({deletedAt: datetime},{
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