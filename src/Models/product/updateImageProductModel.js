import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const updateImageProductModel = async (
  ID_product,
  imgNameOne,
  imgNameTwo,
  imgNameThree
) => {
  try {
    const pool = await getPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
      if (value !== undefined && value !== null) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
      }
    };

    addToUpdate("image_one", imgNameOne);
    addToUpdate("image_two", imgNameTwo);
    addToUpdate("image_tree", imgNameThree);

    if (fieldsToUpdate.length === 0) return {};

    const query = `UPDATE Products SET ${fieldsToUpdate.join(", ")} WHERE ID_product = ?`;
    values.push(ID_product);

    const [result] = await pool.query(query, values);

    // Si no se actualizo el producto lanzamos un error
    if (result.affectedRows === 0) {
      databaseQueryError("No se ha podido actualizar el producto");
    }

    // Devolver el resultado.
    return result;
  } catch (error) {
    databaseQueryError(
      error.message || "Error en el modelo al insertar la fotos del producto"
    );
  }
};
