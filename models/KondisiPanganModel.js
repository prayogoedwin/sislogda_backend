// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/Database.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const KondisiPangans = db.define('sis_kondisi_pangan', {
  // Define attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  jenis_laporan: {
    type: DataTypes.INTEGER
  },
  tahun: {
    type: DataTypes.INTEGER
  },
  bulan: {
    type: DataTypes.INTEGER
  },
  komoditas: {
    type: DataTypes.INTEGER
  },
  kabkota_id: {
    type: DataTypes.INTEGER
  },
  total_produksi: {
    type: DataTypes.INTEGER
  },
  luas_tanam: {
    type: DataTypes.INTEGER
  },
  luas_panen: {
    type: DataTypes.INTEGER
  },
  stok: {
    type: DataTypes.INTEGER
  },
  luas_puso: {
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
export default KondisiPangans;