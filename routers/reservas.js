import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from 'express';

dotenv.config();
const storageReservas = Router();

let con = undefined;
storageReservas.use((req,res,next)=>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next()
})

storageReservas.get("/", (req,res)=>{
    con.query(
        /*sql*/ `SELECT reserva.*, usuario.nombre AS "nombre_usuario", libro.titulo AS "libro_reservado" FROM reserva INNER JOIN usuario ON reserva.id_usuario = usuario.id_usuario INNER JOIN libro ON reserva.id_libro = libro.id_libro`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})
export default storageReservas;