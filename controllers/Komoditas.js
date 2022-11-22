// Import model Product
import Komoditass from "../models/KomoditasModel.js";

// Get semua product
// export const getKabkotas = async (req, res) => {
//     try {
//         const kabkota = await Kabkotas.findAll();
//         res.send(kabkota);
//     } catch (err) {
//         console.log(err);
//     }
// }

export const getKomoditas= async (req, res) => {
    try {
        const komditi = await Komoditass.findAll({
            where: {
                // email: req.body.email,
                // password: req.body.password,
                deletedAt: null
            },
            attributes: { exclude: ['createdAt','updatedAt', 'deletedAt'] }
        });

        if(komditi.length > 0){
            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': user[0]['name'],
                'data' : komditi,
                // 'data' : dt
            });
        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data kosong',
                // 'data': user[0]['name'],
                'data' : komditi,
                // 'data' : dt
            });

        }
    } catch (err){
        // console.log(err);
        res.statusCode = 404;
        res.json({
            'status' : 0,
            'message': 'Error'
        });
    }
}
