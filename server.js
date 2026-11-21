const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const GEMINI_KEY = process.env.GEMINI_API_KEY;

// ================= CATÁLOGO OFICIAL DE 24 ARETES =================
const CATALOGO = [
  { id: 1, nombre: "Arete Flor de oro", categoria: "Uso Diario", precio: "$45.000", descripcion: "Mediano con detalles en azul marino, ideal para uso diario y oficina.", tags: ["flor", "oro", "dorado", "azul", "marino", "diario", "oficina", "mediano"] },
  { id: 2, nombre: "Arete de perla negra", categoria: "Eventos y Noche", precio: "$40.000", descripcion: "Largos con perlas negras y acabados dorados, estilizan rostro redondo y cuadrado.", tags: ["perla", "negra", "negro", "largo", "largos", "redondo", "cuadrado", "noche", "gala"] },
  { id: 3, nombre: "Aretes torbellino colorido", categoria: "Eventos y Noche", precio: "$35.000", descripcion: "Medianos llenos de color, ideales para eventos de día o looks alegres.", tags: ["colorido", "colores", "alegre", "fiesta", "dia", "mediano"] },
  { id: 4, nombre: "Aretes Florares dorados", categoria: "Clásicos", precio: "$30.000", descripcion: "Diseño floral brillante y versátil, combinan con todo tipo de look.", tags: ["flor", "flores", "dorado", "dorados", "clasico", "versatil", "economico"] },
  { id: 5, nombre: "Aretes vitrales", categoria: "Uso Diario", precio: "$35.000", descripcion: "Pequeños con acabado artístico tipo vitral clásico, toque delicado.", tags: ["vitral", "vitrales", "pequeno", "pequenos", "delicado", "diario", "alargado"] },
  { id: 6, nombre: "Aretes girasol", categoria: "Uso Diario", precio: "$45.000", descripcion: "Pequeños, cómodos y femeninos, ideales para regalo o uso diario.", tags: ["girasol", "amarillo", "flor", "regalo", "comodo", "pequeno", "diario"] },
  { id: 7, nombre: "Aretes Atardecer", categoria: "Eventos y Noche", precio: "$50.000", descripcion: "Diseño llamativo y sofisticado para destacar en fiestas, cenas o eventos de noche.", tags: ["atardecer", "naranja", "noche", "fiesta", "cena", "elegante", "sofisticado"] },
  { id: 8, nombre: "Aretes Medialuna", categoria: "Uso Diario", precio: "$20.000", descripcion: "Pequeños y minimalistas en forma de media luna (los más económicos).", tags: ["medialuna", "luna", "minimalista", "economico", "barato", "pequeno", "diario"] },
  { id: 9, nombre: "Aretes Silvestres", categoria: "Clásicos", precio: "$25.000", descripcion: "Inspirados en pétalos naturales, ligeros y románticos.", tags: ["silvestres", "petalo", "natural", "ligero", "romantico", "economico", "regalo"] },
  { id: 10, nombre: "Aretes Perla Colgante", categoria: "Clásicos", precio: "$55.000", descripcion: "Clásicos largos con acabado dorado (pieza premium para novias, grados y gala).", tags: ["perla", "colgante", "dorado", "premium", "novia", "boda", "grado", "largo", "redondo"] },
  { id: 11, nombre: "Aretes Hamaca", categoria: "Clásicos", precio: "$40.000", descripcion: "Clásicos con movimiento elegante para ocasiones especiales.", tags: ["hamaca", "clasico", "movimiento", "especial", "ovalado"] },
  { id: 12, nombre: "Aretes Atrapasueños Azul", categoria: "Eventos y Noche", precio: "$48.000", descripcion: "Tejidos a mano en degradé azul celeste, rey y negro con flecos largos.", tags: ["atrapasuenos", "azul", "celeste", "rey", "negro", "flecos", "largo", "redondo", "noche"] },
  { id: 13, nombre: "Aretes Cascada Coral", categoria: "Eventos y Noche", precio: "$52.000", descripcion: "Diseño floral largo en tonos blanco, rosa pastel y coral vibrante.", tags: ["cascada", "coral", "rosa", "rosado", "blanco", "floral", "largo", "redondo", "fiesta"] },
  { id: 14, nombre: "Aretes Orquídea Blanca", categoria: "Clásicos", precio: "$45.000", descripcion: "Orquídea artesanal blanca con bordes fucsia y centro amarillo.", tags: ["orquidea", "blanca", "blanco", "fucsia", "flor", "clasico", "femenino"] },
  { id: 15, nombre: "Aretes Estrella Marfil", categoria: "Eventos y Noche", precio: "$50.000", descripcion: "Doble flor geométrica en tono marfil y bordes dorados con centro perlado.", tags: ["estrella", "marfil", "beige", "crema", "dorado", "perla", "boda", "grado", "gala", "noche"] },
  { id: 16, nombre: "Aretes Trío Tropical", categoria: "Eventos y Noche", precio: "$55.000", descripcion: "Tres flores escalonadas en amarillo, rosa y turquesa con topo de hoja dorada.", tags: ["trio", "tropical", "amarillo", "rosa", "turquesa", "flores", "llamativo", "fiesta", "largo"] },
  { id: 17, nombre: "Aretes Flor Turquesa", categoria: "Eventos y Noche", precio: "$48.000", descripcion: "Flor volumétrica en tono turquesa con flecos y puntas naranja.", tags: ["turquesa", "azul", "verde", "naranja", "flor", "flecos", "negro", "blanco", "noche"] },
  { id: 18, nombre: "Aretes Pétalos Contraste", categoria: "Clásicos", precio: "$42.000", descripcion: "Flor tejida en blanco y negro con elegante bastón superior dorado.", tags: ["petalos", "contraste", "blanco", "negro", "dorado", "formal", "oficina", "clasico"] },
  { id: 19, nombre: "Aretes Cayena Naranja", categoria: "Uso Diario", precio: "$40.000", descripcion: "Flor tropical en naranja intenso con pistilos dorados hechos a mano.", tags: ["cayena", "naranja", "tropical", "flor", "dorado", "diario", "fresco"] },
  { id: 20, nombre: "Aretes Lirio Cristal", categoria: "Clásicos", precio: "$45.000", descripcion: "Diseño floral calado disponible en acabado plateado cristal o dorado.", tags: ["lirio", "cristal", "plateado", "plata", "dorado", "flor", "ligero", "clasico"] },
  { id: 21, nombre: "Aretes Hoja Plateada", categoria: "Uso Diario", precio: "$38.000", descripcion: "Delicada hoja tejida en tonos plata brillante con detalle central dorado.", tags: ["hoja", "plateada", "plata", "plateado", "brillante", "diario", "comodo", "ligero"] },
  { id: 22, nombre: "Aretes Flor Nocturna", categoria: "Eventos y Noche", precio: "$42.000", descripcion: "Elegante flor negra en mostacilla con centro dorado para looks de gala.", tags: ["nocturna", "negra", "negro", "flor", "dorado", "noche", "gala", "vestido"] },
  { id: 23, nombre: "Aretes Hibisco Dorado", categoria: "Eventos y Noche", precio: "$50.000", descripcion: "Flor colgante amarilla con detalles dorados y perla central.", tags: ["hibisco", "amarilla", "amarillo", "dorado", "perla", "colgante", "noche", "especial"] },
  { id: 24, nombre: "Aretes Flor Solar", categoria: "Uso Diario", precio: "$38.000", descripcion: "Flor mediana en amarillo vibrante con centro dorado ideal para el día.", tags: ["solar", "amarillo", "flor", "dorado", "alegre", "diario", "dia"] }
];

const LISTA_CATALOGO_PROMPT = CATALOGO.map(
  (p) => `${p.id}. ${p.nombre} (${p.precio}) [${p.categoria}] - ${p.descripcion}`
).join('\n');

const PROMPT_BASE = `Eres la Stylist IA y asesora experta en imagen de la tienda colombiana "Anelpg Bisutería", especializada en 24 diseños únicos de aretes artesanales hechos a mano en mostacilla y tejidos tradicionales.

CATÁLOGO COMPLETO DE 24 REFERENCIAS DE ANELPG BISUTERÍA:
${LISTA_CATALOGO_PROMPT}

INFORMACIÓN DE LA TIENDA:
- Acabados disponibles: Dorado y plateado en la mayoría de referencias.
- Materiales: Mostacilla checa de alta calidad, herrajes en acero inoxidable hipoalergénico y tejidos artesanales.
- Modalidades de venta: Por unidad (al detal) y al por mayor (desde 6 pares surtidos con precio especial).
- Envíos: Envíos a toda Colombia y entregas rápidas en Bogotá.
- Personalización: Se pueden solicitar combinaciones de colores bajo pedido.

REGLAS DE CONVERSACIÓN:
- Habla cálido, dulce, cercano y profesional, usando emojis con buen gusto (✨, 💖, 🌸, 🌙, 💫).
- Responde de forma concisa y natural (3 a 5 líneas máximo), recomendando siempre 2 o 3 aretes exactos de los 24 disponibles con su precio.
- Adapta tu consejo al tipo de rostro, color de ropa, ocasión o presupuesto que mencione el cliente.
- Si el cliente ya eligió un diseño, dice que lo va a pedir, agradece o lleva 3 o más mensajes conversando y ya tiene su recomendación clara, dile cálidamente algo como: "¡Listo, hermosa! Ya que lo pensaste y elegiste tu diseño ideal, toca el botón verde para ir a WhatsApp y cerrar tu pedido. ¡Fue un gusto asesorarte, nos vemos allá! 💖✨" y despídete para cerrar la charla.

function elegirAzar(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function normalizar(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// ================= MOTOR DE RESPALDO INTELIGENTE (24 ARETES) =================
function respuestaRespaldo(msg) {
  const t = normalizar(msg);

  // 1. Saludos
  if (/^(hola|holi|buenas|hey|que tal|saludos|buen dia|buenas tardes|buenas noches)/.test(t)) {
    return elegirAzar([
      "¡Hola! Qué alegría tenerte en Anelpg Bisutería 💖 Tenemos 24 diseños artesanales hechos a mano. Cuéntame, ¿buscas aretes para una ocasión especial, un color en particular o según tu tipo de rostro? ✨",
      "¡Holi! Bienvenida a Anelpg Bisutería 🌸 Soy tu Stylist IA y conozco nuestras 24 referencias al detalle. Dime qué outfit vas a usar o qué estilo te gusta y te recomiendo el par ideal 💫"
    ]);
  }

  // 2. Despedidas y agradecimientos
  if (/(gracias|mil gracias|muchas gracias|te agradezco|listo|vale|ok|perfecto|genial)/.test(t) && t.length < 35) {
    return elegirAzar([
      "¡Con todo el cariño del mundo! 💖 Si ya elegiste tus favoritos, agrégalos al carrito o toca el botón de WhatsApp y los preparamos para ti ✨",
      "¡A ti por visitar Anelpg Bisutería! 🌸 Aquí sigo por si quieres combinar otro outfit o preguntar por cualquiera de los 24 diseños 💫"
    ]);
  }

  // 3. Búsqueda directa entre los 24 aretes por palabras clave (colores, nombres, estilos)
  const stopWords = new Set(['para', 'unos', 'unas', 'arete', 'aretes', 'tienen', 'busco', 'quiero', 'cuales', 'como', 'mejor', 'algo', 'con', 'los', 'las', 'una', 'que', 'me', 'quedan', 'combinan']);
  const tokens = t.split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !stopWords.has(w));

  if (tokens.length > 0) {
    const puntuados = CATALOGO.map((prod) => {
      const textoProd = normalizar(`${prod.nombre} ${prod.categoria} ${prod.descripcion} ${prod.tags.join(' ')}`);
      let puntos = 0;
      tokens.forEach((tok) => {
        if (textoProd.includes(tok)) puntos += 2;
        if (normalizar(prod.nombre).includes(tok)) puntos += 3;
      });
      return { prod, puntos };
    }).filter((x) => x.puntos > 0).sort((a, b) => b.puntos - a.puntos);

    if (puntuados.length > 0) {
      const top = puntuados.slice(0, 3).map((x) => `• ${x.prod.nombre} (${x.prod.precio}): ${x.prod.descripcion}`).join('\n');
      return `¡Mira estas joyas de nuestra colección de 24 diseños que van perfecto con lo que buscas! ✨\n\n${top}\n\n¿Te gustaría agregar alguno al carrito o pedirlo por WhatsApp? 💖`;
    }
  }

  // 4. Tipos de rostro
  if (t.includes("redondo")) {
    return "Para rostro redondo te estilizan muchísimo los diseños largos y verticales como Aretes Atrapasueños Azul ($48.000), Aretes Cascada Coral ($52.000) o Aretes Perla Colgante ($55.000) ✨ ¿Qué tonos prefieres? 💖";
  }
  if (t.includes("alargado") || t.includes("cuadrado")) {
    return "Para equilibrar tus facciones te lucen divinos diseños con volumen floral o curvas suaves como Aretes Flor Turquesa ($48.000), Aretes girasol ($45.000) o Aretes Medialuna ($20.000) 🌸💖";
  }

  // 5. Mayoristas, materiales, envíos, precios
  if (/(mayor|mayorista|docena|revender|negocio)/.test(t)) {
    return "¡Sí manejamos ventas al por mayor en Anelpg Bisutería! 🌸 A partir de 6 pares surtidos entre nuestros 24 diseños tienes tarifa especial. Déjame tu nombre y escríbenos por WhatsApp para enviarte el catálogo mayorista 💖✨";
  }
  if (/(material|acero|alergia|cuidado|cuidar|mojar|perfume)/.test(t)) {
    return "Tejemos a mano con mostacilla checa de alta calidad y herrajes en acero inoxidable hipoalergénico 🌸 Evita aplicarles perfume directo y guárdalos en su bolsita para que brillen por años ✨💖";
  }
  if (/(envio|envios|domicilio|bogota|colombia|pago|nequi|daviplata)/.test(t)) {
    return "Hacemos envíos seguros a toda Colombia y entregas rápidas en Bogotá 🚚✨ Aceptamos Nequi, Daviplata y transferencia bancaria. Toca el botón de WhatsApp con tu ciudad para coordinar tu pedido 💖";
  }
  if (/(precio|precios|barato|economico|catalogo|todos|cuantos)/.test(t)) {
    return "Tenemos 24 referencias artesanales desde $20.000 (Aretes Medialuna) y $25.000 (Aretes Silvestres), hasta ediciones especiales de $55.000 como Aretes Trío Tropical y Perla Colgante ✨💖 ¿Cuál te llamó más la atención?";
  }
  if (/(comprar|pedido|pedir|quiero|encargar|whatsapp|decidi|me llevo)/.test(t)) {
    return "¡Listo, hermosa! 💖 Ya que lo pensaste y tienes tu look definido, toca el botón verde de aquí abajo para ir directo a WhatsApp y concretar tu pedido. ¡Fue un gusto asesorarte, nos vemos allá! ✨🌸";
  }

  // 6. Comodín con variedad de los 24 diseños
  return elegirAzar([
    "¡Con gusto te asesoro! ✨ Entre nuestros 24 diseños hechos a mano destacan Aretes Atrapasueños Azul ($48.000), Aretes Orquídea Blanca ($45.000) y Aretes Flor Solar ($38.000). Dime un color, evento o estilo y te doy mi recomendación exacta 💖",
    "¡Estoy aquí para ayudarte a brillar! 💫 Puedes preguntarme por cualquiera de nuestras 24 referencias, combinaciones con tu vestido, ventas al por mayor o hacer tu pedido directo por WhatsApp 🌸💖"
  ]);
}

// ================= LLAMADA A GEMINI CON MEMORIA DE CONVERSACIÓN =================
async function llamarGemini(modelo, mensajeUsuario, historial = []) {
  const contextoHistorial = Array.isArray(historial) && historial.length > 0
    ? historial
        .slice(-6)
        .map((m) => `${m.autor === 'ia' ? 'Stylist IA' : 'Cliente'}: ${m.texto}`)
        .join('\n')
    : '';

  const promptCompleto = `${PROMPT_BASE}

${contextoHistorial ? `HISTORIAL RECIENTE DE LA CONVERSACIÓN:\n${contextoHistorial}\n` : ''}Cliente ahora dice: ${mensajeUsuario}
Stylist IA:`;

  const respuesta = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptCompleto }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 280
        }
      })
    }
  );

  const datos = await respuesta.json();
  if (!respuesta.ok) {
    console.error(`Error Gemini (${modelo}):`, JSON.stringify(datos));
    return null;
  }
  return datos.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

app.post('/chat', async (req, res) => {
  const mensajeUsuario = req.body.mensaje || "Hola";
  const historial = req.body.historial || [];

  if (!GEMINI_KEY) {
    return res.json({ respuesta: respuestaRespaldo(mensajeUsuario) });
  }

  try {
    let textoIA = await llamarGemini('gemini-2.5-flash', mensajeUsuario, historial);
    if (!textoIA) {
      textoIA = await llamarGemini('gemini-2.5-flash-lite', mensajeUsuario, historial);
    }
    res.json({ respuesta: textoIA || respuestaRespaldo(mensajeUsuario) });
  } catch (e) {
    console.error('Fallo general en /chat:', e.message);
    res.json({ respuesta: respuestaRespaldo(mensajeUsuario) });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Anelpg Bisutería lista en puerto " + PORT));