document.addEventListener('DOMContentLoaded', function () {
    const storedViajes = localStorage.getItem('viajes');
    const viajes = storedViajes ? JSON.parse(storedViajes) : [];

    for (let i = 0; i < viajes.length; i++) {
        const storedItem = viajes[i];
        addItem(storedItem);
    }
});

let modalAbierto = false; // Variable para rastrear si el modal está abierto

// Agrega un evento de clic al contenedor de las tarjetas para manejar clics en los botones
document.getElementById('cards-container').addEventListener('click', function (event) {
    if (!modalAbierto && event.target.classList.contains('details-btn')) {
        const modalId = event.target.getAttribute('data-bs-target');
        const modal = new bootstrap.Modal(document.querySelector(modalId));

        // Muestra el modal
        modal.show();

        // Marca el modal como abierto
        modalAbierto = true;

        // Agrega el evento hidden.bs.modal al modal para cerrar el backdrop
        modal._element.addEventListener('hidden.bs.modal', function () {
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.parentNode.removeChild(backdrop);
            }
            modalAbierto = false; // Restablece el estado del modal
        });
    }
});

function addItem(item) {
    const container = document.getElementById('cards-container');

    const card = document.createElement('div');
    card.classList.add("col-lg-9");

    const truncatedDescription = item.descripcion.slice(0, Math.floor(item.descripcion.length * 0.2));
    const modalId = `exampleModal_${idCounter}`;
    idCounter++;

    const cardHTML = `
        <img src="${item.img[0]}" class="card-img-top" alt="${item.nombreDestino}">
        <div class="row">
            <div class="card-body d-flex flex-column" style="margin: 5px; padding: 5px;">
                <h5 class="card-title">${item.nombreDestino}</h5>
                <p class="card-text flex-grow-1">${truncatedDescription.substring(0, Math.floor(truncatedDescription.length * 0.8))}...</p>
                <button type="button" style="background-color: #85586F" class="btn btn-secondary details-btn" data-bs-toggle="modal" data-bs-target="#${modalId}">
                    Detalles
                </button>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade custom-modal"  id="${modalId}" tabindex="-1" 
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-body row" style= "background-color:#F8EDE3">
                        <!-- Carrusel de imágenes en el lado izquierdo -->
                        <div class="col-lg-6" style="align-self: center;">
                            <div class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <!-- Aquí deberías agregar tus imágenes dinámicamente -->
                                    <div class="carousel-item active">
                                        <img src="${item.img[0]}" class="d-block w-100" alt="Slide 1">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${item.img[1]}" class="d-block w-100" alt="Slide 1">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${item.img[2]}" class="d-block w-100" alt="Slide 1">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${item.img[3]}" class="d-block w-100" alt="Slide 1">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#${modalId}" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button"   data-bs-target="#${modalId}" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
        
                        <!-- Informacion a la derecha -->
                        <div class="col-lg-6">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">${item.nombreDestino}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p class="modal-description" style="text-align: justify;">${item.descripcion}</p>
                                <hr />
                                <h5>Incluye:</h5>
                                <p class="modal-incluye text-left small">
                                    ${item.incluye}
                                </p>
                                <p class="text-end modal-price"><strong>${item.precio} MXN</strong></p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" style= "background-color:#85586F" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- cierre-modal -->
        `;

    card.innerHTML = cardHTML;
    container.appendChild(card);
}

let idCounter = 1;

// Agrega un evento de clic al contenedor de las tarjetas para manejar clics en los botones
document.getElementById('cards-container').addEventListener('click', function (event) {
    if (!modalAbierto && event.target.classList.contains('details-btn')) {
        const modalId = event.target.getAttribute('data-bs-target');
        const modal = new bootstrap.Modal(document.querySelector(modalId));
        
        // Muestra el modal
        modal.show();

        // Verifica si ya se ha agregado el evento hidden.bs.modal al modal
        if (!modal._element.classList.contains('backdrop-event-added')) {
            // Agrega el evento hidden.bs.modal al modal
            modal._element.addEventListener('hidden.bs.modal', function () {
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.parentNode.removeChild(backdrop);
                }
                modalAbierto = false; // Restablece el estado del modal
            });

            // Marca el modal para indicar que se ha agregado el evento
            modal._element.classList.add('backdrop-event-added');
        }

        modalAbierto = true; // Marca el modal como abierto
    }
});


// Se borran items para mantener solo el index con artículos nuevos 
