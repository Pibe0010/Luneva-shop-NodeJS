import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import {
  deleteCustomerController,
  getCustomerListController,
  getCustomerSearchController,
  updateCustomerController,
} from "../../Controllers/mainController.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";

// Creamos el router
export const customerRouter = express.Router();

// Buscar clientes
customerRouter.get(
  "/customer/search",
  auththenticatedUser,
  adminAuthMiddleware,
  getCustomerSearchController
);

// Lista de clientes
customerRouter.get(
  "/customer/list",
  auththenticatedUser,
  adminAuthMiddleware,
  getCustomerListController
);

// Modificar cliente
customerRouter.put(
  "/customer/update",
  auththenticatedUser,
  updateCustomerController
);

// Eliminar cliente
customerRouter.delete(
  "/customer/delete/:ID_customer",
  auththenticatedUser,
  adminAuthMiddleware,
  deleteCustomerController
);
