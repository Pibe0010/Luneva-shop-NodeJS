import { updateCustomerSchema } from "../../Services/customer/updateCustomerSchema.js";
import { updateCustomerService } from "../../Services/customer/updateCustomerService.js";
import { validateSchemaUtil } from "../../Utils/validateSchemaUtil.js";

export const updateCustomerController = async (req, res, next) => {
  try {
    // Valido el body
    await validateSchemaUtil(updateCustomerSchema, req.body);

    // Obtengo el id
    const ID_user = req.user.ID_user;

    // Actualizo el cliente
    const customer = await updateCustomerService(ID_user, req.body);

    res
      .status(201)
      .send({ status: "ok", message: "Cliente actualizado", data: customer });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
