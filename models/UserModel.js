// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/Database.js";
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const Users = db.define('sis_users', {
  // Define attributes
  email: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  role_id: {
    type: DataTypes.DOUBLE
  },
  password: {
    type: DataTypes.STRING
  }
},{
  // Freeze Table Name
  freezeTableName: true
});
 
// Export model Product
export default Users;