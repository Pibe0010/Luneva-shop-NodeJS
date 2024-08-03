import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import { getListShipmentController } from "../../Controllers/shipments/getListShipmentController.js";

// Creamos el router
export const shipmentRouter = express.Router();

// Lista de envios
shipmentRouter.get(
  "/shipment/list",
  auththenticatedUser,
  adminAuthMiddleware,
  getListShipmentController
);

// Buscar envio
