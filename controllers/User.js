// Import model Product
import Users from "../models/UserModel.js";
import bcrypt from 'bcrypt';




// Get semua users
export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                deletedat: null
            }
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
            'message': err['errors'][0]['message']
        });
    }
}

// Get detail users
export const getUsersDetail = async (req, res) => {
    try {
        const users = await Users.findOne({
            where: {
                id: req.body.user_id,
                deletedat: null
            }
        });

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data berhasil ditemukan',
            // 'data': user[0]['name'],
            'data' : users,
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

// Add users
export const UserCreate = async (req, res) => {
    var datetime = new Date();
    try {
        // var p = req.body.pass;
        let hashedpass = bcrypt.hashSync(req.body.pass, 10);
        const users = await Users.create(
            {
				email: req.body.email,
				nama_lengkap: req.body.nama_lengkap,
				password: hashedpass,
                role_id: req.body.role_id,
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
            // 'message': err,
            'message': err['errors'][0]['message']
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