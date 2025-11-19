// require('dotenv').config(); // Carga variables de entorno
// const twilio = require('twilio');

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID, // SID de Twilio
//   process.env.TWILIO_AUTH_TOKEN   // Token de Twilio
// );

// async function sendWhatsAppMessage(to, body) {
//   try {
//     const message = await client.messages.create({
//       from: process.env.TWILIO_WHATSAPP_NUMBER, // de quién envías
//       to: process.env.MY_WHATSAPP_NUMBER,       // a quién envías
//       body: 'Mensaje de prueba desde Sprint 1'  // contenido del mensaje
//     });

//     console.log('✅ Mensaje enviado con éxito:', message.sid);
//   } catch (error) {
//     console.error('❌ Error al enviar el mensaje:', error.message);
//   }
// }

//  module.exports = { sendWhatsAppMessage };

require('dotenv').config();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendWhatsAppMessage(to, body) {
  if (!process.env.TWILIO_WHATSAPP_NUMBER) throw new Error('Falta TWILIO_WHATSAPP_NUMBER en .env');
  if (!to || !body) throw new Error('Parámetros "to" y "body" son requeridos');

  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to,
      body
    });
    console.log('✅ Mensaje enviado:', message.sid);
    return message;
  } catch (error) {
    console.error('❌ Error al enviar mensaje:', error.message);
    throw error;
  }
}

module.exports = { sendWhatsAppMessage };
