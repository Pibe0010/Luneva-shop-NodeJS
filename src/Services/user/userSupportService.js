import nodemailer from "nodemailer";
import { handleErrorService } from "../../Utils/handleError.js";
import { selectUserByIdModel } from "../../Models/user/selectUserByIdModel.js";
import { notFoundError } from "../error/errorService.js";
import {
  MAIL_TRAP_AUTH_PASS,
  MAIL_TRAP_AUTH_USER,
  MAIL_TRAP_HOST,
  MAIL_TRAP_PORT,
} from "../../../env.js";

export const userSupportService = async (ID_user, body) => {
  try {
    // comprobamos que el usuario existe
    const userExist = await selectUserByIdModel(ID_user);
    console.log(userExist);

    if (!userExist) {
      notFoundError("usuario");
    }

    const { user_name, last_name, email, message } = body;

    const transporter = nodemailer.createTransport({
      host: MAIL_TRAP_HOST,
      port: MAIL_TRAP_PORT,
      secure: false,
      auth: {
        user: MAIL_TRAP_AUTH_USER,
        pass: MAIL_TRAP_AUTH_PASS,
      },
    });

    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER, // email de quien envia el msj
      to: email, // El correo al que se enviará el mensaje
      subject: `Mensaje de ${user_name} ${last_name} desde la web`,
      html: `
             <p>Nombre: ${user_name}</p>
            <p>Email:  ${email}</p>
            <p>Mensaje: ${message}</p>
          `,
    };

    console.log("Correo enviado: ");
    console.log("mailOptions:", mailOptions);
    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    handleErrorService(
      error,
      "NEW_EMAIL_SERVICE_ERROR",
      "Error en el servicio de soporte de usuario"
    );
  }
};
