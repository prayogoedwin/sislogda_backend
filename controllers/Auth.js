// Import model Product
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
    var datetime = new Date();
    try {
        if(!req.body.email || !req.body.password) {
            res.statusCode = 401;
            res.json({
                'status' : 0,
                'message': 'Semua parameter wajib terisi'
            });
        }

        const user = await Users.findAll({
            where: {
                email: req.body.email,
                // password: req.body.password,
                deletedAt: null
            }
        });

        if(user.length > 0){

            const passwordHash = user[0]['password'];
            const verified = bcrypt.compareSync(req.body.password, passwordHash);
            if(verified){
                let id_token = bcrypt.hashSync(req.body.email+datetime, 10);
                res.statusCode = 200;

                var dt = {
                    'id' : user[0]['id'],
                    'email'  : user[0]['email'],
                    'id_token' : id_token
                }
                res.json({
                    'status' : 1,
                    'message': 'User berhasil ditemukan',
                    // 'data' : user[0],
                    'data' : dt
                });
            } else {
                res.json({
                    'status' : 0,
                    'message': 'User / password tidak ditemukan'
                });
            }
        } else {
            res.json({
                'status' : 0,
                'message': 'User / password tidak ditemukan'
            });
        }
        
    } catch (err) {
        console.log(err);
    }
}