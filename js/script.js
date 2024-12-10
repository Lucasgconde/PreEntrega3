// Inicializar la aplicación
async function iniciarAplicacion() {
    let productos = JSON.parse(localStorage.getItem('productosCargados'));
    if (!productos) {
      productos = await cargarProductos();
      localStorage.setItem('productosCargados', JSON.stringify(productos));
    }
    renderizarProductos(productos);
    mostrarHistorialCompras();
  }
  
  // Manejar formulario de compra
  document.getElementById('form-compra').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const producto = document.getElementById('producto-seleccionado').value;
    const cantidad = parseInt(document.getElementById('cantidad-seleccionada').value, 10);
  
    if (!producto || !validarCantidad(cantidad)) {
      console.error("Producto o cantidad inválida");
      return;
    }
  
    const productos = JSON.parse(localStorage.getItem('productosCargados'));
    const { precio } = productos.find((p) => p.nombre === producto);
    agregarAlCarrito(producto, cantidad, precio);
  });
  
  // Botones de acción
  document.getElementById('btn-vaciar-carrito').addEventListener('click', vaciarCarrito);
  
  document.getElementById('btn-rellenar-stock').addEventListener('click', () => {
    const productos = JSON.parse(localStorage.getItem('productosCargados')) || [];
    productos.forEach((p) => (p.stock = 10));
    localStorage.setItem('productosCargados', JSON.stringify(productos));
    renderizarProductos(productos);
  });
  
  // Cargar datos al iniciar
  window.onload = () => {
    iniciarAplicacion();
  };  