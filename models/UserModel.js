// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/Database.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const Users = db.define('sis_users', {
  // Define attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isUnique: (value, next) => {
        Users.findAll({
          where: { email: value },
          attributes: ['id'],
        })
          .then((user) => {
            if (user.length != 0)
              next(new Error('Email sudah digunakan!'));
            next();
          })
          .catch((onError) => console.log(onError));
      },
    },
  },
  nama_lengkap: {
    type: DataTypes.STRING
  },
  role_id: {
    type: DataTypes.DOUBLE
  },
  kabkota_id: {
    type: DataTypes.INTEGER,
  },
  is_active: {
    type: DataTypes.INTEGER
  },
  password: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING
  },
  kategori_enumerator: {
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
export default Users;