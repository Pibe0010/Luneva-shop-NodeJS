import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import {
  newShippingAddressController,
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
  "/address/update",
  auththenticatedUser,
  updateShippingAddressController
);

// Eliminar direccion de envio

// Lista de direciónes de envios

// Buscar dirección de envio
