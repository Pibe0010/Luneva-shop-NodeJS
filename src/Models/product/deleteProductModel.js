import { getPool } from "../../database/getPool.js";
import { databaseDeleteError } from "../../Services/error/errorDataBase.js";

export const deleteProductModel = async (ID_product) => {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `DELETE FROM Products WHERE ID_product = ?`,
      [ID_product]
    );

    if (result.affectedRows === 0) {
      databaseDeleteError("No se ha podido eliminar el producto.");
    }

    return { message: "Producto eliminado correctamente" };
  } catch (error) {
    databaseDeleteError(
      error.message || "Error en el modelo al eliminiar un producto",
      "Error en el modelo al eliminiar un producto"
    );
  }
};
