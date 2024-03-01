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

    let imagenesSubidas=[]
    //pinta en el HTML la ventana para subir una imágen
    const myWidget = cloudinary.createUploadWidget(
        {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        },
        (error, result) => {
        if (!error && result && result.event === "success") {
            //console.log("Done! Here is the image info: ", result);
            imagenesSubidas.push(result.info.secure_url);
            //console.log("imagenesSubidasARRAY:",imagenesSubidas);
        }
        }
    );
    document.getElementById("upload_widget").addEventListener("click",function () {
        myWidget.open();
        },  false
    );




  function calcularDuracion(startDateInput, finalDateInput) {
    const start = new Date(startDateInput);
    const final = new Date(finalDateInput);
    const diferenciaEnTiempo = final - start;
    const diferenciaEnDias = Math.ceil(diferenciaEnTiempo / (1000 * 60 * 60 * 24));
    return diferenciaEnDias;
}

function addItem(nuevoViaje) {
    console.log("Nuevo Viaje:", nuevoViaje);
    let viajes = JSON.parse(localStorage.getItem('viajes')) || [];

        // esto lo que hace es agarrar el objeto del nuevo viaje al array de viajes
        viajes.push(nuevoViaje);

        // almacenar el array de objetos y actualizarlo en localStorage
        localStorage.setItem('viajes', JSON.stringify(viajes));
}

//BOTON CREAR
  btnSendTravel.addEventListener('click', function (event) {
      event.preventDefault();
      let valid = true;

      if (!validarFechas()) {
        valid = false;
    }

        //Obtener y procesar las imágenes en JSON
/*         const inputFiles = document.getElementById('uploadPhotos');
        const files = inputFiles.files;
        const imagenesSubidas = [];
        for (let i = 0; i < files.length; i++) {
            let nuevaImagen = files[i];
            imagenesSubidas.push({ nombre: nuevaImagen.name, tipo: nuevaImagen.type, tamaño: nuevaImagen.size });
        } */

      // Validación del nombre del destino
      if (nameTravel.value.length < 10 || /^\s|\s$/.test(nameTravel.value) || /\s{2,}/.test(nameTravel.value)) {
          nameTravel.classList.add('is-invalid');
          nameTravelError.textContent = 'Por favor escribe un nombre de viaje válido (mínimo 10 letras)';
          valid = false;
      } else {
          nameTravel.classList.remove('is-invalid');
          nameTravel.classList.add('is-valid');
          nameTravelError.textContent = ''; // Limpiar el mensaje de error
      }

      // Validación de fechas
      validarFechas();

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
      if (description.value.length === 0 || description.value.length > 300) {
          description.classList.add('is-invalid');
          descriptionError.textContent = 'Por favor escribe un comentario menor a 300 caracteres';
          valid = false;
      } else {
          description.classList.remove('is-invalid');
          description.classList.add('is-valid');
          descriptionError.textContent = ''; // Limpiar el mensaje de error
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
      if((imagenesSubidas.length!=4)){   
        console.log(imagenesSubidas.length);
        //uploadPhotos.classList.add('is-invalid');
        uploadPhotosError.textContent = 'Por favor sube 4 fotografías\n';
        valid = false;
      }else {
       // uploadPhotos.classList.remove('is-invalid');
        //uploadPhotos.classList.add('is-valid');
        uploadPhotosError.textContent = ''; // Limpiar el mensaje de error
    }


    function validarFechas() {
        // Obtener la fecha actual
        const fechaActual = new Date();
    
        // Convertir los valores de las fechas a objetos Date
        const startDate = new Date(startDateInput.value);
        const finalDate = new Date(finalDateInput.value);
    
        // Limpiar los mensajes de error
        startDateError.textContent = '';
        finalDateError.textContent = '';
    
        // Función para manejar los errores de fecha
        const manejarErrorFecha = (errorMensaje, inputFecha) => {
            inputFecha.classList.add('is-invalid');
            inputFecha.classList.remove('is-valid');
            startDateError.textContent = errorMensaje;
            finalDateError.textContent = errorMensaje;
        };
    
        // Validar la fecha de inicio
        if (!startDateInput.value || startDate < fechaActual) {
            manejarErrorFecha('La fecha de inicio debe ser mayor al día actual.', startDateInput);
            return false;
        }
    
        // Validar la fecha final
        if (!finalDateInput.value || finalDate < startDate) {
            manejarErrorFecha('La fecha final no puede ser menor o igual a la fecha inicial.', finalDateInput);
            return false;
        }
    
        // Validar que las fechas no superen un año
        const fechaMaxima = new Date(fechaActual);
        fechaMaxima.setFullYear(fechaMaxima.getFullYear() + 1);
    
        if (startDate > fechaMaxima || finalDate > fechaMaxima) {
            manejarErrorFecha('Las fechas no pueden superar un año desde hoy.', startDateInput);
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
        // Actualizar clases is-valid e is-invalid para fechas
        actualizarClases(startDateInput, startDateError);
        actualizarClases(finalDateInput, finalDateError);
    
        // Si todas las validaciones de fechas son correctas, retorna true
        return true;
    }
    

      // Si todas las validaciones son correctas, se podría enviar el formulario.
      if (valid) {
        // Crear el objeto JSON del nuevo viaje
        var nuevoViaje = {
            'id': idCounter, // Asignar un nuevo ID
            'nombreDestino': nameTravel.value,
            'precio': priceInput.value,
            'incluye': incluyeText,
            'fechaInicio': startDate.value,
            'fechaFin': finalDate.value,
            'duracion': calcularDuracion(startDateInput.value, finalDateInput.value),
            'descripcion': description.value,
            'img': imagenesSubidas
        };
    
        // Llamar a la función addItem con el nuevoViaje como argumento
        addItem(nuevoViaje);
        $('#successModal').modal('show');
    
        // Incrementar el contador de modales
        idCounter++;
        localStorage.setItem('nextId', idCounter.toString());
      } else {
        $('#errorModal').modal('show');
      }
      });// btn eventListener
      
});// DOMcontent