import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { inserOrderAndDiscountModel } from "../../Models/order/inserOrderAndDiscountModel.js";
import { inserOrderModel } from "../../Models/order/inserOrderModel.js";
import { selectProductOfferByIdModel } from "../../Models/order/selectProductOfferByIdModel.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { limitedStockError } from "../error/errorService.js";
import { controlStockProductService } from "../product/controlStockProductService.js";

export const insertOrderService = async (
  ID_user,
  orderId,
  ID_product,
  products_amount
) => {
  try {
    // Obtengo el cliente por ID
    const customer = await selectCustomerByIdModel(ID_user);

    const maxRef = await getMaxReference5Digits("Orders", "ref_OR");
    const ref = generateReference5DigitsFromRef("OR", maxRef);

    // Verifica el stock del producto
    const stockInfo = await controlStockProductService(ID_product);
    const { stock, price } = stockInfo;

    if (stock < products_amount) {
      limitedStockError(products_amount);
    }

    // Verifica si el producto tiene descuento
    const offer = await selectProductOfferByIdModel(ID_product);
    if (offer && offer.active) {
      const discount = offer.discount_rate;
      const totalPrice = price * products_amount;
      const discountedPrice = (price - discount) * products_amount;

      // Inserta la nueva orden con descuento
      await inserOrderAndDiscountModel(
        orderId,
        ref,
        customer.ID_customer,
        ID_product,
        products_amount,
        totalPrice,
        discountedPrice
      );
    } else {
      // Inserta la nueva orden sin descuento
      const totalPrice = price * products_amount;
      await inserOrderModel(
        orderId,
        ref,
        customer.ID_customer,
        ID_product,
        products_amount,
        totalPrice
      );
    }
  } catch (error) {
    handleErrorService(
      error,
      "NEW_ORDER_SERVICE_ERROR",
      "Error al insertar  la orden desde el servicio"
    );
  }
};
