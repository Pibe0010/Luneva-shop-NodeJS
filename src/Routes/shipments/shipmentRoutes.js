import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import {
  getListShipmentController,
  getShipmentController,
  newShipmentController,
  updateShipmentController,
} from "../../Controllers/actionController.js";

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
shipmentRouter.get(
  "/shipment/:ID_shipment",
  auththenticatedUser,
  adminAuthMiddleware,
  getShipmentController
);

// Crear envio
shipmentRouter.post(
  "/shipment/create",
  auththenticatedUser,
  newShipmentController
);

// Actulizar envio
shipmentRouter.put(
  "/shipment/update/:ID_shipment",
  auththenticatedUser,
  updateShipmentController
);

/*// Eliminar envio
shipmentRouter.delete(
  "/shipment/delete/:shipment",
  auththenticatedUser,
  deleteShipmentController
);
*/
