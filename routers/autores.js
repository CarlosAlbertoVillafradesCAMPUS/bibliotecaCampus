import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from 'express';

dotenv.config();
const storageAutores = Router();

let con = undefined;
storageAutores.use((req,res,next)=>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next()
})

storageAutores.get("/", (req,res)=>{
    con.query(
        /*sql*/ `SELECT autor.id_autor, autor.nombre, autor.apellido, autor.nacionalidad FROM autor`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

export default storageAutores;