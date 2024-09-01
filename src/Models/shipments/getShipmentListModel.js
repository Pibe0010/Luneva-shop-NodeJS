import { getPool } from "../../database/getPool.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";

export const getShipmentListModel = async () => {
  try {
    const pool = getPool();

    const result = await pool.query(
      `SELECT 
    Shipments.ID_shipment,
    Shipments.ref_SH,
    Shipments.status,
    Shipments.shipping_date,
    Shipments.createdAt,
    Shipments.updatedAt,
    Orders.ref_OR,
    Orders.product_amount,
    Orders.price,
    Orders.status,
    Products.ref_PR,
    Products.name,
    Shipping_addresses.address,
    Shipping_addresses.street_number,
    Shipping_addresses.floor,
    Shipping_addresses.ladder_door,
    Shipping_addresses.city,
    Shipping_addresses.postal_code,
    Shipping_addresses.country,
    Users.user_name,
    Users.last_name,
    Users.email
  FROM 
    Shipments
  LEFT JOIN 
    Orders ON Shipments.ID_order = Orders.ID_order
  LEFT JOIN 
    Products ON Orders.ID_product = Products.ID_product
  LEFT JOIN 
    Shipping_addresses ON Shipments.ID_shipping_address = Shipping_addresses.ID_address
  LEFT JOIN 
    Users ON Shipping_addresses.ID_customer = Users.ID_user`
    );

    return result[0];
  } catch (error) {
    databaseQueryError(error.message || "Error al obtener la lista de envios");
  }
};
