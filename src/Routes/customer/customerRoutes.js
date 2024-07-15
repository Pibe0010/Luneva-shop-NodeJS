import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import {
  deleteCustomerController,
  getCustomerListController,
  getCustomerSearchController,
  updateCustomerController,
} from "../../Controllers/mainController.js";

// Creamos el router
export const customerRouter = express.Router();

// Buscar clientes
customerRouter.get(
  "/customer/search",
  auththenticatedUser,
  getCustomerSearchController
);

// Lista de clientes
customerRouter.get(
  "/customer/list",
  auththenticatedUser,
  getCustomerListController
);

// modificar cliente
customerRouter.put(
  "/customer/update",
  auththenticatedUser,
  updateCustomerController
);

// eliminar cliente
customerRouter.delete(
  "/customer/delete",
  auththenticatedUser,
  deleteCustomerController
);
