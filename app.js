import dotenv from "dotenv";
import express from "express";
import {generateToken, validateToken} from "./middleware/jwt.js"
import storageAutores from "./routers/autores.js";
import storageCategorias from "./routers/categorias.js";
import storageEditoriales from "./routers/editoriales.js";
import storageEstadoLibro from "./routers/estado_libro.js";
import storagePrestamos from "./routers/prestamos.js";
import storageReservas from "./routers/reservas.js";
import storageLibros from "./routers/libro.js";
import storageUsuarios from "./routers/usuarios.js";

dotenv.config();
const appExpress = express();
appExpress.use(express.json());

appExpress.get("/token", generateToken, (req,res)=>{
    res.send({token: req.token})
})
appExpress.use("/libros", validateToken, storageLibros)
appExpress.use("/autores", validateToken, storageAutores)
appExpress.use("/categorias", validateToken, storageCategorias)
appExpress.use("/editoriales", validateToken, storageEditoriales)
appExpress.use("/estadoLibro", validateToken, storageEstadoLibro)
appExpress.use("/prestamos", validateToken, storagePrestamos)
appExpress.use("/reservas", validateToken, storageReservas)
appExpress.use("/usuarios", validateToken, storageUsuarios)

let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config,()=>console.log(`http://${config.hostname}:${config.port}`));