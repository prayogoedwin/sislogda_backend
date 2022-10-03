// Import model Product
import Kecamatan from "../models/KecamatanModel.js";

export const getKecamatan = async (req, res) => {
    try {
        const kec = await Kecamatan.findAll({
            where: {
                regency_id: req.body.regency_id,
                deletedAt: null
            }
        });

        if(kec.length > 0){
            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukanxx',
                // 'data': user[0]['name'],
                'data' : kec,
                // 'data' : dt
            });
        }
    } catch (err){
        console.log(err)
    }
}