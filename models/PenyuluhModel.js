// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/Database.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const Peenyuluhs = db.define('sis_penyuluh', {
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
  nip: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.STRING
  },
  pangkat: {
    type: DataTypes.STRING
  },
  pendidikan: {
    type: DataTypes.STRING
  },
  golongan: {
    type: DataTypes.STRING
  },
  jabatan: {
    type: DataTypes.STRING
  },
  lokasi_tugas: {
    type: DataTypes.STRING
  },
  sub_sektor: {
    type: DataTypes.STRING
  },
  wilayah_binaan: {
    type: DataTypes.STRING
  },
  no_hp: {
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
export default Peenyuluhs;