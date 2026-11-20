const productosIniciales = [
  {
    id: 1,
    nombre: "Arete Flor de oro",
    categoria: "Aretes",
    precio: "$45.000",
    descripcion: "Arete mediano, Con detalles en azul marino, ideales para uso diario.",
    imagen: "img/arete1.jpg"
  },
  {
    id: 2,
    nombre: "Arete de perla negra",
    categoria: "Aretes",
    precio: "$40.000",
    descripcion: "Aretes largos con perlas negras y acabados dorados.",
    imagen: "img/arete2.jpg"
  },
  {
    id: 3,
    nombre: "Aretes torbellino colorido",
    categoria: "Aretes",
    precio: "$35.000",
    descripcion: "Aretes medianos con un torbellino de colores en medio, ideal para eventos.",
    imagen: "img/arete3.jpg"
  },
  {
    id: 4,
    nombre: "Aretes Florares dorados",
    categoria: "Aretes",
    precio: "$30.000",
    descripcion: "Diseño inspirado en un campo brillante de flores, util para todo estilo",
    imagen: "img/arete4.jpg"
  },
  {
    id: 5,
    nombre: "Aretes vitrales",
    categoria: "Aretes",
    precio: "$35.000",
    descripcion: "Aretes pequeños con un acabado que recuerda a los clasicos vitrales",
    imagen: "img/arete5.jpg"
  },
  {
    id: 6,
    nombre: "Aretes girasol",
    categoria: "Aretes",
    precio: "$45.000",
    descripcion: "Pequeños y cómodos, perfectos para un toque sutil y femenino.",
    imagen: "img/arete6.jpg"
  },
  {
    id: 7,
    nombre: "Aretes Atardecer",
    categoria: "Aretes",
    precio: "$50.000",
    descripcion: "Un duo hecho para destacar de una manera elegante.",
    imagen: "img/arete7.jpg"
  },
  {
    id: 8,
    nombre: "Aretes Medialuna",
    categoria: "Aretes",
    precio: "$20.000",
    descripcion: "Pequeños aretes en forma de media luna.",
    imagen: "img/arete8.jpg"
  },
  {
    id: 9,
    nombre: "Aretes Silvestres",
    categoria: "Aretes",
    precio: "$25.000",
    descripcion: "Inspirados en pétalos naturales para recordar buenos momentos.",
    imagen: "img/arete9.jpg"
  },
  {
    id: 10,
    nombre: "Aretes Perla Colgante",
    categoria: "Aretes",
    precio: "$55.000",
    descripcion: "Aretes clasicos con un lindo acabado dorado",
    imagen: "img/arete10.jpg"
  },
  {
    id: 11,
    nombre: "Aretes Hamaca",
    categoria: "Aretes",
    precio: "$40.000",
    descripcion: "Lindos y clasicos para ocasiones especiales.",
    imagen: "img/arete11.jpg"
  }
];

const gridProductos = document.getElementById('gridProductos');

function mostrarProductos(lista) {
  gridProductos.innerHTML = '';

  lista.forEach((producto) => {
    const tarjeta = document.createElement('article');
    tarjeta.classList.add('tarjeta-producto');

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
      <div class="info-producto">
        <span class="categoria-tag">${producto.categoria}</span>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <div class="pie-tarjeta">
          <span class="precio">${producto.precio}</span>
          <button class="btn-pedir" data-id="${producto.id}">Lo quiero</button>
        </div>
      </div>
    `;

    gridProductos.appendChild(tarjeta);
  });
}

// Cargar productos desde localStorage o usar los iniciales
let productos = JSON.parse(localStorage.getItem('anais_productos')) || productosIniciales;

function guardarProductosStorage() {
  localStorage.setItem('anais_productos', JSON.stringify(productos));
}

// Cargar todos los productos al abrir la tienda
mostrarProductos(productos);

// Numero de WhatsApp de la tienda (cambia este numero por el tuyo)
const numeroWhatsApp = '573212289682';

const inputProducto = document.getElementById('productoInteres');
const formContacto = document.getElementById('formContacto');
const estadoForm = document.getElementById('estadoForm');

// Autocompletar el formulario al dar clic en "Lo quiero"
gridProductos.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-pedir')) {
    const idSeleccionado = Number(e.target.dataset.id);
    const areteElegido = productos.find(item => item.id === idSeleccionado);

    if (areteElegido) {
      inputProducto.value = areteElegido.nombre;
      document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Enviar pedido por la API de WhatsApp (wa.me)
formContacto.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombreCliente').value.trim();
  const producto = inputProducto.value.trim();
  const mensaje = document.getElementById('mensajeCliente').value.trim();

  let textoPedido = `Hola Anais Bisutería, soy ${nombre}. `;
  if (producto !== '') {
    textoPedido += `Me interesan los aretes: *${producto}*. `;
  }
  textoPedido += `Consulta: ${mensaje}`;

  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoPedido)}`;

  estadoForm.textContent = 'Abriendo WhatsApp con tu pedido...';
  window.open(urlWhatsApp, '_blank');

  formContacto.reset();
  setTimeout(() => {
    estadoForm.textContent = '';
  }, 4000);
});
// Menu hamburguesa en version movil
const btnMenu = document.getElementById('btnMenu');
const navLinks = document.getElementById('navLinks');

btnMenu.addEventListener('click', () => {
  navLinks.classList.toggle('activo');
});

navLinks.querySelectorAll('a, button').forEach((item) => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('activo');
  });
});
// Sistema de Cuentas (Login + Registro) y Panel Admin
const cuentasDefault = [
  { nombre: 'Administrador', usuario: 'admin', clave: 'anais2026' }
];

let cuentasRegistradas = JSON.parse(localStorage.getItem('anais_cuentas')) || cuentasDefault;

const btnAdminNav = document.getElementById('btnAbrirAdmin');
const modalAdmin = document.getElementById('modalAdmin');
const btnCerrarModal = document.getElementById('btnCerrarModal');
const vistaLogin = document.getElementById('vistaLogin');
const vistaPanel = document.getElementById('vistaPanel');

const tabLogin = document.getElementById('tabLogin');
const tabRegistro = document.getElementById('tabRegistro');
const formLogin = document.getElementById('formLogin');
const formRegistro = document.getElementById('formRegistro');
const errorLogin = document.getElementById('errorLogin');
const msgRegistro = document.getElementById('msgRegistro');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const listaAdminProductos = document.getElementById('listaAdminProductos');

// Cambiar entre pestaña Iniciar Sesión y Crear Cuenta
tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('activa');
  tabRegistro.classList.remove('activa');
  formLogin.classList.remove('oculto');
  formRegistro.classList.add('oculto');
  errorLogin.textContent = '';
});

tabRegistro.addEventListener('click', () => {
  tabRegistro.classList.add('activa');
  tabLogin.classList.remove('activa');
  formRegistro.classList.remove('oculto');
  formLogin.classList.add('oculto');
  msgRegistro.textContent = '';
});

// Verificar sesión activa y actualizar botón de la barra
function verificarSesion() {
  const usuarioActivo = JSON.parse(localStorage.getItem('anais_usuario_activo'));

  if (usuarioActivo) {
    btnAdminNav.textContent = `Hola, ${usuarioActivo.nombre}`;
    vistaLogin.classList.add('oculto');
    vistaPanel.classList.remove('oculto');
    renderizarPanelAdmin();
  } else {
    btnAdminNav.textContent = 'Mi Cuenta';
    vistaLogin.classList.remove('oculto');
    vistaPanel.classList.add('oculto');
  }
}

verificarSesion();

btnAdminNav.addEventListener('click', () => {
  verificarSesion();
  modalAdmin.classList.add('abierto');
});

btnCerrarModal.addEventListener('click', () => {
  modalAdmin.classList.remove('abierto');
  errorLogin.textContent = '';
  msgRegistro.textContent = '';
});

// Iniciar sesión con cuenta existente
formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('usuarioAdmin').value.trim();
  const pass = document.getElementById('claveAdmin').value.trim();

  const cuentaEncontrada = cuentasRegistradas.find(
    (c) => c.usuario.toLowerCase() === user.toLowerCase() && c.clave === pass
  );

  if (cuentaEncontrada) {
    localStorage.setItem('anais_usuario_activo', JSON.stringify(cuentaEncontrada));
    errorLogin.textContent = '';
    formLogin.reset();
    verificarSesion();
  } else {
    errorLogin.textContent = 'Usuario o contraseña incorrectos.';
  }
});

// Registrar cuenta nueva e iniciar sesión automáticamente
formRegistro.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nuevoNombre').value.trim();
  const usuario = document.getElementById('nuevoUsuario').value.trim();
  const clave = document.getElementById('nuevaClave').value.trim();

  const yaExiste = cuentasRegistradas.some(
    (c) => c.usuario.toLowerCase() === usuario.toLowerCase()
  );

  if (yaExiste) {
    msgRegistro.textContent = 'Ese nombre de usuario ya está en uso.';
    return;
  }

  const nuevaCuenta = { nombre, usuario, clave };
  cuentasRegistradas.push(nuevaCuenta);
  localStorage.setItem('anais_cuentas', JSON.stringify(cuentasRegistradas));
  localStorage.setItem('anais_usuario_activo', JSON.stringify(nuevaCuenta));

  formRegistro.reset();
  verificarSesion();
});

// Cerrar sesión
btnCerrarSesion.addEventListener('click', () => {
  localStorage.removeItem('anais_usuario_activo');
  verificarSesion();
});

// Renderizar y guardar precios en el Panel Admin
function renderizarPanelAdmin() {
  listaAdminProductos.innerHTML = '';

  productos.forEach((prod) => {
    const fila = document.createElement('div');
    fila.classList.add('item-admin');

    fila.innerHTML = `
      <div class="item-admin-info">
        <strong>${prod.nombre}</strong>
      </div>
      <div class="item-admin-controles">
        <input type="text" class="input-precio-admin" id="precio-${prod.id}" value="${prod.precio}">
        <button type="button" class="btn-guardar-precio" data-id="${prod.id}">Guardar</button>
      </div>
    `;

    listaAdminProductos.appendChild(fila);
  });
}

listaAdminProductos.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-guardar-precio')) {
    const id = Number(e.target.dataset.id);
    const inputPrecio = document.getElementById(`precio-${id}`);
    const nuevoPrecio = inputPrecio.value.trim();

    if (nuevoPrecio !== '') {
      const producto = productos.find((p) => p.id === id);
      if (producto) {
        producto.precio = nuevoPrecio;
        guardarProductosStorage();
        mostrarProductos(productos);

        e.target.textContent = '¡Listo!';
        setTimeout(() => {
          e.target.textContent = 'Guardar';
        }, 1500);
      }
    }
  }
});
// Chatbot conversacional (Stylist IA)
const mensajesDiv = document.getElementById('chatMensajes');
const form = document.getElementById('formChat');
const input = document.getElementById('inputChat');

let paso = 0;
let datosPedido = {
  gusto: "",
  productoElegido: null,
  tipo: "",      // "por unidad" o "por mayor"
  cantidad: 1,
  color: "",     // "Dorado" o "Plateado"
  nombre: ""
};

// Evita que caracteres especiales rompan el HTML del chat
function sanitizarTexto(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Convierte precio "$45.000" a número 45000 y viceversa
function parsearPrecio(precioStr) {
  const limpio = String(precioStr).replace(/[^0-9]/g, '');
  return limpio ? Number(limpio) : 0;
}

function formatearCOP(valor) {
  return '$' + valor.toLocaleString('es-CO');
}

function obtenerInfoProducto(idProducto) {
  const prod = productos.find((p) => p.id === idProducto);
  return prod ? `<strong>${prod.nombre}</strong> (${prod.precio})` : "";
}

// Busca si el usuario mencionó algún arete real de los 11 del catálogo
function buscarProductoEnTexto(textoLimpio) {
  const palabrasIgnoradas = ['arete', 'aretes', 'de', 'el', 'la', 'los', 'las', 'un', 'una', 'para', 'con', 'quiero', 'cuanto', 'vale', 'precio'];
  return productos.find((prod) => {
    const nombreNorm = prod.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const tokens = nombreNorm.split(/\s+/).filter(t => t.length > 3 && !palabrasIgnoradas.includes(t));
    return tokens.some(token => textoLimpio.includes(token));
  });
}

function mostrarMensaje(htmlContenido, esIA) {
  const clase = esIA ? "mensaje mensaje-ia" : "mensaje mensaje-usuario";
  const burbuja = document.createElement('div');
  burbuja.className = clase;
  burbuja.innerHTML = htmlContenido;
  mensajesDiv.appendChild(burbuja);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
}

function reiniciarFlujo() {
  paso = 0;
  datosPedido = {
    gusto: "",
    productoElegido: null,
    tipo: "",
    cantidad: 1,
    color: "",
    nombre: ""
  };
}

// Extrae múltiples datos de una sola frase (estilo, mayor/unidad, cantidad, color)
function extraerIntenciones(texto) {
  // 1. Detectar producto específico del catálogo
  const prodMencionado = buscarProductoEnTexto(texto);
  if (prodMencionado) {
    datosPedido.productoElegido = prodMencionado;
    datosPedido.gusto = `${prodMencionado.nombre} (${prodMencionado.precio})`;
  }

  // 2. Detectar estilo u ocasión si aún no hay gusto definido
  if (!datosPedido.gusto) {
    if (texto.includes("redondo") || texto.includes("cara") || texto.includes("rostro")) {
      datosPedido.gusto = "Aretes largos estilizados para rostro redondo";
    } else if (texto.includes("noche") || texto.includes("fiesta") || texto.includes("elegante") || texto.includes("gala")) {
      datosPedido.gusto = "Aretes brillantes elegantes para evento de noche";
    } else if (texto.includes("diario") || texto.includes("sutil") || texto.includes("pequeno") || texto.includes("regalo")) {
      datosPedido.gusto = "Aretes delicados para uso diario / regalo";
    }
  }

  // 3. Detectar modalidad (por mayor vs por unidad)
  if (texto.includes("mayor") || texto.includes("mayorista") || texto.includes("docena")) {
    datosPedido.tipo = "por mayor";
  } else if (texto.includes("unidad") || texto.includes("un par") || texto.includes("solo uno") || texto.includes("personal")) {
    datosPedido.tipo = "por unidad";
    if (!datosPedido.cantidad || datosPedido.cantidad < 1) datosPedido.cantidad = 1;
  }

  // 4. Detectar cantidad numérica (ej: "6 pares", "12", "docena")
  if (texto.includes("docena")) {
    datosPedido.cantidad = 12;
    datosPedido.tipo = "por mayor";
  } else {
    const matchNumero = texto.match(/\b(\d+)\b/);
    if (matchNumero) {
      const num = parseInt(matchNumero[1], 10);
      if (num > 0 && num <= 500) {
        datosPedido.cantidad = num;
        if (num >= 6) datosPedido.tipo = "por mayor";
        else if (!datosPedido.tipo) datosPedido.tipo = "por unidad";
      }
    }
  }

  // 5. Detectar acabado/color
  if (texto.includes("dorado") || texto.includes("dorada") || texto.includes("oro")) {
    datosPedido.color = "Dorado";
  } else if (texto.includes("plateado") || texto.includes("plateada") || texto.includes("plata")) {
    datosPedido.color = "Plateado";
  }
}

function generarTicketWhatsApp(nombreCliente) {
  datosPedido.nombre = nombreCliente;
  const estiloFinal = datosPedido.gusto || "Asesoría personalizada de catálogo";
  const modalidadFinal = datosPedido.tipo || "por unidad";
  const cantFinal = datosPedido.cantidad || 1;
  const colorFinal = datosPedido.color || "Dorado";

  // Cálculo estimado si eligió un producto concreto
  let textoEstimado = "";
  if (datosPedido.productoElegido) {
    const unitario = parsearPrecio(datosPedido.productoElegido.precio);
    let total = unitario * cantFinal;
    if (modalidadFinal === "por mayor" && cantFinal >= 6) {
      total = Math.round(total * 0.85); // 15% dcto mayorista
      textoEstimado = ` (Estimado con 15% dcto mayorista: ${formatearCOP(total)})`;
    } else {
      textoEstimado = ` (Estimado: ${formatearCOP(total)})`;
    }
  }

  const mensajeWhats = `Hola Anais Bisutería 💖 Soy ${nombreCliente}, vengo de tu tienda web.\n• Pedido: ${modalidadFinal} (${cantFinal} ${cantFinal === 1 ? 'par' : 'pares'})\n• Diseño: ${estiloFinal}\n• Acabado: ${colorFinal}${textoEstimado}\n¿Me confirmas disponibilidad para cerrar el pedido?`;
  const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhats)}`;

  const resumenHTML = `
    ¡Listo, <strong>${sanitizarTexto(nombreCliente)}</strong>! ✨ Aquí tienes tu cotización lista:<br>
    • <strong>Diseño:</strong> ${estiloFinal}<br>
    • <strong>Modalidad:</strong> ${modalidadFinal} (${cantFinal} ${cantFinal === 1 ? 'par' : 'pares'})<br>
    • <strong>Acabado:</strong> ${colorFinal}${textoEstimado ? `<br>• <strong>Total aprox:</strong> ${textoEstimado.replace(/[()]/g, '')}` : ''}
    <a href="${link}" target="_blank" style="display:block; text-align:center; margin-top:10px; padding:11px; background:#25D366; color:#fff; font-weight:700; text-decoration:none; border-radius:20px;">💬 Enviar pedido a WhatsApp</a>
  `;

  mostrarMensaje(resumenHTML, true);
  reiniciarFlujo();
  return "¿Quieres cotizar otro diseño o preguntarme algo más del catálogo? 💖";
}

function responderIA(textoOriginal) {
  const texto = textoOriginal
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  // Comandos globales que funcionan en CUALQUIER momento sin romper el flujo
  if (texto === "reiniciar" || texto === "cancelar" || texto === "empezar de nuevo" || texto === "borrar") {
    reiniciarFlujo();
    return "¡Conversación reiniciada! ✨ Cuéntame qué estilo de aretes buscas hoy o pregúntame por cualquier diseño del catálogo.";
  }

  if (texto.includes("cuidado") || texto.includes("material") || texto.includes("acero") || texto.includes("danan") || texto.includes("mojar")) {
    return "Nuestros aretes son elaborados a mano con herrajes en <strong>acero inoxidable y bisutería fina</strong> ✨. Tip: evita aplicarles perfume directo y guárdalos en su bolsita individual. " +
      (paso > 0 ? "¿Seguimos con tu pedido? Dime lo que te pedí arriba o escribe <em>reiniciar</em>." : "¿Te gustaría cotizar algún diseño por unidad o al por mayor?");
  }

  if (texto.includes("catalogo") || texto.includes("cuales tienen") || texto.includes("modelos") || texto.includes("precios")) {
    const listaRapida = productos.slice(0, 5).map(p => `• ${p.nombre}: <strong>${p.precio}</strong>`).join("<br>");
    return `Tenemos <strong>${productos.length} diseños artesanales</strong> disponibles. Algunos favoritos:<br>${listaRapida}<br>Puedes preguntarme por cualquiera por su nombre o decirme qué ocasión tienes 💖`;
  }

  // Si estamos en el paso final esperando únicamente el nombre del cliente
  if (paso === 4) {
    const nombreLimpio = textoOriginal.replace(/^(me llamo|soy|mi nombre es)\s+/i, "").trim();
    if (nombreLimpio.length < 2) {
      return "Porfa dime tu nombre para ponerlo en tu orden de WhatsApp 😊";
    }
    return generarTicketWhatsApp(nombreLimpio);
  }

  // Analizar todo lo que dijo el usuario en esta frase
  extraerIntenciones(texto);

  // Si en paso 0 escribió algo libre (ej. "quiero unos aretes bonitos") sin palabra clave
  if (paso === 0 && !datosPedido.gusto) {
    datosPedido.gusto = sanitizarTexto(textoOriginal);
  }

  // Máquina de estados inteligente: solo pregunta lo que REALMENTE falta
  if (!datosPedido.tipo) {
    paso = 1;
    if (datosPedido.productoElegido) {
      return `¡Excelente elección! Los <strong>${datosPedido.productoElegido.nombre}</strong> están en <strong>${datosPedido.productoElegido.precio}</strong> (${datosPedido.productoElegido.descripcion}) ✨ ¿Los quieres <strong>por unidad</strong> o <strong>al por mayor</strong> (15% dcto desde 6 pares)?`;
    }
    if (texto.includes("redondo")) {
      return `Para rostro redondo te estilizan muchísimo los diseños largos como ${obtenerInfoProducto(2)} o ${obtenerInfoProducto(10)} 💖 ¿Tu pedido sería <strong>por unidad</strong> o <strong>al por mayor</strong>?`;
    }
    if (texto.includes("noche") || texto.includes("fiesta") || texto.includes("elegante")) {
      return `Para evento de noche brillan increíble los ${obtenerInfoProducto(7)} y los ${obtenerInfoProducto(11)} ✨ ¿Los deseas <strong>por unidad</strong> o <strong>al por mayor</strong>?`;
    }
    return `¡Me encanta! Anotado: <em>${datosPedido.gusto}</em> 💖 ¿Tu pedido sería <strong>por unidad</strong> o <strong>al por mayor</strong> (con descuento desde 6 pares)?`;
  }

  if (datosPedido.tipo === "por mayor" && (!datosPedido.cantidad || datosPedido.cantidad < 2)) {
    paso = 2;
    return "¡Genial! Al por mayor tienes <strong>15% de descuento desde 6 pares</strong> 💖 ¿Cuántos pares quieres cotizar?";
  }

  if (!datosPedido.color) {
    paso = 3;
    return `¡Perfecto (${datosPedido.tipo}, ${datosPedido.cantidad} ${datosPedido.cantidad === 1 ? 'par' : 'pares'})! ✨ ¿Los prefieres en acabado <strong>dorado</strong> o <strong>plateado</strong>?`;
  }

  // Si ya tiene gusto, tipo, cantidad y color (incluso si lo dijo todo en el primer mensaje)
  paso = 4;
  return `¡Ya tengo casi todo listo (${datosPedido.gusto}, ${datosPedido.tipo}, acabado ${datosPedido.color})! ✨ ¿Me dices <strong>tu nombre</strong> para generarte el ticket directo a WhatsApp?`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const textoCrudo = input.value.trim();
  if (!textoCrudo) return;

  mostrarMensaje(sanitizarTexto(textoCrudo), false);
  input.value = "";

  setTimeout(() => {
    try {
      const respuesta = responderIA(textoCrudo);
      if (respuesta) mostrarMensaje(respuesta, true);
    } catch (err) {
      reiniciarFlujo();
      mostrarMensaje("¡Ups! Me emocioné mucho procesando eso 😅 Empecemos de nuevo: ¿qué estilo de aretes buscas hoy?", true);
    }
  }, 400);
});

document.querySelectorAll('.chip-sugerencia').forEach(boton => {
  boton.addEventListener('click', () => {
    reiniciarFlujo(); // Al tocar un chip de sugerencia, inicia consulta limpia
    input.value = boton.getAttribute('data-pregunta');
    form.dispatchEvent(new Event('submit'));
  });
});