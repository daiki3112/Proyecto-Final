const { useState, useEffect, useRef } = React;

const NUMERO_WHATSAPP = '573212289682';
const URL_BACKEND_CHAT = 'https://proyecto-final-bvf1.onrender.com/chat';

const PRODUCTOS_INICIALES = [
  { id: 1, nombre: "Arete Flor de oro", categoria: "Uso Diario", precio: "$45.000", descripcion: "Arete mediano, con detalles en azul marino, ideales para uso diario.", imagen: "img/arete1.jpg" },
  { id: 2, nombre: "Arete de perla negra", categoria: "Eventos y Noche", precio: "$40.000", descripcion: "Aretes largos con perlas negras y acabados dorados.", imagen: "img/arete2.jpg" },
  { id: 3, nombre: "Aretes torbellino colorido", categoria: "Eventos y Noche", precio: "$35.000", descripcion: "Aretes medianos con un torbellino de colores en medio, ideal para eventos.", imagen: "img/arete3.jpg" },
  { id: 4, nombre: "Aretes Florares dorados", categoria: "Clásicos", precio: "$30.000", descripcion: "Diseño inspirado en un campo brillante de flores, útil para todo estilo.", imagen: "img/arete4.jpg" },
  { id: 5, nombre: "Aretes vitrales", categoria: "Uso Diario", precio: "$35.000", descripcion: "Aretes pequeños con un acabado que recuerda a los clásicos vitrales.", imagen: "img/arete5.jpg" },
  { id: 6, nombre: "Aretes girasol", categoria: "Uso Diario", precio: "$45.000", descripcion: "Pequeños y cómodos, perfectos para un toque sutil y femenino.", imagen: "img/arete6.jpg" },
  { id: 7, nombre: "Aretes Atardecer", categoria: "Eventos y Noche", precio: "$50.000", descripcion: "Un dúo hecho para destacar de una manera elegante.", imagen: "img/arete7.jpg" },
  { id: 8, nombre: "Aretes Medialuna", categoria: "Uso Diario", precio: "$20.000", descripcion: "Pequeños aretes en forma de media luna.", imagen: "img/arete8.jpg" },
  { id: 9, nombre: "Aretes Silvestres", categoria: "Clásicos", precio: "$25.000", descripcion: "Inspirados en pétalos naturales para recordar buenos momentos.", imagen: "img/arete9.jpg" },
  { id: 10, nombre: "Aretes Perla Colgante", categoria: "Clásicos", precio: "$55.000", descripcion: "Aretes clásicos con un lindo acabado dorado.", imagen: "img/arete10.jpg" },
  { id: 11, nombre: "Aretes Hamaca", categoria: "Clásicos", precio: "$40.000", descripcion: "Lindos y clásicos para ocasiones especiales.", imagen: "img/arete11.jpg" },
  { id: 12, nombre: "Aretes Atrapasueños Azul", categoria: "Eventos y Noche", precio: "$48.000", descripcion: "Tejidos a mano en degradé azul celeste, rey y negro con flecos largos.", imagen: "img/arete12.jpeg" },
  { id: 13, nombre: "Aretes Cascada Coral", categoria: "Eventos y Noche", precio: "$52.000", descripcion: "Diseño floral largo en tonos blanco, rosa pastel y coral vibrante.", imagen: "img/arete13.jpeg" },
  { id: 14, nombre: "Aretes Orquídea Blanca", categoria: "Clásicos", precio: "$45.000", descripcion: "Orquídea artesanal blanca con bordes fucsia y centro amarillo.", imagen: "img/arete14.jpeg" },
  { id: 15, nombre: "Aretes Estrella Marfil", categoria: "Eventos y Noche", precio: "$50.000", descripcion: "Doble flor geométrica en tono marfil y bordes dorados con centro perlado.", imagen: "img/arete15.jpeg" },
  { id: 16, nombre: "Aretes Trío Tropical", categoria: "Eventos y Noche", precio: "$55.000", descripcion: "Tres flores escalonadas en amarillo, rosa y turquesa con topo de hoja dorada.", imagen: "img/arete16.jpeg" },
  { id: 17, nombre: "Aretes Flor Turquesa", categoria: "Eventos y Noche", precio: "$48.000", descripcion: "Flor volumétrica en tono turquesa con flecos y puntas naranja.", imagen: "img/arete17.jpeg" },
  { id: 18, nombre: "Aretes Pétalos Contraste", categoria: "Clásicos", precio: "$42.000", descripcion: "Flor tejida en blanco y negro con elegante bastón superior dorado.", imagen: "img/arete18.jpeg" },
  { id: 19, nombre: "Aretes Cayena Naranja", categoria: "Uso Diario", precio: "$40.000", descripcion: "Flor tropical en naranja intenso con pistilos dorados hechos a mano.", imagen: "img/arete19.jpeg" },
  { id: 20, nombre: "Aretes Lirio Cristal", categoria: "Clásicos", precio: "$45.000", descripcion: "Diseño floral calado disponible en acabado plateado cristal o dorado.", imagen: "img/arete20.jpeg" },
  { id: 21, nombre: "Aretes Hoja Plateada", categoria: "Uso Diario", precio: "$38.000", descripcion: "Delicada hoja tejida en tonos plata brillante con detalle central dorado.", imagen: "img/arete21.jpeg" },
  { id: 22, nombre: "Aretes Flor Nocturna", categoria: "Eventos y Noche", precio: "$42.000", descripcion: "Elegante flor negra en mostacilla con centro dorado para looks de gala.", imagen: "img/arete22.jpeg" },
  { id: 23, nombre: "Aretes Hibisco Dorado", categoria: "Eventos y Noche", precio: "$50.000", descripcion: "Flor colgante amarilla con detalles dorados y perla central.", imagen: "img/arete23.jpeg" },
  { id: 24, nombre: "Aretes Flor Solar", categoria: "Uso Diario", precio: "$38.000", descripcion: "Flor mediana en amarillo vibrante con centro dorado ideal para el día.", imagen: "img/arete24.jpeg" }
];

const CUENTAS_DEFAULT = [
  { nombre: 'Administrador', usuario: 'admin', clave: 'anelpg2026' }
];

function parsearPrecio(texto) {
  return Number(String(texto).replace(/[^0-9]/g, '')) || 0;
}

function formatearPesos(valor) {
  return '$' + valor.toLocaleString('es-CO');
}

// ================= MOTOR INTELIGENTE SOBRE LOS 24 ARETES =================
function obtenerRespuestaInteligente24(pregunta, productos = PRODUCTOS_INICIALES) {
  const q = pregunta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const palabras = q.split(/\s+/).filter((w) => w.length > 3 && !['para', 'unos', 'unas', 'aretes', 'arete', 'tienen', 'busco', 'quiero', 'cuales', 'como', 'mejor'].includes(w));
  const coincidencias = productos.filter((p) => {
    const textoProd = `${p.nombre} ${p.descripcion} ${p.categoria}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return palabras.some((pal) => textoProd.includes(pal));
  });

  if (coincidencias.length > 0) {
    const top = coincidencias.slice(0, 3).map((p) => `• ${p.nombre} (${p.precio}): ${p.descripcion}`).join('\n');
    return `¡Mira estas opciones de nuestra colección de 24 diseños que encajan con lo que buscas! ✨\n\n${top}\n\n¿Te gustaría agregar alguno al carrito o pedirlo por WhatsApp? 💖`;
  }

  if (q.includes('redondo') || q.includes('rostro') || q.includes('alargar')) {
    return 'Para rostro redondo los diseños largos y estilizados quedan divinos: te recomiendo Aretes Atrapasueños Azul ($48.000), Aretes Cascada Coral ($52.000) o Arete de perla negra ($40.000). ✨';
  }
  if (q.includes('noche') || q.includes('fiesta') || q.includes('gala') || q.includes('boda') || q.includes('grado')) {
    return 'Para eventos de noche tenemos joyas espectaculares como Aretes Flor Nocturna ($42.000), Aretes Estrella Marfil ($50.000), Aretes Trío Tropical ($55.000) y Aretes Hibisco Dorado ($50.000). 🌙';
  }
  if (q.includes('barato') || q.includes('economico') || q.includes('precio') || q.includes('presupuesto')) {
    return 'Tenemos 24 referencias desde $20.000 (Aretes Medialuna) y $25.000 (Aretes Silvestres), hasta ediciones especiales de $55.000 como Aretes Trío Tropical y Aretes Perla Colgante. 🎁';
  }
  if (q.includes('todos') || q.includes('catalogo') || q.includes('cuantos')) {
    return 'Contamos con 24 diseños exclusivos tejidos a mano divididos en Uso Diario, Eventos y Noche, y Clásicos (desde la ref. #1 Arete Flor de oro hasta la #24 Aretes Flor Solar). 🌸';
  }

  return '¡Con gusto te asesoro! 💖 Tenemos 24 diseños tejidos a mano: para un look fresco te sugiero Aretes Cayena Naranja ($40.000) o Aretes Flor Solar ($38.000); para gala, Aretes Orquídea Blanca ($45.000) o Aretes Flor Turquesa ($48.000). Dime un color o evento y te doy la mejor opción.';
}

// ================= COMPONENTE: PANTALLA DE CARGA FLUIDA =================
function PantallaCarga({ oculta }) {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const inicio = setTimeout(() => setProgreso(100), 50);
    return () => clearTimeout(inicio);
  }, []);

  return (
    <div id="pantallaCarga" className={`pantalla-carga ${oculta ? 'oculta' : ''}`}>
      <div className="contenido-carga" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="img/Logo.jpeg" alt="Anelpg Bisutería" className="logo-carga" />
        <p className="texto-carga">Anelpg Bisutería · Artesanía Hecha a Mano</p>
        <div
          className="barra-carga-fondo"
          style={{
            width: '220px',
            height: '6px',
            backgroundColor: '#eadfd5',
            borderRadius: '10px',
            overflow: 'hidden',
            marginTop: '14px'
          }}
        >
          <div
            className="barra-carga-progreso"
            style={{
              height: '100%',
              width: `${progreso}%`,
              background: 'linear-gradient(90deg, #e89ca8, #c59b5f)',
              borderRadius: '10px',
              transition: 'width 1.6s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ================= COMPONENTE: BARRA DE NAVEGACIÓN =================
function Navbar({ totalItemsCarrito, onAbrirCarrito, onAbrirCuenta, usuarioActivo }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="navbar">
      <div className="contenedor nav-contenido">
        <a href="#inicio" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="img/Logo.jpeg" alt="Logo Anelpg" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
          <span>Anelpg Bisutería</span>
        </a>

        <button className="btn-menu" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Abrir menú">
          ☰
        </button>

        <nav className={`nav-links ${menuAbierto ? 'activo' : ''}`}>
          <a href="#inicio" onClick={() => setMenuAbierto(false)}>Inicio</a>
          <a href="#catalogo" onClick={() => setMenuAbierto(false)}>Catálogo</a>
          <a href="#asistente" onClick={() => setMenuAbierto(false)}>Asistente IA</a>
          <a href="#contacto" onClick={() => setMenuAbierto(false)}>Contacto</a>
          <button className="btn-principal" style={{ padding: '8px 16px' }} onClick={() => { setMenuAbierto(false); onAbrirCarrito(); }}>
            🛍️ Carrito ({totalItemsCarrito})
          </button>
          <button className="btn-admin-nav" onClick={() => { setMenuAbierto(false); onAbrirCuenta(); }}>
            {usuarioActivo ? `Hola, ${usuarioActivo.nombre}` : 'Mi Cuenta'}
          </button>
        </nav>
      </div>
    </header>
  );
}

// ================= COMPONENTE: CATÁLOGO DE PRODUCTOS =================
function Catalogo({ productos, onAgregarCarrito }) {
  const [filtro, setFiltro] = useState('Todos');
  const [agregadoId, setAgregadoId] = useState(null);

  const categorias = ['Todos', 'Uso Diario', 'Eventos y Noche', 'Clásicos'];
  const productosFiltrados = filtro === 'Todos'
    ? productos
    : productos.filter((p) => p.categoria === filtro);

  const manejarAgregar = (producto) => {
    onAgregarCarrito(producto);
    setAgregadoId(producto.id);
    setTimeout(() => setAgregadoId(null), 900);
  };

  return (
    <section id="catalogo" className="seccion">
      <div className="contenedor">
        <h2>Nuestra Colección ({productosFiltrados.length})</h2>
        <p className="subtitulo-seccion">Explora lindos diseños de bisutería artesanal hecha a mano, lista para tus mejores ocasiones.</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFiltro(cat)}
              className={filtro === cat ? 'btn-principal' : 'btn-admin-nav'}
              style={{ padding: '8px 18px', cursor: 'pointer' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid-productos">
          {productosFiltrados.map((producto) => (
            <article key={producto.id} className="tarjeta-producto">
              <img src={producto.imagen} alt={producto.nombre} className="img-producto" />
              <div className="info-producto">
                <span className="categoria-tag">{producto.categoria}</span>
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <div className="pie-tarjeta">
                  <span className="precio">{producto.precio}</span>
                  <button className="btn-pedir" onClick={() => manejarAgregar(producto)}>
                    {agregadoId === producto.id ? '¡Agregado! ✓' : 'Agregar al carrito 🛍️'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= COMPONENTE: STYLIST IA =================
function StylistIA({ productos }) {
  const mensajeInicial = {
    autor: 'ia',
    texto: '¡Hola! Soy la asesora virtual de Anelpg Bisutería. Conozco nuestros 24 diseños hechos a mano: pregúntame por colores, ocasiones, precios o tipo de rostro ✨',
    mostrarBotonWA: false
  };

  const [mensajes, setMensajes] = useState([mensajeInicial]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);
  const [charlaCerrada, setCharlaCerrada] = useState(false);

  const cajaMensajesRef = useRef(null);

  useEffect(() => {
    if (cajaMensajesRef.current) {
      cajaMensajesRef.current.scrollTop = cajaMensajesRef.current.scrollHeight;
    }
  }, [mensajes, cargando, charlaCerrada]);

  const sugerencias = [
    { label: 'Rostro redondo', pregunta: '¿Qué aretes me quedan mejor si tengo rostro redondo?' },
    { label: 'Aretes florales', pregunta: '¿Qué diseños de flores o girasol tienen?' },
    { label: 'Tonos azules o turquesa', pregunta: 'Busco aretes en color azul o turquesa' },
    { label: '¡Ya decidí, quiero pedir!', pregunta: 'Ya me decidí por unos aretes, quiero hacer mi pedido' }
  ];

  const reiniciarChat = () => {
    setMensajes([mensajeInicial]);
    setCharlaCerrada(false);
    setInput('');
  };

  const enviarMensaje = async (textoPregunta) => {
    const limpio = textoPregunta.trim();
    if (!limpio || cargando || charlaCerrada) return;

    setMensajes((prev) => [...prev, { autor: 'usuario', texto: limpio, mostrarBotonWA: false }]);
    setInput('');
    setCargando(true);

    const usuarioQuiereCerrar = /(quiero|añadir|agregar|carrito|pedir|pedido|comprar|decidi|decidí|listo|gracias|chao|adios|adiós|whatsapp)/i.test(limpio);

    try {
      const res = await fetch(URL_BACKEND_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: limpio,
          historial: mensajes
        })
      });
      if (!res.ok) throw new Error('Error en servidor');
      const datos = await res.json();
      let resp = datos.respuesta || obtenerRespuestaInteligente24(limpio, productos);

      const debeCerrar = usuarioQuiereCerrar || Boolean(datos.cerrarChat) || /(nos vemos en whatsapp|te espero en whatsapp|fue un gusto asesorarte|cualquier otra duda.*whatsapp|ya que lo pensaste.*whatsapp|hasta pronto)/i.test(resp);

      if (usuarioQuiereCerrar && !/(fue un gusto asesorarte|nos vemos allá)/i.test(resp)) {
        resp = '¡Listo, hermosa! 💖 Ya que lo pensaste y tienes claro tu pedido, toca el botón verde de aquí abajo para ir directo a WhatsApp y cerrarlo. ¡Fue un gusto asesorarte, nos vemos allá! ✨🌸';
      }

      const llevarAWhatsApp = debeCerrar || /whatsapp|nombre|pedido|carrito/i.test(resp);

      setMensajes((prev) => [...prev, { autor: 'ia', texto: resp, mostrarBotonWA: llevarAWhatsApp }]);
      if (debeCerrar) setCharlaCerrada(true);
    } catch (err) {
      const respLocal = usuarioQuiereCerrar
        ? '¡Listo, hermosa! 💖 Ya que lo pensaste y tienes claro tu pedido, toca el botón verde de aquí abajo para ir directo a WhatsApp y cerrarlo. ¡Fue un gusto asesorarte, nos vemos allá! ✨🌸'
        : obtenerRespuestaInteligente24(limpio, productos);

      setMensajes((prev) => [...prev, { autor: 'ia', texto: respLocal, mostrarBotonWA: true }]);
      if (usuarioQuiereCerrar) setCharlaCerrada(true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section id="asistente" className="seccion">
      <div className="contenedor">
        <h2>Stylist IA | Anelpg Bisutería</h2>
        <p className="subtitulo-seccion">¿No sabes qué pedir o cuál diseño elegir? Cuéntanos tu ocasión, color favorito o tipo de rostro y nuestra asesora virtual te recomienda entre nuestros 24 diseños.</p>

        <div className="chat-contenedor">
          <div className="chat-mensajes" ref={cajaMensajesRef} style={{ whiteSpace: 'pre-line', scrollBehavior: 'smooth' }}>
            {mensajes.map((m, idx) => (
              <React.Fragment key={idx}>
                <div className={`mensaje ${m.autor === 'ia' ? 'mensaje-ia' : 'mensaje-usuario'}`}>
                  {m.texto}
                </div>
                {m.mostrarBotonWA && (
                  <a
                    href={`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent('Hola Anelpg Bisutería 💖 Vengo de la asesoría de Stylist IA y ya elegí mis aretes para hacer mi pedido')}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'block', textAlign: 'center', margin: '10px', padding: '11px', background: '#25D366', color: 'white', fontWeight: 600, textDecoration: 'none', borderRadius: '20px' }}
                  >
                    Ir a WhatsApp y hacer mi pedido 💖
                  </a>
                )}
              </React.Fragment>
            ))}
            {cargando && <div className="mensaje mensaje-ia">Analizando los 24 diseños para ti... ✨</div>}
          </div>

          {!charlaCerrada ? (
            <>
              <div className="chat-sugerencias">
                {sugerencias.map((s) => (
                  <button key={s.label} type="button" className="chip-sugerencia" onClick={() => enviarMensaje(s.pregunta)}>
                    {s.label}
                  </button>
                ))}
              </div>

              <form className="chat-form" onSubmit={(e) => { e.preventDefault(); enviarMensaje(input); }}>
                <input
                  type