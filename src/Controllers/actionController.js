// Carrito
import { newTrolleyController } from "./trolleys/newTrolleyController.js";
import { updateTrolleyController } from "./trolleys/updateTrolleyController.js";
import { deleteTrolleyController } from "./trolleys/deleteTrolleyController.js";
import { getTrolleyProductListController } from "./trolleys/getTrolleyProductListController.js";
import { updateTrolleyStatusController } from "./trolleys/updateTrolleyStatusController.js";
import { deleteAllTrolleyController } from "./trolleys/deleteAllTrolleyController.js";

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
import { updateOrderStatusController } from "./order/updateOrderStatusController.js";

// Dirección de envio
import { newShippingAddressController } from "./shippingAddresses/newShippingAddressController.js";
import { updateShippingAddressController } from "./shippingAddresses/updateShippingAddressController.js";
import { deleteShippingAddressController } from "./shippingAddresses/deleteShippingAddressController.js";
import { getListShippingAddressController } from "./shippingAddresses/getListShippingAddressController.js";
import { selectShippingAdrressController } from "./shippingAddresses/selectShippingAdrressController.js";
import { getSearchShippingAddressController } from "./shippingAddresses/getSearchShippingAddressController.js";

// Envios
import { getListShipmentController } from "./shipments/getListShipmentController.js";
import { getShipmentController } from "./shipments/getShipmentController.js";
import { newShipmentController } from "./shipments/newShipmentController.js";
import { updateShipmentController } from "./shipments/updateShipmentController.js";
import { deleteShipmentController } from "./shipments/deleteShipmentController.js";
import { getShipmentSearchController } from "./shipments/getShipmentSearchController.js";

// Tikets de compra
import { newTicketPurchaseController } from "./ticketPurchases/newTicketPurchaseController.js";
import { deleteTicketPurchaseController } from "./ticketPurchases/deleteTicketPurchaseController.js";
import { getTicketPurshaseListController } from "./ticketPurchases/getTicketPurshaseListController.js";
import { getticketPurchaseSearchController } from "./ticketPurchases/getticketPurchaseSearchController.js";

// Pagos
import { newPaymentController } from "./payments/newPaymentController.js";
import { getPaymentListController } from "./payments/getPaymentListController.js";
import { getPaymentSearchController } from "./payments/getPaymentSearchController.js";
import { updatePaymentController } from "./payments/updatePaymentController.js";
import { deletePaymentController } from "./payments/deletePaymentController.js";
import { cancelPaymentController } from "./payments/cancelPaymentController.js";

export {
  newTrolleyController,
  updateTrolleyController,
  deleteTrolleyController,
  getTrolleyProductListController,
  updateTrolleyStatusController,
  deleteAllTrolleyController,
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
  updateOrderStatusController,
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
  getShipmentSearchController,
  getSearchShippingAddressController,
  newTicketPurchaseController,
  deleteTicketPurchaseController,
  getTicketPurshaseListController,
  getticketPurchaseSearchController,
  newPaymentController,
  getPaymentListController,
  getPaymentSearchController,
  updatePaymentController,
  deletePaymentController,
  cancelPaymentController,
};
