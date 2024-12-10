// Cargar productos desde un archivo JSON
async function cargarProductos() {
  try {
    const respuesta = await fetch('json/productos.json');
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al cargar el JSON:', error);
    return [];
  }
}

// Renderizar productos en el DOM
function renderizarProductos(productos) {
  const contenedor = document.getElementById('catalogo');
  const selectProductos = document.getElementById('producto-seleccionado');

  contenedor.innerHTML = '';
  selectProductos.innerHTML = '<option value="">Selecciona un producto</option>';

  productos.forEach(({ nombre, precio, stock }) => {
    const item = document.createElement('div');
    item.className = 'producto';
    item.innerHTML = `
      <h3>${nombre}</h3>
      <p>Precio: $${precio}</p>
      <p>Stock: ${stock > 0 ? stock : 'Sin stock'}</p>
    `;
    contenedor.appendChild(item);

    const option = document.createElement('option');
    option.value = nombre;
    option.textContent = `${nombre} - $${precio}`;
    if (stock <= 0) option.disabled = true;
    selectProductos.appendChild(option);
  });
}