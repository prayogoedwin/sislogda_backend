// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/Database.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const Logs = db.define('sis_logs', {
  // Define attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  ip: {
    type: DataTypes.STRING
  },
  createdby: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    name: 'createdAt',
    field: 'createdat'
  },updatedAt: {
    type: DataTypes.DATE,
    name: 'updatedAt',
    field: 'updatedat'
  }
  
},{
  // Freeze Table Name
  freezeTableName: true
});
 
// Export model Product
export default Logs;