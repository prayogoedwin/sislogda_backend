// Import express
import express from "express";
// Import Controller Product
import { 
    loginUser
 } from "../controllers/Auth.js";

 import { 
    getRoles
 } from "../controllers/Role.js";

 import { 
    getUsers,
    getUsersAll,
    getUsersDetail,
    UserCreate,
    UserDelete
 } from "../controllers/User.js";

 import { 
   getPenyuluh,
   getPenyuluhAll,
   getPenyuluhDetail,
   PenyuluhCreate,
   PenyuluhDelete
} from "../controllers/Penyuluh.js";

 import {
   getKabkotas,
   getKabKotasByProv,
} from "../controllers/Kabkota.js"
 import {getKecamatan} from "../controllers/Kecamatan.js"
 import {getKelurahan} from "../controllers/Kelurahan.js"
 
 // Init express router
const router = express.Router();

// Route get semua users
// router.get('/users', getUsers);

router.post('/api/login', loginUser);
router.get('/api/roles', getRoles);

//users crud
router.get('/api/users', getUsers);
router.get('/api/users/all', getUsersAll);
router.post('/api/user/add', UserCreate);
router.post('/api/user/detail', getUsersDetail);
router.post('/api/user/delete', UserDelete);

//penyuluh crud
router.get('/api/penyuluh', getPenyuluh);
router.get('/api/penyuluh/all', getPenyuluhAll);
router.post('/api/penyuluh/add', PenyuluhCreate);
router.post('/api/penyuluh/detail', getPenyuluhDetail);
router.post('/api/penyuluh/delete', PenyuluhDelete);


//Wilayah
router.get('/api/kabkotas', getKabkotas);
router.get('/api/kabkotas/by', getKabKotasByProv);
router.get('/api/kecamatan', getKecamatan);
router.get('/api/kelurahan', getKelurahan);

export default router;