function mostrarCarrito() {
  // Obtener el arreglo actual de viajes en el carrito desde el LocalStorage
  const storedViajes = localStorage.getItem('carrito');
  const viajes = storedViajes ? JSON.parse(storedViajes) : [];
  const carritoContainer = document.getElementById('carrito');

  // Verificar si hay elementos en el carrito
  if (viajes.length === 0) {
    carritoContainer.innerHTML = '<p>El carrito está vacío</p> <br><br>';
  } else {
    // Construir el HTML completo del carrito
    carritoContainer.innerHTML = ''; // Limpiar el contenido anterior
    // Agregar los títulos de las columnas fuera del bucle

    // Iterar sobre los viajes en el carrito y agregarlos al DOM
    viajes.forEach((item) => {
      const precioInicial = 1; // Precio inicial
      const cantidad = item.cantidad ? item.cantidad : 1; // Verificar si hay cantidad definida
      const precioPorPersona = item.precio ? parseFloat(item.precio.replace(',', '')) : precioInicial; // Obtener el precio por persona
      const total = cantidad * precioPorPersona; // Calcular el total

      const viajeHTML = `
    <div class="item-carrito text-center text-md-left"> <!-- Agrega clase text-center para centrar en dispositivos móviles -->
        <div class="info-carrito">
            <h5>${item.nombreDestino}</h5> <!-- Nombre del destino encima de la foto -->
            <img src="${item.imagen}" alt="${item.nombreDestino}" class="imagen-carrito"> <!-- Elimina el padding de la imagen -->
        </div>
        <div class='input-group input-number-group'>
            <div class='input-group-button'>
                <span class='input-number-decrement'>-</span>
            </div>
            <input class='input-number' type='number' value='${cantidad}' min='1' id='child' name='child'>
            <div class='input-group-button'>
                <span class='input-number-increment'>+</span>
            </div>
        </div>
        <div class="precio-carrito" data-precio="${precioPorPersona}">
            <strong>Precio por persona: $${item.precio} MEX</strong>
        </div>
        <div class="value">Total: <span>${total}</span></div>
    </div>
`;
      carritoContainer.innerHTML += viajeHTML;
    });

    // Agregar funcionalidad jQuery para los botones de cantidad
    agregarEventosCantidad(carritoContainer);
  }
}

// Función para construir el HTML de un elemento del carrito
function construirItemCarritoHTML(item) {
  const cantidad = item.cantidad ? item.cantidad : 1;
  const precioPorPersona = item.precio ? parseFloat(item.precio.replace(',', '')) : 1;
  const total = cantidad * precioPorPersona;

  return `
    <div class="item-carrito">
      <div class="info-carrito">
        <h5>${item.nombreDestino}</h5>
        <img src="${item.imagen}" alt="${item.nombreDestino}" class="imagen-carrito" style="width: 200px; height: 200px; padding:20px">
      </div>
      <div class='input-group input-number-group'>
        <div class='input-group-button'>
          <span class='input-number-decrement'>-</span>
        </div>
        <input class='input-number' type='number' value='${cantidad}' min='1' id='child' name='child'>
        <div class='input-group-button'>
          <span class='input-number-increment'>+</span>
        </div>
      </div>
      <div class="precio-carrito" data-precio="${precioPorPersona}" style="">
        <strong>Precio por persona:$${item.precio} MEX</strong>
      </div>
      <div class="value">Total: <span>${total}</span></div>
    </div>
  `;
}

// Función para agregar eventos a los botones de cantidad
function agregarEventosCantidad(carritoContainer) {
  carritoContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('input-number-increment')) {
      actualizarCantidad(event.target.closest('.item-carrito'), 1);
    } else if (event.target.classList.contains('input-number-decrement')) {
      actualizarCantidad(event.target.closest('.item-carrito'), -1);
    }
  });
}

// Función para actualizar la cantidad y el total
function actualizarCantidad(itemCarrito, incremento) {
  const inputCantidad = itemCarrito.querySelector('.input-number');
  let cantidad = parseInt(inputCantidad.value, 10);
  cantidad += incremento;
  if (cantidad < 1) cantidad = 1;
  inputCantidad.value = cantidad;
  actualizarTotal(itemCarrito);
}

// Función para actualizar el total cuando se modifica la cantidad
function actualizarTotal(itemCarrito) {
  const cantidad = parseInt(itemCarrito.querySelector('.input-number').value, 10);
  const precioPorPersona = parseFloat(itemCarrito.querySelector('.precio-carrito').getAttribute('data-precio'));
  const total = cantidad * precioPorPersona;
  itemCarrito.querySelector('.value span').textContent = total;
}

// Llamar a la función para mostrar el carrito cuando la página carrito.html se cargue completamente
document.addEventListener('DOMContentLoaded', mostrarCarrito);

// Función para añadir un artículo al carrito
function addToCart(item) {
  const storedViajes = localStorage.getItem('carrito');
  const viajes = storedViajes ? JSON.parse(storedViajes) : [];
  viajes.push(item);
  localStorage.setItem('carrito', JSON.stringify(viajes));
}

// Limpiar el carrito al hacer clic en el botón "Limpiar"
document.getElementById("btnLimpiar").onclick = function() {
  localStorage.removeItem('carrito');
  window.location.reload();
};
