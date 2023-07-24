import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from 'express';

dotenv.config();
const storageEstadoLibro = Router();

let con = undefined;
storageEstadoLibro.use((req,res,next)=>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next()
})

storageEstadoLibro.get("/", (req,res)=>{
    con.query(
        /*sql*/ `SELECT estado_libro.* FROM estado_libro`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

export default storageEstadoLibro;