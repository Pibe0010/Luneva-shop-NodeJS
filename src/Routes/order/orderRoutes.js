import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import {
  getOrderListController,
  getOrderSearchController,
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
  getOrderListController,
  getOrderSearchController
);
