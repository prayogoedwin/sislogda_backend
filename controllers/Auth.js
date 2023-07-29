// Import model Product
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

//Test

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
            limit: 1,
            where: {
                email: req.body.email,
                deletedAt: null
            },
            order: [ [ 'createdAt', 'DESC' ]]
        });

        if(user.length > 0){

            const passwordHash = user[0]['password'];
            const idnya = user[0]['id'];
            const verified = bcrypt.compareSync(req.body.password, passwordHash);
            if(verified){
                let id_token = bcrypt.hashSync(idnya+req.body.email+datetime, 10);

                    const token = await Users.update({
                        token: id_token
                    },{
                        where:{
                            id: idnya
                        }
                    });
            
                    res.statusCode = 200;
                    var dt = {
                        id : idnya,
                        email  : user[0]['email'],
                        role : user[0]['role_id'],
                        kabkota_id : user[0]['kabkota_id'],
                        komoditas : user[0]['komoditas'],
                        nama_lengkap : user[0]['nama_lengkap'],
                        kategori_enumerator : user[0]['kategori_enumerator'],
                        id_token : id_token
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

            // let id_token = bcrypt.hashSync(req.body.email+datetime, 10);
            //     res.statusCode = 200;
            //     var dt = {
            //         id : user[0]['id'],
            //         email  : user[0]['email'],
            //         id_token : id_token
            //     }
            //     res.json({
            //         'status' : 1,
            //         'message': 'User berhasil ditemukan',
            //         // 'data' : user[0],
            //         'data' : dt
            //     });

        } else {
            res.json({
                'status' : 0,
                'message': 'User / password tidak ditemukan'
            });
        }
        
    } catch (err) {
        // console.log(err);
        res.json({
            'status' : 0,
            'message': 'Error'
        });
    }
}


export const cekToken = async (req, res) => {
    var datetime = new Date();
    try {
        if(!req.body.role || !req.body.token) {
            res.statusCode = 401;
            res.json({
                'status' : 0,
                'message': 'Semua parameter wajib terisi'
            });
        }

        const user = await Users.findAll({
            limit: 1,
            where: {
                token: req.body.token,
                role_id: req.body.role,
                deletedAt: null
            },
            order: [ [ 'createdAt', 'DESC' ]]
        });

        if(user.length > 0){

            res.json({
                'status' : 1,
                'message': 'User berhasil ditemukan',
                // 'data' : user[0],
                'data' : 'Verifikasi Berhasil'
            });

        } else {
            res.json({
                'status' : 0,
                'message': 'Verifikasi Gagal'
            });
        }
        
    } catch (err) {
        // console.log(err);
        res.json({
            'status' : 0,
            'message': 'Error'
        });
    }
}



