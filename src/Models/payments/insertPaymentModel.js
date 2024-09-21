import { getPool } from "../../database/getPool.js";
import { databaseInsertError } from "../../Services/error/errorDataBase.js";

export const insertPaymentModel = async (
  ID_payment,
  ref,
  ID_order,
  payment_method,
  total_amount,
  iva,
  shipment_cost
) => {
  try {
    const pool = await getPool();

    const result = await pool.query(
      `INSERT INTO Payments  (ID_payment, ref_PM, ID_order, payment_method, total_amount, iva_payments, shipment_cost) VALUES (?,?,?,?,?,?,?)`,
      [
        ID_payment,
        ref,
        ID_order,
        payment_method,
        total_amount,
        iva,
        shipment_cost,
      ]
    );

    if (result.affectedRows === 0) {
      databaseInsertError("No se ha podido crear el pago");
    }
  } catch (error) {
    databaseInsertError(
      error.message || "Error en el modelo al insertar el pago del cliente"
    );
  }
};
