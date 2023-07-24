import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from 'express';

dotenv.config();
const storagePrestamos = Router();

let con = undefined;
storagePrestamos.use((req,res,next)=>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next()
})

storagePrestamos.get("/", (req,res)=>{
    con.query(
        /*sql*/ `SELECT prestamo.*, usuario.nombre AS "nombre_usuario", libro.titulo AS "libro_prestado" FROM prestamo INNER JOIN usuario ON prestamo.id_usuario = usuario.id_usuario INNER JOIN libro ON prestamo.id_libro = libro.id_libro`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

storagePrestamos.get("/usuario/:nombre", (req,res)=>{
    con.query(
        /*sql*/ `SELECT libro.id_libro, libro.titulo, usuario.id_usuario, usuario.nombre, usuario.apellido, prestamo.id_prestamo, prestamo.fecha_prestamo FROM libro INNER JOIN prestamo ON libro.id_libro = prestamo.id_libro INNER JOIN usuario ON prestamo.id_usuario = usuario.id_usuario WHERE usuario.nombre = ?`,req.params.nombre,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})
export default storagePrestamos;