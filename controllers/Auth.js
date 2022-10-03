// Import model Product
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
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
        // res.json({
        //     'a' : bcrypt.hashSync(req.body.password, 11)
        // })
        // process.exit();
        // res.send(user[0]);

        if(user.length > 0){
            // const dt = {
            //     'email_x' : user[0]['email'],
            //     'name_x' : user[0]['name']
            // };
            const passwordHash = user[0]['password'];
            const verified = bcrypt.compareSync(req.body.password, passwordHash);
            if(verified){
                res.statusCode = 200;
                res.json({
                    'status' : 1,
                    'message': 'User berhasil ditemukan',
                    // 'data': user[0]['name'],
                    'data' : user[0],
                    // 'data' : dt
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