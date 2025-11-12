require('dotenv').config(); // Carga variables de entorno
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID, // SID de Twilio
  process.env.TWILIO_AUTH_TOKEN   // Token de Twilio
);

async function sendWhatsAppMessage() {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // de quién envías
      to: process.env.MY_WHATSAPP_NUMBER,       // a quién envías
      body: 'Mensaje de prueba desde Sprint 1'  // contenido del mensaje
    });

    console.log('✅ Mensaje enviado con éxito:', message.sid);
  } catch (error) {
    console.error('❌ Error al enviar el mensaje:', error.message);
  }
}

sendWhatsAppMessage();

