// Import model Product
import Kabkotas from "../models/KabkotaModel.js";

// Get semua product
// export const getKabkotas = async (req, res) => {
//     try {
//         const kabkota = await Kabkotas.findAll();
//         res.send(kabkota);
//     } catch (err) {
//         console.log(err);
//     }
// }

export const getKabkotas = async (req, res) => {
    try {
        const kabkota = await Kabkotas.findAll({
            where: {
                // email: req.body.email,
                // password: req.body.password,
                deletedAt: null
            },
            attributes: { exclude: ['createdAt','updatedAt', 'deletedAt'] }
        });

        if(kabkota.length > 0){
            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': user[0]['name'],
                'data' : kabkota,
                // 'data' : dt
            });
        }
    } catch (err){
        console.log(err)
    }
}

export const getKabKotasByProv = async (req, res) => {
    try {
        const kabkota = await Kabkotas.findAll({
            where: {
                province_id: req.query.province_id,
                deletedAt: null
            },
            attributes: { exclude: ['createdAt','updatedAt', 'deletedAt'] }
        });

        if(kabkota.length > 0){
            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': user[0]['name'],
                'data' : kabkota,
                // 'data' : dt
            });
        }
    } catch (err){
        console.log(err)
    }
}