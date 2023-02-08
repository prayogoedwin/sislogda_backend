// Import express
import express from "express";
// Import cors
import cors from "cors";
// Import connection
import db from "./config/Database.js";
// Import router
import Router from "./routes/index.js";

 
// Init express
const app = express();
// use express json
app.use(express.json());
// use cors
app.use(cors());

// Testing database connection 
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
 
// use router
app.use(Router);
// listen on port
app.listen(3000, () => console.log('Server running at http://localhost:3000'));


// // Import express
// import express from "express";
// // Import cors
// import cors from "cors";
// // Import connection
// import db from "./config/Database.js";
// // Import router
// import Router from "./routes/index.js";
 
// // Init express
// const app = express();
// // use express json
// app.use(express.json());
// // use cors
// app.use(cors());

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// // Testing database connection 
// try {
//     await db.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }
 
// // use router
// app.use(Router);
// // listen on port
// app.listen(7788, () => console.log('Server running at http://127.0.0.1:7788'));