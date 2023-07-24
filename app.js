import dotenv from "dotenv";
import express from "express";
import {generateToken, validateToken} from "./middleware/jwt.js"
import storageCampus from "./routers/campus.js";

dotenv.config();
const appExpress = express();
appExpress.use(express.json());

appExpress.get("/token", generateToken, (req,res)=>{
    res.send({token: req.token})
})
appExpress.use("/campus", validateToken, storageCampus)

let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config,()=>console.log(`http://${config.hostname}:${config.port}`));