import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { FRONTEND_HOST, PORT } from "./env.js";
import {
  handlerErorr,
  notFoundError,
} from "./src/Controllers/mainController.js";
import { userRouter } from "./src/Routes/user/userRoutes.js";
import { productRouter } from "./src/Routes/product/productRoutes.js";
import { customerRouter } from "./src/Routes/customer/customerRoutes.js";
import { trolleysRouter } from "./src/Routes/trolleys/trolleysRoutes.js";
import { offersRouter } from "./src/Routes/offers/offersRoutes.js";
import { orderRouter } from "./src/Routes/order/orderRoutes.js";
import { shippingAddressRouter } from "./src/Routes/shippingAddresses/shippingAddressRountes.js";
import { shipmentRouter } from "./src/Routes/shipments/shipmentRoutes.js";
import { ticketPurchaseRouter } from "./src/Routes/ticketPurchases/ticketPurchaseRoutes.js";
import { paymentRouter } from "./src/Routes/payments/paymentRoutes.js";

// crear la app con express
const app = express();

// Midelwares globales
app.use(express.json());
app.use(fileUpload());
app.use(morgan("dev"));
app.use(
  cors({
    origin: FRONTEND_HOST,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Middleware Recursos Estaticos
app.use("/uploads", express.static("./uploads"));

// Rutas
app.use(userRouter);
app.use(productRouter);
app.use(customerRouter);
app.use(trolleysRouter);
app.use(offersRouter);
app.use(orderRouter);
app.use(shippingAddressRouter);
app.use(shipmentRouter);
app.use(ticketPurchaseRouter);
app.use(paymentRouter);

// Midleware 404 not found
app.use(notFoundError);

// Midleware de gestion de errores
app.use(handlerErorr);

//Ponemos el servidor en escucha
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
