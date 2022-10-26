// Import model Product
import Logs from "../models/LogModel.js";
import dotenv from "dotenv";
dotenv.config();


// Add Logs
export const LogCreate = async (req, res) => {
    var datetime = new Date();
         Logs.create(
         {
         ip: 1,
         createdby: 1,
         token: 1,
         });
}