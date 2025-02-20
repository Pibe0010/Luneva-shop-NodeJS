import express from "express";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import {
  deleteProductController,
  getProductSearchController,
  newProductController,
  productListController,
  toggleActivationController,
  updateProductController,
} from "../../Controllers/mainController.js";
import { productExist } from "../../Middlewares/productExist.js";

export const productRouter = express.Router();

// Buscar productos por nombre
productRouter.get("/product/search", getProductSearchController);

// Crear productos
productRouter.post(
  "/product/register",
  auththenticatedUser,
  adminAuthMiddleware,
  newProductController
);

// Lista de productos
productRouter.get("/product/list", productListController);

// Acttualiar producto
productRouter.put(
  "/product/update/:ID_product",
  auththenticatedUser,
  adminAuthMiddleware,
  productExist,
  updateProductController
);

// Eliminar producto
productRouter.delete(
  "/product/delete/:ID_product",
  auththenticatedUser,
  adminAuthMiddleware,
  productExist,
  deleteProductController
);

// Activar o desactivar producto
productRouter.put(
  "/product/toggleActivation/:ID_product",
  auththenticatedUser,
  adminAuthMiddleware,
  productExist,
  toggleActivationController
);
