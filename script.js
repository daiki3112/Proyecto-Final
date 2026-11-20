const productosIniciales = [
  {
    id: 1,
    nombre: "Arete Flor de oro",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Arete mediano, Con detalles en azul marino, ideales para uso diario.",
    imagen: "img/arete1.jpg"
  },
  {
    id: 2,
    nombre: "Arete de perla negra",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Aretes largos con perlas negras y acabados dorados.",
    imagen: "img/arete2.jpg"
  },
  {
    id: 3,
    nombre: "Aretes torbellino colorido",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Aretes medianos con un torbellino de colores en medio, ideal para eventos.",
    imagen: "img/arete3.jpg"
  },
  {
    id: 4,
    nombre: "Aretes Florares dorados",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Diseño inspirado en un campo brillante de flores, util para todo estilo",
    imagen: "img/arete4.jpg"
  },
  {
    id: 5,
    nombre: "Aretes vitrales",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Aretes pequeños con un acabado que recuerda a los clasicos vitrales",
    imagen: "img/arete5.jpg"
  },
  {
    id: 6,
    nombre: "Aretes girasol",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Pequeños y cómodos, perfectos para un toque sutil y femenino.",
    imagen: "img/arete6.jpg"
  },
  {
    id: 7,
    nombre: "Aretes Atardecer",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Un duo hecho para destacar de una manera elegante.",
    imagen: "img/arete7.jpg"
  },
  {
    id: 8,
    nombre: "Aretes Medialuna",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Pequeños aretes en forma de media luna.",
    imagen: "img/arete8.jpg"
  },
  {
    id: 9,
    nombre: "Aretes Silvestres",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Inspirados en pétalos naturales para recordar buenos momentos.",
    imagen: "img/arete9.jpg"
  },
  {
    id: 10,
    nombre: "Aretes Perla Colgante",
    categoria: "Aretes",
    precio: "$--",
    descripcion: "Aretes clasicos con un lindo acabado dorado",
    imagen: "img/arete10.jpg"
  },
  {
    id: 11,
    nombre: "Aretes Hamaca",
    categoria: "Aretes",
    precio: "$--",
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