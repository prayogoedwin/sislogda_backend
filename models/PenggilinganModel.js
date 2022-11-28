// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/Database.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const Penggilingans = db.define('sis_penggilingan', {
  // Define attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  nama: {
    type: DataTypes.STRING
  },
  kabkota_id: {
    type: DataTypes.INTEGER
  },
  kecamatan_id: {
    type: DataTypes.INTEGER
  },
  kelurahan_id: {
    type: DataTypes.INTEGER
  },
  alamat: {
    type: DataTypes.STRING
  },
  kapasitas: {
    type: DataTypes.INTEGER
  },
  lokasi: {
    type: DataTypes.INTEGER
  },
  lat: {
    type: DataTypes.STRING
  },
  lng: {
    type: DataTypes.STRING
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
export default Penggilingans;