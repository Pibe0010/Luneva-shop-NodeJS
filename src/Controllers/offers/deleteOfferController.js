import { deleteOfferService } from "../../Services/offers/deleteOfferService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const deleteOfferController = async (req, res, next) => {
  try {
    // Obtenemos el id de la oferta
    const ID_offer = req.params.id_offer;

    // Eliminamos la oferta
    const offer = await deleteOfferService(ID_offer);

    res.status(201).send({
      status: "ok",
      data: offer,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "DELETE_CUSTOMER_CONTROLLER_ERROR",
      "Error en el controlador al eliminar una oferta"
    );
  }
};
