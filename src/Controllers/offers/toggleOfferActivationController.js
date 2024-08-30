import { toggleOfferActivationService } from "../../Services/offers/toggleOfferActivationService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const toggleOfferActivationController = async (req, res, next) => {
  try {
    // Obtenemos el id de la oferta
    const ID_offer = req.params.id_offer;

    const { active } = req.body;

    // Desactivamos la oferta
    const offer = await toggleOfferActivationService(ID_offer, active);

    let isActive;
    let message;
    if (offer.active === "true") {
      isActive = true;
      message = "La oferta está activada.";
    } else {
      isActive = false;
      message = "La oferta está desactivada.";
    }

    res
      .status(201)
      .send({ status: "ok", isActive: isActive, message: message });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "TOGGLE_ESTATUS_CONTROLLER_ERROR",
      "Error en el controlador al cambiar el estado de una oferta"
    );
  }
};
