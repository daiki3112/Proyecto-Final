const form = document.getElementById('formChat');
const input = document.getElementById('inputChat');
const mensajesDiv = document.getElementById('chatMensajes');

const URL_BACKEND = "https://proyecto-final-bvf1.onrender.com/chat";

function mostrarMensajeChat(texto, esIA) {
  const clase = esIA ? "mensaje mensaje-ia" : "mensaje mensaje-usuario";
  mensajesDiv.innerHTML += `<div class="${clase}">${texto}</div>`;
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto === "") return;

  mostrarMensajeChat(texto, false);
  input.value = "";
  mostrarMensajeChat("Estoy pensando tu look... ✨", true);

  try {
    const res = await fetch(URL_BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje: texto })
    });
    const datos = await res.json();

    mensajesDiv.lastChild.remove();
    mostrarMensajeChat(datos.respuesta, true);

    if (datos.respuesta.toLowerCase().includes("whatsapp") || datos.respuesta.toLowerCase().includes("nombre") || datos.respuesta.toLowerCase().includes("pedido")) {
      mensajesDiv.innerHTML += `<a href="https://wa.me/573212289682?text=${encodeURIComponent("Hola Anelpg Bisutería 💖 Vengo de tu página y quiero hacer un pedido")}" target="_blank" style="display:block; text-align:center; margin:10px; padding:10px; background:#25D366; color:white; font-weight:600; text-decoration:none; border-radius:20px;">Ir a WhatsApp y hacer mi pedido 💖</a>`;
    }
  } catch (error) {
    mensajesDiv.lastChild.remove();
    mostrarMensajeChat("Ay, me quedé dormida un momentico, es que soy gratis en Render 😅 ¿Me repites tu pregunta?", true);
  }
});

document.querySelectorAll('.chip-sugerencia').forEach(boton => {
  boton.addEventListener('click', () => {
    input.value = boton.getAttribute('data-pregunta');
    form.dispatchEvent(new Event('submit'));
  });
});