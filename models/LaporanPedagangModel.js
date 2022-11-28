// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/Database.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const LaporanPedagangs = db.define('sis_laporan', {
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
  bulan: {
    type: DataTypes.INTEGER
  },
  minggu: {
    type: DataTypes.INTEGER
  },
  kategori_laporan: {
    type: DataTypes.INTEGER
  },
  data_dari: {
    type: DataTypes.INTEGER
  },
  total_produksi: {
    type: DataTypes.INTEGER
  },
  stok: {
    type: DataTypes.INTEGER
  },
  stok_curve: {
    type: DataTypes.INTEGER
  },
  harga_jual: {
    type: DataTypes.STRING
  },
  harga_beli: {
    type: DataTypes.STRING
  },
  berasal_dari: {
    type: DataTypes.INTEGER
  },
  dijual_ke: {
    type: DataTypes.INTEGER
  },
  kabkota_id: {
    type: DataTypes.INTEGER
  },
  komoditas: {
    type: DataTypes.INTEGER
  },
  createdby: {
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
export default LaporanPedagangs;