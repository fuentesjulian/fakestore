import twilio from "twilio";

const SID = "ACdb90657e9c8fc2879561572fa37ca125";
const TOKEN = "f43ac2a1c24594e935cd49887af0ecea";
const PHONE = "+19136002332";

const client = twilio(SID, TOKEN);
export const enviarPedido = async (userPhone, cartId) => {
  const options = {
    body: `Pedido ID ${cartId} ingresado con exito`,
    from: PHONE,
    to: userPhone,
  };

  try {
    const msg = await client.messages.create(options);
  } catch (error) {
    console.log(error);
  }
};

