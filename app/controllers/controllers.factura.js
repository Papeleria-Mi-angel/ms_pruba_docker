/**
 * Este es el controlador de factura
 * @module crt-factura
 */

import pool from "../config/mysql.db";
import { success, error } from "../messages/browser";
import { config } from "dotenv";
config();



/**
 * Muestra una factura específica basada en el ID proporcionado.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const mostrarFactura = async (req, res)  => {
    const id = req.params['id'];
    try {
        const [respuesta] = await pool.query(`CALL SP_MOSTRAR_FACTURA("${id}");`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


/**
 * Lista todas las facturas disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const listarFactura = async (req, res)  => {
    try {
        const [respuesta] = await pool.query(`CALL SP_LISTAR_FACTURA();`);
        success(req, res, 200, respuesta[0]);
    } catch (err) {
        error(req, res, 500, err);
    }
};


/**
 * Crea una nueva factura con los datos proporcionados en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idUsuario - ID del usuario.
 * @param {string} req.body.idProducto - ID del producto.
 * @param {string} req.body.idMetodoPago - ID del método de pago.
 * @param {number} req.body.cantidad - Cantidad de productos.
 * @param {string} req.body.fecha - Fecha de la factura.
 */
const crearFactura = async (req, res) => {
    const {idUsuario, idProducto, idMetodoPago, cantidad, fecha} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_CREAR_FACTURA("${idUsuario}", "${idProducto}", "${idMetodoPago}", "${cantidad}", "${fecha}");`);
        if (respuesta[0].affectedRows >= 1) {
            success(req, res, 201, "Factura Creada.");
        } else {
            error(req, res, 401, "No se creo la factura, Intentalo mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};


/**
 * Elimina una factura específica basada en el ID proporcionado en el cuerpo de la solicitud.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} req.body.idFactura - ID de la factura a eliminar.
 */
const eliminarFactura = async (req, res) => {
    const {idFactura} = req.body;
    try {
        const respuesta = await pool.query(`CALL SP_ELIMINAR_FACTURA("${idFactura}");`);
        if (respuesta[0].affectedRows == 1) {
            success(req, res, 201, "Factura eliminada.");
        } else {
            error(req, res, 400, "No se elimino la factura, Intentalo mas tarde.");
        }
    } catch (err) {
        error(req, res, 400, err);
    }
};

export { listarFactura, mostrarFactura, crearFactura, eliminarFactura };