import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const updateProductModel = async (
  ID_product,
  name,
  description,
  price,
  stock,
  category,
  active
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

    addToUpdate("name", name);
    addToUpdate("description", description);
    addToUpdate("price", price);
    addToUpdate("stock", stock);
    addToUpdate("category", category);
    addToUpdate("active", active);

    if (fieldsToUpdate.length === 0) return {};

    const query = `UPDATE Products SET ${fieldsToUpdate.join(", ")} WHERE ID_product = ?`;
    values.push(ID_product);

    const [result] = await pool.query(query, values);

    // Si no se actualizo el producto lanzamos un error
    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido actualizar el producto");
    }

    // Devolver el resultado.
    return result;
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al actualizar el producto"
    );
  }
};
