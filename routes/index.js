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
    getUsers
 } from "../controllers/User.js";

 import {getKabkotas} from "../controllers/Kabkota.js"
 import {getKecamatan} from "../controllers/Kecamatan.js"
 
 // Init express router
const router = express.Router();

// Route get semua users
// router.get('/users', getUsers);

router.post('/api/login', loginUser);
router.get('/api/roles', getRoles);
router.get('/api/users', getUsers);


router.get('/api/kabkotas', getKabkotas);
router.post('/api/kecamatan', getKecamatan);

export default router;