import { notFoundError } from "./error/notFoundError.js";
import { handlerErorr } from "./error/handlerError.js";

// User
import { newUserController } from "../Controllers/user/newUserController.js";
import { validateUserController } from "../Controllers/user/validateUserController.js";
import { getUserListController } from "../Controllers/user/getUserListController.js";
import { loginUserController } from "../Controllers/user/loginUserController.js";
import { logoutUserController } from "../Controllers/user/logoutUserController.js";
import { updateUserController } from "../Controllers/user/updateUserController.js";
import { deleteUserController } from "../Controllers/user/deleteUserController.js";
import { changePasswordController } from "../Controllers/user/changePasswordController.js";
import { forgetPasswordController } from "../Controllers/user/forgetPasswordController.js";
import { resetPasswordController } from "./user/resetPasswordController.js";
import { getProfileUserController } from "./user/getProfileUserController.js";

// Product
import { newProductController } from "../Controllers/product/newProductController.js";
import { productListController } from "../Controllers/product/productListController.js";
import { updateProductController } from "../Controllers/product/updateProductController.js";
import { deleteProductController } from "../Controllers/product/deleteProductController.js";
import { toggleActivationController } from "../Controllers/product/toggleActivationController.js";
import { getProductSearchController } from "../Models/product/getProductSearchController.js";

// customer
import { getCustomerListController } from "./customer/getCustomerListController.js";
import { getCustomerSearchController } from "./customer/getCustomerSearchController.js";
import { updateCustomerController } from "./customer/updateCustomerController.js";
import { deleteCustomerController } from "./customer/deleteCustomerController.js";

export {
  notFoundError,
  handlerErorr,
  newUserController,
  validateUserController,
  getUserListController,
  loginUserController,
  logoutUserController,
  updateUserController,
  deleteUserController,
  changePasswordController,
  forgetPasswordController,
  resetPasswordController,
  getProfileUserController,
  newProductController,
  productListController,
  updateProductController,
  deleteProductController,
  toggleActivationController,
  getProductSearchController,
  getCustomerListController,
  getCustomerSearchController,
  updateCustomerController,
  deleteCustomerController,
};
