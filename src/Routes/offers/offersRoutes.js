import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import {
  deleteOfferController,
  getOffersListController,
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
  "/offers/update/:id_product",
  auththenticatedUser,
  adminAuthMiddleware,
  updateOfferController
);

// Eliminar oferta
offersRouter.delete(
  "/offers/delete/:id_offer",
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
  "/offers/toggleActivation/:id_offer",
  auththenticatedUser,
  adminAuthMiddleware,
  toggleOfferActivationController
);
