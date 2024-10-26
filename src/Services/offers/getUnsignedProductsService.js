import { getUnsignedProductsModel } from "../../Models/offers/getUnsignedProductsModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const getUnsignedProductsService = async () => {
  try {
    const response = await getUnsignedProductsModel();

    return response;
  } catch (error) {
    handleErrorService(
      error,
      "GET_UNSIGBED_PRODUCT_LIST_SERVICE_ERROR",
      "Error al obtener la lista de productos asignada desde el servicio"
    );
  }
};
