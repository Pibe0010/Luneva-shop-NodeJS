import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { newShipmentController } from "../../Controllers/shipments/newShipmentController.js";

// Creamos el router
export const shipmentRouter = express.Router();

/* // Crear envio
shipmentRouter.post("/shipment", auththenticatedUser, newShipmentController); */

// Actualizar envio

// Eliminar envio

// Lista de envios

// Buscar envio
