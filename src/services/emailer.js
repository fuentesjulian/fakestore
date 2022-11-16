import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "develoopa.test@gmail.com",
    pass: "mawalsdfearyemgh",
  },
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

export const nuevoPedido = async (user, cart) => {
  let htmlContent = `<h1>Pedido ${cart.id} ingresado de ${user.nombre}</h1>`;
  cart.products.forEach((prod) => {
    htmlContent += `<p>${prod.code} ${prod.name} --> $ ${prod.price} x ${prod.quantity} unidades</p>`;
  });
  const mailOptions = {
    from: "Loopa SA",
    to: process.env.SERVER_EMAIL,
    subject: `Nuevo pedido de ${user.nombre} - ${user.email}`,
    html: htmlContent,
  };
  const msg = await transporter.sendMail(mailOptions);
};
