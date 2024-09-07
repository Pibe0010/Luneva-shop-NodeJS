import { selectCustomerByIdModel } from "../../Models/customer/selectCustomerByIdModel.js";
import { getListShippingAddressModel } from "../../Models/shippingAddresses/getListShippingAddressModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getListShippingAddressService = async (ID_user) => {
  try {
    // Buscamos el cliente en la BD
    const customer = await selectCustomerByIdModel(ID_user);

    // Obtenemos la lista de direcciones de envios
    const addressList = await getListShippingAddressModel(customer.ID_customer);

    return addressList;
  } catch (error) {
    handleErrorService(
      error,
      "GET_SHIPMENT_ADDRESS_LIST_SERVICE_ERROR",
      "Error al obtener la lista de direcciónes de envios desde el servicio"
    );
  }
};
