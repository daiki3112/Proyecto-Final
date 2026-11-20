const productosIniciales = [
  {
    id: 1,
    nombre: "Argollas Sol Dorado",
    categoria: "argollas",
    precio: "$--",
    descripcion: "Argollas medianas con baño en oro golfi, ligeras para uso diario.",
    imagen: "img/arete1.jpg"
  },
  {
    id: 2,
    nombre: "Cascada Perla Natural",
    categoria: "largos",
    precio: "$--",
    descripcion: "Aretes largos con perlas de río y detalle delicado en acero.",
    imagen: "img/arete2.jpg"
  },
  {
    id: 3,
    nombre: "Topos Estrella Minimal",
    categoria: "topos",
    precio: "$--",
    descripcion: "Topos pequeños en forma de estrella con cierre hipoalergénico.",
    imagen: "img/arete3.jpg"
  },
  {
    id: 4,
    nombre: "Argollas Trenzadas Vintage",
    categoria: "argollas",
    precio: "$--",
    descripcion: "Diseño trenzado texturizado ideal para combinar con cualquier outfit.",
    imagen: "img/arete4.jpg"
  },
  {
    id: 5,
    nombre: "Gota de Cristal Boho",
    categoria: "largos",
    precio: "$--",
    descripcion: "Aretes colgantes con piedra translúcida y acabado artesanal.",
    imagen: "img/arete5.jpg"
  },
  {
    id: 6,
    nombre: "Topos Corazón Delicado",
    categoria: "topos",
    precio: "$--",
    descripcion: "Pequeños y cómodos, perfectos para un toque sutil y femenino.",
    imagen: "img/arete6.jpg"
  },
  {
    id: 7,
    nombre: "Argollas Doble Aro",
    categoria: "argollas",
    precio: "$--",
    descripcion: "Doble aro entrelazado con brillo suave y peso ultra liviano.",
    imagen: "img/arete7.jpg"
  },
  {
    id: 8,
    nombre: "Hilos de Luna",
    categoria: "largos",
    precio: "$--",
    descripcion: "Cadenas finas colgantes con dije de media luna en la punta.",
    imagen: "img/arete8.jpg"
  },
  {
    id: 9,
    nombre: "Topos Flor Silvestre",
    categoria: "topos",
    precio: "$--",
    descripcion: "Inspirados en pétalos naturales con centro brillante.",
    imagen: "img/arete9.jpg"
  },
  {
    id: 10,
    nombre: "Argollas Perla Colgante",
    categoria: "argollas",
    precio: "$--",
    descripcion: "Argolla clásica con una perla desmontable para usar de dos formas.",
    imagen: "img/arete10.jpg"
  },
  {
    id: 11,
    nombre: "Abanico Tejido Artesanal",
    categoria: "largos",
    precio: "$--",
    descripcion: "Tejido a mano en tonos cálidos para eventos y ocasiones especiales.",
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