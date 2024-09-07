import { notFoundError } from "../../Controllers/mainController.js";
import { databaseQueryError } from "../../Services/error/errorDataBase.js";
import { userAlreadyActivatedError } from "../../Services/error/errorService.js";
import { getPool } from "../../database/getPool.js";

export const findByRegistrationCodeModel = async (registration_code) => {
  try {
    const pool = getPool();

    const [user] = await pool.query(
      `SELECT ID_user From Users WHERE registrationCode = ?`,
      [registration_code]
    );

    // si encuentra el usuario
    if (user.lemgth === 0) {
      notFoundError("user");
    }

    // Si existe el usuario, comprobamos si este activo
    if (user[0].active) {
      userAlreadyActivatedError();
    }

    return user[0];
  } catch (error) {
    databaseQueryError(
      error.message || "Error al obtener el codigo de registro del usuario"
    );
  }
};
