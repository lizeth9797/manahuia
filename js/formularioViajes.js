document.addEventListener("DOMContentLoaded", function () {
    // obtiene el ultimo contador del input almacenado en localStorage iniciando en 11
    let idCounter = parseInt(localStorage.getItem('nextId')) || 11;

    let btnSendTravel = document.getElementById('btnSendTravel');
    let nameTravel = document.getElementById('nameTravel');
    let nameTravelError = document.getElementById('nameTravelError');
    let checkboxes = [
        document.getElementById('btncheck1'),
        document.getElementById('btncheck2'),
        document.getElementById('btncheck3'),
        document.getElementById('btncheck4'),
        document.getElementById('btncheck5'),
        document.getElementById('btncheck6'),
        document.getElementById('btncheck7'),
    ];
    let checkboxesError = document.getElementById("checkboxesError");
    let description = document.getElementById('description');
    let descriptionError = document.getElementById('descriptionError');
    let priceInput = document.getElementById('priceInput');
    let priceInputError = document.getElementById('priceInputError');
    let uploadPhotos = document.getElementById('uploadPhotos');
    let uploadPhotosError = document.getElementById('uploadPhotosError');
    let startDateInput = document.getElementById('startDate');
    let finalDateInput = document.getElementById('finalDate');
    let startDateError = document.getElementById('startDateError');
    let finalDateError = document.getElementById('finalDateError');
    const cloudName = "dezqwhec1";
    const uploadPreset = "ip5jqq1p";

    let imagenesSubidas = [];
    //pinta en el HTML la ventana para subir una imágen
    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                imagenesSubidas.push(result.info.secure_url);
            }
        }
    );
    document.getElementById("upload_widget").addEventListener("click", function () {
        myWidget.open();
    }, false);

    function calcularDuracion(startDateInput, finalDateInput) {
        const start = new Date(startDateInput);
        const final = new Date(finalDateInput);
        const diferenciaEnTiempo = final - start;
        const diferenciaEnDias = Math.ceil(diferenciaEnTiempo / (1000 * 60 * 60 * 24));
        return diferenciaEnDias;
    }

    function addItem(nuevoViaje) {
        let viajes = JSON.parse(localStorage.getItem('viajes')) || [];

        viajes.push(nuevoViaje);
        localStorage.setItem('viajes', JSON.stringify(viajes));
    }

    //BOTON CREAR
    btnSendTravel.addEventListener('click', function (event) {
        event.preventDefault();

        // Limpiar mensajes de error y clases inválidas
        limpiarErrores();

        let valid = true;

        if (!validarFechas()) {
            valid = false;
        }

            // Validación del nombre del destino
            if (
                nameTravel.value.length < 10 ||                            // Comprueba si la longitud es menor que 10
                /^\s|\s$/.test(nameTravel.value) ||                       // Comprueba si hay espacios al principio o al final
                /\s{2,}/.test(nameTravel.value) ||                        // Comprueba si hay dos o más espacios consecutivos
                /[^a-zA-ZáéíóúüÁÉÍÓÚÜ\s]/.test(nameTravel.value) ||      // Comprueba si hay caracteres especiales o no permitidos (acepta acentuación)
                /(.)\1{2,}/.test(nameTravel.value)                        // Comprueba si hay más de tres veces la misma letra seguida
            ) {
                nameTravel.classList.add('is-invalid');                   // Agrega la clase 'is-invalid' para resaltar el error
                nameTravelError.textContent = 'Por favor escribe un nombre de viaje válido (mínimo 10 letras y sin caracteres especiales no permitidos)'; // Muestra un mensaje de error
                valid = false;                                            // Indica que la validación no pasó
            } else {
                nameTravel.classList.remove('is-invalid');                // Elimina la clase 'is-invalid'
                nameTravel.classList.add('is-valid');                     // Agrega la clase 'is-valid' para indicar que es válido
                nameTravelError.textContent = '';                         // Limpia el mensaje de error
            }
        
        // Validación de checkboxes
        let selectedCheckboxes = checkboxes.filter(checkbox => checkbox.checked);

        if (selectedCheckboxes.length < 2) {
            checkboxesError.textContent = 'Por favor escoge mínimo 2 opciones';
            valid = false;
        } else {
            checkboxesError.textContent = ''; // Limpiar el mensaje de error
        }

        // Obtener el texto de los labels asociados a los checkboxes seleccionados
        const incluyeText = selectedCheckboxes.map(checkbox => {
            const label = document.querySelector(`label[for=${checkbox.id}]`);
            return label.textContent.trim();
        }).join(', ');

        // Validación de la descripción
        if (
            description.value.length === 0 ||                              // Comprueba si la longitud es cero (campo vacío)
            description.value.length > 300 ||                              // Comprueba si la longitud es mayor que 300 caracteres
            /^\s|\s$/.test(description.value) ||                         // Comprueba si hay espacios al principio o al final
            /\s{3,}/.test(description.value) ||                           // Comprueba si hay tres o más espacios consecutivos
            /[^a-zA-ZáéíóúüÁÉÍÓÚÜ\s\d.,;:!?()-]/.test(description.value)  // Comprueba si hay caracteres especiales no permitidos (acepta acentuación)
        ) {
            description.classList.add('is-invalid');                      // Agrega la clase 'is-invalid' para resaltar el error
            descriptionError.textContent = 'Por favor escribe un comentario válido (menor a 300 caracteres y sin caracteres especiales no permitidos)'; // Muestra un mensaje de error
            valid = false;                                                 // Indica que la validación no pasó
        } else {
            description.classList.remove('is-invalid');                   // Elimina la clase 'is-invalid'
            description.classList.add('is-valid');                        // Agrega la clase 'is-valid' para indicar que es válido
            descriptionError.textContent = '';                            // Limpia el mensaje de error
        }

        // Validación del precio
        let priceInputValue = priceInput.value.trim();

        // Validar que el campo de precio solo contenga números
        if (!/^\d+$/.test(priceInputValue)) {
            priceInput.classList.add('is-invalid');
            priceInputError.textContent = 'Ingresa solo números en el campo de precio.';
            valid = false;

        } else {
            let priceValue = parseFloat(priceInputValue.replace(',', ''));
            priceInput.classList.remove('is-invalid');
            priceInput.classList.add('is-valid');
            priceInputError.textContent = '';

            if (isNaN(priceValue) || priceValue <= 0 || priceValue >= 10000000) {
                priceInput.classList.add('is-invalid');
                priceInputError.textContent = 'Agrega una cifra válida';
                valid = false;

            } else {
                priceInput.classList.remove('is-invalid');
                priceInput.classList.add('is-valid');
                priceInputError.textContent = '';
            }
        }

        // Validación de la carga de fotos
        if (imagenesSubidas.length === 0) {
            uploadPhotosError.textContent = 'Por favor sube al menos una fotografía';
            valid = false;
        } else {
            uploadPhotosError.textContent = ''; // Limpiar el mensaje de error
        }

        // Si todas las validaciones son correctas, se podría enviar el formulario.
        if (valid) {
            var nuevoViaje = {
                'id': idCounter, // Asignar un nuevo ID
                'nombreDestino': nameTravel.value,
                'precio': priceInput.value,
                'incluye': incluyeText,
                'fechaInicio': startDateInput.value,
                'fechaFin': finalDateInput.value,
                'duracion': calcularDuracion(startDateInput.value, finalDateInput.value),
                'descripcion': description.value,
                'img': imagenesSubidas
            };

            addItem(nuevoViaje);
            $('#successModal').modal('show');

            // Limpiar los campos después de enviar el formulario
            limpiarCampos();

            idCounter++;
            localStorage.setItem('nextId', idCounter.toString());
        } else {
            $('#errorModal').modal('show');
        }
    }); // btn eventListener

    function validarFechas() {
        const fechaActual = new Date();
    
        const startDate = new Date(startDateInput.value);
        const finalDate = new Date(finalDateInput.value);
    
        startDateError.textContent = '';
        finalDateError.textContent = '';
    
        const manejarErrorFecha = (errorMensaje, errorElement) => {
            errorElement.textContent = errorMensaje;
            errorElement.classList.add('is-invalid');
            errorElement.classList.remove('is-valid');
        };
    
        let esFechaInicialValida = true;
        let esFechaFinalValida = true;
    
        if (!startDateInput.value) {
            manejarErrorFecha('Debe indicar la fecha inicial', startDateError);
            esFechaInicialValida = false;
        } else if (startDate < fechaActual) {
            manejarErrorFecha('La fecha inicial es inválida', startDateError);
            esFechaInicialValida = false;
        }
    
        if (!finalDateInput.value) {
            manejarErrorFecha('Debe indicar la fecha final', finalDateError);
            esFechaFinalValida = false;
        } else if (finalDate < fechaActual || finalDate < startDate) {
            manejarErrorFecha('La fecha final es inválida.', finalDateError);
            esFechaFinalValida = false;
        }
    
        const fechaMaxima = new Date(fechaActual);
        fechaMaxima.setFullYear(fechaMaxima.getFullYear() + 1);
    
        if (esFechaInicialValida && esFechaFinalValida) {
            if (startDate > fechaMaxima || finalDate > fechaMaxima) {
                manejarErrorFecha('Las fechas no pueden superar un año desde hoy.', startDateError);
                return false;
            }
    
            actualizarClases(startDateInput, startDateError);
            actualizarClases(finalDateInput, finalDateError);
    
            return !(startDateError.textContent || finalDateError.textContent);
        }
    
        return false;
    }

    function actualizarClases(inputElement, errorElement) {
        if (errorElement.textContent) {
            inputElement.classList.add('is-invalid');
            inputElement.classList.remove('is-valid');
        } else {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
        }
    }

    function limpiarErrores() {
        // Limpiar mensajes de error y clases inválidas
        nameTravel.classList.remove('is-invalid', 'is-valid');
        nameTravelError.textContent = '';

        checkboxes.forEach(checkbox => checkbox.classList.remove('is-invalid'));
        checkboxesError.textContent = '';

        description.classList.remove('is-invalid', 'is-valid');
        descriptionError.textContent = '';

        priceInput.classList.remove('is-invalid', 'is-valid');
        priceInputError.textContent = '';

        uploadPhotosError.textContent = '';

        startDateInput.classList.remove('is-invalid', 'is-valid');
        startDateError.textContent = '';

        finalDateInput.classList.remove('is-invalid', 'is-valid');
        finalDateError.textContent = '';
    }

    function limpiarCampos() {
        // Limpiar los campos después de enviar el formulario
        nameTravel.value = '';
        checkboxes.forEach(checkbox => checkbox.checked = false);
        description.value = '';
        priceInput.value = '';
        // uploadPhotos.value = ''; // No limpiamos el campo de carga de fotos para evitar problemas con Cloudinary
        startDateInput.value = '';
        finalDateInput.value = '';
    }
}); // DOMcontent
