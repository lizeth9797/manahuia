describe('mostrarCarrito', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should display "El carrito está vacío" when there are no items in the cart', () => {
    // Arrange
    const carritoContainer = document.createElement('div');
    carritoContainer.id = 'carrito';

    // Act
    mostrarCarrito();

    // Assert
    expect(carritoContainer.innerHTML).toBe('<p>El carrito está vacío</p>');
  });

  it('should display the correct HTML structure when there are items in the cart', () => {
    // Arrange
    const carritoContainer = document.createElement('div');
    carritoContainer.id = 'carrito';

    const viajes = [
      {
        imagen: 'image1.jpg',
        nombreDestino: 'Destino 1',
        precio: 100
      },
      {
        imagen: 'image2.jpg',
        nombreDestino: 'Destino 2',
        precio: 200
      }
    ];

    localStorage.setItem('carrito', JSON.stringify(viajes));

    // Act
    mostrarCarrito();

    // Assert
    expect(carritoContainer.innerHTML).toContain('<div class="row">');
    expect(carritoContainer.innerHTML).toContain('<h3>Producto</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Viajeras</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Total</h3>');
    expect(carritoContainer.innerHTML).toContain('<div class="item-carrito">');
    expect(carritoContainer.innerHTML).toContain('<img src="image1.jpg"');
    expect(carritoContainer.innerHTML).toContain('<h5>Destino 1</h5>');
    expect(carritoContainer.innerHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(carritoContainer.innerHTML).toContain('<strong><h4>Precio: 100</h4></strong>');
  });
});describe('mostrarCarrito', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should display "El carrito está vacío" when there are no items in the cart', () => {
    // Arrange
    const carritoContainer = document.createElement('div');
    carritoContainer.id = 'carrito';

    // Act
    mostrarCarrito();

    // Assert
    expect(carritoContainer.innerHTML).toBe('<p>El carrito está vacío</p>');
  });

  it('should display the correct HTML structure when there are items in the cart', () => {
    // Arrange
    const carritoContainer = document.createElement('div');
    carritoContainer.id = 'carrito';

    const viajes = [
      {
        imagen: 'image1.jpg',
        nombreDestino: 'Destino 1',
        precio: 100
      },
      {
        imagen: 'image2.jpg',
        nombreDestino: 'Destino 2',
        precio: 200
      }
    ];

    localStorage.setItem('carrito', JSON.stringify(viajes));

    // Act
    mostrarCarrito();

    // Assert
    expect(carritoContainer.innerHTML).toContain('<div class="row">');
    expect(carritoContainer.innerHTML).toContain('<h3>Producto</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Viajeras</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Total</h3>');
    expect(carritoContainer.innerHTML).toContain('<div class="item-carrito">');
    expect(carritoContainer.innerHTML).toContain('<img src="image1.jpg"');
    expect(carritoContainer.innerHTML).toContain('<h5>Destino 1</h5>');
    expect(carritoContainer.innerHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(carritoContainer.innerHTML).toContain('<strong><h4>Precio: 100</h4></strong>');
  });

  it('should display the correct HTML structure when there are multiple items in the cart', () => {
    // Arrange
    const carritoContainer = document.createElement('div');
    carritoContainer.id = 'carrito';

    const viajes = [
      {
        imagen: 'image1.jpg',
        nombreDestino: 'Destino 1',
        precio: 100
      },
      {
        imagen: 'image2.jpg',
        nombreDestino: 'Destino 2',
        precio: 200
      },
      {
        imagen: 'image3.jpg',
        nombreDestino: 'Destino 3',
        precio: 300
      }
    ];

    localStorage.setItem('carrito', JSON.stringify(viajes));

    // Act
    mostrarCarrito();

    // Assert
    expect(carritoContainer.innerHTML).toContain('<div class="row">');
    expect(carritoContainer.innerHTML).toContain('<h3>Producto</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Viajeras</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Total</h3>');
    expect(carritoContainer.innerHTML).toContain('<div class="item-carrito">');
    expect(carritoContainer.innerHTML).toContain('<img src="image1.jpg"');
    expect(carritoContainer.innerHTML).toContain('<h5>Destino 1</h5>');
    expect(carritoContainer.innerHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(carritoContainer.innerHTML).toContain('<strong><h4>Precio: 100</h4></strong>');
    expect(carritoContainer.innerHTML).toContain('<img src="image2.jpg"');
    expect(carritoContainer.innerHTML).toContain('<h5>Destino 2</h5>');
    expect(carritoContainer.innerHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(carritoContainer.innerHTML).toContain('<strong><h4>Precio: 200</h4></strong>');
    expect(carritoContainer.innerHTML).toContain('<img src="image3.jpg"');
    expect(carritoContainer.innerHTML).toContain('<h5>Destino 3</h5>');
    expect(carritoContainer.innerHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(carritoContainer.innerHTML).toContain('<strong><h4>Precio: 300</h4></strong>');
  });
});describe('mostrarCarrito', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should display the correct HTML structure when there are items in the cart', () => {
    // Arrange
    const carritoContainer = document.createElement('div');
    carritoContainer.id = 'carrito';

    const viajes = [
      {
        imagen: 'image1.jpg',
        nombreDestino: 'Destino 1',
        precio: 100
      },
      {
        imagen: 'image2.jpg',
        nombreDestino: 'Destino 2',
        precio: 200
      }
    ];

    localStorage.setItem('carrito', JSON.stringify(viajes));

    // Act
    mostrarCarrito();

    // Assert
    expect(carritoContainer.innerHTML).toContain('<div class="row">');
    expect(carritoContainer.innerHTML).toContain('<h3>Producto</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Viajeras</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Total</h3>');
    expect(carritoContainer.innerHTML).toContain('<div class="item-carrito">');
    expect(carritoContainer.innerHTML).toContain('<img src="image1.jpg"');
    expect(carritoContainer.innerHTML).toContain('<h5>Destino 1</h5>');
    expect(carritoContainer.innerHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(carritoContainer.innerHTML).toContain('<strong><h4>Precio: 100</h4></strong>');
  });

  it('should display the correct HTML structure when there are multiple items in the cart', () => {
    // Arrange
    const carritoContainer = document.createElement('div');
    carritoContainer.id = 'carrito';

    const viajes = [
      {
        imagen: 'image1.jpg',
        nombreDestino: 'Destino 1',
        precio: 100
      },
      {
        imagen: 'image2.jpg',
        nombreDestino: 'Destino 2',
        precio: 200
      },
      {
        imagen: 'image3.jpg',
        nombreDestino: 'Destino 3',
        precio: 300
      }
    ];

    localStorage.setItem('carrito', JSON.stringify(viajes));

    // Act
    mostrarCarrito();

    // Assert
    expect(carritoContainer.innerHTML).toContain('<div class="row">');
    expect(carritoContainer.innerHTML).toContain('<h3>Producto</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Viajeras</h3>');
    expect(carritoContainer.innerHTML).toContain('<h3>Total</h3>');
    expect(carritoContainer.innerHTML).toContain('<div class="item-carrito">');
    expect(carritoContainer.innerHTML).toContain('<img src="image1.jpg"');
    expect(carritoContainer.innerHTML).toContain('<h5>Destino 1</h5>');
    expect(carritoContainer.innerHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(carritoContainer.innerHTML).toContain('<strong><h4>Precio: 100</h4></strong>');
    expect(carritoContainer.innerHTML).toContain('<img src="image2.jpg"');
    expect(carritoContainer.innerHTML).toContain('<h5>Destino 2</h5>');
    expect(carritoContainer.innerHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(carritoContainer.innerHTML).toContain('<strong><h4>Precio: 200</h4></strong>');
    expect(carritoContainer.innerHTML).toContain('<img src="image3.jpg"');
    expect(carritoContainer.innerHTML).toContain('<h5>Destino 3</h5>');
    expect(carritoContainer.innerHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(carritoContainer.innerHTML).toContain('<strong><h4>Precio: 300</h4></strong>');
  });
});

describe('viajeHTML', () => {
  it('should generate the correct HTML structure for a viaje item', () => {
    // Arrange
    const item = {
      imagen: 'image1.jpg',
      nombreDestino: 'Destino 1',
      precio: 100
    };
    const uniqueId = 'uniqueId';
    const index = 0;

    // Act
    const viajeHTML = `
      <div class="item-carrito">
        <div class="info-carrito">
          <img src="${item.imagen}" alt="${item.nombreDestino}" class="imagen-carrito" style="width: 200px; height: 200px; padding:20px">
          <div class="descripcion-precio"> 
            <h5>${item.nombreDestino}</h5>
          </div>
        </div>
        <div class="cart-item__quantity-wrapper">
          <label class="visually-hidden" for="${uniqueId}">
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
          <cart-remove-button id="Remove-${index + 1}" data-index="${index + 1}">
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

    // Assert
    expect(viajeHTML).toContain('<div class="item-carrito">');
    expect(viajeHTML).toContain('<img src="image1.jpg"');
    expect(viajeHTML).toContain('<h5>Destino 1</h5>');
    expect(viajeHTML).toContain('<input class="quantity__input" type="number" name="updates[]" value="1"');
    expect(viajeHTML).toContain('<strong><h4>Precio: 100</h4></strong>');
  });
});