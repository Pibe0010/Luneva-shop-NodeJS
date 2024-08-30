import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { updateCustomerModel } from "../../Models/customer/updateCustomerModel.js";
import { updateCustomerPhoneModel } from "../../Models/customer/updateCustomerPhoneModel.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { notFoundError } from "../error/errorService.js";

export const updateCustomerService = async (ID_user, body) => {
  try {
    const { user_name, last_name, email, phone } = body;

    // Comprobamos si el customer existe
    const customerExist = await selectCustomerByIdModel(ID_user);

    // Si existe comprobamos que es el mismo cliente
    if (customerExist && customerExist.ID_user !== ID_user) {
      notFoundError("customer");
    }

    // Actualizamos el cliente
    if (
      user_name !== undefined ||
      last_name !== undefined ||
      email !== undefined
    ) {
      const response = await updateCustomerModel(
        ID_user,
        user_name,
        last_name,
        email
      );

      return response;
    }

    if (phone !== undefined) {
      const response = await updateCustomerPhoneModel(ID_user, phone);

      return response;
    }

    // Obtenemos el cliente actualizado
    const customer = await selectCustomerByIdModel(ID_user);

    return customer;
  } catch (error) {
    handleErrorService(
      error,
      "UPDATE_CUSTOMER_SERVICE_ERROR",
      "Error al actulizar el cliente desde el servicio"
    );
  }
};
