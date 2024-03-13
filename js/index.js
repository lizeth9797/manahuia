document.addEventListener('DOMContentLoaded', function () {
    const storedViajes = localStorage.getItem('viajes');
    const viajes = storedViajes ? JSON.parse(storedViajes) : [];

    for (let i = 0; i < viajes.length; i++) {
        const storedItem = viajes[i];
        addItem(storedItem);
    }
});

document.getElementById('cards-container').addEventListener('click', function (event) {
    if (event.target.classList.contains('details-btn')) {
        const modalId = event.target.getAttribute('data-bs-target');
        const modal = new bootstrap.Modal(document.querySelector(modalId));
        modal.show();
    }
});

function addItem(item) {
    const container = document.getElementById('cards-container');

    const card = document.createElement('div');
    card.classList.add( "col-lg-9",)

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
        <div class="modal fade custom-modal" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-body row" style="background-color:#F8EDE3">
                        <div class="col-lg-6" style="align-self: center;">
                            <div id="carouselExample_${modalId}" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    ${item.img.map((imgSrc, index) => `
                                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                            <img src="${imgSrc}" class="d-block w-100" alt="Slide ${index + 1}">
                                        </div>
                                    `).join('')}
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample_${modalId}" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample_${modalId}" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
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
                                <button onclick= "cerrarModal ()" type="button" style="background-color:#85586F" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    card.innerHTML = cardHTML;
    container.appendChild(card);
}

let idCounter = 1;

// Aquí añade los elementos usando la función addItem() como hiciste anteriormente


addItem({
    'id': 1,
    'nombreDestino':'Aventura Maya en Península Yucateca',
    'precio':'$10,000',
    'destinos':'Mérida, Chichén Itzá, playa del Carmen y Tulúm',
    'incluye':'Alojamiento en hoteles administrados por manahuia con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte durante todo el recorrido.Visitas guiadas a los principales destinos arqueológicos de la región.<br>Entradas a los sitios arqueológicos mencionados',
    'duracion':'5 días',
    'descripcion':'Embárcate en un apasionante tour de cinco días explorando la rica historia y cultura de la civilización maya en la Península Yucateca. Desde la animada Mérida hasta las impresionantes ruinas de Chichén Itzá, las playas relajantes de Playa del Carmen y las antiguas ruinas de Tulum, nuestro viaje incluye alojamiento de calidad, transporte cómodo y guías expertos para una experiencia inolvidable. Reserva ahora para sumergirte en esta emocionante aventura!',
    'img':['./src/catalogo/Viaje 5.jpg','./src/catalogo/Viaje 1.jpg','./src/catalogo/Viaje 6.jpg','./src/catalogo/Viaje 32.jpg']
});

addItem({
    'id': 2,
    'nombreDestino':'Exploración Natural en la Sierra Madre',
    'precio':'$8,560',
    'destinos':'Puerto Vallarta, San Sebastián del Oeste, Mascota',
    'incluye':'Alojamiento en hoteles seleccionados con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte durante todo el itinerario.<br>Guía turístico experto.',
    'duracion':'4 días',
    'descripcion':'Embárcate en nuestra "Exploración Natural en la Sierra Madre", un viaje de 4 días que te llevará a descubrir la belleza natural y cultural de Puerto Vallarta, San Sebastián del Oeste y Mascota, el paquete incluye alojamiento en hoteles con desayuno y cena, transporte cómodo y un guía turístico experto para una experiencia inolvidable. Únete a nosotros y sumérgete en la magia de la Sierra Madre!',
        'img':['./src/catalogo/Viaje 3.jpg','./src/catalogo/Viaje 26.jpg','./src/catalogo/Viaje 11.jpg','./src/catalogo/Viaje 16.jpg']
});

addItem({
    'id': 3,
    'nombreDestino':'Playas en Baja California Sur',
    'precio':'$11,000',
    'destinos':'Loreto, Todos Santos, San José del Cabo, La Paz',
    'incluye':'Alojamiento en hoteles seleccionados con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte durante todo el recorrido.<br>Guía turístico experto.',
    'duracion':'6 días',
    'descripcion':'Explora las impresionantes playas de Baja California Sur en nuestro tour de 6 días. Desde las encantadoras costas de Loreto hasta las vibrantes playas de San José del Cabo y La Paz, incluye alojamiento en hoteles con desayuno y cena, transporte cómodo y un guía turístico para asegurar una experiencia inolvidable. Reserva ahora y sumérgete en el paraíso de Baja California Sur!',
        'img':['./src/catalogo/Viaje 19.jpg','./src/catalogo/Viaje 21.jpg','./src/catalogo/Viaje 6.jpg','./src/catalogo/Viaje 20.jpg']
});

addItem({
    'id': 4,
    'nombreDestino':'Ruta del Café y Naturaleza en Chiapas',
    'precio':'$12,000',
    'destinos':'San Cristóbal de las Casas, Comitán, Palenque',
    'incluye':'Alojamiento en hoteles con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte durante todo el recorrido.<br>Visitas guiadas a fincas de café para aprender sobre el proceso de producción.<br>Entradas a parques naturales para explorar la exuberante biodiversidad de Chiapas.',
    'duracion':'7 días',
    'descripcion':'Descubre la magia de Chiapas en nuestra Ruta del Café y Naturaleza. Este paquete de 7 días te sumerge en la cultura del café, con visitas a fincas para conocer su proceso de producción, y te lleva a explorar la naturaleza de la región con entradas a parques naturales. Incluye alojamiento en hoteles con desayuno y cena, transporte y una experiencia inolvidable en Chiapas. Reserva ahora y déjate cautivar por la belleza y el sabor de esta región!',
        'img':['./src/catalogo/Viaje 18.jpg','./src/catalogo/Viaje 3.jpg','./src/catalogo/Viaje 7.jpg','./src/catalogo/Viaje 22.jpg']
});

addItem({
    'id': 5,
    'nombreDestino':'Aventura Marina en la Costa Maya',
    'precio':'$9,000',
    'destinos':'Mahahual, Bacalar y Tulum',
    'incluye':'Alojamiento en hoteles con desayuno incluido (8:00am a 10:00am).<br>Transporte durante todo el recorrido.<br>Diversas actividades acuáticas.<br>Guía turístico experto.',
    'duracion':'4 días',
    'descripcion':'Embárcate en nuestra Aventura Marina en la Costa Maya , durante 4 días, explorarás Mahahual,Bacalar y Tulum, disfrutando de actividades acuáticas emocionantes, alojamiento en hoteles condesayuno incluido, transporte cómodo y la guía de un experto turístico. Una experiencia inolvidable enlas cristalinas aguas de la Costa Maya te espera!',
        'img':['./src/catalogo/Viaje 23.jpg','./src/catalogo/Viaje 21.jpg','./src/catalogo/Viaje 24.jpg','./src/catalogo/Viaje 25.jpg']
});

addItem({
    'id': 6,
    'nombreDestino':'Eco-Camping en la Reserva de la Biosfera de Sonora',
    'precio':'$6,000',
    'destinos':'Reserva de la Biosfera El Pinacate y Gran Desierto de Altar',
    'incluye':'Equipo completo de camping.<br>Desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte ida y vuelta desde el punto de encuentro.<br>Guía especializada durante todo el recorrido.',
    'duracion':'3 días',
    'descripcion':'Sumérgete en la naturaleza salvaje de la Reserva de la Biosfera de Sonora con nuestro Eco-Camping,durante 3 días, disfruta de una experiencia única que incluye equipo de camping completo, todas lascomidas, transporte y la guía de un experto en la Reserva de la Biosfera El Pinacate y Gran Desierto deAltar. Una aventura ecológica que no olvidarás!',
        'img':['./src/catalogo/Viaje 15.jpg','./src/catalogo/Viaje 14.jpg','./src/catalogo/Viaje 30.jpg','./src/catalogo/Viaje 33.jpg']
});

addItem({
    'id': 7,
    'nombreDestino':'Encanto y Aventura Volcánica',
    'precio':'$9,500',
    'destinos':'Ciudad de México, Puebla, Cholula, Parque Nacional Iztaccíhuatl-Popocatépetl',
    'incluye':'Alojamiento en hoteles con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte durante todo el recorrido.<br>Guía turística experta.',
    'duracion':'5 días',
    'descripcion':'Embárcate en nuestra emocionante aventura "Encanto y Aventura Volcánica", durante 5 días,explorarás la vibrante Ciudad de México, la histórica Puebla, la fascinante Cholula y el impresionanteParque Nacional Iztaccíhuatl-Popocatépetl. Incluye alojamiento en hoteles con desayuno y cena,transporte cómodo y la guía de una experta turística. Una experiencia única llena de encanto yadrenalina te espera en este viaje volcánico!',
        'img':['./src/catalogo/Viaje 2.jpg','./src/catalogo/Viaje 4.jpg','./src/catalogo/Viaje 10.jpg','./src/catalogo/Viaje 39.jpg']
});

addItem({
    'id': 8,
    'nombreDestino':'Aventura Aérea y Relajación Natural en México',
    'precio':'$14,250',
    'destinos':'Teotihuacán, Campos Florales y Ixtapan de la Sal',
    'incluye':'Alojamiento en hoteles con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Paseo en globo aerostático sobre Teotihuacán.<br>Entrada a balnearios de aguas termales en Campos Florales y Ixtapan de la Sal.<br>Transporte ida y vuelta desde el punto de encuentro.<br>Guía turística experta.',
    'duracion':'2 días',
    'descripcion':'Vive una experiencia única con nuestra Aventura Aérea y Relajación Natural en México, durante 2 días,disfrutarás de un emocionante paseo en globo aerostático sobre las antiguas pirámides de Teotihuacán,seguido de relajación en los balnearios de aguas termales en Campos Florales e Ixtapan de la Sal. Incluyealojamiento en hoteles con desayuno y cena, transporte ida y vuelta y la guía de una experta turística.Reserva ahora y déjate llevar por esta inolvidable aventura!',
        'img':['./src/catalogo/Viaje 28.jpg','./src/catalogo/Viaje 34.jpg','./src/catalogo/Viaje 36.jpg','./src/catalogo/Viaje 35.jpg']
});

addItem({
    'id': 9,
    'nombreDestino':'Aventura en las Alturas: Montañismo y camping en Mexico',
    'precio':'$7,280',
    'destinos':'Parque Nacional Nevado de Toluca, Parque Nacional Cumbres de Monterrey y Parque Nacional Pico de Orizaba',
    'incluye':'Equipo completo de camping.<br>Desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm), durante la estadía<br>Guía experto en montañismo.<br>Transporte ida y vuelta desde el punto de encuentro.',
    'duracion':'4 días',
    'descripcion':'Embárcate en nuestra aventura "Aventura en las Alturas: Montañismo y Camping en México”, durante 4 días, explorarás el majestuoso Parque Nacional Nevado de Toluca, el impresionante Parque NacionalCumbres de Monterrey y el desafiante Parque Nacional Pico de Orizaba. Incluye equipo completo decamping, deliciosos desayunos y cenas, la guía de un experto en montañismo y transporte ida y vuelta.Una experiencia de montaña que nunca olvidarás!',
        'img':['./src/catalogo/Viaje 38.jpg','./src/catalogo/Viaje 13.jpg','./src/catalogo/Viaje 17.jpg','./src/catalogo/Viaje 12.jpg']
});

addItem({
    'id': 10,
    'nombreDestino':'Encanto Costero y Artesanías Mexicanas',
    'precio':'$9,000',
    'destinos':'Puerto escondido y playa del Carmen',
    'incluye':'Alojamiento en hoteles con desayuno (8:00am a 10:00am) y cena incluidos (7:00pm a 9:00pm).<br>Transporte hacia destinos turísticos y mercados artesanales.<br>Excursiones a lugares locales de artesanías.<br>Visita a playas paradisíacas.',
    'duracion':'5 días',
    'descripcion':'Embárcate en nuestra experiencia "Encanto Costero y Artesanías Mexicanas”, durante 5 días, disfrutade alojamiento en hoteles con desayuno y cena incluidos, transporte hacia destinos turísticos ymercados artesanales donde podrás explorar y adquirir artesanías únicas, excursiones a lugareslocales de artesanías para conocer de cerca la cultura mexicana y visita a playas paradisíacas pararelajarte y disfrutar del paisaje costero. Una experiencia encantadora que combina lo mejor de la costamexicana y su rica artesanía!',
        'img':['./src/catalogo/Viaje 27.jpg','./src/catalogo/Viaje 8.jpg','./src/catalogo/Viaje 9.jpg','./src/catalogo/Viaje 31.jpg']
});

