import Users from "../models/UserModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import Komoditass from "../models/KomoditasModel.js";
import KategoriEnum from "../models/KategoriEnumModel.js";
import Laporans from "../models/LaporanModel.js";
import Pedagangs from "../models/PedagangModel.js";
import {Op} from "sequelize";
import dotenv from "dotenv";
dotenv.config();



export const getPerforma = async(req, res) =>{
    Users.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

    Users.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas',
    });
    
    Users.belongsTo(KategoriEnum, {
        targetKey:'id',
        foreignKey: 'kategori_enumerator',
    });
    
    Users.hasMany(Laporans, {
        targetKey:'id',
        foreignKey: 'createdby',
    });

    // Users.belongsTo(Pedagangs, {
    //     targetKey:'komoditas',
    //     foreignKey: 'komoditas',
    // });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;

    var whereClause;

    
    if (req.query.kabkota_id != '' && req.query.komoditas != '') {

        var x = req.query.komoditas
        whereClause = {
            kabkota_id: req.query.kabkota_id,
            kategori_enumerator: 2,
            // komoditas: req.query.komoditas,
            role_id: "4",
            deletedAt: null,
        };
    }else if (req.query.kabkota_id != '' ) {

        var x = ''
        whereClause = {
            kabkota_id: req.query.kabkota_id,
            role_id: "4",
            deletedAt: null,
        };
    }else{

        var x = ''
        whereClause = {
            role_id: "4",
            deletedAt: null
        };

    }

    

    const totalRows = await Users.count({
       
        where: whereClause
        // where:{
        //     role_id: "4",
        //     deletedAt: null,
        //     [Op.or]: [{nama_lengkap:{
        //         [Op.like]: '%'+search+'%'
        //     }}, {email:{
        //         [Op.like]: '%'+search+'%'
        //     }}]
        // }

    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Users.findAll({
        include: [
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Komoditass,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }, 

        {
            model: KategoriEnum,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Laporans,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        // {
        //     model: Pedagangs,
        //     attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        // }
        ],

        where: whereClause,
        // where:{
        //     role_id: "4",
        //     deletedAt: null,
        //     [Op.or]: [{nama_lengkap:{
        //         [Op.like]: '%'+search+'%'
        //     }}, {email:{
        //         [Op.like]: '%'+search+'%'
        //     }}]
        // },
        
        attributes: { exclude: ['updatedAt', 'deletedAt', 'password'] },
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
            'data' : result
            
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

export const getPerformaBAK = async(req, res) =>{
    Users.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

    Users.belongsTo(Komoditass, {
        targetKey:'id',
        foreignKey: 'komoditas',
    });
    
    Users.belongsTo(KategoriEnum, {
        targetKey:'id',
        foreignKey: 'kategori_enumerator',
    });
    
    Users.hasMany(Laporans, {
        targetKey:'id',
        foreignKey: 'createdby',
    });

    // Users.belongsTo(Pedagangs, {
    //     targetKey:'komoditas',
    //     foreignKey: 'komoditas',
    // });

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;

    var whereClause;

    
    if (req.query.kabkota_id != '' && req.query.komoditas != '') {

        var x = req.query.komoditas
        whereClause = {
            kabkota_id: req.query.kabkota_id,
            komoditas: req.query.komoditas,
            role_id: "4",
            deletedAt: null,
        };
    }else if (req.query.kabkota_id != '' ) {

        var x = ''
        whereClause = {
            kabkota_id: req.query.kabkota_id,
            role_id: "4",
            deletedAt: null,
        };
    }else{

        var x = ''
        whereClause = {
            role_id: "4",
            deletedAt: null
        };

    }

    

    const totalRows = await Users.count({
       
        where: whereClause
        // where:{
        //     role_id: "4",
        //     deletedAt: null,
        //     [Op.or]: [{nama_lengkap:{
        //         [Op.like]: '%'+search+'%'
        //     }}, {email:{
        //         [Op.like]: '%'+search+'%'
        //     }}]
        // }

    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Users.findAll({
        include: [
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Komoditass,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }, 

        {
            model: KategoriEnum,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Laporans,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        // {
        //     model: Pedagangs,
        //     attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        // }
        ],

        where: whereClause,
        // where:{
        //     role_id: "4",
        //     deletedAt: null,
        //     [Op.or]: [{nama_lengkap:{
        //         [Op.like]: '%'+search+'%'
        //     }}, {email:{
        //         [Op.like]: '%'+search+'%'
        //     }}]
        // },
        
        attributes: { exclude: ['updatedAt', 'deletedAt', 'password'] },
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
            'data' : result
            
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