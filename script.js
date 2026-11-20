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
    btnAdminNav.textContent = 'Admin';
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
// Chatbot conversacional por pasos (Stylist IA)
const mensajesDiv = document.getElementById('chatMensajes');
const form = document.getElementById('formChat');
const input = document.getElementById('inputChat');

let paso = 0;
let datosPedido = {
  gusto: "",
  tipo: "", // unidad o mayor
  cantidad: "",
  color: "",
};

function mostrarMensaje(texto, esIA) {
  let clase = esIA ? "mensaje mensaje-ia" : "mensaje mensaje-usuario";
  mensajesDiv.innerHTML += `<div class="${clase}">${texto}</div>`;
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
}

function responderIA(textoUsuario) {
  let texto = textoUsuario.toLowerCase();

  // Paso 0: Qué busca
  if (paso === 0) {
    if (texto.includes("redondo")) {
      datosPedido.gusto = "Aretes para rostro redondo";
      paso = 1;
      return "¡Perfecto! Para rostro redondo te recomiendo aretes largos y delgados, te hacen ver la cara más alargada 💖 ¿Tu pedido sería por unidad o por mayor?";
    }
    if (texto.includes("noche") || texto.includes("fiesta") || texto.includes("elegante")) {
      datosPedido.gusto = "Aretes elegantes para fiesta de noche";
      paso = 1;
      return "Para fiesta de noche te recomiendo aretes largos con brillo, dorados o plateados ✨ ¿Tu pedido sería por unidad o por mayor?";
    }
    if (texto.includes("cuidado") || texto.includes("material")) {
      return "Nuestros aretes son en acero y bisutería fina. No los mojes con perfume y guárdalos en su bolsita. ¿Quieres hacer un pedido? ¿Sería por unidad o por mayor?";
    }
    datosPedido.gusto = textoUsuario;
    paso = 1;
    return "¡Me encanta! Cuéntame, ¿tu pedido sería por unidad o por mayor?";
  }

  // Paso 1: Unidad o mayor
  if (paso === 1) {
    if (texto.includes("mayor")) {
      datosPedido.tipo = "por mayor";
      paso = 2;
      return "¡Genial! Por mayor te hacemos precio especial desde 6 pares 💖 ¿Cuántos pares quieres?";
    }
    if (texto.includes("unidad") || texto.includes("un par") || texto.includes("uno")) {
      datosPedido.tipo = "por unidad";
      datosPedido.cantidad = "1 par";
      paso = 3;
      return "¡Perfecto por unidad! Ahora dime, ¿los quieres dorados o plateados?";
    }
    return "¿Sería por unidad o por mayor? Por mayor te sale más económico 💖";
  }

  // Paso 2: Cantidad si es por mayor
  if (paso === 2) {
    datosPedido.cantidad = textoUsuario;
    paso = 3;
    return `¡Listo! ${textoUsuario} pares por mayor, te va a salir súper bien. ¿Los quieres dorados o plateados?`;
  }

  // Paso 3: Color dorado o plateado
  if (paso === 3) {
    if (texto.includes("dorado") || texto.includes("oro")) {
      datosPedido.color = "Dorado";
      paso = 4;
      return "¡Uff, los dorados se ven hermosos! ✨ ¿Me dices tu nombre para mandarte a WhatsApp y darte el precio?";
    }
    if (texto.includes("plateado") || texto.includes("plata") || texto.includes("plateada")) {
      datosPedido.color = "Plateado";
      paso = 4;
      return "¡Los plateados son súper elegantes! ✨ ¿Me dices tu nombre para mandarte a WhatsApp y darte el precio?";
    }
    return "¿Los quieres dorados o plateados? Los dos se ven divinos 💖";
  }

  // Paso 4: Nombre y mandar a WhatsApp
  if (paso === 4) {
    let nombre = textoUsuario;
    let mensajeWhats = `Hola Anais 💖 Soy ${nombre}, vengo de tu página web. Quiero hacer un pedido ${datosPedido.tipo}. Me gustó: ${datosPedido.gusto}. Cantidad: ${datosPedido.cantidad}. Color: ${datosPedido.color}. ¿Me ayudas con el precio y disponibilidad?`;
    let link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhats)}`;

    mostrarMensaje(`¡Listo ${nombre}! Te preparé tu pedido en ${datosPedido.color}, dale clic para hablarme por WhatsApp 💬`, true);
    mensajesDiv.innerHTML += `<a href="${link}" target="_blank" style="display:block; text-align:center; margin:10px; padding:10px; background:#25D366; color:white; text-decoration:none; border-radius:20px;">Ir a WhatsApp y hacer mi pedido</a>`;
    paso = 0;
    datosPedido = { gusto: "", tipo: "", cantidad: "", color: "" };
    return "Si quieres hacer otro pedido, solo escríbeme de nuevo 💖";
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let texto = input.value.trim();
  if (texto == "") return;

  mostrarMensaje(texto, false);
  input.value = "";

  setTimeout(() => {
    let respuesta = responderIA(texto);
    mostrarMensaje(respuesta, true);
  }, 500);
});

document.querySelectorAll('.chip-sugerencia').forEach(boton => {
  boton.addEventListener('click', () => {
    input.value = boton.getAttribute('data-pregunta');
    form.dispatchEvent(new Event('submit'));
  });
});