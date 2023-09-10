// Import model Product
import Laporans from "../models/LaporanModel.js";
import Produsens from "../models/ProdusenModel.js";
import Users from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

export const getLaporanProdusen = async(req, res) =>{

    Laporans.belongsTo(Produsens, {
        targetKey:'id',
        foreignKey: 'data_dari'
    });

    // Laporans.belongsTo(Kabkotas, {
    //     targetKey:'id',
    //     foreignKey: 'berasal_dari',
    //     as: 'berasal_dari_'
    // });

    // Laporans.belongsTo(Kabkotas2, {
    //     targetKey:'id',
    //     foreignKey: 'dijual_ke',
    //     as: 'dijual_ke_'
    // });

    Laporans.belongsTo(Users, {
        targetKey:'id',
        foreignKey: 'createdby',
    });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;

    var whereClause;

    if (req.query.kabkota_id != '' && req.query.komoditas != '') {

        whereClause = {
            kabkota_id: req.query.kabkota_id,
            // komoditas: req.query.komoditas,
            kategori_laporan: "1",
            deletedAt: null,
        };

    }else if (req.query.kabkota_id != '' ) {
        whereClause = {
            kabkota_id: req.query.kabkota_id,
            kategori_laporan: "1",
            deletedAt: null,
        };
    }else{

        whereClause = {
            kategori_laporan: "1",
            deletedAt: null
        };

    }

    const totalRows = await Laporans.count({
        where:whereClause
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Laporans.findAll({
        include: [
            {
                model: Produsens,
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
            },
            // {
            //     model: Kabkotas,
            //     attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
            // },
            // {
            //     model: Komoditass,
            //     attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
            // }, 
    
            // {
            //     model: KategoriEnum,
            //     attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
            // },
            {
                model: Users,
                attributes: { exclude: ['id','email','role_id','is_active','password','token', 'createdAt', 'updatedAt', 'deletedAt'] }
            },
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

// Add Produsen
export const LaporanProdusenCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        const produsenLap = await Laporans.create(
            {
				tahun: req.body.tahun,
                bulan: req.body.bulan,
				minggu: req.body.minggu,
                kategori_laporan: "1",
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
                komoditas : req.body.komoditas,
                createdAt: datetime,
                updatedAt: datetime
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': Produsen[0]['name'],
            'data' : produsenLap,
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


// Delete laporan pedagang
export const LaporanProdusenDelete = async (req, res) => {
    var datetime = new Date();
    try {
        const pedagang = await Laporans.update({deletedAt: datetime},{
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

