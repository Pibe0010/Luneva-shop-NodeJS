import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const insertPaymentModel = async (
  ID_payment,
  ref,
  payment_method,
  ID_order,
  total_amount,
  iva
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

    addToUpdate("ID_payment", ID_payment);
    addToUpdate("ref_PM", ref);
    addToUpdate("ID_order", ID_order);
    addToUpdate("payment_method", payment_method);
    addToUpdate("total_amount", total_amount);
    addToUpdate("iva_payments", iva);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

    // Adaptar e query a los valores dados
    const fieldsString = fieldsToUpdate.join(", ");
    const query = `INSERT INTO Payments SET ${fieldsString}`;

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      databaseQueryError("No se ha podido insertar el pago");
    }
  } catch (error) {
    databaseQueryError("Error en el modelo al insertar el pago");
  }
};
