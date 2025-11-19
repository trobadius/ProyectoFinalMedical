require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const { sendWhatsAppMessage } = require('./sendMessage');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/api/schedule', (req, res) => {
  const { to, body, sendAt } = req.body;

  if (!to || !body) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: to o body' });
  }

  let sendDate;

  if (sendAt) {
    // 🔹 Forzamos interpretación de hora local española
    const parts = sendAt.split(/[-T:]/).map(Number);
    // new Date(año, mes-1, día, hora, min, seg) crea hora local exacta
    sendDate = new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
  } else {
    sendDate = new Date(); // envío inmediato
  }

  if (sendDate <= new Date()) {
    // Envío inmediato
    sendWhatsAppMessage(to, body)
      .then(msg => res.json({ sent: true, sid: msg.sid }))
      .catch(err => res.status(500).json({ error: err.message }));
  } else {
    // Envío programado
    schedule.scheduleJob(sendDate, () => sendWhatsAppMessage(to, body));
    res.json({
      scheduled: true,
      localTime: sendAt,
      utcTime: sendDate.toUTCString() // UTC real para referencia
    });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


