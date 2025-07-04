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
    
    const query = `SELECT A.kabkota_id, C.name nama_kabkota, A.tahun, A.bulan, A.total_produksi produksi, B.total_produksi AS kebutuhan, (A.total_produksi - B.total_produksi) AS selisih FROM sis_kondisi_pangan A, sis_kondisi_pangan B, sis_kabkotas C WHERE A.kabkota_id = B.kabkota_id AND A.jenis_laporan = 1 AND B.jenis_laporan = 4 AND A.komoditas = ${komoditas} AND B.komoditas = ${komoditas} AND A.tahun = ${tahun} AND B.tahun = ${tahun} AND A.bulan = ${bulan}  AND B.bulan = ${bulan}  AND A.kabkota_id = C.id AND B.kabkota_id = C.id AND A.deletedat IS NULL AND B.deletedat IS NULL ORDER BY A.id DESC, A.kabkota_id`;
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

export const getProduksiKebutuhanExternal = async(req, res) =>{


    var currentTime = new Date()

    // access = Array(
    //     'a9c92ba6-12de-4921-a6cc-51adb04fb351' //Kominfo2023=X-apikey
    // );

    if(req.headers['x-api-key'] != 'a9c92ba6-12de-4921-a6cc-51adb04fb351'){

        res.statusCode = 400;
        res.json({
            'status' : 0,
            'message': 'Token tidak valid',
            'data' : Array()
        });
        // process.exit();

    }else{

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
        
        const query = `SELECT A.kabkota_id, C.name nama_kabkota, A.tahun, A.bulan, A.total_produksi produksi, B.total_produksi AS kebutuhan, (A.total_produksi - B.total_produksi) AS selisih FROM sis_kondisi_pangan A, sis_kondisi_pangan B, sis_kabkotas C WHERE A.kabkota_id = B.kabkota_id AND A.jenis_laporan = 1 AND B.jenis_laporan = 4 AND A.komoditas = ${komoditas} AND B.komoditas = ${komoditas} AND A.tahun = ${tahun} AND B.tahun = ${tahun} AND A.bulan = ${bulan}  AND B.bulan = ${bulan}  AND A.kabkota_id = C.id AND B.kabkota_id = C.id AND A.deletedat IS NULL AND B.deletedat IS NULL ORDER BY A.id DESC, A.kabkota_id`;
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

export const getDetailMaps = async(req, res) =>{


    var currentTime = new Date()

    if(req.body.kabkota_id == ''){
        var kabkota_id = 0;
    }else{
        var kabkota_id = req.body.kabkota_id;
    }

    if(req.body.komoditas != ''){
        var komoditas = req.body.komoditas;
    }else{
        var komoditas = 1;
    }

    if(req.body.tahun != ''){
        var tahun = req.body.tahun;
    }else{
        var tahun = currentTime.getFullYear();
    }

    if(req.body.bulan != ''){
        var bulan = req.body.bulan;
    }else{
        var bulan = currentTime.getMonth() + 1;
    }

    const query = `SELECT 
    E.name as nama_kabkota,
    (SELECT jumlah  
        FROM sis_penduduk 
        WHERE kabkota_id = ${kabkota_id} 
        ORDER BY sis_penduduk.id DESC LIMIT 1 ) as jumlah_penduduk,
    (SELECT angka
        FROM sis_angkasusenas_komoditas a
        INNER JOIN sis_kabkotas b ON b.id = a.kabkota_id  
        INNER JOIN sis_komoditas c ON c.id = a.komoditas_id  
        WHERE kabkota_id = ${kabkota_id} 
        AND komoditas_id = ${komoditas}  
        ORDER BY a.id DESC LIMIT 1) as angka_susenas,
    A.komoditas, C.name nama_komoditas, A.tahun, A.bulan, 
    D.total_produksi AS ketersediaan,
    A.total_produksi produksi, 
    B.total_produksi AS kebutuhan, 
    (A.total_produksi + D.total_produksi) - B.total_produksi AS selisih
    FROM sis_kondisi_pangan A, sis_kondisi_pangan B, sis_kondisi_pangan D, sis_komoditas C, sis_kabkotas E
    WHERE 
    A.komoditas = ${komoditas}
    AND B.komoditas = ${komoditas}
    AND D.komoditas = ${komoditas}
    AND A.jenis_laporan = 1 
    AND B.jenis_laporan = 4 
    AND D.jenis_laporan = 3
    AND A.kabkota_id = ${kabkota_id}
    AND B.kabkota_id = ${kabkota_id} 
    AND D.kabkota_id = ${kabkota_id} 
    AND A.tahun = ${tahun}
    AND B.tahun = ${tahun} 
    AND D.tahun = ${tahun} 
    AND A.bulan = ${bulan}
    AND B.bulan = ${bulan}
    AND D.bulan = ${bulan}
    AND A.komoditas = C.id 
    AND B.komoditas = C.id 
    AND D.komoditas = C.id
    AND A.kabkota_id = E.id 
    AND B.kabkota_id = E.id 
    AND D.kabkota_id = E.id
    ORDER BY A.komoditas`
    
    // const query = `SELECT A.kabkota_id, C.name nama_kabkota, A.tahun, A.bulan, A.total_produksi produksi, B.total_produksi AS kebutuhan, (A.total_produksi - B.total_produksi) AS selisih FROM sis_kondisi_pangan A, sis_kondisi_pangan B, sis_kabkotas C WHERE A.kabkota_id = B.kabkota_id AND A.jenis_laporan = 1 AND B.jenis_laporan = 4 AND A.komoditas = ${komoditas} AND B.komoditas = ${komoditas} AND A.tahun = ${tahun} AND B.tahun = ${tahun} AND A.bulan = ${bulan}  AND B.bulan = ${bulan}  AND A.kabkota_id = C.id AND B.kabkota_id = C.id ORDER BY A.kabkota_id`;
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

export const getDetailMapsJateng = async(req, res) =>{


    var currentTime = new Date()


    if(req.body.komoditas != ''){
        var komoditas = req.body.komoditas;
    }else{
        var komoditas = 1;
    }

    if(req.body.tahun != ''){
        var tahun = req.body.tahun;
    }else{
        var tahun = currentTime.getFullYear();
    }

    if(req.body.bulan != ''){
        var bulan = req.body.bulan;
    }else{
        var bulan = currentTime.getMonth() + 1;
    }

    const query = `SELECT 
    (SELECT jumlah  
        FROM sis_penduduk 
        WHERE kabkota_id = 3300
        ORDER BY sis_penduduk.id DESC LIMIT 1 ) as jumlah_penduduk,
    (SELECT angka
        FROM sis_angkasusenas_komoditas a
        INNER JOIN sis_kabkotas b ON b.id = a.kabkota_id  
        INNER JOIN sis_komoditas c ON c.id = a.komoditas_id  
        WHERE kabkota_id = 3300
        AND komoditas_id = ${komoditas} 
        ORDER BY a.id DESC LIMIT 1) as angka_susenas,
    A.komoditas, 
    SUM(D.total_produksi) AS ketersediaan,
    SUM(A.total_produksi) produksi, 
    SUM(B.total_produksi) AS kebutuhan, 
    (SUM(A.total_produksi) + SUM(D.total_produksi)) - SUM(B.total_produksi) AS selisih
    FROM sis_kondisi_pangan A, sis_kondisi_pangan B, sis_kondisi_pangan D
    WHERE 
    A.komoditas = ${komoditas} 
    AND B.komoditas = ${komoditas} 
    AND D.komoditas = ${komoditas} 
    AND A.jenis_laporan = 1 
    AND B.jenis_laporan = 4 
    AND D.jenis_laporan = 3
    AND A.tahun = ${tahun} 
    AND B.tahun = ${tahun}  
    AND D.tahun = ${tahun} 
    AND A.bulan = ${bulan}
    AND B.bulan = ${bulan}
    AND D.bulan = ${bulan}
		GROUP BY A.komoditas`
    
    // const query = `SELECT A.kabkota_id, C.name nama_kabkota, A.tahun, A.bulan, A.total_produksi produksi, B.total_produksi AS kebutuhan, (A.total_produksi - B.total_produksi) AS selisih FROM sis_kondisi_pangan A, sis_kondisi_pangan B, sis_kabkotas C WHERE A.kabkota_id = B.kabkota_id AND A.jenis_laporan = 1 AND B.jenis_laporan = 4 AND A.komoditas = ${komoditas} AND B.komoditas = ${komoditas} AND A.tahun = ${tahun} AND B.tahun = ${tahun} AND A.bulan = ${bulan}  AND B.bulan = ${bulan}  AND A.kabkota_id = C.id AND B.kabkota_id = C.id ORDER BY A.kabkota_id`;
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

export const getPenduduk = async(req, res) =>{

    var currentTime = new Date()
    if(req.query.kabkota_id == ''){
        res.statusCode = 200;
        res.json({
            'status' : 0,
            'message': 'Kabkota Harus Di Isi',
            'data' : array(),
        });
        process.exit();
    }else{
        var kabkota_id = req.query.kabkota_id;
    }

    if(req.query.tahun != ''){
        var tahun = req.query.tahun;
    }else{
        var tahun = currentTime.getFullYear();
    }

    // const query = `SELECT name as kabkota, 
    // kabkota_id, tahun, jumlah  
    // FROM sis_penduduk 
    // INNER JOIN sis_kabkotas ON sis_kabkotas.id = sis_penduduk.kabkota_id  
    // WHERE kabkota_id = ${kabkota_id} 
    // AND tahun = ${tahun} 
    // ORDER BY sis_penduduk.id DESC LIMIT 1`;

    const query = `SELECT name as kabkota, 
    kabkota_id, tahun, jumlah  
    FROM sis_penduduk 
    INNER JOIN sis_kabkotas ON sis_kabkotas.id = sis_penduduk.kabkota_id  
    WHERE kabkota_id = ${kabkota_id} 
    ORDER BY sis_penduduk.id DESC LIMIT 1`;
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

export const getDetailSusenas = async(req, res) =>{


    var currentTime = new Date()

    if(req.query.kabkota_id == ''){
        res.statusCode = 200;
        res.json({
            'status' : 0,
            'message': 'Kabkota Harus Di Isi',
            'data' : array(),
        });
        process.exit();
    }else{
        var kabkota_id = req.query.kabkota_id;
    }

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

    // const query = `SELECT b.name as kabkota, 
    // kabkota_id, komoditas_id,  c.name as komoditas, tahun, angka
    // FROM sis_angkasusenas_komoditas a
    // INNER JOIN sis_kabkotas b ON b.id = a.kabkota_id  
    // INNER JOIN sis_komoditas c ON c.id = a.komoditas_id  
    // WHERE kabkota_id = ${kabkota_id} 
    // AND tahun = ${tahun}  
    // AND komoditas_id = ${komoditas}  
    // ORDER BY a.id DESC LIMIT 1`;

    const query = `SELECT b.name as kabkota, 
    kabkota_id, komoditas_id,  c.name as komoditas, tahun, angka
    FROM sis_angkasusenas_komoditas a
    INNER JOIN sis_kabkotas b ON b.id = a.kabkota_id  
    INNER JOIN sis_komoditas c ON c.id = a.komoditas_id  
    WHERE kabkota_id = ${kabkota_id} 
    AND komoditas_id = ${komoditas}  
    ORDER BY a.id DESC LIMIT 1`;
    
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

export const getHargaAcuan = async(req, res) =>{

    var currentTime = new Date()
    if(req.body.komoditas == ''){
        res.statusCode = 200;
        res.json({
            'status' : 0,
            'message': 'Kabkota Harus Di Isi',
            'data' : array(),
        });
        process.exit();
    }else{
        var komoditas = req.body.komoditas;
    }

    if(req.body.tahun != ''){
        var tahun = req.body.tahun;
    }else{
        var tahun = currentTime.getFullYear();
    }

    // const query = `SELECT komoditas_id, tahun, batas_atas, batas_bawah  
    // FROM sis_hargaacuanpembelian 
    // WHERE komoditas_id = ${komoditas} 
    // AND tahun = ${tahun} 
    // ORDER BY id DESC LIMIT 1`;
    const query = `SELECT komoditas_id, tahun, batas_atas, batas_bawah  
    FROM sis_hargaacuanpembelian 
    WHERE komoditas_id = ${komoditas} 
    ORDER BY id DESC LIMIT 1`;
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

