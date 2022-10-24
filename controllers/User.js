// Import model Product
import Users from "../models/UserModel.js";


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
                'data' : array(),
            });

        }
        
    } catch (err) {
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            'message': console.log(err)
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
            'message': console.log(err)
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
            'message': console.log(err)
        });
    }
}