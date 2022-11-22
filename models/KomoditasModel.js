// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/Database.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const Komoditass = db.define('sis_komoditas', {
  // Define attributes
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.DOUBLE
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        name: 'createdAt',
        field: 'createdat'
    },
    updatedAt: {
        type: DataTypes.DATE,
        name: 'updatedAt',
        field: 'updatedat'
    },
    deletedAt: {
        type: DataTypes.DATE,
        name: 'deletedAt',
        field: 'deletedat'
    }
},{
  // Freeze Table Name
  freezeTableName: true
});
 
// Export model Product
export default Komoditass;