// Import model Product
import Roles from "../models/RoleModel.js";

// Get semua roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll({
            where: {
                deletedat: null
            }
        });

        if(roles.length > 0){

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': user[0]['name'],
                'data' : roles,
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