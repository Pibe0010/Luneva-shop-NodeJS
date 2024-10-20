import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { insertProductModel } from "../../Models/product/insertProductModel.js";
import { selectNameExistModel } from "../../Models/product/selectNameExistModel.js";
import { selectProductByIdModel } from "../../Models/product/selectProductByIdModel.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";
import { handleErrorService } from "../../Utils/handleError.js";
import { invalidCredentials } from "../error/errorService.js";

export const insertProductService = async (body) => {
  try {
    const { name, description, price, stock, category, active } = body;

    // Compruebo si ya existe un producto con ese nombre
    const productName = await selectNameExistModel(name);
    console.log(productName);

    if (productName !== null) {
      invalidCredentials("El nombre del producto ya existe");
    }

    const ID_product = crypto.randomUUID();

    // Obtengo la referencia maxima de los productos
    const maxRef = await getMaxReference5Digits("products", "ref_PR");

    // Genero la referencia
    const ref = generateReference5DigitsFromRef("PR", maxRef);

    // Inserto el producto en la BD
    await insertProductModel(
      ID_product,
      ref,
      name,
      description,
      price,
      stock,
      category,
      active
    );

    // devolvemos el producto insertado
    const product = await selectProductByIdModel(ID_product);

    return product;
  } catch (error) {
    handleErrorService(
      error,
      "NEW_PRODUCT_SERVICE_ERROR",
      "Error al insertar el producto desde el servicio"
    );
  }
};
