import nodemailer from "nodemailer";
import {
  MAIL_TRAP_HOST,
  MAIL_TRAP_PORT,
  MAIL_TRAP_AUTH_USER,
  MAIL_TRAP_AUTH_PASS,
} from "../../../env.js";

const transporter = nodemailer.createTransport({
  host: MAIL_TRAP_HOST,
  port: MAIL_TRAP_PORT,
  auth: {
    user: MAIL_TRAP_AUTH_USER,
    pass: MAIL_TRAP_AUTH_PASS,
  },
});

export async function sendWelcomeEmail(user_name, email, registration_code) {
  try {
    const validateURL = `http://localhost:5173/activate-account/${registration_code}`;
    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: "¡Bienvenido a LUNEVA SHOP!",
      html: `<p>Bienvenido/a a nuestra plataforma, ${user_name}.</p>
                 <p>Tu datos de usuario son:</p>
                 <p><span>Usuario:</span> ${email}</p>
                 <p>Para validar tu cuenta, por favor haz clic en el siguiente enlace:</p>
                 <a href="${validateURL}">Validar Cuenta</a>
                 
                 <p>Si tiene alguna duda, por favor no dude en contactarnos.</p>
                 
                 <p>Bienvenido/a a LUNEVA SHOP.</p>`,
    };
    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de bienvenida:",
      error
    );
    throw error; // Manejar el error adecuadamente en tu aplicación
  }
}

export async function sendRecoveryPaswordEmail(email, registration_code) {
  try {
    // Construir la URL de restablecimiento de contraseña con el código de registro como parámetro de consulta
    const resetPasswordURL = `http://localhost:5173/user/reset-password/${registration_code}`;

    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: MAIL_TRAP_AUTH_USER,
      to: email,
      subject: "Cambio de contraseña",
      html: `<p>Tu cuenta ha sido verificada.</p>
             <p>Procede a cambiar tu contraseña, por favor haz clic en el siguiente enlace:</p>
             <a href="${resetPasswordURL}">Cambio de contraseña</a>`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de recuperar contraseña:",
      error
    );
    throw error; // Manejar el error adecuadamente en tu aplicación
  }
}
