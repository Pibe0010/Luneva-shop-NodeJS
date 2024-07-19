import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import {
  deleteTrolleyController,
  getTrolleyProductListController,
  newTrolleyController,
  updateTrolleyController,
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
  "/trolley/delete",
  auththenticatedUser,
  deleteTrolleyController
);

// Lista del carrito del cliente
trolleysRouter.get(
  "/trolley/products/list",
  auththenticatedUser,
  getTrolleyProductListController
);
