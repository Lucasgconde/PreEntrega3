// Obtener historial de compras desde localStorage
function obtenerHistorialCompras() {
    return JSON.parse(localStorage.getItem('historialCompras')) || [];
  }
  
  // Vaciar el historial de compras
  function vaciarCarrito() {
    localStorage.removeItem('historialCompras');
    mostrarHistorialCompras();
    console.log('El carrito ha sido vaciado.');
  }
  
  // Agregar productos al carrito
  function agregarAlCarrito(producto, cantidad, precio) {
    const productosDisponibles = JSON.parse(localStorage.getItem('productosCargados'));
    const productoSeleccionado = productosDisponibles.find((prod) => prod.nombre === producto);
  
    if (!verificarStock(productosDisponibles, producto, cantidad)) return;
  
    const subtotal = calculadora.multiplicación(precio, cantidad);
    const nuevaCompra = { producto, cantidad, subtotal };
  
    const historial = obtenerHistorialCompras();
    historial.push(nuevaCompra);
    localStorage.setItem('historialCompras', JSON.stringify(historial));
  
    actualizarStock(productosDisponibles, producto, cantidad);
    localStorage.setItem('productosCargados', JSON.stringify(productosDisponibles));
  
    renderizarProductos(productosDisponibles);
    mostrarHistorialCompras();
  }
  
  // Mostrar historial de compras en el DOM
  function mostrarHistorialCompras() {
    const historial = obtenerHistorialCompras();
    const contenedorHistorial = document.getElementById('historial');
  
    contenedorHistorial.innerHTML = historial.length
      ? historial.map(({ producto, cantidad, subtotal }) => `
          <p>Producto: ${producto}, Cantidad: ${cantidad}, Subtotal: $${subtotal}</p>
        `).join('')
      : '<p>No hay compras registradas.</p>';
  }  