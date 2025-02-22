import { FRONTEND_HOST } from "../../../env.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const newPaymentCheckoutService = async (stripe, body) => {
  try {
    const {
      shippingCost,
      discountOffer,
      discountCupon,
      taxIva,
      amount,
      products,
    } = body;

    // Convertir la lista de productos en line_items
    const line_items = products.map((product) => ({
      price_data: {
        currency: "EUR",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    // Agregar costos extra como productos adicionales
    if (shippingCost > 0) {
      line_items.push({
        price_data: {
          currency: "EUR",
          product_data: {
            name: "Costo de Envío",
          },
          unit_amount: shippingCost,
        },
        quantity: 1,
      });
    }

    if (taxIva > 0) {
      line_items.push({
        price_data: {
          currency: "EUR",
          product_data: {
            name: "IVA",
          },
          unit_amount: taxIva,
        },
        quantity: 1,
      });
    }

    // Si hay descuentos, podemos restarlos en metadata
    const metadata = {
      discountCoupon: discountCupon / 100,
      discountOffer: discountOffer / 100,
      finalAmount: amount / 100,
    };

    // Crear la sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${FRONTEND_HOST}/success`,
      cancel_url: `${FRONTEND_HOST}/cancel`,
      metadata: metadata,
    });

    return session;
  } catch (error) {
    console.error("Error en Stripe PaymentIntent:", error);
    handleErrorService(
      error,
      "CHECKOUT_PAYMENT_SERVICE_ERROR",
      "Error en el servicio al verificar el pago"
    );
  }
};
