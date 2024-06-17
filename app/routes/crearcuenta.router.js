import { Router } from "express";
import { crearCuenta, 
        eliminarCuenta, 
        listarCuenta, 
        modificarCuenta, 
        mostrarCuenta } from "../controllers/controllers.crearcuenta";
import { verifyToken } from "../middleware/oauth";


const rutaCuenta = Router();

rutaCuenta.get("/cuenta/:id", mostrarCuenta);
rutaCuenta.get("/cuenta", listarCuenta);
rutaCuenta.post("/cuenta", verifyToken, crearCuenta);
rutaCuenta.put("/cuenta", verifyToken, modificarCuenta);
rutaCuenta.delete("/cuenta", verifyToken, eliminarCuenta);




export default rutaCuenta;