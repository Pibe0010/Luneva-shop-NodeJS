import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import {
  deleteOfferController,
  getOfferSearchController,
  getOffersListController,
  getUnsignedProductsController,
  newOfferController,
  toggleOfferActivationController,
  updateOfferController,
} from "../../Controllers/actionController.js";

// Creamos el router
export const offersRouter = express.Router();

// Crear Oferta
offersRouter.post(
  "/offers/register",
  auththenticatedUser,
  adminAuthMiddleware,
  newOfferController
);

// Actualizar oferta
offersRouter.put(
  "/offers/update/:ID_offer",
  auththenticatedUser,
  adminAuthMiddleware,
  updateOfferController
);

// Eliminar oferta
offersRouter.delete(
  "/offers/delete/:ID_offer",
  auththenticatedUser,
  adminAuthMiddleware,
  deleteOfferController
);

// Lista de Ofertas
offersRouter.get(
  "/offers/list",
  auththenticatedUser,
  auththenticatedUser,
  getOffersListController
);

// Activar o desactivar oferta
offersRouter.put(
  "/offers/toggleActivation/:ID_offer",
  auththenticatedUser,
  adminAuthMiddleware,
  toggleOfferActivationController
);

// Buscar ofertas
offersRouter.get(
  "/offer/search",
  auththenticatedUser,
  adminAuthMiddleware,
  getOfferSearchController
);

// Lista de productos para ofertas
offersRouter.get(
  "/offer/unsigned-products",
  auththenticatedUser,
  adminAuthMiddleware,
  getUnsignedProductsController
);
