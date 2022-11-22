// Import model Product
import KategoriEnum from "../models/KategoriEnumModel.js";

// Get semua product
// export const getKabkotas = async (req, res) => {
//     try {
//         const kabkota = await Kabkotas.findAll();
//         res.send(kabkota);
//     } catch (err) {
//         console.log(err);
//     }
// }

export const getKategoriEnum = async (req, res) => {
    try {
        const kategori = await KategoriEnum.findAll({
            where: {
                // email: req.body.email,
                // password: req.body.password,
                deletedAt: null
            },
            attributes: { exclude: ['createdAt','updatedAt', 'deletedAt'] }
        });

        if(kategori.length > 0){
            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukan',
                // 'data': user[0]['name'],
                'data' : kategori,
                // 'data' : dt
            });
        }else{

            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data kosong',
                // 'data': user[0]['name'],
                'data' : kategori,
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
