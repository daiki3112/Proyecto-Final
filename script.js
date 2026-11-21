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
let productos = JSON.parse(localStorage.getItem('anelpg_productos')) || productosIniciales;

function guardarProductosStorage() {
  localStorage.setItem('anelpg_productos', JSON.stringify(productos));
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

  let textoPedido = `Hola Anelpg Bisutería, soy ${nombre}. `;
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
  { nombre: 'Administrador', usuario: 'admin', clave: 'anelpg2026' }
];

let cuentasRegistradas = JSON.parse(localStorage.getItem('anelpg_cuentas')) || cuentasDefault;

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
  const usuarioActivo = JSON.parse(localStorage.getItem('anelpg_usuario_activo'));

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
    localStorage.setItem('anelpg_usuario_activo', JSON.stringify(cuentaEncontrada));
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
  localStorage.setItem('anelpg_cuentas', JSON.stringify(cuentasRegistradas));
  localStorage.setItem('anelpg_usuario_activo', JSON.stringify(nuevaCuenta));

  formRegistro.reset();
  verificarSesion();
});

// Cerrar sesión
btnCerrarSesion.addEventListener('click', () => {
  localStorage.removeItem('anelpg_usuario_activo');
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
// Pantalla de carga / introducción
window.addEventListener('load', () => {
  const pantallaCarga = document.getElementById('pantallaCarga');
  if (pantallaCarga) {
    setTimeout(() => {
      pantallaCarga.classList.add('oculta');
    }, 1900);
  }
});