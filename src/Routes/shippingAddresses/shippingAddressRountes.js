import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import {
  deleteShippingAddressController,
  getListShippingAddressController,
  getSearchShippingAddressController,
  newShippingAddressController,
  selectShippingAdrressController,
  updateShippingAddressController,
} from "../../Controllers/actionController.js";

// Creamos el router
export const shippingAddressRouter = express.Router();

// Crear direccion de envio
shippingAddressRouter.post(
  "/address",
  auththenticatedUser,
  newShippingAddressController
);

// Actualizar direcion de envio
shippingAddressRouter.put(
  "/address/update/:ID_address",
  auththenticatedUser,
  updateShippingAddressController
);

// Eliminar direccion de envio
shippingAddressRouter.delete(
  "/address/delete/:ID_address",
  auththenticatedUser,
  deleteShippingAddressController
);

// Lista de direciónes de envios del cliente
shippingAddressRouter.get(
  "/address/list",
  auththenticatedUser,
  getListShippingAddressController
);

// Seleccionar dirección de envio
shippingAddressRouter.get(
  "/address/selected",
  auththenticatedUser,
  selectShippingAdrressController
);

// Buscar direcciones de envio
shippingAddressRouter.get(
  "/address/search",
  auththenticatedUser,
  getSearchShippingAddressController
);
