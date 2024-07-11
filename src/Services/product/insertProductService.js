import { getMaxReference5Digits } from "../../Models/getMaxRef.js";
import { insertProductModel } from "../../Models/product/insertProductModel.js";
import { generateReference5DigitsFromRef } from "../../Utils/generateReferenceDigits.js";

export const insertProductService = async (
  name,
  description,
  price,
  stock,
  category,
  active
) => {
  try {
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
  } catch (error) {
    error.statusCode = 500;
    error.code = "Error al insertar el producto";
    throw error;
  }
};
