import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from 'express';

dotenv.config();
const storageLibros = Router();

let con = undefined;
storageLibros.use((req,res,next)=>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next()
})

storageLibros.get("/", (req,res)=>{
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

storageLibros.get("/disponibles", (req,res)=>{
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

storageLibros.get("/prestados", (req,res)=>{
    con.query(
        /*sql*/ `SELECT prestamo.id_prestamo, libro.id_libro, libro.titulo, prestamo.fecha_devolucion FROM libro INNER JOIN prestamo ON libro.id_libro = prestamo.id_libro;`,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

//?nombre = "" con ese querya podemos listar los libros de un autor especifico

storageLibros.get("/autor/:nombre", (req,res)=>{
    con.query(
        /*sql*/ `SELECT libro.id_libro, libro.titulo, autor.id_autor, autor.nombre FROM libro INNER JOIN autor ON libro.id_autor = autor.id_autor WHERE autor.nombre = ?`, req.params.nombre,
        (err,data)=>{
            if (err) {
               res.status(401).send("Error en la solicitud") 
            }else{
                res.send(data)
            }
        }
    )
})

export default storageLibros;