import { Router } from "express"
import pool from "../database/db_connection.js"
import { createStudent, getStudentById, updateStudent, deleteStudent} from "../controller/student_controller.js";

const studentRouter = Router();

studentRouter.get('/',(request,response)=>{
    return response.json({
        message : 'welcome'
    })  
})

studentRouter.post('/createStudent', createStudent);
studentRouter.get('/getStudentById/:id',getStudentById);
studentRouter.post('/updateStudent/:id',updateStudent);
studentRouter.delete('/deleteStudent/:id',deleteStudent);
    

export default studentRouter;
