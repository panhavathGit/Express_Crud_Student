import { response } from "express";
import pool from "../database/db_connection.js"

export const createStudent = (request,response)=>{
    const { name , gender , major , generation } = request.body;
    if (!name || !gender || !major || !generation){
        return response.json({
            message: "invalid input"
        })
    }else{
        const sql = 'INSERT INTO student (Name,Gender,Major,Generation) values (?,?,?,?)';

        pool.query(sql,[ name,gender,major,generation ],(error, result) => {
            if (error) {
                console.error("Error inserting student:",error);
                return response.status(500).json({
                    message: "An error occurred while creating the student"
                });
            }

            return response.status(201).json({
                message: "Student created successfully",
                data: {
                    studentId: result.insertId,
                    studentName : name

                }
            })
        })
        
    }
}

export const getStudentById = (request,response)=>{
    const id = request.params.id;
    const sql = "Select * from student where id = ?";

    pool.query(sql,[id],(error,result)=>{
        if(error){
            return response.status(500).json({
                message : "an error occured"
            })
        }
        
        if(result.length == 0){
            return response.status(404).json({
                message : "student not found"
            })
        }

        return response.status(200).json({
            message : "Student found",
            data : result[0]
        })
    });
}
export const updateStudent = (request,response)=>{
    const { name,gender,major,generation } = request.body;
    const id = request.params.id;
    const sql = "Update student set Name = ?, Gender = ? ,Major = ?, Generation = ?  where id = ?";
    pool.query(sql,[name,gender,major,generation,id],(error,result)=>{
        if(error){
            console.log(error);
            return response.status(500).json({
                message : "an error occured"
            });
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({
                message: "Student not found"
            });
        }

        return response.status(200).json({
            message : "student updated successfully",
            data : {
                name,
                gender,
                major,
                generation
            }
        })
    })
}

export const deleteStudent = (request,response) =>{
    



}