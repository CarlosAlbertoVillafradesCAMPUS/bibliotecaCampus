import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from 'express';

dotenv.config();
const storageCampus = Router();

let con = undefined;
storageCampus.use((req,res,next)=>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next()
})

storageCampus.get("/autores", (req,res)=>{
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

storageCampus.get("/categorias", (req,res)=>{
    con.query(
        /*sql*/ `SELECT categoria.* FROM categoria`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

storageCampus.get("/editoriales", (req,res)=>{
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

storageCampus.get("/estadoLibro", (req,res)=>{
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

storageCampus.get("/libros", (req,res)=>{
    con.query(
        /*sql*/ `SELECT libro.id_libro, libro.titulo, autor.id_autor, autor.nombre, editorial.id_editorial, editorial.nombre FROM libro INNER JOIN autor ON libro.id_autor = autor.id_autor INNER JOIN editorial ON libro.id_estado = editorial.id_editorial`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

storageCampus.get("/prestamos", (req,res)=>{
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

storageCampus.get("/reservas", (req,res)=>{
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

storageCampus.get("/librosDisponibles", (req,res)=>{
    con.query(
        /*sql*/ `SELECT libro.*, estado_libro.nombre AS "estado_libro_nombre" FROM libro INNER JOIN estado_libro ON libro.id_estado = estado_libro.id_estado WHERE estado_libro.id_estado = 1`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

export default storageCampus;