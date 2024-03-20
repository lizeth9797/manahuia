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

// Función para mostrar el contenido del carrito en el DOM
function mostrarCarrito() {
    // Obtener el arreglo actual de viajes en el carrito desde el LocalStorage
    const storedViajes = localStorage.getItem('carrito');
    const viajes = storedViajes ? JSON.parse(storedViajes) : [];

    // Obtener el div del carrito en el DOM
    const carritoContainer = document.getElementById('carrito');

    // Limpiar el contenido existente del carrito
    carritoContainer.innerHTML = '';

    // Verificar si hay elementos en el carrito
    if (viajes.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        // Iterar sobre los viajes en el carrito y agregarlos al DOM
        viajes.forEach((item, index) => { // Add index parameter to forEach
            const uniqueId = `Quantity-${index + 1}`; // Generate unique ID
            const viajeHTML = `
            <div class="item-carrito">
            <div class="info-carrito">
                <img src="${item.imagen}" alt="${item.nombreDestino}" class="imagen-carrito" style="width: 200px; height: 200px;">
                <div class="descripcion-precio">
                    <h5>${item.nombreDestino}</h5>
                </div>
            </div>
            <div class="cart-item__quantity-wrapper">
                      <label class="visually-hidden" for="${uniqueId}"">
                        Quantity
                      </label>
                      <quantity-input class="quantity">
                        <button class="quantity__button no-js-hidden" name="minus" type="button">
                          <span class="visually-hidden">Decrease quantity for Femmetravel Croatia Signature Retreat</span>
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" fill="none" viewBox="0 0 10 2">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor">
</path></svg>

                        </button>
                        <input class="quantity__input" type="number" name="updates[]" value="1" min="0" aria-label="Quantity for Femmetravel Croatia Signature Retreat" id="${uniqueId}" data-index="${index + 1}">
                        <button class="quantity__button no-js-hidden" name="plus" type="button">
                          <span class="visually-hidden">Increase quantity for Femmetravel Croatia Signature Retreat</span>
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" fill="none" viewBox="0 0 10 10">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor">
</path></svg>

                        </button>
                      </quantity-input>

                      <cart-remove-button id="Remove-${index + 1}" data-index="${index + 1}>
                        <a href="/cart/change?id=44506753827101:8da1baf98f0e3bed301e48d9caa514bd&amp;quantity=0" class="button button--tertiary" aria-label="Remove Femmetravel Croatia Signature Retreat">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="presentation" class="icon icon-remove">
  <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"></path>
  <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"></path>
</svg>

                        </a>
                      </cart-remove-button>
                    </div>
            <div class="precio-carrito">
                <strong><h4>Precio: ${item.precio}</h4></strong>
            </div>
        </div>
        `;
            carritoContainer.innerHTML += viajeHTML;
        });
    }
}

// Llamar a la función para mostrar el carrito cuando la página carrito.html se cargue completamente
document.addEventListener('DOMContentLoaded', mostrarCarrito);

// Exportar la función addToCart para que pueda ser utilizada en otros archivos
export { addToCart };

