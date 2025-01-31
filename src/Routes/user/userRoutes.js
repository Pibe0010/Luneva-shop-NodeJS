import express from "express";
import {
  changePasswordController,
  deleteUserController,
  forgetPasswordController,
  getProfileUserController,
  getUserListController,
  getUserSearchController,
  loginUserController,
  logoutUserController,
  newUserController,
  resetPasswordController,
  updateUserController,
  userSupportController,
  validateUserController,
} from "../../Controllers/mainController.js";
import { auththenticatedUser } from "../../Middlewares/auththenticatedUser.js";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware.js";

export const userRouter = express.Router();

// Lista de usuarios
userRouter.get(
  "/user/list",
  auththenticatedUser,
  adminAuthMiddleware,
  getUserListController
);

// Registro de usuario
userRouter.post("/user/register", newUserController);

// Activación de usuario
userRouter.put("/user/activate/:registration_code", validateUserController);

// Login
userRouter.post("/user/login", loginUserController);

// Cerrar de sesion
userRouter.post("/user/logout", auththenticatedUser, logoutUserController);

// Actualizar usuario
userRouter.put("/user/update", auththenticatedUser, updateUserController);

// Borrar ususario
userRouter.delete(
  "/user/delete/:ID_user",
  auththenticatedUser,
  adminAuthMiddleware,
  deleteUserController
);

// Cambio de contraseña
userRouter.put(
  "/user/changePassword",
  auththenticatedUser,
  changePasswordController
);

// solicitud recuperación de contraseña
userRouter.put("/user/forgot-password", forgetPasswordController);

// Cambio de recuperación de contraseña
userRouter.put(
  "/user/reset-password/:registration_code",
  resetPasswordController
);

// Obtener perfil de usuario
userRouter.get("/user/profile", auththenticatedUser, getProfileUserController);

// Buscar usuario
userRouter.get(
  "/user/search",
  auththenticatedUser,
  adminAuthMiddleware,
  getUserSearchController
);

// Eviar email de contacto de soporte
userRouter.post("/user/support", auththenticatedUser, userSupportController);
