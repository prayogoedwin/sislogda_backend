// Import model Product
import LaporanPedagangs from "../models/LaporanPedagangModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import Kabkotas2 from "../models/KabkotaModel.js";

import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const getLaporanPedagang = async(req, res) =>{

    // LaporanPedagangs.belongsTo(Kabkotas, {
    //     targetKey:'id',
    //     foreignKey: 'berasal_dari',
    //     as: 'berasal_dari_'
    // });

    // LaporanPedagangs.belongsTo(Kabkotas2, {
    //     targetKey:'id',
    //     foreignKey: 'dijual_ke',
    //     as: 'dijual_ke_'
    // });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;

    var whereClause;

    if (req.query.kabkota_id != '' ) {
        whereClause = {
            kabkota_id: req.query.kabkota_id,
            deletedAt: null,
        };
    }else{

        whereClause = {
            deletedAt: null
        };

    }

    const totalRows = await LaporanPedagangs.count({
        where:whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await LaporanPedagangs.findAll({
        // include: [
        //     {
        //         model: Kabkotas,
        //         attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        //         as: 'berasal_dari_'
        //     },
        //     {
        //         model: Kabkotas2,
        //         attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        //         as: 'dijual_ke_'
        //     }
        //     ],
    
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

// Add pedagang
export const LaporanPedagangCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const pedagangLap = await LaporanPedagangs.create(
            {
				tahun: req.body.tahun,
                bulan: req.body.bulan,
				minggu: req.body.minggu,
                kategori_laporan: 2,
                data_dari : req.body.data_dari,
                total_produksi : req.body.total_produksi,
                stok : req.body.stok,
                stok_curve : req.body.stok_curve,
                harga_jual : req.body.harga_jual,
                harga_beli : req.body.harga_beli,
                berasal_dari : req.body.berasal_dari,
                dijual_ke : req.body.dijual_ke,
                createdby : req.body.createdby,
                kabkota_id : req.body.kabkota_id,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Pedagang[0]['name'],
            'data' : pedagangLap,
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
