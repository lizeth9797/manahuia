document.addEventListener("DOMContentLoaded", function () {
    let btnSendTravel = document.getElementById('btnSendTravel');
    let nameTravel = document.getElementById('nameTravel');
    let nameTravelError = document.getElementById('nameTravelError')
    let checkboxes = [
      document.getElementById('btncheck1'),
      document.getElementById('btncheck2'),
      document.getElementById('btncheck3'),
      document.getElementById('btncheck4'),
      document.getElementById('btncheck5'),
      document.getElementById('btncheck6'),
      document.getElementById('btncheck7'),
    ];
    let checkboxesError = document.getElementById ("checkboxesError")
    let description = document.getElementById('description');
    let descriptionError = document.getElementById ('descriptionError')
    let priceInput = document.getElementById('priceInput');
    let uploadPhotos = document.getElementById('uploadPhotos');
    let uploadPhotosError = document.getElementById ('uploadPhotosError')

  
    btnSendTravel.addEventListener('click', function (event) {
      event.preventDefault();
      let valid = true;
  
      // Validación del nombre del destino
      if (nameTravel.value.length < 10 || /^\s|\s$/.test(nameTravel.value) || /\s{2,}/.test(nameTravel.value)) {
        nameTravel.classList.add('is-invalid');
        nameTravelError.textContent = 'Por favor escribe un nombre de viaje válido ( mínimo 10 letras)'
        valid = false;
      } else {
        nameTravel.classList.remove('is-invalid');
        nameTravel.classList.add('is-valid');
      }
  
// Validación de fechas
function validarFechas() {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener los elementos de fecha del formulario
    const startDateInput = document.getElementById('startDate');
    const finalDateInput = document.getElementById('finalDate');

    // Convertir los valores de las fechas a objetos Date
    const startDate = new Date(startDateInput.value);
    const finalDate = new Date(finalDateInput.value);

    // Obtener la fecha actual en formato YYYY-MM-DD
    const hoy = fechaActual.toISOString().split('T')[0];

    // Calcular la fecha dentro de un año desde hoy
    const fechaMaxima = new Date(fechaActual);
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() + 1);
    const fechaMaximaFormato = fechaMaxima.toISOString().split('T')[0];

    // Validar la fecha de inicio
    if (startDate < fechaActual) {
        alert('La fecha de inicio no puede ser menor al día actual.');
        startDateInput.value = hoy;
        startDateInput.classList.add('is-invalid');
        startDateInput.classList.remove('is-valid');
    } else {
        startDateInput.classList.remove('is-invalid');
        startDateInput.classList.add('is-valid');
    }

    // Validar la fecha final
    if (finalDate < startDate) {
        alert('La fecha final no puede ser menor a la fecha de inicio.');
        finalDateInput.value = startDateInput.value;
        finalDateInput.classList.add('is-invalid');
        finalDateInput.classList.remove('is-valid');
    } else {
        finalDateInput.classList.remove('is-invalid');
        finalDateInput.classList.add('is-valid');
    }

    // Validar que las fechas no superen un año
    if (startDate > fechaMaxima || finalDate > fechaMaxima) {
        alert('Las fechas no pueden superar un año desde hoy.');
        startDateInput.value = hoy;
        finalDateInput.value = hoy;
        startDateInput.classList.add('is-invalid');
        finalDateInput.classList.add('is-invalid');
    } else {
        startDateInput.classList.remove('is-invalid');
        finalDateInput.classList.remove('is-invalid');
    }
}

// Llamada a la función al cargar la página
validarFechas();

  
      // Validación de checkboxes
      let selectedCheckboxes = checkboxes.filter(checkbox => checkbox.checked);
      if (selectedCheckboxes.length < 2) {
        checkboxesError.textContent = 'Por favor escoge mínimo 2 opciones'
        valid = false;
      }
  
      // Validación de la descripción
      if (description.value.length === 0 || description.value.length > 300) {
        description.classList.add('is-invalid');
        descriptionError.textContent = 'Por favor escribe un comentario menor a 300 caracteres'
        valid = false;
      } else {
        description.classList.remove('is-invalid');
        description.classList.add('is-valid');
      }
  
      // Validación del precio
      let priceValue = parseFloat(priceInput.value.replace(',', ''));
      if (isNaN(priceValue) || priceValue <= 0 || priceValue >= 10000000) {
        priceInput.classList.add('is-invalid');
        valid = false;
      } else {
        priceInput.classList.remove('is-invalid');
        priceInput.classList.add('is-valid');
      }
  
      // Validación de la carga de fotos
      let allowedExtensions = /(\.jpg)$/i;
      if (!allowedExtensions.exec(uploadPhotos.value)) {
        uploadPhotos.classList.add('is-invalid');
        uploadPhotosError.textContent = 'Por favor sube mínimo 1 fotografía en formato .jpg\n'
        valid = false;
      } else {
        uploadPhotos.classList.remove('is-invalid');
        uploadPhotos.classList.add('is-valid');
      }
  
      // Si todas las validaciones son correctas, se podría enviar el formulario.
      if (valid) {
        // Realizar acciones adicionales si es necesario
      }
    });
  
    function validarFechas() {
      // ... (Código para validar fechas, sin cambios)
    }
  });
  