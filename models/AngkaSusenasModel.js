// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/Database.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const SusenasAngka = db.define('sis_angkasusenas_komoditas', {
  // Define attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  tahun: {
    type: DataTypes.INTEGER
  },
  triwulan: {
    type: DataTypes.INTEGER
  },
  angka: {
    type: DataTypes.FLOAT
  },
  komoditas_id: {
    type: DataTypes.INTEGER
  },
  kabkota_id: {
    type: DataTypes.INTEGER
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
export default SusenasAngka;