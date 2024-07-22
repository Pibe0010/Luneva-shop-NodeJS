import { deleteOfferService } from "../../Services/offers/deleteOfferService.js";

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
    console.error(error);
    next(error);
  }
};
