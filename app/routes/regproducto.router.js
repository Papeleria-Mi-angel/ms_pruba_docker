import { Router } from "express";
import { crearRegproducto, 
        eliminarRegproducto, 
        listarRegproducto, 
        modificarRegproducto, 
        mostrarRegproducto } from "../controllers/controllers.regproducto";
import { verifyToken } from "../middleware/oauth";


const rutaRegproducto = Router();

rutaRegproducto.get("/regproducto/:id", mostrarRegproducto);
rutaRegproducto.get("/regproducto", listarRegproducto);
rutaRegproducto.post("/regproducto", verifyToken, crearRegproducto);
rutaRegproducto.put("/regproducto", verifyToken, modificarRegproducto);
rutaRegproducto.delete("/regproducto", verifyToken, eliminarRegproducto);



export default rutaRegproducto;