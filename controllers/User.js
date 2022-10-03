// Import model Product
import Users from "../models/UserModel.js";

// Get semua roles
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
        console.log(err);
        // res.statusCode = 404;
        // res.json({
        //     'status' : 0,
        //     'message': 'Error'
        // });
    }
}