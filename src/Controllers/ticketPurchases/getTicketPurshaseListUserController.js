import { getTicketPurshaseListUserService } from "../../Services/ticketPurchases/getTicketPurshaseListUserService.js";
import { handleErrorController } from "../../Utils/handleError.js";

export const getTicketPurshaseListUserController = async (req, res, next) => {
  try {
    // Obtengo el usuario
    const ID_user = req.user.ID_user;

    // Obtengo la lista de tickets
    const ticketList = await getTicketPurshaseListUserService(ID_user);

    res.status(200).send({
      status: "ok",
      message: "Lista de tickets",
      data: ticketList,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "GET_TICKET_PURCHASE_LIST_USER_CONTROLLER_ERROR",
      "Error en el controlador al obtener la lista de tickets de compra del usuario"
    );
  }
};
