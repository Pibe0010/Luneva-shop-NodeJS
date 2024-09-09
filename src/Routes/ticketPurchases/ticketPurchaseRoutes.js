import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import {
  deleteTicketPurchaseController,
  getticketPurchaseSearchController,
  getTicketPurshaseListController,
  newTicketPurchaseController,
} from "../../Controllers/actionController.js";

// Creamos el router
export const ticketPurchaseRouter = express.Router();

// Crear ticket
ticketPurchaseRouter.post(
  "/ticket/create",
  auththenticatedUser,
  newTicketPurchaseController
);

// Eliminar ticket
ticketPurchaseRouter.delete(
  "/Ticket/delete/:ID_ticket",
  auththenticatedUser,
  adminAuthMiddleware,
  deleteTicketPurchaseController
);

// Lista de tickets
ticketPurchaseRouter.get(
  "/ticket/list",
  auththenticatedUser,
  adminAuthMiddleware,
  getTicketPurshaseListController
);

// Buscar ticket
ticketPurchaseRouter.get(
  "/ticket/search",
  auththenticatedUser,
  adminAuthMiddleware,
  getticketPurchaseSearchController
);
