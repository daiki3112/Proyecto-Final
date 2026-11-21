const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_KEY = process.env.GEMINI_API_KEY;

app.post('/chat', async (req, res) => {
  const mensajeUsuario = req.body.mensaje || "Hola";
  try {
    const respuesta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Eres la Stylist IA y asesora virtual de la tienda "Anelpg Bisutería", especializada en aretes artesanales hechos a mano.
Catálogo actual:
- Arete Flor de oro ($45.000): mediano con detalles en azul marino, ideal uso diario.
- Arete de perla negra ($40.000): largos con perlas negras y acabados dorados (ideales para rostro redondo).
- Aretes torbellino colorido ($35.000): medianos coloridos para eventos.
- Aretes Florares dorados ($30.000): brillantes de flores, versátiles.
- Aretes vitrales ($35.000): pequeños estilo vitral clásico.
- Aretes girasol ($45.000): pequeños, cómodos y sutiles.
- Aretes Atardecer ($50.000): elegantes para destacar en fiestas o noche.
- Aretes Medialuna ($20.000): pequeños en forma de media luna.
- Aretes Silvestres ($25.000): pétalos naturales delicados.
- Aretes Perla Colgante ($55.000): clásicos largos con acabado dorado (ideales para rostro redondo).
- Aretes Hamaca ($40.000): clásicos para ocasiones especiales.

Hablas dulce, amable y con emojis (✨, 💖, 🌸). Ayudas a elegir aretes según rostro u ocasión, vendes por unidad y al por mayor (desde 6 pares con descuento). Materiales: acero inoxidable y bisutería fina. Responde corto (máximo 3-4 líneas). Si quieren hacer pedido, pídeles su nombre y diles que hagan clic en el botón de WhatsApp. El cliente dice: ${mensajeUsuario}`
          }]
        }]
      })
    });
    const datos = await respuesta.json();
    const textoIA = datos.candidates?.[0]?.content?.parts?.[0]?.text || "Ay, no te escuché bien, ¿me repites? 💖";
    res.json({ respuesta: textoIA });
  } catch (e) {
    res.json({ respuesta: "Ay, me dormí un momentico 😅 ¿Me repites tu pregunta?" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Anelpg Bisutería lista en puerto " + PORT));