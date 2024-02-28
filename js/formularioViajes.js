document.addEventListener("DOMContentLoaded", function() {
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
    let description = document.getElementById('description');
    let descriptionError = document.getElementById('descriptionError');
    let startDate = document.getElementById('startDate');
    let finalDate = document.getElementById('finalDate');
    let selectedCheckboxes = document.getElementById('selectedCheckboxes')

    btnSendTravel.addEventListener('click', function(event) {
        event.preventDefault(); // Previene la recarga de la página
        let valid = true;

        // Validación del nombre del destino
        if (nameTravel.value.length < 10 || /^\s|\s$/.test(nameTravel.value) || /\s{2,}/.test(nameTravel.value)) {
            nameTravel.classList.add('is-invalid');
            nameTravelError.textContent = 'Por favor escribe un nombre válido (mínimo 10 letras)';
            valid = false;
        } else {
            nameTravel.classList.remove('is-invalid');
            nameTravelError.textContent = '';
        }

        // Validación del calendario
        validarFechas(); // Llamada a la función validarFechas

        // Validación de checkboxes //Revisar
        if (selectedCheckboxes.length < 2) {
            selectedCheckboxes.classList.add ('Selecciona al menos dos opciones.');
            valid = false;
        } else {
            selectedCheckboxes.classList.remove('is-invalid');
            selectedCheckboxes.textContent = '';
        }

        // Validación de la descripción
        if (description.value.length === 0 || description.value.length > 300) {
            description.classList.add('is-invalid');
            descriptionError.textContent = 'Límite de caracteres: 300';
            valid = false;
        } else {
            description.classList.remove('is-invalid');
            descriptionError.textContent = '';
        }

        // Si todas las validaciones son correctas, se podría enviar el formulario.
        if (valid) {
            nameTravel.value = "";
            description.value = "";
            startDate.value = "";
            finalDate.value = "";
            selectedCheckboxes.value = "";
        }
    });

    function validarFechas() {
        const startDate = new Date(document.getElementById('startDate').value);
        const finalDate = new Date(document.getElementById('finalDate').value);
        const currentDate = new Date();

        const startDateError = document.getElementById('startDateError');
        const finalDateError = document.getElementById('finalDateError');

        // Verificar si la fecha de inicio es anterior al día actual
        if (startDate < currentDate) {
            startDateError.textContent = 'La fecha de inicio no puede ser anterior al día actual';
        } else {
            startDateError.textContent = '';
        }

        // Verificar si la fecha de fin es anterior al día actual
        if (finalDate < currentDate) {
            finalDateError.textContent = 'La fecha de fin no puede ser anterior al día actual';
        } else {
            finalDateError.textContent = '';
        }

        // Verificar si la fecha de inicio es posterior o igual a la fecha de fin
        if (startDate > finalDate) {
            startDateError.textContent = 'La fecha de inicio debe ser anterior o igual a la fecha de fin';
            finalDateError.textContent = 'La fecha de fin debe ser posterior o igual a la fecha de inicio';
        }
    }

    // falta incluir precio y fotos / vacío la validación en fecha y demás inputs
});