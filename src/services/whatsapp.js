import twilio from "twilio";
import dotenv from "dotenv"
dotenv.config()

const SID = "ACdb90657e9c8fc2879561572fa37ca125";
const TOKEN = "f43ac2a1c24594e935cd49887af0ecea";


const client = twilio(SID, TOKEN);

export const enviarPedido = async (user) => {
    const options = {
      body: `Nuevo pedido de ${user.nombre} - ${user.email}`,
      from: `whatsapp:+14155238886`,
      to: `whatsapp:${process.env.SERVER_PHONE}`,
    };
  
    try {
      const msg = await client.messages.create(options);
    } catch (error) {
      console.log(error);
    }
  };
  