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

export default storageCampus;