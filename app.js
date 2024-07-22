import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { PORT } from "./env.js";
import {
  handlerErorr,
  notFoundError,
} from "./src/Controllers/mainController.js";
import { userRouter } from "./src/Routes/user/userRoutes.js";
import { productRouter } from "./src/Routes/product/productRoutes.js";
import { customerRouter } from "./src/Routes/customer/customerRoutes.js";
import { trolleysRouter } from "./src/Routes/trolleys/trolleysRoutes.js";
import { offersRouter } from "./src/Routes/offers/offersRoutes.js";

// crear la app con express
const app = express();

// Midelwares globales
app.use(express.json());
app.use(fileUpload());
app.use(morgan("dev"));
app.use(cors());

// Rutas
app.use(userRouter);
app.use(productRouter);
app.use(customerRouter);
app.use(trolleysRouter);
app.use(offersRouter);

// Midleware 404 not found
app.use(notFoundError);

// Midleware de gestion de errores
app.use(handlerErorr);

//Ponemos el servidor en escucha
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
