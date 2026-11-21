const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_KEY = process.env.GEMINI_API_KEY; // Aquí va tu clave, pero en Render, no aquí

app.post('/chat', async (req, res) => {
  const mensajeUsuario = req.body.mensaje;

  // Le decimos a Gemini cómo debe comportarse: es tu Stylist IA
  const prompt = `
  Eres la Stylist IA de Anais Bisutería, una tienda de aretes en Colombia.
  Hablas lindo, con emojis, como una amiga.
  Vendes aretes dorados y plateados, por unidad y por mayor (desde 6 pares con descuento).
  Si la clienta quiere hacer un pedido, pregúntale:
    1. ¿Por unidad o por mayor?
    2. ¿Dorado o plateado?
    3. ¿Cuántos pares?
    4. ¿Su nombre?
  Y al final dile que le vas a mandar a WhatsApp.
  No inventes precios exactos, di que por WhatsApp le dan el precio.
  Mensaje de la clienta: ${mensajeUsuario}
  `;

  try {
   const respuesta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const datos = await respuesta.json();
    const textoIA = datos.candidates[0].content.parts[0].text;
    res.json({ respuesta: textoIA });
  } catch (e) {
    res.json({ respuesta: "Ay, se me fue el internet un momentico 💖 ¿Me repites tu pregunta?" });
  }
});

app.listen(3000, () => console.log("Backend Anais listo"));
