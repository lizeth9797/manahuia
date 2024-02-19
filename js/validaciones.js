document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('correo');
    const phoneInput = document.getElementById('telefono');
    const commentInput = document.getElementById('comentario');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('correoError');
    const phoneError = document.getElementById('telefonoError');
    const commentError = document.getElementById('comentarioError');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene la recarga de la página
        let valid = true;
        
        // Validación del nombre
        if (nameInput.value.length < 5 || !nameInput.value.trim().includes(' ')) {
            nameInput.classList.add('is-invalid');
            nameError.textContent = 'Por favor escribe un nombre válido.';
            valid = false;
        } else {
            nameInput.classList.remove('is-invalid');
            nameError.textContent = '';
        }

        // Validación del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            emailError.textContent = 'Por favor, escribe un correo válido.';
            valid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailError.textContent = '';
        }

        // Validación del número de teléfono
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.classList.add('is-invalid');
            phoneError.textContent = 'Por favor ingresa tu número de teléfono a 10 dígitos.';
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
        if (valid) {

        }
    });
});
