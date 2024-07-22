import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import { newOrderController } from "../../Controllers/actionController.js";

// Creamos el router
export const orderRouter = express.Router();

// Crear orden
orderRouter.post(
  "/order/register",
  auththenticatedUser,
  adminAuthMiddleware,
  newOrderController
);

// Actualizar orden

// Eliminar orden

// Lista de ordenes

// Buscar ordenes
