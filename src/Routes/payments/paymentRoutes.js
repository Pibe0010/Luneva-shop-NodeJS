import express from "express";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";
import {
  cancelPaymentController,
  deletePaymentController,
  getPaymentListController,
  getPaymentListUserController,
  getPaymentSearchController,
  newPaymentCheckoutController,
  newPaymentController,
  updatePaymentController,
  updatePaymentStatusController,
} from "../../Controllers/actionController.js";

// Creamos el router
export const paymentRouter = express.Router();

// Crear pago
paymentRouter.post(
  "/payment/register",
  auththenticatedUser,
  newPaymentController
);

// Lista de pagos
paymentRouter.get(
  "/payment/list",
  auththenticatedUser,
  adminAuthMiddleware,
  getPaymentListController
);

// Lista de pagos de usuario
paymentRouter.get(
  "/payment/list/user",
  auththenticatedUser,
  getPaymentListUserController
);

// Buscar pago
paymentRouter.get(
  "/payment/search",
  auththenticatedUser,
  adminAuthMiddleware,
  getPaymentSearchController
);

// Actualizar pago
paymentRouter.put(
  "/payment/update/:ID_payment",
  auththenticatedUser,
  updatePaymentController
);

// Borrar pago
paymentRouter.delete(
  "/payment/delete/:ID_payment",
  auththenticatedUser,
  adminAuthMiddleware,
  deletePaymentController
);

// Cancelar pago
paymentRouter.put(
  "/payment/cancel/:ID_payment",
  auththenticatedUser,
  cancelPaymentController
);

// Actualizar estado de pago
paymentRouter.put(
  "/payment/update/status/:ID_payment",
  auththenticatedUser,
  adminAuthMiddleware,
  updatePaymentStatusController
);

// Checkout pago
paymentRouter.post(
  "/api/checkout",
  auththenticatedUser,
  newPaymentCheckoutController
);
