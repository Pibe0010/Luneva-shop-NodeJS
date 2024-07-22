import { getPool } from "../../database/getPool.js";
import { deleteOfferModel } from "../../Models/offers/deleteOfferModel.js";
import { notFoundError } from "../error/errorService.js";

export const deleteOfferService = async (ID_offer) => {
  const pool = await getPool();

  // Obtengo la oferta
  const offer = await pool.query(`SELECT * FROM offers WHERE ID_offer = ?`, [
    ID_offer,
  ]);

  // Compruebo si la oferta existe
  if (!offer) {
    notFoundError("offer");
  }

  // Elimino la oferta
  const response = await deleteOfferModel(ID_offer);

  return response;
};
