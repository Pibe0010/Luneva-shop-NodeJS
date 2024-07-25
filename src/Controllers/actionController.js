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

// Ordenes
import { getOrderListController } from "./order/getOrderListController.js";
import { getOrderSearchController } from "./order/getOrderSearchController.js";

// Dirección de envio
import { newShippingAddressController } from "./shippingAddresses/newShippingAddressController.js";
import { updateShippingAddressController } from "./shippingAddresses/updateShippingAddressController.js";
import { deleteShippingAddressController } from "./shippingAddresses/deleteShippingAddressController.js";
import { getListShippingAddressController } from "./shippingAddresses/getListShippingAddressController.js";
import { selectShippingAdrressController } from "./shippingAddresses/selectShippingAdrressController.js";

// Envios
import { newShipmentController } from "./shipments/newShipmentController.js";

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
  getOrderListController,
  getOrderSearchController,
  newShippingAddressController,
  updateShippingAddressController,
  deleteShippingAddressController,
  getListShippingAddressController,
  selectShippingAdrressController,
  newShipmentController,
};
