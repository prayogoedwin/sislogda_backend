// Import express
import express from "express";
import cors from "cors";
// Import Controller Product
import { 
    loginUser
 } from "../controllers/Auth.js";

 import { 
    getRoles
 } from "../controllers/Role.js";

 import { 
    getUsers,
    getUsersRole,
    getUsersAll,
    getUsersRoleAll,
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
   PenyuluhDelete,
   PenyuluhUpdate
} from "../controllers/Penyuluh.js";

import { 
   getPenggilingan,
   getPenggilinganAll,
   PenggilinganCreate,
   getPenggilinganDetail,
   PenggilinganDelete,
   PenggilinganUpdate
} from "../controllers/Penggilingan.js";

import { 
   getLumbung,
   getLumbungAll,
   LumbungCreate,
   getLumbungDetail,
   LumbungDelete,
   LumbungUpdate
} from "../controllers/Lumbung.js";

import { 
   getGudang,
   getGudangAll,
   GudangCreate,
   getGudangDetail,
   GudangDelete,
   GudangUpdate
} from "../controllers/Gudang.js";

import { 
   getDistributor,
   getDistributorAll,
   DistributorCreate,
   getDistributorDetail,
   DistributorDelete,
   DistributorUpdate
} from "../controllers/Distributor.js";

import { 
   getKoperasi,
   getKoperasiAll,
   KoperasiCreate,
   getKoperasiDetail,
   KoperasiDelete,
   KoperasiUpdate
} from "../controllers/Koperasi.js";

import {
   getKabkotas,
   getKabKotasByProv,
} from "../controllers/Kabkota.js"
 import {getKecamatan} from "../controllers/Kecamatan.js"
 import {getKelurahan} from "../controllers/Kelurahan.js"


 //for middleware
 import {LogCreate} from "../middleware/Log.js"


// import Logs from "../models/LogModel.js";
 
 // Init express router
const router = express.Router();
router.use(cors());

const doLogger = function async(req, res, next) {
   LogCreate()
   next()
}
  
          
      



router.use(doLogger);

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
router.get('/api/users/role', getUsersRole);
router.get('/api/users/all', getUsersAll);
router.get('/api/users/role_all', getUsersRoleAll);
router.post('/api/user/add', UserCreate);
router.post('/api/user/detail', getUsersDetail);
router.post('/api/user/edit', UserUpdate);
router.post('/api/user/delete', UserDelete);

//penyuluh crud
router.get('/api/penyuluh', getPenyuluh);
router.get('/api/penyuluh/all', getPenyuluhAll);
router.post('/api/penyuluh/add', PenyuluhCreate);
router.post('/api/penyuluh/detail', getPenyuluhDetail);
router.post('/api/penyuluh/edit', PenyuluhUpdate);
router.post('/api/penyuluh/delete', PenyuluhDelete);

//penggilingan crud
router.get('/api/penggilingan', getPenggilingan);
router.get('/api/penggilingan/all', getPenggilinganAll);
router.post('/api/penggilingan/add', PenggilinganCreate);
router.post('/api/penggilingan/detail', getPenggilinganDetail);
router.post('/api/penggilingan/edit', PenggilinganUpdate);
router.post('/api/penggilingan/delete', PenggilinganDelete);

//lumbung crud
router.get('/api/lumbung', getLumbung);
router.get('/api/lumbung/all', getLumbungAll);
router.post('/api/lumbung/add', LumbungCreate);
router.post('/api/lumbung/detail', getLumbungDetail);
router.post('/api/lumbung/edit', LumbungUpdate);
router.post('/api/lumbung/delete', LumbungDelete);

//gudang crud
router.get('/api/gudang', getGudang);
router.get('/api/gudang/all', getGudangAll);
router.post('/api/gudang/add', GudangCreate);
router.post('/api/gudang/detail', getGudangDetail);
router.post('/api/gudang/edit', GudangUpdate);
router.post('/api/gudang/delete', GudangDelete);


//distributor crud
router.get('/api/distributor', getDistributor);
router.get('/api/distributor/all', getDistributorAll);
router.post('/api/distributor/add', DistributorCreate);
router.post('/api/distributor/detail', getDistributorDetail);
router.post('/api/distributor/edit', DistributorUpdate);
router.post('/api/distributor/delete', DistributorDelete);


//koperasi crud
router.get('/api/koperasi', getKoperasi);
router.get('/api/koperasi/all', getKoperasiAll);
router.post('/api/koperasi/add', KoperasiCreate);
router.post('/api/koperasi/detail', getKoperasiDetail);
router.post('/api/koperasi/edit', KoperasiUpdate);
router.post('/api/koperasi/delete', KoperasiDelete);

export default router;