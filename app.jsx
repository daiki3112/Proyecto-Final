const { useState, useEffect } = React;

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

function obtenerRespuestaLocalIA(pregunta) {
  const q = pregunta.toLowerCase();
  if (q.includes('redondo') || q.includes('rostro')) {
    return 'Para rostro redondo te favorecen muchísimo los diseños largos que estilizan el cuello: te recomiendo los Aretes Atrapasueños Azul ($48.000), Aretes Cascada Coral ($52.000) o Aretes Estrella Marfil ($50.000). ✨';
  }
  if (q.includes('noche') || q.includes('fiesta') || q.includes('gala') || q.includes('boda')) {
    return 'Para eventos de noche destacan los Aretes Flor Nocturna ($42.000), Aretes Estrella Marfil ($50.000), Aretes Atardecer ($50.000) o los Aretes Hibisco Dorado ($50.000). 🌙';
  }
  if (q.includes('negro') || q.includes('oscuro')) {
    return 'Con vestido negro contrastan espectacular los Aretes Flor Turquesa ($48.000), Aretes Estrella Marfil ($50.000) o los Aretes Pétalos Contraste ($42.000). 🖤';
  }
  if (q.includes('regalo') || q.includes('precio') || q.includes('valen')) {
    return 'Nuestros 24 diseños tejidos a mano van desde $20.000 (Aretes Medialuna) hasta $55.000 (Aretes Trío Tropical y Perla Colgante), listos para regalo. 🎁';
  }
  return 'Ay, me quedé dormida un momentico despertando el servidor en Render 😅 Pero te recomiendo los Aretes Flor de oro ($45.000) para el día o los Aretes Estrella Marfil ($50.000) para gala. ¡Escríbenos por WhatsApp para pedir!';
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
function StylistIA() {
  const [mensajes, setMensajes] = useState([
    { autor: 'ia', texto: '¡Hola! Soy la asesora virtual de Anelpg Bisutería. ¿Buscas aretes para una ocasión especial o según la forma de tu rostro?', mostrarBotonWA: false }
  ]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);

  const sugerencias = [
    { label: 'Rostro redondo', pregunta: '¿Qué aretes me quedan mejor si tengo rostro redondo?' },
    { label: 'Evento de noche', pregunta: 'Busco algo elegante para una fiesta de noche' },
    { label: 'Outfit negro', pregunta: '¿Qué aretes combinan con vestido negro?' },
    { label: 'Regalos y precios', pregunta: '¿Qué opciones tienen para regalo y cuáles son los precios?' }
  ];

  const enviarMensaje = async (textoPregunta) => {
    const limpio = textoPregunta.trim();
    if (!limpio || cargando) return;

    setMensajes((prev) => [...prev, { autor: 'usuario', texto: limpio, mostrarBotonWA: false }]);
    setInput('');
    setCargando(true);

    try {
      const res = await fetch(URL_BACKEND_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: limpio })
      });
      if (!res.ok) throw new Error('Error en servidor');
      const datos = await res.json();
      const resp = datos.respuesta || obtenerRespuestaLocalIA(limpio);
      const llevarAWhatsApp = /whatsapp|nombre|pedido/i.test(resp);
      setMensajes((prev) => [...prev, { autor: 'ia', texto: resp, mostrarBotonWA: llevarAWhatsApp }]);
    } catch (err) {
      const respLocal = obtenerRespuestaLocalIA(limpio);
      setMensajes((prev) => [...prev, { autor: 'ia', texto: respLocal, mostrarBotonWA: true }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section id="asistente" className="seccion">
      <div className="contenedor">
        <h2>Stylist IA | Anelpg Bisutería</h2>
        <p className="subtitulo-seccion">¿No sabes qué pedir o cuál diseño elegir? Cuéntanos tu ocasión, estilo o tipo de rostro y nuestra asesora virtual te recomienda los aretes ideales para ti.</p>

        <div className="chat-contenedor">
          <div className="chat-mensajes">
            {mensajes.map((m, idx) => (
              <React.Fragment key={idx}>
                <div className={`mensaje ${m.autor === 'ia' ? 'mensaje-ia' : 'mensaje-usuario'}`}>
                  {m.texto}
                </div>
                {m.mostrarBotonWA && (
                  <a
                    href={`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent('Hola Anelpg Bisutería 💖 Vengo de tu página y quiero hacer un pedido')}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'block', textAlign: 'center', margin: '10px', padding: '10px', background: '#25D366', color: 'white', fontWeight: 600, textDecoration: 'none', borderRadius: '20px' }}
                  >
                    Ir a WhatsApp y hacer mi pedido 💖
                  </a>
                )}
              </React.Fragment>
            ))}
            {cargando && <div className="mensaje mensaje-ia">Estoy pensando tu look... ✨</div>}
          </div>

          <div className="chat-sugerencias">
            {sugerencias.map((s) => (
              <button key={s.label} type="button" className="chip-sugerencia" onClick={() => enviarMensaje(s.pregunta)}>
                {s.label}
              </button>
            ))}
          </div>

          <form className="chat-form" onSubmit={(e) => { e.preventDefault(); enviarMensaje(input); }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej: ¿Qué aretes combinan con vestido negro?..."
              required
            />
            <button type="submit" className="btn-enviar-chat">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ================= COMPONENTE: MODAL CARRITO =================
function CarritoModal({ abierto, onCerrar, carrito, onCambiarCantidad, onEliminar, onVaciar }) {
  const [nombreComprador, setNombreComprador] = useState('');
  const [metodoPago, setMetodoPago] = useState('Nequi');

  if (!abierto) return null;

  const total = carrito.reduce((acc, item) => acc + parsearPrecio(item.precio) * item.cantidad, 0);

  const finalizarCompra = () => {
    if (!nombreComprador.trim()) {
      alert('Por favor escribe tu nombre para preparar el envío 💖');
      return;
    }

    let detalle = '';
    carrito.forEach((item) => {
      const sub = parsearPrecio(item.precio) * item.cantidad;
      detalle += `• ${item.cantidad}x ${item.nombre} (${formatearPesos(sub)})\n`;
    });

    const msg = `¡Hola Anelpg Bisutería! 💖 Quiero confirmar mi compra:\n\n*Cliente:* ${nombreComprador}\n*Método de pago:* ${metodoPago}\n\n*Detalle del pedido:*\n${detalle}\n*Total a pagar:* ${formatearPesos(total)}`;
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
    onVaciar();
    onCerrar();
  };

  return (
    <div className="modal-fondo abierto">
      <div className="modal-caja" style={{ maxWidth: '520px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>🛍️ Tu Carrito de Compras</h3>
          <button onClick={onCerrar} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
        </div>

        {carrito.length === 0 ? (
          <p className="carrito-vacio-msg">Tu carrito está vacío 🛍️<br />Explora el catálogo y agrega tus aretes favoritos.</p>
        ) : (
          <>
            <div style={{ maxHeight: '260px', overflowY: 'auto', marginBottom: '15px' }}>
              {carrito.map((item) => (
                <div key={item.id} className="item-carrito">
                  <div className="item-carrito-info">
                    <img src={item.imagen} alt={item.nombre} className="item-carrito-img" />
                    <div>
                      <strong>{item.nombre}</strong>
                      <div style={{ fontSize: '0.85rem', color: '#7a6655' }}>{item.precio} c/u</div>
                    </div>
                  </div>
                  <div className="item-carrito-controles">
                    <button className="btn-cant" onClick={() => onCambiarCantidad(item.id, -1)}>-</button>
                    <span><strong>{item.cantidad}</strong></span>
                    <button className="btn-cant" onClick={() => onCambiarCantidad(item.id, 1)}>+</button>
                    <button className="btn-eliminar-item" onClick={() => onEliminar(item.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grupo-input">
              <label>Tu nombre para el envío</label>
              <input type="text" value={nombreComprador} onChange={(e) => setNombreComprador(e.target.value)} placeholder="Ej: Camila Pérez" />
            </div>

            <div className="grupo-input">
              <label>Método de pago</label>
              <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d8c7b8' }}>
                <option value="Nequi">Nequi</option>
                <option value="Daviplata">Daviplata</option>
                <option value="Transferencia Bancolombia">Transferencia Bancolombia</option>
                <option value="Pago contra entrega">Pago contra entrega</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px 0', fontSize: '1.1rem' }}>
              <strong>Total a pagar:</strong>
              <strong>{formatearPesos(total)}</strong>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-admin-nav" onClick={onVaciar}>Vaciar</button>
              <button className="btn-principal" style={{ flex: 1 }} onClick={finalizarCompra}>Confirmar por WhatsApp</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ================= COMPONENTE: MODAL MI CUENTA =================
function CuentaModal({ abierto, onCerrar, usuarioActivo, onLogin, onRegistro, onLogout, productos, onActualizarPrecio }) {
  const [modo, setModo] = useState('login');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [preciosEdit, setPreciosEdit] = useState({});

  if (!abierto) return null;

  const manejarLogin = (e) => {
    e.preventDefault();
    const ok = onLogin(usuario, clave);
    if (!ok) setMensaje('Usuario o contraseña incorrectos.');
    else { setMensaje(''); setUsuario(''); setClave(''); }
  };

  const manejarRegistro = (e) => {
    e.preventDefault();
    const err = onRegistro(nombre, usuario, clave);
    if (err) setMensaje(err);
    else { setMensaje(''); setNombre(''); setUsuario(''); setClave(''); }
  };

  return (
    <div className="modal-fondo abierto">
      <div className="modal-caja" style={{ maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3>{usuarioActivo ? `Hola, ${usuarioActivo.nombre}` : 'Mi Cuenta | Anelpg Bisutería'}</h3>
          <button onClick={onCerrar} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
        </div>

        {!usuarioActivo ? (
          <>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <button className={modo === 'login' ? 'btn-principal' : 'btn-admin-nav'} onClick={() => { setModo('login'); setMensaje(''); }}>Iniciar Sesión</button>
              <button className={modo === 'registro' ? 'btn-principal' : 'btn-admin-nav'} onClick={() => { setModo('registro'); setMensaje(''); }}>Crear Cuenta</button>
            </div>

            {modo === 'login' ? (
              <form onSubmit={manejarLogin}>
                <div className="grupo-input">
                  <label>Usuario</label>
                  <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Ej: admin" required />
                </div>
                <div className="grupo-input">
                  <label>Contraseña</label>
                  <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} placeholder="••••••••" required />
                </div>
                {mensaje && <p style={{ color: 'crimson', marginBottom: '10px' }}>{mensaje}</p>}
                <button type="submit" className="btn-principal btn-completo">Entrar</button>
              </form>
            ) : (
              <form onSubmit={manejarRegistro}>
                <div className="grupo-input">
                  <label>Tu Nombre</label>
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Camila Pérez" required />
                </div>
                <div className="grupo-input">
                  <label>Nombre de usuario</label>
                  <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Ej: camila_2026" required />
                </div>
                <div className="grupo-input">
                  <label>Contraseña</label>
                  <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} required />
                </div>
                {mensaje && <p style={{ color: 'crimson', marginBottom: '10px' }}>{mensaje}</p>}
                <button type="submit" className="btn-principal btn-completo">Crear mi cuenta</button>
              </form>
            )}
          </>
        ) : (
          <div>
            <p style={{ marginBottom: '12px', fontSize: '0.9rem', color: '#6b5848' }}>Gestión de precios del catálogo en vivo:</p>
            <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '15px' }}>
              {productos.map((p) => (
                <div key={p.id} className="item-admin">
                  <div className="item-admin-info"><strong>{p.nombre}</strong></div>
                  <div className="item-admin-controles">
                    <input
                      type="text"
                      className="input-precio-admin"
                      value={preciosEdit[p.id] !== undefined ? preciosEdit[p.id] : p.precio}
                      onChange={(e) => setPreciosEdit({ ...preciosEdit, [p.id]: e.target.value })}
                    />
                    <button
                      type="button"
                      className="btn-guardar-precio"
                      onClick={() => onActualizarPrecio(p.id, preciosEdit[p.id] ?? p.precio)}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-admin-nav" onClick={onLogout}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ================= COMPONENTE PRINCIPAL: APP =================
function App() {
  const [cargandoIntro, setCargandoIntro] = useState(true);

  const [productos, setProductos] = useState(() => {
    const guardados = JSON.parse(localStorage.getItem('anelpg_productos'));
    return Array.isArray(guardados) && guardados.length >= 24 ? guardados : PRODUCTOS_INICIALES;
  });

  const [carrito, setCarrito] = useState(() => JSON.parse(localStorage.getItem('anelpg_carrito')) || []);
  const [cuentas, setCuentas] = useState(() => JSON.parse(localStorage.getItem('anelpg_cuentas')) || CUENTAS_DEFAULT);
  const [usuarioActivo, setUsuarioActivo] = useState(() => JSON.parse(localStorage.getItem('anelpg_usuario_activo')) || null);

  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [cuentaAbierta, setCuentaAbierta] = useState(false);

  const [contactoNombre, setContactoNombre] = useState('');
  const [contactoArete, setContactoArete] = useState('');
  const [contactoMensaje, setContactoMensaje] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setCargandoIntro(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('anelpg_productos', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('anelpg_carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, cantidad: item.cantidad + delta } : item)
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const iniciarSesion = (user, pass) => {
    const encontrada = cuentas.find((c) => c.usuario.toLowerCase() === user.trim().toLowerCase() && c.clave === pass.trim());
    if (encontrada) {
      setUsuarioActivo(encontrada);
      localStorage.setItem('anelpg_usuario_activo', JSON.stringify(encontrada));
      return true;
    }
    return false;
  };

  const registrarCuenta = (nombre, user, pass) => {
    if (cuentas.some((c) => c.usuario.toLowerCase() === user.trim().toLowerCase())) {
      return 'Ese nombre de usuario ya está en uso.';
    }
    const nueva = { nombre: nombre.trim(), usuario: user.trim(), clave: pass.trim() };
    const actualizadas = [...cuentas, nueva];
    setCuentas(actualizadas);
    localStorage.setItem('anelpg_cuentas', JSON.stringify(actualizadas));
    setUsuarioActivo(nueva);
    localStorage.setItem('anelpg_usuario_activo', JSON.stringify(nueva));
    return null;
  };

  const cerrarSesion = () => {
    setUsuarioActivo(null);
    localStorage.removeItem('anelpg_usuario_activo');
  };

  const actualizarPrecio = (id, nuevoPrecio) => {
    if (!nuevoPrecio.trim()) return;
    setProductos((prev) => prev.map((p) => p.id === id ? { ...p, precio: nuevoPrecio.trim() } : p));
  };

  const enviarContacto = (e) => {
    e.preventDefault();
    let texto = `Hola Anelpg Bisutería, soy ${contactoNombre}. `;
    if (contactoArete.trim()) texto += `Me interesan los aretes: *${contactoArete}*. `;
    texto += `Consulta: ${contactoMensaje}`;
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank');
    setContactoNombre('');
    setContactoArete('');
    setContactoMensaje('');
  };

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      {cargandoIntro && (
        <div className="pantalla-carga">
          <img src="img/Logo.jpeg" alt="Anelpg Bisutería" className="logo-carga" />
          <p className="texto-carga">Anelpg Bisutería · Artesanía Hecha a Mano</p>
        </div>
      )}

      <Navbar
        totalItemsCarrito={totalUnidades}
        onAbrirCarrito={() => setCarritoAbierto(true)}
        onAbrirCuenta={() => setCuentaAbierta(true)}
        usuarioActivo={usuarioActivo}
      />

      <main>
        <section id="inicio" className="hero">
          <div className="contenedor hero-contenido">
            <span className="etiqueta">Hecho a mano con amor</span>
            <h1>Aretes artesanales que resaltan tu estilo</h1>
            <p>Diseños únicos en mostacilla y tejidos tradicionales creados para acompañarte todos los días y en tus eventos especiales.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#catalogo" className="btn-principal">Ver Colección</a>
              <a href="#asistente" className="btn-admin-nav" style={{ padding: '12px 24px' }}>Asesoría con IA</a>
            </div>
          </div>
        </section>

        <Catalogo productos={productos} onAgregarCarrito={agregarAlCarrito} />

        <StylistIA />

        <section id="comunidad" className="seccion">
          <div className="contenedor">
            <div className="caja-vip">
              <span className="etiqueta">Comunidad Anelpg</span>
              <h2>¿Quieres recibir ofertas y el catálogo nuevo?</h2>
              <p className="subtitulo-seccion">Únete a nuestro Club VIP para enterarte primero de nuevos diseños artesanales, descuentos especiales y precios al por mayor.</p>
              <div className="botones-vip">
                <a
                  href={`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent('¡Hola Anelpg Bisutería! 💖 Quiero registrarme en el Club VIP para recibir ofertas y el catálogo nuevo.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-principal"
                >
                  ✨ Quiero recibir ofertas (Registro VIP)
                </a>
                <a
                  href={`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent('¡Hola! Quiero unirme a la comunidad VIP de Anelpg Bisutería 🛍️')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp-canal"
                >
                  💬 Unirme por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="seccion">
          <div className="contenedor">
            <h2>Contáctanos y Haz tu Pedido</h2>
            <p className="subtitulo-seccion">¿Tienes dudas o quieres personalizar tus aretes? Escríbenos directo a WhatsApp.</p>

            <div className="contenedor-contacto">
              <form className="form-contacto" onSubmit={enviarContacto}>
                <div className="grupo-input">
                  <label>Tu nombre</label>
                  <input type="text" value={contactoNombre} onChange={(e) => setContactoNombre(e.target.value)} placeholder="Ej: Laura Gómez" required />
                </div>
                <div className="grupo-input">
                  <label>Arete de interés (opcional)</label>
                  <input type="text" value={contactoArete} onChange={(e) => setContactoArete(e.target.value)} placeholder="Ej: Arete Flor de oro" />
                </div>
                <div className="grupo-input">
                  <label>Mensaje o detalles del pedido</label>
                  <textarea rows="4" value={contactoMensaje} onChange={(e) => setContactoMensaje(e.target.value)} placeholder="Cuéntanos si los quieres para regalo, color preferido o cualquier duda..." required />
                </div>
                <button type="submit" className="btn-principal btn-completo">Enviar pedido por WhatsApp</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="contenedor" style={{ textAlign: 'center', padding: '20px 0' }}>
          <p>© 2026 Anelpg Bisutería · Todos los derechos reservados · Hecho en React ⚛️</p>
        </div>
      </footer>

      <CarritoModal
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
        carrito={carrito}
        onCambiarCantidad={cambiarCantidad}
        onEliminar={eliminarDelCarrito}
        onVaciar={() => setCarrito([])}
      />

      <CuentaModal
        abierto={cuentaAbierta}
        onCerrar={() => setCuentaAbierta(false)}
        usuarioActivo={usuarioActivo}
        onLogin={iniciarSesion}
        onRegistro={registrarCuenta}
        onLogout={cerrarSesion}
        productos={productos}
        onActualizarPrecio={actualizarPrecio}
      />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);