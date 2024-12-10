const calculadora = {
  suma: (a, b) => a + b,
  resta: (a, b) => a - b,
  multiplicación: (a, b) => a * b,
  división: (a, b) => (b !== 0 ? a / b : "Error: División por cero no permitida"),
};

// Validar que la cantidad ingresada sea correcta
function validarCantidad(cantidad) {
  return !isNaN(cantidad) && cantidad > 0;
}

// Verifica el stock disponible y muestra un mensaje dinámico
function verificarStock(productos, nombreProducto, cantidad) {
  const producto = productos.find((prod) => prod.nombre === nombreProducto);
  const mensajeStock = document.getElementById('mensaje-stock');

  if (!producto || cantidad > producto.stock) {
      mensajeStock.textContent = `No hay suficiente stock para ${nombreProducto}. Solo quedan ${producto ? producto.stock : 0}.`;
      mensajeStock.style.display = 'block';
      return false;
  }

  mensajeStock.style.display = 'none';
  return true;
}

// Actualizar el stock de un producto
function actualizarStock(productos, nombreProducto, cantidadComprada) {
  const producto = productos.find((prod) => prod.nombre === nombreProducto);
  if (producto) producto.stock -= cantidadComprada;
}
