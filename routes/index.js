// Import express
import express from "express";
import cors from "cors";
// Import Controller Product
import { 
    loginUser,
    cekToken,
 } from "../controllers/Auth.js";

 import { 
    getRoles
 } from "../controllers/Role.js";

 import { 
   getProfilDetail,
   profilUpdatePassword,
} from "../controllers/Profil.js";

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
   getPenggilinganCount,
   PenggilinganDelete,
   PenggilinganUpdate
} from "../controllers/Penggilingan.js";

import { 
   getLumbung,
   getLumbungAll,
   LumbungCreate,
   getLumbungDetail,
   getLumbungCount,
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
   getPedagang,
   getPedagangCount,
   getPedagangAll,
   PedagangCreate,
   getPedagangDetail,
   PedagangDelete,
   PedagangUpdate
} from "../controllers/Pedagang.js";

import { 
   getProdusen,
   getProdusenCount,
   getProdusenAll,
   ProdusenCreate,
   getProdusenDetail,
   ProdusenDelete,
   ProdusenUpdate
} from "../controllers/Produsen.js";

import { 
   getKoperasi,
   getKoperasiAll,
   KoperasiCreate,
   getKoperasiDetail,
   KoperasiDelete,
   KoperasiUpdate
} from "../controllers/Koperasi.js";

import { 
   getLaporanPedagang,
   LaporanPedagangCreate
} from "../controllers/LaporanPedagang.js";

import { 
   getLaporanProdusen,
   LaporanProdusenCreate
} from "../controllers/LaporanProdusen.js";

import { 
   getLaporanPenggilingan,
   LaporanPenggilinganCreate
} from "../controllers/LaporanPenggilingan.js";

import { 
   getLaporanLumbung,
   LaporanLumbungCreate
} from "../controllers/LaporanLumbung.js";


import { 
   getPerforma
} from "../controllers/PerformaPedagang.js";

import { 
   getKondisiProduksi,
   createKondisiProduksi,
   createBulkKondisiProduksi,
   detailKondisiProduksi,
   editKondisiProduksi,

   getKondisiLuas,
   createKondisiLuas,
   createBulkKondisiLuas,

   getKondisiCpp,
   createKondisiCpp,
   createBulkKondisiCpp,
   detailKondisiCpp,
   editKondisiCpp,

   getKondisiKebutuhan,
   createKondisiKebutuhan,
   createBulkKondisiKebutuhan,
   detailKondisiKebutuhan,
   editKondisiKebutuhan,
   detailKondisiLuas,
   editKondisiLuas,
   getKondisi
} from "../controllers/KondisiPangan.js";

import { 
   getAngka,
   createAngka,
   createBulkAngka,
   deleteAngka
} from "../controllers/AngkaSusenas.js";

import { 
   getAngkap,
   createAngkap,
   createBulkAngkap,
   deleteAngkap
} from "../controllers/Penduduk.js";

import {
   getKabkotas,
   getKabKotasByProv,
} from "../controllers/Kabkota.js"

 import {getKecamatan} from "../controllers/Kecamatan.js"
 import {getKelurahan} from "../controllers/Kelurahan.js"

 import {getKategoriEnum} from "../controllers/KategoriEnum.js"
 import {getKomoditas} from "../controllers/Komoditas.js"

 import {
   getProduksiKebutuhan,
   getKetersediaanKebutuhan,
   getDetailMaps,
   getDetailMapsJateng,
   getPenduduk,
   getDetailSusenas,
   getHargaAcuan,

   getProduksiKebutuhanExternal,
} from "../controllers/ChartFrontend.js"


 //for middleware
 import {LogCreate} from "../middleware/Log.js"

// import {Test} from "../controllers/HargaHarian.js"
import {
   ProdusenList,
   ProdusenListExternal,
   GrosirList,
   EceranList,
   EceranListExternal,
} from "../controllers/Harga.js"


// import Logs from "../models/LogModel.js";
 
 // Init express router
const router = express.Router();
router.use(cors());

// const doLogger = function async(req, res, next) {
//    LogCreate()
//    next()
// }
  
          
   

// router.use(doLogger);

// Route get semua users
// router.get('/users', getUsers);
router.post('/api/login', loginUser);
router.post('/api/verifikasihakakses', cekToken);
router.get('/api/roles', getRoles);

//Wilayah
router.get('/api/kabkotas', getKabkotas);
router.get('/api/kabkotas/by', getKabKotasByProv);
router.get('/api/kecamatan', getKecamatan);
router.get('/api/kelurahan', getKelurahan);

//kateegori
router.get('/api/kategorienum', getKategoriEnum);

//komoditas
router.get('/api/komoditas', getKomoditas);

//profil
router.post('/api/profil/ku', getProfilDetail);
router.post('/api/profil/gantipassword', profilUpdatePassword);


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
router.post('/api/penggilingan/count', getPenggilinganCount);
router.post('/api/penggilingan/edit', PenggilinganUpdate);
router.post('/api/penggilingan/delete', PenggilinganDelete);

//lumbung crud
router.get('/api/lumbung', getLumbung);
router.get('/api/lumbung/all', getLumbungAll);
router.post('/api/lumbung/add', LumbungCreate);
router.post('/api/lumbung/detail', getLumbungDetail);
router.post('/api/lumbung/count', getLumbungCount);
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

//pedagang crud
router.get('/api/pedagang', getPedagang);
router.get('/api/pedagang/all', getPedagangAll);
router.post('/api/pedagang/add', PedagangCreate);
router.post('/api/pedagang/detail', getPedagangDetail);
router.post('/api/pedagang/count', getPedagangCount);
router.post('/api/pedagang/edit', PedagangUpdate);
router.post('/api/pedagang/delete', PedagangDelete);


//produsen crud
router.get('/api/produsen', getProdusen);
router.get('/api/produsen/all', getProdusenAll);
router.post('/api/produsen/add', ProdusenCreate);
router.post('/api/produsen/detail', getProdusenDetail);
router.post('/api/produsen/count', getProdusenCount);
router.post('/api/produsen/edit', ProdusenUpdate);
router.post('/api/produsen/delete', ProdusenDelete);


//koperasi crud
router.get('/api/koperasi', getKoperasi);
router.get('/api/koperasi/all', getKoperasiAll);
router.post('/api/koperasi/add', KoperasiCreate);
router.post('/api/koperasi/detail', getKoperasiDetail);
router.post('/api/koperasi/edit', KoperasiUpdate);
router.post('/api/koperasi/delete', KoperasiDelete);

//laporan pedagang crud
router.get('/api/laporanpedagang', getLaporanPedagang);
router.post('/api/laporanpedagang/add', LaporanPedagangCreate);

//laporan produsen crud
router.get('/api/laporanprodusen', getLaporanProdusen);
router.post('/api/laporanprodusen/add', LaporanProdusenCreate);

//laporan penggilingan crud
router.get('/api/laporanpenggilingan', getLaporanPenggilingan);
router.post('/api/laporanpenggilingan/add', LaporanPenggilinganCreate);

//laporan lumbung crud
router.get('/api/laporanlumbung', getLaporanLumbung);
router.post('/api/laporanlumbung/add', LaporanLumbungCreate);

//performa pedagang crud
router.get('/api/performapedagang', getPerforma);

//kondisi pangan produksi crud
router.get('/api/kondisiproduksi', getKondisiProduksi);
router.post('/api/kondisiproduksi/add', createKondisiProduksi);
router.post('/api/kondisiproduksi/add_bulk', createBulkKondisiProduksi);
router.get('/api/kondisiproduksi/detail', detailKondisiProduksi);
router.post('/api/kondisiproduksi/edit', editKondisiProduksi);

//kondisi pangan Luas crud
router.get('/api/kondisiluas', getKondisiLuas);
router.post('/api/kondisiluas/add', createKondisiLuas);
router.post('/api/kondisiluas/add_bulk', createBulkKondisiLuas);
router.get('/api/kondisiluas/detail', detailKondisiLuas);
router.post('/api/kondisiluas/edit', editKondisiLuas);

//kondisi pangan CPP crud
router.get('/api/kondisicpp', getKondisiCpp);
router.post('/api/kondisicpp/add', createKondisiCpp);
router.post('/api/kondisicpp/add_bulk', createBulkKondisiCpp);
router.get('/api/kondisicpp/detail', detailKondisiCpp);
router.post('/api/kondisicpp/edit', editKondisiCpp);

//kondisi pangan kebutuhan crud
router.get('/api/kondisikebutuhan', getKondisiKebutuhan);
router.post('/api/kondisikebutuhan/add', createKondisiKebutuhan);
router.post('/api/kondisikebutuhan/add_bulk', createBulkKondisiKebutuhan);
router.get('/api/kondisikebutuhan/detail', detailKondisiKebutuhan);
router.post('/api/kondisikebutuhan/edit', editKondisiKebutuhan);

// kondisi pangan dashboard
router.post('/api/kondisidashboard', getKondisi);

// kondisi pangan dashboard
router.get('/api/kondisiproduksikebutuhan', getProduksiKebutuhan);
router.get('/api/kondisiketersediaankebutuhan', getKetersediaanKebutuhan);
router.post('/api/mapsdetail', getDetailMaps);
router.post('/api/mapsdetailjateng', getDetailMapsJateng);
router.get('/api/jmlpenduduk', getPenduduk);
router.get('/api/susenas', getDetailSusenas);
router.post('/api/hargaacuan', getHargaAcuan);

// kondisi pangan dashboard external
router.get('/api/kondisiproduksikebutuhan_external', getProduksiKebutuhanExternal);





// router.get('/api/test', Test);
router.get('/api/produsenlist', ProdusenList);
router.get('/api/grosirlist', GrosirList);
router.get('/api/eceranlist', EceranList);

router.get('/api/produsenlistexternal', ProdusenListExternal);
router.get('/api/eceranlistexternal', EceranListExternal);

//angka susenas
router.get('/api/angkasusenas', getAngka);
router.post('/api/angkasusenas/add', createAngka);
router.post('/api/angkasusenas/add_bulk', createBulkAngka);
router.post('/api/angkasusenas/delete', deleteAngka);


//jumlah penduduk
router.get('/api/angkapenduduk', getAngkap);
router.post('/api/angkapenduduk/add', createAngkap);
router.post('/api/angkapenduduk/add_bulk', createBulkAngkap);
router.post('/api/angkapenduduk/delete', deleteAngkap);




export default router;