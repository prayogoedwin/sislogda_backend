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
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING
  },
  role_id: {
    type: DataTypes.DOUBLE
  },
  password: {
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