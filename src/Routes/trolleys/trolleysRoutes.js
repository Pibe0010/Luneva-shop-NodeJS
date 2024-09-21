import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import {
  deleteAllTrolleyController,
  deleteTrolleyController,
  getTrolleyProductListController,
  newTrolleyController,
  updateTrolleyController,
  updateTrolleyStatusController,
} from "../../Controllers/actionController.js";

// Creamos el router
export const trolleysRouter = express.Router();

// Crear carrito
trolleysRouter.post("/trolley", auththenticatedUser, newTrolleyController);

// Actualizar carrito
trolleysRouter.put(
  "/trolley/update",
  auththenticatedUser,
  updateTrolleyController
);

// Borrar carrito
trolleysRouter.delete(
  "/trolley/delete/:ID_product",
  auththenticatedUser,
  deleteTrolleyController
);

// Lista del carrito del cliente
trolleysRouter.get(
  "/trolley/products/list",
  auththenticatedUser,
  getTrolleyProductListController
);

// Cambiar estado del carrito
trolleysRouter.put(
  "/trolley/update/status/:ID_product",
  auththenticatedUser,
  updateTrolleyStatusController
);

// Borrar el carrito completo
trolleysRouter.delete(
  "/delete/trolley",
  auththenticatedUser,
  deleteAllTrolleyController
);
