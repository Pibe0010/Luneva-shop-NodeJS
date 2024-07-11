import { controlStockProductService } from "../../Services/product/controlStockProductService.js";
import { getPool } from "../../database/getPool.js";

export const updateStockProductModel = async (productId, amount) => {
  const pool = await getPool();

  // Actualizo el stock del producto
  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };
  // Obtengo el stock de base de datos
  const stock = await controlStockProductService(productId);

  // Convierto la info ha numeros
  const numberStock = Number(stock.stock);
  const number = Number(amount);

  const namberModify = (storage, number) => {
    return storage - number;
  };

  // Le resto la cantidad vendida
  const update = namberModify(numberStock, number);

  addToUpdate(`stock`, update);

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE Products SET ${fieldsToUpdate.join(", ")} WHERE ID_product = ?`;
  values.push(productId);

  const [updateStock] = await pool.query(query, values);

  // Si no se ha insertado ningún producto, lanzar un error.
  if (updateStock.affectedRows === 0) {
    const error = new Error("No se ha podido actualizar el producto");
    error.httpStatus = 500;
    error.code = "INSERT_PRODUCT_ERROR";
    throw error;
  }
};
