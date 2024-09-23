import express from "express"
import { config } from "dotenv"
import pool from "./src/database/db_connection.js"
import studentRouter from "./src/routes/student_route.js";

config();

const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); 

//datbase connection
pool.getConnection((error,connection)=>{
    if(error){
        console.log("Fail to connect to database");
    }else{
        console.log("Successfully connected to database");
    }
    connection.release();
})

//use route
app.use('/student',studentRouter);

app.listen(port,() => {
    console.log(`server is running on http://localhost:${port}`);
})