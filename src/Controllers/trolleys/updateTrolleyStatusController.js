import { updateStatusTrolleySchema } from "../../Schemas/trolleys/updateStatusTrolleySchema.js";
import { updateTrolleyStatusService } from "../../Services/trolleys/updateTrolleyStatusService.js";
import { handleErrorController } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateTrolleyStatusController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateStatusTrolleySchema, req.body);

    // Obtenemos el usuraio
    const ID_user = req.user.ID_user;

    // Actualizamos el estado del carrito
    const trolley = await updateTrolleyStatusService(ID_user, req.body);

    res.status().send({
      status: "ok",
      message: "Estado del carrito actualizado",
      data: trolley,
    });
  } catch (error) {
    handleErrorController(
      error,
      next,
      "UPDATE_STATUS_TROLLEY_CONTROLLER_ERROR",
      "Error en el controlador al modificar el estado del carrito"
    );
  }
};
