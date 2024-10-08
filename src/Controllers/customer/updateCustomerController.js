import { updateCustomerSchema } from "../../Services/customer/updateCustomerSchema.js";
import { updateCustomerService } from "../../Services/customer/updateCustomerService.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateCustomerController = async (req, res, next) => {
  try {
    // Valido el body
    await validateSchemaUtil(updateCustomerSchema, req.body);

    // Obtengo el usuario
    const ID_user = req.user.ID_user;

    // Actualizo el cliente
    const customer = await updateCustomerService(ID_user, req.body);

    res
      .status(200)
      .send({ status: "ok", message: "Cliente actualizado", data: customer });
  } catch (error) {
    handleErrorService(
      error,
      next,
      "UPDATE_CUSTOMER_CONTROLLER_ERROR",
      "Error en el controlador al modificar un cliente"
    );
  }
};
