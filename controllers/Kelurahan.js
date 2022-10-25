// Import model Product
import Kelurahan from "../models/KelurahanModel.js";

export const getKelurahan = async (req, res) => {
    try {
        const kel = await Kelurahan.findAll({
            where: {
                district_id: req.query.district_id,
                deletedAt: null
            },
            attributes: { exclude: ['createdAt','updatedAt', 'deletedAt'] }
        });

        if(kel.length > 0){
            res.statusCode = 200;
            res.json({
                'status' : 1,
                'message': 'Data berhasil ditemukanxx',
                // 'data': user[0]['name'],
                'data' : kel,
                // 'data' : dt
            });
        }
    } catch (err){
       // console.log(err);
       res.statusCode = 404;
       res.json({
           'status' : 0,
           // 'message': err['errors'][0]['message']
           'message': 'Error'
       });
    }
}