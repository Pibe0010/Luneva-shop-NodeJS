// Carrito
import { newTrolleyController } from "./trolleys/newTrolleyController.js";
import { updateTrolleyController } from "./trolleys/updateTrolleyController.js";
import { deleteTrolleyController } from "./trolleys/deleteTrolleyController.js";
import { getTrolleyProductListController } from "./trolleys/getTrolleyProductListController.js";

// Ofertas
import { newOfferController } from "./offers/newOfferController.js";
import { updateOfferController } from "./offers/updateOfferController.js";
import { deleteOfferController } from "./offers/deleteOfferController.js";
import { getOffersListController } from "./offers/getOffersListController.js";
import { toggleOfferActivationController } from "./offers/toggleOfferActivationController.js";

// ordenes
import { newOrderController } from "./order/newOrderController.js";

export {
  newTrolleyController,
  updateTrolleyController,
  deleteTrolleyController,
  getTrolleyProductListController,
  newOfferController,
  updateOfferController,
  deleteOfferController,
  getOffersListController,
  toggleOfferActivationController,
  newOrderController,
};
