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
import { newOrderController } from "./order/newOrderController.js";
import { updateOrderController } from "./order/updateOrderController.js";
import { deleteOrderController } from "./order/deleteOrderController.js";

// Dirección de envio
import { newShippingAddressController } from "./shippingAddresses/newShippingAddressController.js";
import { updateShippingAddressController } from "./shippingAddresses/updateShippingAddressController.js";
import { deleteShippingAddressController } from "./shippingAddresses/deleteShippingAddressController.js";
import { getListShippingAddressController } from "./shippingAddresses/getListShippingAddressController.js";
import { selectShippingAdrressController } from "./shippingAddresses/selectShippingAdrressController.js";

// Envios
import { getListShipmentController } from "./shipments/getListShipmentController.js";
import { getShipmentController } from "./shipments/getShipmentController.js";
import { newShipmentController } from "./shipments/newShipmentController.js";
import { updateShipmentController } from "./shipments/updateShipmentController.js";
import { deleteShipmentController } from "./shipments/deleteShipmentController.js";

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
  newOrderController,
  updateOrderController,
  deleteOrderController,
  newShippingAddressController,
  updateShippingAddressController,
  deleteShippingAddressController,
  getListShippingAddressController,
  selectShippingAdrressController,
  getListShipmentController,
  getShipmentController,
  newShipmentController,
  updateShipmentController,
  deleteShipmentController,
};
