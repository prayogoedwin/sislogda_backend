// Import model Product
import db from "../config/Database.js";

// import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const getProduksiKebutuhan = async(req, res) =>{


    var currentTime = new Date()

    if(req.query.komoditas != ''){
        var komoditas = req.query.komoditas;
    }else{
        var komoditas = 1;
    }

    if(req.query.tahun != ''){
        var tahun = req.query.tahun;
    }else{
        var tahun = currentTime.getFullYear();
    }

    if(req.query.bulan != ''){
        var bulan = req.query.bulan;
    }else{
        var bulan = currentTime.getMonth() + 1;
    }
    
    const query = `SELECT A.kabkota_id, C.name nama_kabkota, A.tahun, A.bulan, A.total_produksi produksi, B.total_produksi AS kebutuhan, (A.total_produksi - B.total_produksi) AS selisih FROM sis_kondisi_pangan A, sis_kondisi_pangan B, sis_kabkotas C WHERE A.kabkota_id = B.kabkota_id AND A.jenis_laporan = 1 AND B.jenis_laporan = 4 AND A.komoditas = ${komoditas} AND B.komoditas = ${komoditas} AND A.tahun = ${tahun} AND B.tahun = ${tahun} AND A.bulan = ${bulan}  AND B.bulan = ${bulan}  AND A.kabkota_id = C.id AND B.kabkota_id = C.id ORDER BY A.kabkota_id`;
    const result = await db.query(query, 
        { 
          type: db.QueryTypes.SELECT 
        }
    );

    if(result.length > 0){

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Berhasil Ambil Data',
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

export const getKetersediaanKebutuhan = async(req, res) =>{


    var currentTime = new Date()

    if(req.query.komoditas != ''){
        var komoditas = req.query.komoditas;
    }else{
        var komoditas = 1;
    }

    if(req.query.tahun != ''){
        var tahun = req.query.tahun;
    }else{
        var tahun = currentTime.getFullYear();
    }

    if(req.query.bulan != ''){
        var bulan = req.query.bulan;
    }else{
        var bulan = currentTime.getMonth() + 1;
    }
    
    const query = `SELECT A.kabkota_id, C.name nama_kabkota, A.tahun, A.bulan, A.total_produksi ketersediaan, B.total_produksi AS kebutuhan, (A.total_produksi - B.total_produksi) AS selisih FROM sis_kondisi_pangan A, sis_kondisi_pangan B, sis_kabkotas C WHERE A.kabkota_id = B.kabkota_id AND A.jenis_laporan = 3 AND B.jenis_laporan = 4 AND A.komoditas = ${komoditas} AND B.komoditas = ${komoditas} AND A.tahun = ${tahun} AND B.tahun = ${tahun} AND A.bulan = ${bulan}  AND B.bulan = ${bulan}  AND A.kabkota_id = C.id AND B.kabkota_id = C.id ORDER BY A.kabkota_id`;
    const result = await db.query(query, 
        { 
          type: db.QueryTypes.SELECT 
        }
    );

    if(result.length > 0){

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Berhasil Ambil Data',
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