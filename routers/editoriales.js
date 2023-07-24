import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from 'express';

dotenv.config();
const storageEditoriales = Router();

let con = undefined;
storageEditoriales.use((req,res,next)=>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next()
})

storageEditoriales.get("/", (req,res)=>{
    con.query(
        /*sql*/ `SELECT editorial.* FROM editorial`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

export default storageEditoriales;