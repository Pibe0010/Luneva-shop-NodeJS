import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { newTrolleyController } from "../../Controllers/actionController.js";

// Creamos el router
export const trolleysRouter = express.Router();

// Crear carrito
trolleysRouter.post("/trolley", auththenticatedUser, newTrolleyController);

/* // Actualizar carrito
trolleysRouter.put(
  "/trolley/:id_user/:id_trolley",
  auththenticatedUser,
  updateTrolleyController
);

// Borrar carrito
trolleysRouter.delete(
  "/trolley/:id_user/:id_trolley",
  auththenticatedUser,
  deleteTrolleyController
);

// Lista del carrito
trolleysRouter.get(
  "/trolley/:id_user",
  auththenticatedUser,
  getTrolleyController
);
 */
