import { selectProductListModel } from "../../Models/product/selectProductListModel.js";
import { handleErrorService } from "../../Utils/handleError.js";

export const selectProductListService = async () => {
  try {
    const productList = await selectProductListModel();
    return productList;
  } catch (error) {
    handleErrorService(
      error,
      "GET_PRODUCTR_LIST_SERVICE_ERROR",
      "Error al obtener la lista de productos desde el servicio"
    );
  }
};
