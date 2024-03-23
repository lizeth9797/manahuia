// Función para mostrar el contenido del carrito en el DOM
function mostrarCarrito() {
  // Obtener el arreglo actual de viajes en el carrito desde el LocalStorage
  const storedViajes = localStorage.getItem('carrito');
  const viajes = storedViajes ? JSON.parse(storedViajes) : [];

  // Obtener el div del carrito en el DOM
  const carritoContainer = document.getElementById('carrito');

  // Verificar si hay elementos en el carrito
  if (viajes.length === 0) {
    carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
  } else {
    // Construir el HTML completo del carrito
    carritoContainer.innerHTML = ''; // Limpiar el contenido anterior
    // Agregar los títulos de las columnas fuera del bucle
    carritoContainer.innerHTML += `
        <div class="row">
            <div class="col mx-6" style="color:#85586F; text-align: center;"><h3>Producto</h3></div>
            <div class="col mx-6" style="color:#85586F; text-align: center;"><h3>Viajeras</h3></div>
            <div class="col mx-6" style="color:#85586F; text-align: center;"><h3>Total</h3></div>
        </div>
        <br>
        <br>
    `;

    // Iterar sobre los viajes en el carrito y agregarlos al DOM
    viajes.forEach((item) => {
      const precioInicial = 1; // Precio inicial
      const cantidad = item.cantidad ? item.cantidad : 1; // Verificar si hay cantidad definida
      const precioPorPersona = item.precio ? parseFloat(item.precio.replace(',', '')) : precioInicial; // Obtener el precio por persona
      const total = cantidad * precioPorPersona; // Calcular el total

      const viajeHTML = `
        <div class="item-carrito">
            <div class="info-carrito">
                <img src="${item.imagen}" alt="${item.nombreDestino}" class="imagen-carrito" style="width: 200px; height: 200px; padding:20px">
                <div class="descripcion-precio"> 
                    <h5>${item.nombreDestino}</h5>
                </div>
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
      carritoContainer.innerHTML += viajeHTML;
    });
  }

  // Event listener para incrementar y decrementar la cantidad de personas utilizando delegación de eventos
  carritoContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('input-number-increment')) {
      var $input = event.target.closest('.input-number-group').querySelector('.input-number');
      var val = parseInt($input.value, 10);
      $input.value = val + 1;
      actualizarTotal(event.target.closest('.item-carrito'));
    } else if (event.target.classList.contains('input-number-decrement')) {
      var $input = event.target.closest('.input-number-group').querySelector('.input-number');
      var val = parseInt($input.value, 10);
      if (val > 1) {
        $input.value = val - 1;
        actualizarTotal(event.target.closest('.item-carrito'));
      }
    }
  });
}

// Función para actualizar el total cuando se modifica la cantidad
function actualizarTotal(itemCarrito) {
  var cantidad = parseInt(itemCarrito.querySelector('.input-number').value);
  var precioPorPersona = parseFloat(itemCarrito.querySelector('.precio-carrito').getAttribute('data-precio'));
  var total = cantidad * precioPorPersona;
  itemCarrito.querySelector('.value span').innerHTML = total;
}

// Llamar a la función para mostrar el carrito cuando la página carrito.html se cargue completamente
document.addEventListener('DOMContentLoaded', mostrarCarrito);

// Función para añadir un artículo al carrito
function addToCart(item) {
  // Obtener el arreglo actual de viajes en el carrito desde el LocalStorage
  const storedViajes = localStorage.getItem('carrito');
  const viajes = storedViajes ? JSON.parse(storedViajes) : [];

  // Agregar el nuevo item al arreglo
  viajes.push(item);

  // Almacenar el arreglo actualizado en el LocalStorage
  localStorage.setItem('carrito', JSON.stringify(viajes));
}

// Limpiar el carrito al hacer clic en el botón "Limpiar"
document.getElementById("btnLimpiar").onclick = function() {
  localStorage.removeItem('carrito');
  window.location.reload();
};