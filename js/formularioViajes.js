document.addEventListener("DOMContentLoaded", function () {
    let idCounter = parseInt(localStorage.getItem('idCounter')) || 11;

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

    btnSendTravel.addEventListener('click', function (event) {
        event.preventDefault();
        let valid = true;

        if (!validarFechas()) {
            valid = false;
        }

        if (nameTravel.value.length < 10 || /^\s|\s$/.test(nameTravel.value) || /\s{2,}/.test(nameTravel.value)) {
            nameTravel.classList.add('is-invalid');
            nameTravelError.textContent = 'Por favor escribe un nombre de viaje válido (mínimo 10 letras)';
            valid = false;
        } else {
            nameTravel.classList.remove('is-invalid');
            nameTravel.classList.add('is-valid');
            nameTravelError.textContent = '';
        }

        validarFechas();

        let selectedCheckboxes = checkboxes.filter(checkbox => checkbox.checked);

        if (selectedCheckboxes.length < 2) {
            checkboxesError.textContent = 'Por favor escoge mínimo 2 opciones';
            valid = false;
        } else {
            checkboxesError.textContent = '';
        }

        const incluyeText = selectedCheckboxes.map(checkbox => {
            const label = document.querySelector(`label[for=${checkbox.id}]`);
            return label.textContent.trim();
        }).join(', ');

        if (description.value.length === 0 || description.value.length > 300) {
            description.classList.add('is-invalid');
            descriptionError.textContent = 'Por favor escribe un comentario menor a 300 caracteres';
            valid = false;
        } else {
            description.classList.remove('is-invalid');
            description.classList.add('is-valid');
            descriptionError.textContent = '';
        }

        let priceInputValue = priceInput.value.trim();

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

        if (imagenesSubidas.length !== 4) {
            uploadPhotosError.textContent = 'Por favor sube 4 fotografías\n';
            valid = false;
        } else {
            uploadPhotosError.textContent = '';
        }

        if (valid) {
            var nuevoViaje = {
                'id': idCounter,
                'nombreDestino': nameTravel.value,
                'precio': priceInput.value,
                'incluye': incluyeText,
                'fechaInicio': startDate.value,
                'fechaFin': finalDate.value,
                'duracion': calcularDuracion(startDateInput.value, finalDateInput.value),
                'descripcion': description.value,
                'img': imagenesSubidas
            };

            addItem(nuevoViaje);
            $('#successModal').modal('show');
            idCounter++;
            localStorage.setItem('idCounter', idCounter.toString());
        } else {
            $('#errorModal').modal('show');
        }
    });

    function validarFechas() {
        const fechaActual = new Date();
        const startDate = new Date(startDateInput.value);
        const finalDate = new Date(finalDateInput.value);
        const hoy = fechaActual.toISOString().split('T')[0];
        const fechaMaxima = new Date(fechaActual);
        fechaMaxima.setFullYear(fechaMaxima.getFullYear() + 1);

        startDateError.textContent = '';
        finalDateError.textContent = '';

        if (startDate < fechaActual) {
            startDateError.textContent = 'La fecha de inicio no puede ser menor al día actual.';
            startDateInput.value = hoy;
            return false;
        }

        if (!startDateInput.value) {
            startDateError.textContent = 'Por favor ingresa una fecha de inicio.';
            return false;
        } else if (startDate < fechaActual) {
            startDateError.textContent = 'La fecha de inicio debe ser mayor al día actual y diferente a la fecha final';
            startDateInput.value = hoy;
            return false;
        }

        if (finalDate < startDate) {
            finalDateError.textContent = 'La fecha final debe ser mayor al día actual y diferente a la fecha final.';
            finalDateInput.value = startDateInput.value;
            return false;
        }
        
        if (!finalDateInput.value) {
            finalDateError.textContent = 'Por favor ingresa una fecha final.';
            return false;
        } else if (finalDate < startDate) {
            finalDateError.textContent = 'La fecha final no puede ser menor o igual a la fecha inicial.';
            finalDateInput.value = startDateInput.value;
            return false;
        }

        if (startDate > fechaMaxima || finalDate > fechaMaxima) {
            startDateError.textContent = 'Las fechas no pueden superar un año desde hoy.';
            startDateInput.value = hoy;
            finalDateInput.value = hoy;
            finalDateError.textContent = 'Las fechas no pueden superar un año desde hoy.';
            return false;
        }

        actualizarClases(startDateInput, startDateError);
        actualizarClases(finalDateInput, finalDateError);

        return true;
    }
});

function actualizarClases(inputElement, errorElement) {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
    errorElement.textContent = '';
}
