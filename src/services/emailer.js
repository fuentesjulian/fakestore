import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user: 'develoopa.test@gmail.com',
      pass: 'mawalsdfearyemgh'
  }
});

export const nuevoRegistro = async (user) => {
  const validFields = ["email", "nombre", "direccion", "edad", "telefono"];
  let htmlContent = "<h1>Datos de registro</h1>";
  for (const key in user) {
    if (validFields.includes(key)) {
      htmlContent += `<div><b>${key}:</b> ${user[key]}</div>`;
    }
  }
  const mailOptions = {
    from: "Loopa SA",
    to: process.env.SERVER_EMAIL,
    subject: "Nuevo registro",
    html: htmlContent,
  };
  const msg = await transporter.sendMail(mailOptions);
};




