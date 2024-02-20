let form = document.querySelector('form');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('correo');
let phoneInput = document.getElementById('telefono');
let commentInput = document.getElementById('comentario');
let nameError = document.getElementById('nameError');
let emailError = document.getElementById('correoError');
let phoneError = document.getElementById('telefonoError');
let commentError = document.getElementById('comentarioError');

document.addEventListener("DOMContentLoaded", function() {

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene la recarga de la página
        let valid = true;
        
        // Validación del nombre
        if (nameInput.value.length < 5 || /^\s|\s$/.test(nameInput.value) || /\s{2,}/.test(nameInput.value)) {
            nameInput.classList.add('is-invalid');
            nameError.textContent = 'Por favor escribe un nombre válido (mínimo 5 letras y sin espacios en blanco)';
            valid = false;
        } else {
            nameInput.classList.remove('is-invalid');
            nameError.textContent = '';
        }

        // Validación del correo electrónico
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            emailError.textContent = 'Por favor, escribe un correo válido.';
            valid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailError.textContent = '';
        }

        // Validación del número de teléfono  
        let phoneRegex =/^(?:(\d)(?!\1{3})){10}$/;    //chayo: /^\d{10}$/  //sy: 
        //jos: /^(?:(?:(?!000)\d){10}|(?:(?:\+|00)34\s?)?[6789](?:(?!000)\d){7})$/
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.classList.add('is-invalid');
            phoneError.textContent = 'Por favor ingresa tu número de teléfono válido a 10 dígitos.';
            valid = false;
        } else {
            phoneInput.classList.remove('is-invalid');
            phoneError.textContent = '';
        }

        // Validación del comentario
        if (commentInput.value.length === 0 || commentInput.value.length > 300) {
            commentInput.classList.add('is-invalid');
            commentError.textContent = 'Límite de caracteres:300';
            valid = false;
        } else {
            commentInput.classList.remove('is-invalid');
            commentError.textContent = '';
        }

        // Si todas las validaciones son correctas, se podría enviar el formulario.
        if(valid){
            let templateParams = {
            nameInput: `${nameInput.value}`,
            commentInput: `${commentInput.value}`,
            phoneInput: `${phoneInput.value}`,
            emailInput: `${emailInput.value}`
            };
        //Envío de email mediante emailJS
        emailjs.send('service_rtkhc7b', 'template_dc6n9i7', templateParams).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
        );
    
        nameInput.value="";
        commentInput.value="";
        phoneInput.value="";
        emailInput.value="";
        }
    });
});
