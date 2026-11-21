const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const GEMINI_KEY = process.env.GEMINI_API_KEY;

const PROMPT_BASE = `Eres la Stylist IA y asesora experta en imagen de la tienda colombiana "Anelpg Bisutería", especializada en aretes artesanales hechos a mano.

CATÁLOGO COMPLETO DE ANELPG BISUTERÍA:
1. Arete Flor de oro ($45.000) - Mediano con detalles en azul marino, ideal para uso diario y oficina.
2. Arete de perla negra ($40.000) - Largos con perlas negras y acabados dorados (estilizan rostro redondo y cuadrado; geniales para noche o gala).
3. Aretes torbellino colorido ($35.000) - Medianos llenos de color, ideales para eventos de día, outfits neutros o looks alegres.
4. Aretes Florares dorados ($30.000) - Diseño floral brillante y versátil, combinan con todo tipo de look.
5. Aretes vitrales ($35.000) - Pequeños con acabado artístico tipo vitral clásico, perfectos para un toque delicado y original.
6. Aretes girasol ($45.000) - Pequeños, cómodos y femeninos, ideales para regalo o uso diario.
7. Aretes Atardecer ($50.000) - Diseño llamativo y sofisticado para destacar en fiestas, cenas o eventos de noche.
8. Aretes Medialuna ($20.000) - Pequeños y minimalistas en forma de media luna (los más económicos del catálogo).
9. Aretes Silvestres ($25.000) - Inspirados en pétalos naturales, ligeros y románticos.
10. Aretes Perla Colgante ($55.000) - Clásicos largos con acabado dorado (nuestra pieza premium, ideal para novias, grados, rostro redondo y eventos formales).
11. Aretes Hamaca ($40.000) - Clásicos con movimiento elegante para ocasiones especiales.
12. Aretes Atrapasueños Azul ($48.000) - Tejidos largos con flecos en degradé azul y negro, ideales para rostro redondo y eventos especiales.
13. Aretes Cascada Coral ($52.000) - Largos florales en blanco, rosa pastel y coral, perfectos para fiestas de día o vestidos neutros.
14. Aretes Orquídea Blanca ($45.000) - Diseño floral clásico blanco con bordes fucsia, muy femenino y versátil.
15. Aretes Estrella Marfil ($50.000) - Doble flor larga en tono marfil y dorado, espectacular para bodas, grados o gala.
16. Aretes Trío Tropical ($55.000) - Tres flores en amarillo, rosa y turquesa con hoja dorada, llamativos y alegres.
17. Aretes Flor Turquesa ($48.000) - Flor grande turquesa con flecos y puntas naranja, ideal para resaltar outfits blancos o negros.
18. Aretes Pétalos Contraste ($42.000) - Flor blanco y negro con pieza superior dorada, súper combinable con ropa oscura o formal.
19. Aretes Cayena Naranja ($40.000) - Flor naranja vibrante con pistilos dorados, fresca y ligera para uso diario.
20. Aretes Lirio Cristal ($45.000) - Flor calada ligera disponible en plateado cristal o dorado.
21. Aretes Hoja Plateada ($38.000) - Hoja brillante plateada con centro dorado, cómoda y elegante para el día a día.
22. Aretes Flor Nocturna ($42.000) - Flor negra con centro dorado, ideal para vestidos de noche y ocasiones formales.
23. Aretes Hibisco Dorado ($50.000) - Flor colgante amarilla con centro de perla, perfecta para eventos especiales.
24. Aretes Flor Solar ($38.000) - Flor mediana amarilla con centro dorado, alegre y cómoda para uso diario.

INFORMACIÓN DE LA TIENDA:
- Acabados disponibles: Dorado y plateado en la mayoría de referencias.
- Materiales: Herrajes en acero inoxidable hipoalergénico y bisutería fina artesanal.
- Modalidades de venta: Por unidad (al detal) y al por mayor (desde 6 pares surtidos con precio especial).
- Envíos: Envíos a toda Colombia y entregas rápidas en Bogotá.
- Personalización: Se pueden solicitar combinaciones de colores bajo pedido.

REGLAS DE CONVERSACIÓN:
- Habla cálido, dulce, cercano y profesional, usando emojis con buen gusto (✨, 💖, 🌸, 🌙, 💫).
- Responde de forma concisa y natural (3 a 5 líneas máximo), recomendando siempre 1 o 2 aretes exactos con su precio.
- Adapta tu consejo al tipo de rostro, color de ropa, tono de piel, ocasión o presupuesto que mencione el cliente.
- Si muestran intención de compra, regalo, cotización o pedido al por mayor, pídeles su nombre y diles que hagan clic en el botón de WhatsApp para finalizar el pedido.`;

// Función auxiliar para elegir respuestas variadas
function elegirAzar(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

// Motor de respaldo súper completo con +16 intenciones y respuestas variadas
function respuestaRespaldo(msg) {
  const t = msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 1. Saludos
  if (/^(hola|holi|buenas|hey|que tal|saludos|buen dia|buenas tardes|buenas noches)/.test(t)) {
    return elegirAzar([
      "¡Hola! Qué alegría tenerte en Anelpg Bisutería 💖 Cuéntame, ¿buscas aretes para una ocasión especial, para regalar o según tu tipo de rostro? ✨",
      "¡Holi! Bienvenida a Anelpg Bisutería 🌸 Soy tu Stylist IA. Dime qué outfit vas a usar o qué estilo te gusta y te recomiendo el par ideal 💫",
      "¡Hola, hermosa! ✨ Qué gusto saludarte. Tenemos 11 diseños artesanales listos para iluminar tu look. ¿Prefieres aretes pequeños, medianos o largos? 💖"
    ]);
  }

  // 2. Despedidas y agradecimientos
  if (/(gracias|mil gracias|muchas gracias|te agradezco|listo|vale|ok|perfecto|genial)/.test(t) && t.length < 35) {
    return elegirAzar([
      "¡Con todo el cariño del mundo! 💖 Si te decides por algún diseño, toca el botón de WhatsApp y lo preparamos para ti ✨",
      "¡A ti por visitar Anelpg Bisutería! 🌸 Aquí sigo por si quieres combinar otro outfit o cotizar varios pares 💫",
      "¡Me encanta ayudarte! ✨ Recuerda que puedes pedir directo por WhatsApp con tu nombre y el diseño que más te enamoró 💖"
    ]);
  }
  if (/(adios|chao|bye|hasta luego|nos vemos)/.test(t)) {
    return "¡Hasta pronto! 💖 Gracias por pasar por Anelpg Bisutería. Cuando quieras estrenar aretes artesanales, aquí te espero ✨🌸";
  }

  // 3. Tipos de rostro (redondo, alargado, cuadrado, ovalado, corazón)
  if (t.includes("redondo")) {
    return elegirAzar([
      "Para rostro redondo te estilizan muchísimo los diseños largos y verticales como el Arete de perla negra ($40.000) o los Aretes Perla Colgante ($55.000) ✨ ¿Te gustan más en dorado o plateado? 💖",
      "Si tienes rostro redondo, alargar visualmente tus facciones es clave 💫 Te van divinos los Aretes Perla Colgante ($55.000) o el Arete de perla negra ($40.000). ¿Quieres pedir alguno por WhatsApp? 🌸"
    ]);
  }
  if (t.includes("alargado") || t.includes("largo") && t.includes("rostro") || t.includes("delgado")) {
    return "Para rostro alargado te favorecen mucho los diseños cortos o medianos con volumen lateral, como los Aretes girasol ($45.000), los Aretes vitrales ($35.000) o los Aretes torbellino colorido ($35.000) 🌸 Armonizan súper lindo 💖";
  }
  if (t.includes("cuadrado") || t.includes("angular")) {
    return "Para suavizar las líneas de un rostro cuadrado, las formas curvas y orgánicas son mágicas ✨ Te recomiendo los Aretes Medialuna ($20.000), los Aretes Silvestres ($25.000) o el Arete de perla negra ($40.000) 💖";
  }
  if (t.includes("ovalado") || t.includes("corazon") || t.includes("triangulo")) {
    return "¡Tienes un rostro súper versátil! 💫 Para equilibrar la parte inferior te lucen divinos los Aretes Hamaca ($40.000), los Aretes Florares dorados ($30.000) o el Arete Flor de oro ($45.000) 🌸 ¿Cuál va más con tu estilo?";
  }

  // 4. Ocasiones: Noche, fiesta, boda, grado, elegante
  if (/(noche|fiesta|gala|boda|matrimonio|grado|graduacion|cena|elegante|formal)/.test(t)) {
    return elegirAzar([
      "Para brillar en un evento de noche te recomiendo nuestros favoritos de gala: los Aretes Atardecer ($50.000) o los Aretes Perla Colgante ($55.000) ✨ Son sofisticados y roban miradas 💖",
      "Si es una ocasión elegante o fiesta nocturna, los Aretes Hamaca ($40.000) y el Arete de perla negra ($40.000) elevan cualquier vestido al instante 🌙✨ ¿Te gustaría cotizarlos por WhatsApp?"
    ]);
  }

  // 5. Ocasiones: Diario, universidad, oficina, casual, día
  if (/(diario|casual|oficina|universidad|trabajo|dia|sencillo|comodo|comodos|pequeno|pequenos)/.test(t)) {
    return elegirAzar([
      "Para uso diario, universidad u oficina necesitas comodidad y estilo ✨ Te van perfectos los Aretes Medialuna ($20.000), los Aretes girasol ($45.000) o el Arete Flor de oro ($45.000) 🌸",
      "Si buscas algo ligero y lindo para todos los días, mira los Aretes Silvestres ($25.000) o los Aretes vitrales ($35.000) 💫 No pesan nada y combinan con todo 💖"
    ]);
  }

  // 6. Colores de ropa / Outfits
  if (/(negro|oscuro|vino|vinotinto)/.test(t)) {
    return "Con ropa negra o tonos oscuros el contraste dorado se ve espectacular ✨ Te recomiendo los Aretes Florares dorados ($30.000), los Aretes Atardecer ($50.000) o si quieres un toque de color, los Aretes torbellino colorido ($35.000) 💖";
  }
  if (/(blanco|beige|crema|neutro|pastel)/.test(t)) {
    return "Con prendas blancas, beige o tonos neutros lucen increíbles el Arete Flor de oro ($45.000) con sus detalles azul marino, el Arete de perla negra ($40.000) o los Aretes torbellino colorido ($35.000) 🌸✨";
  }
  if (/(azul|verde|rojo|rosa|rosado|morado|amarillo|estampado|flores)/.test(t)) {
    return "Cuando llevas prendas de color o estampadas, lo ideal es equilibrar con tonos dorados o perlas 💫 Te sugiero los Aretes Perla Colgante ($55.000), los Aretes Medialuna ($20.000) o los Aretes Hamaca ($40.000) 💖";
  }

  // 7. Regalos
  if (/(regalo|regalar|cumpleanos|aniversario|mama|novia|amiga|sorpresa|detalle)/.test(t)) {
    return "¡Un par de aretes artesanales es un regalo inolvidable! 🎁💖 Los más pedidos para regalar son los Aretes girasol ($45.000), los Aretes Silvestres ($25.000) y los Aretes Perla Colgante ($55.000). Dime tu nombre y los preparamos por WhatsApp ✨";
  }

  // 8. Precios, económicos, presupuesto, catálogo
  if (/(precio|precios|cuanto vale|cuanto cuestan|barato|economico|presupuesto|catalogo|lista|todos)/.test(t)) {
    return "Nuestros precios van desde $20.000 hasta $55.000 💖 Los más económicos son Aretes Medialuna ($20.000), Silvestres ($25.000) y Florares dorados ($30.000); y los premium son Atardecer ($50.000) y Perla Colgante ($55.000) ✨ ¿Cuál te llamó más la atención?";
  }

  // 9. Mayoristas / Negocio / Emprender
  if (/(mayor|mayorista|docena|revender|negocio|cantidad|descuento|promocion)/.test(t)) {
    return "¡Sí manejamos ventas al por mayor en Anelpg Bisutería! 🌸 A partir de 6 pares surtidos tienes tarifa especial de distribuidora. Déjame tu nombre y escríbenos por WhatsApp para enviarte la tabla de precios mayoristas 💖✨";
  }

  // 10. Materiales, alergias, cuidado
  if (/(material|materiales|acero|oro|plata|alergia|irritacion|cuidado|cuidar|mojar|perfume|duran|duracion)/.test(t)) {
    return "Trabajamos con herrajes en acero inoxidable hipoalergénico y bisutería fina artesanal 🌸 Para que brillen por años, evita aplicarles perfume directo, no te bañes con ellos y guárdalos en su bolsita individual ✨ ¿Te gustaría pedir algún par? 💖";
  }

  // 11. Envíos, entregas, pagos, ubicación
  if (/(envio|envios|domicilio|bogota|colombia|ciudad|pago|nequi|daviplata|transferencia|contraentrega|donde estan|ubicacion)/.test(t)) {
    return "Hacemos envíos seguros a toda Colombia y entregas rápidas en Bogotá 🚚✨ Aceptamos Nequi, Daviplata y transferencia bancaria. Toca el botón de WhatsApp con tu ciudad y el arete que elegiste para coordinar tu envío 💖";
  }

  // 12. Personalizados / Colores / Acabados
  if (/(personalizado|personalizar|otro color|dorado|plateado|medida|tamano)/.test(t)) {
    return "¡Claro que sí! 💫 La mayoría de nuestros diseños se pueden pedir en acabado dorado o plateado, y hacemos combinaciones de colores personalizadas bajo pedido 🎨 Escríbenos por WhatsApp con tu idea y la hacemos realidad 💖";
  }

  // 13. Intención directa de compra / pedido
  if (/(comprar|pedido|pedir|quiero|me interesa|encargar|disponible|disponibles|whatsapp)/.test(t)) {
    return "¡Qué emoción! 💖 Para tomar tu pedido en Anelpg Bisutería, cuéntame tu nombre y qué diseño deseas, o haz clic directo en el botón verde de WhatsApp aquí abajo para atenderte de inmediato ✨🌸";
  }

  // 14. Respuesta comodín inteligente (si escribe algo muy específico)
  return elegirAzar([
    "¡Me encantaría asesorarte en Anelpg Bisutería! ✨ Cuéntame un poquito más: ¿buscas algo sutil como los Aretes Medialuna ($20.000), floral como los Girasol ($45.000) o elegante como los Atardecer ($50.000)? 💖",
    "¡Qué buena consulta! 🌸 En Anelpg Bisutería hacemos cada par a mano pensando en tu estilo. Si me dices para qué ocasión los buscas o qué colores sueles usar, te doy mi recomendación exacta ✨💖",
    "¡Estoy aquí para ayudarte a brillar! 💫 Puedes preguntarme por recomendaciones según tu rostro, combinaciones con tu ropa, ventas al por mayor o hacer tu pedido directo por WhatsApp 💖"
  ]);
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