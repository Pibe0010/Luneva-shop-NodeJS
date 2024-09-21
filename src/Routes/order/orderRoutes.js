import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import {
  deleteOrderController,
  getOrderListController,
  getOrderSearchController,
  newOrderController,
  updateOrderController,
  updateOrderStatusController,
} from "../../Controllers/actionController.js";

// Creamos el router
export const orderRouter = express.Router();

// Lista de ordenes
orderRouter.get(
  "/order/list",
  auththenticatedUser,
  adminAuthMiddleware,
  getOrderListController
);

// Buscar ordenes
orderRouter.get(
  "/order/search",
  auththenticatedUser,
  adminAuthMiddleware,
  getOrderSearchController
);

// Creaer orden
orderRouter.post("/order/create", auththenticatedUser, newOrderController);

// Actualizar orden
orderRouter.put("/order/update", auththenticatedUser, updateOrderController);

// Eliminar orden
orderRouter.delete(
  "/order/delete/:ID_order",
  auththenticatedUser,
  adminAuthMiddleware,
  deleteOrderController
);

// Cambiar el estado de la orden
orderRouter.put(
  "/order/updateStatus/:ID_order",
  auththenticatedUser,
  updateOrderStatusController
);
