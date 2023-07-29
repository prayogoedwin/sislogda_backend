// Import model Product
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

// Get detail users
export const getProfilDetail = async (req, res) => {
    try {
        const users = await Users.findOne({
            where: {
                token: req.body.token,
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
                'status' : 0,
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

// Edit users
export const profilUpdatePassword = async (req, res) => {
    var datetime = new Date();
    try {

        var p = req.body.password;

        if (p.length < 8 || p.search(/[a-z]/i) < 0 || p.search(/[0-9]/) < 0) {
            res.statusCode = 200;
            res.json({
                'status' : 0,
                'message': 'Silahkan cek kembali struktur password anda',
                'rule 1': 'Kata sandi Anda harus minimal 8 karakter',
                'rule 2': 'Kata sandi Anda harus mengandung setidaknya satu huruf.',
                'rule 3': 'Kata sandi Anda harus mengandung setidaknya satu digit angka.',
            });
            
        }
        // var p = req.body.pass;
        let hashedpass = bcrypt.hashSync(req.body.password, 10);
        const users = await Users.update(
            {
				password: hashedpass,
                updatedAt: datetime
            },{
                where:{
                    token: req.body.token
                }
            }
            );

        res.statusCode = 200;
        res.json({
            'status' : 1,
            'message': 'Data update password',
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



