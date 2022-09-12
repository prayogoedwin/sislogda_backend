// Import express
import express from "express";
// Import Controller Product
import { 
    getUsers,
    loginUser,
 } from "../controllers/Auth.js";
 
 // Init express router
const router = express.Router();

// Route get semua product
router.get('/users', getUsers);

router.post('/api/login', loginUser);

export default router;