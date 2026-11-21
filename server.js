const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const GEMINI_KEY = process.env.GEMINI_API_KEY;

const PROMPT_BASE = `Eres la Stylist IA y asesora virtual de la tienda "Anelpg Bisutería", especializada en aretes artesanales hechos a mano.
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

Hablas dulce, amable y con emojis (✨, 💖, 🌸). Ayudas a elegir aretes según rostro u ocasión, vendes por unidad y al por mayor (desde 6 pares con descuento). Materiales: acero inoxidable y bisutería fina. Responde corto (máximo 3-4 líneas). Si quieren hacer pedido, pídeles su nombre y diles que hagan clic en el botón de WhatsApp.`;

function respuestaRespaldo(msg) {
  const t = msg.toLowerCase();
  if (t.includes("hola") || t.includes("holi") || t.includes("buenas")) {
    return "¡Hola! Qué alegría saludarte en Anelpg Bisutería 💖 Cuéntame, ¿buscas aretes para rostro redondo, una fiesta de noche o uso diario? ✨";
  }
  if (t.includes("redondo")) {
    return "Para rostro redondo te estilizan muchísimo nuestros diseños largos como el Arete de perla negra ($40.000) o los Aretes Perla Colgante ($55.000) ✨ ¿Los prefieres dorados o plateados? 💖";
  }
  if (t.includes("noche") || t.includes("fiesta") || t.includes("elegante")) {
    return "Para un evento de noche brillan divino los Aretes Atardecer ($50.000) y los Aretes Hamaca ($40.000) ✨ ¿Los quieres por unidad o al por mayor? 💖";
  }
  if (t.includes("material") || t.includes("cuidado")) {
    return "Nuestros aretes son hechos a mano con herrajes en acero inoxidable y bisutería fina 🌸 Evita aplicarles perfume directo y guárdalos en su bolsita. ¿Te gustaría pedir algún diseño por WhatsApp? 💖";
  }
  return "¡Me encantaría ayudarte a elegir tus aretes ideales en Anelpg Bisutería! ✨ Tenemos diseños desde $20.000 hasta $55.000. Dime tu nombre y qué estilo buscas para cotizarte por WhatsApp 💖";
}

async function llamarGemini(modelo, mensajeUsuario) {
  const respuesta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `${PROMPT_BASE}\n\nEl cliente dice: ${mensajeUsuario}` }]
      }]
    })
  });
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    console.error(`Error Gemini (${modelo}):`, JSON.stringify(datos));
    return null;
  }
  return datos.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

app.post('/chat', async (req, res) => {
  const mensajeUsuario = req.body.mensaje || "Hola";
  if (!GEMINI_KEY) {
    return res.json({ respuesta: respuestaRespaldo(mensajeUsuario) });
  }
  try {
    let textoIA = await llamarGemini('gemini-2.5-flash', mensajeUsuario);
    if (!textoIA) {
      textoIA = await llamarGemini('gemini-2.5-flash-lite', mensajeUsuario);
    }
    res.json({ respuesta: textoIA || respuestaRespaldo(mensajeUsuario) });
  } catch (e) {
    res.json({ respuesta: respuestaRespaldo(mensajeUsuario) });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Anelpg Bisutería lista en puerto " + PORT));