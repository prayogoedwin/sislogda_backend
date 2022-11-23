// Import model Product
import Users from "../models/UserModel.js";
import Roles from "../models/RoleModel.js";
import Kabkotas from "../models/KabkotaModel.js";
import {Op} from "sequelize";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

export const getUsers = async(req, res) =>{
    Users.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

    Users.belongsTo(Roles, {
        targetKey:'id',
        foreignKey: 'role_id'
     });
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Users.count({
       
        where:{
            deletedAt: null,
            [Op.or]: [{nama_lengkap:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
        }

    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Users.findAll({
        include: [
        {
            model: Roles,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
        ],

      
        where:{
            deletedAt: null,
            [Op.or]: [{nama_lengkap:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        
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


export const getUsersRole = async(req, res) =>{
    Users.belongsTo(Kabkotas, {
        targetKey:'id',
        foreignKey: 'kabkota_id'
     });

    Users.belongsTo(Roles, {
        targetKey:'id',
        foreignKey: 'role_id'
     });
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || process.env.PAGE_LIMIT_PAGINATION;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Users.count({
       
        where:{
            role_id: req.query.role_id,
            deletedAt: null,
            [Op.or]: [{nama_lengkap:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Users.findAll({
        include: [
        {
            model: Roles,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        {
            model: Kabkotas,
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
        ],

      
        where:{
            role_id: req.query.role_id,
            deletedAt: null,
            [Op.or]: [{nama_lengkap:{
                [Op.like]: '%'+search+'%'
            }}, {email:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        
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


// Get semua users
export const getUsersAll = async (req, res) => {
    try {
        Users.belongsTo(Roles, {targetKey:'id',foreignKey: 'role_id'});
        Users.belongsTo(Kabkotas, { targetKey:'id', foreignKey: 'kabkota_id'});
        const users = await Users.findAll({
            include: [
                {
                    model: Roles,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                },
                {
                    model: Kabkotas,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                }
                ],
            where: {
                deletedat: null
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password'] },
            order:[
                ['id', 'ASC']
            ]
            

        });

        if(users.length > 0){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': user[0]['name'],
                'data' : users,
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
            'message': 'Error'
            // 'message': err['errors'][0]['message']
            // 'message': err
        });
    }
}


// Get semua users
export const getUsersRoleAll = async (req, res) => {
    try {
        Users.belongsTo(Roles, {targetKey:'id',foreignKey: 'role_id'});
        Users.belongsTo(Kabkotas, { targetKey:'id', foreignKey: 'kabkota_id'});
        const users = await Users.findAll({
            include: [
                {
                    model: Roles,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                },
                {
                    model: Kabkotas,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                }
                ],
            where: {
                role_id: req.query.role_id,
                deletedat: null
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password'] },
            order:[
                ['id', 'ASC']
            ]
            

        });

        if(users.length > 0){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': user[0]['name'],
                'data' : users,
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
            'message': 'Error'
            // 'message': err['errors'][0]['message']
            // 'message': err
        });
    }
}

// Get detail users
export const getUsersDetail = async (req, res) => {
    try {
        const users = await Users.findOne({
            where: {
                id: req.body.user_id,
                deletedAt: null
            }
        });

        if(users){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : users,
            });

        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data Tidak Ditemukan',
                // 'data': Penggilingan[0]['name'],
                'data' : users,
            });

        }

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            'message': 'Error'
            // 'message': err['errors'][0]['message']
        });
    }
}

// Add users
export const UserCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        let hashedpass = bcrypt.hashSync(req.body.password, 10);
        const users = await Users.create(
            {
				email: req.body.email,
				nama_lengkap: req.body.nama_lengkap,
				password: hashedpass,
                role_id: req.body.role_id,
                kabkota_id : req.body.kabkota_id,
                kategori_enumerator : req.body.kategori_enumerator,
                komoditas : req.body.komoditas,
                is_active : 1,
                createdAt: datetime,
                updatedAt: datetime
                // created_by: req.body.created_by
            });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditambahkan',
            // 'data': user[0]['name'],
            'data' : users,
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            'message': 'Error'
            // 'message': err,
            // 'message': err['errors'][0]['message']
        });
    }
}


// Edit users
export const UserUpdate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;

        const users = await Users.update(
            {
				nama_lengkap: req.body.nama_lengkap,
                role_id: req.body.role_id,
                kabkota_id : req.body.kabkota_id,
                kategori_enumerator : req.body.kategori_enumerator,
                komditas : req.body.komditas,
                updatedAt: datetime
                // created_by: req.body.created_by
            },{
                where:{
                    id: req.body.user_id
                }
            }
            );

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil di edit',
            // 'data': user[0]['name'],
            // 'data' : users,
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            // 'message': 'Error'
            'message': err,
            // 'message': err['errors'][0]['message']
        });
    }
}

// Delete users
export const UserDelete = async (req, res) => {
    var datetime = new Date();
    try {
        const users = await Users.update({deletedAt: datetime},{
            where:{
                id: req.body.user_id
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil dihapus',
            // 'data': user[0]['name'],
            // 'data' : "",
        });

        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            'message': 'Error'
            // 'message': err['errors'][0]['message']
        });
    }
}