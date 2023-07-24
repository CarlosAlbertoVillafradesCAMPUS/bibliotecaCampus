import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from 'express';

dotenv.config();
const storageUsuarios = Router();

let con = undefined;
storageUsuarios.use((req,res,next)=>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next()
})

storageUsuarios.get("/", (req,res)=>{
    con.query(
        /*sql*/ `SELECT usuario.* FROM usuario`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

export default storageUsuarios;