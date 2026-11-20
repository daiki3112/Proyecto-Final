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

// Cargar todos los productos al abrir la tienda
mostrarProductos(productosIniciales);

// Numero de WhatsApp de la tienda (cambia este numero por el tuyo)
const numeroWhatsApp = '573212289682';

const inputProducto = document.getElementById('productoInteres');
const formContacto = document.getElementById('formContacto');
const estadoForm = document.getElementById('estadoForm');

// Autocompletar el formulario al dar clic en "Lo quiero"
gridProductos.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-pedir')) {
    const idSeleccionado = Number(e.target.dataset.id);
    const areteElegido = productosIniciales.find(item => item.id === idSeleccionado);

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