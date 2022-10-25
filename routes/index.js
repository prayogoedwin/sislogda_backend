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
    UserCreate,
    getUsersDetail,
    UserUpdate,
    UserDelete
 } from "../controllers/User.js";

 import { 
   getPenyuluh,
   getPenyuluhAll,
   PenyuluhCreate,
   getPenyuluhDetail,
   PenyuluhDelete
} from "../controllers/Penyuluh.js";

import { 
   getPenggilingan,
   getPenggilinganAll,
   PenggilinganCreate,
   getPenggilinganDetail,
   PenggilinganDelete
} from "../controllers/Penggilingan.js";

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

//Wilayah
router.get('/api/kabkotas', getKabkotas);
router.get('/api/kabkotas/by', getKabKotasByProv);
router.get('/api/kecamatan', getKecamatan);
router.get('/api/kelurahan', getKelurahan);

//users crud
router.get('/api/users', getUsers);
router.get('/api/users/all', getUsersAll);
router.post('/api/user/add', UserCreate);
router.post('/api/user/detail', getUsersDetail);
router.post('/api/user/edit', UserUpdate);
router.post('/api/user/delete', UserDelete);

//penyuluh crud
router.get('/api/penyuluh', getPenyuluh);
router.get('/api/penyuluh/all', getPenyuluhAll);
router.post('/api/penyuluh/add', PenyuluhCreate);
router.post('/api/penyuluh/detail', getPenyuluhDetail);
router.post('/api/penyuluh/edit', getUsersDetail);
router.post('/api/penyuluh/delete', PenyuluhDelete);

//penyuluh crud
router.get('/api/penggilingan', getPenggilingan);
router.get('/api/penggilingan/all', getPenggilinganAll);
router.post('/api/penggilingan/add', PenggilinganCreate);
router.post('/api/penggilingan/detail', getPenggilinganDetail);
router.post('/api/penggilingan/edit', getUsersDetail);
router.post('/api/penggilingan/delete', PenggilinganDelete);



export default router;