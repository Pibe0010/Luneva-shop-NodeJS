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
productRouter.get(
  "/product/search",
  auththenticatedUser,
  getProductSearchController
);

// Crear productos
productRouter.post(
  "/product/register",
  auththenticatedUser,
  adminAuthMiddleware,
  newProductController
);

// Lista de productos
productRouter.get("/product/list", auththenticatedUser, productListController);

// Acttualiar producto
productRouter.put(
  "/product/update/:product_id",
  auththenticatedUser,
  adminAuthMiddleware,
  productExist,
  updateProductController
);

// Eliminar producto
productRouter.delete(
  "/product/delete/:product_id",
  auththenticatedUser,
  adminAuthMiddleware,
  productExist,
  deleteProductController
);

// Activar o desactivar producto
productRouter.put(
  "/product/toggleActivation/:id_product",
  auththenticatedUser,
  adminAuthMiddleware,
  productExist,
  toggleActivationController
);
