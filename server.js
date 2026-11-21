// Chatbot Anelpg con Gemini - hecho por Ana Prieto
const form = document.getElementById('formChat');
const input = document.getElementById('inputChat');
const mensajesDiv = document.getElementById('chatMensajes');

// Tu backend ya en Live
const URL_BACKEND = "https://proyecto-final-bvf1.onrender.com/chat";
const numeroWhatsApp = "573212289682";

function mostrarMensaje(texto, esIA) {
  let clase = esIA ? "mensaje mensaje-ia" : "mensaje mensaje-usuario";
  mensajesDiv.innerHTML += `<div class="${clase}">${texto}</div>`;
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let texto = input.value.trim();
  if (texto == "") return;

  mostrarMensaje(texto, false);
  input.value = "";
  mostrarMensaje("Estoy pensando tu look... ✨", true);

  try {
    let res = await fetch(URL_BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje: texto })
    });
    let datos = await res.json();

    mensajesDiv.lastChild.remove();
    mostrarMensaje(datos.respuesta, true);

    if (datos.respuesta.toLowerCase().includes("whatsapp") || datos.respuesta.toLowerCase().includes("nombre")) {
      mensajesDiv.innerHTML += `<a href="https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent("Hola Anais, vengo de tu página y quiero hacer un pedido")}" target="_blank" style="display:block; text-align:center; margin:10px; padding:10px; background:#25D366; color:white; text-decoration:none; border-radius:20px;">Ir a WhatsApp y hacer mi pedido 💖</a>`;
    }
  } catch (error) {
    mensajesDiv.lastChild.remove();
    mostrarMensaje("Ay, me quedé dormida un momentico, es que soy gratis en Render 😅 ¿Me repites tu pregunta?", true);
  }
});