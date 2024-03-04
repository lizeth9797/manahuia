
document.addEventListener("DOMContentLoaded", function() {

    let btnRegister = document.getElementById("btnRegister");
    let name = document.getElementById("name");
    let username = document.getElementById("username");
    let correo = document.getElementById("correo");
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("passwordConfirm");
    let telefono = document.getElementById("telefono");
    //Error message
    let nameError = document.getElementById("nameError");
    let usernameError = document.getElementById("usernameError");
    let correoError = document.getElementById("correoError");
    let passwordError = document.getElementById("passwordError");
    let confirmError = document.getElementById("confirmError");
    let telefonoError = document.getElementById("telefonoError");
   

    btnRegister.addEventListener('click', function(event) {
        event.preventDefault(); // Previene la recarga de la página
        let valid = true;
         
        // Validación del nombre  
        if (name.value.length < 8 || /^\s|\s$/.test(name.value) || /\s{2,}/.test(name.value)) {  
            name.classList.add('is-invalid');
            nameError.textContent = 'Por favor escribe mínimo un nombre y un apellido válido (mínimo 8 letras).\n';
            nameError.style.whiteSpace = 'pre-line';
            valid = false;
        } else {
            // Convertir la inicial de cada palabra a mayúscula
            const formattedName = name.value
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Asignar el nombre formateado
            name.value = formattedName;

            name.classList.remove('is-invalid');
            nameError.textContent = '';
        }

        // Obtener la lista de nombres de usuario desde localStorage o inicializarla si no existe
        // const existingUsernames = JSON.parse(localStorage.getItem('usernames')) || [];

        // Validación del nombre de usuario  
        
        // CODIGO FUTURO PARA LOCALSTORAGE USUARIOS YA EXISTENTES INVALIDO
                // || 
                // existingUsernames.includes(username.value))

            // Validación del nombre de usuario  
        // Validación del nombre de usuario  
        if (username.value.trim() === '') {
            username.classList.add('is-invalid');
            usernameError.textContent = 'Por favor, ingresa un nombre de usuario.';
            valid = false;
        } else if (username.value.length < 4 || username.value.length > 10 || /^\s|\s$/.test(username.value) || /\s{2,}/.test(username.value)) {
            username.classList.add('is-invalid');
            let mensajeError = 'Por favor, escribe un nombre de usuario válido:\n';

            if (username.value.length < 4) {
                mensajeError += ' - Mínimo 4 caracteres\n';
            } else if (username.value.length > 10) {
                mensajeError += ' - Máximo 10 caracteres\n';
            } else if (/^\s|\s$/.test(username.value) || /\s{2,}/.test(username.value)) {
                mensajeError += ' - No debe contener espacios al inicio, final o duplicados\n';
            }

            usernameError.textContent = mensajeError;
            usernameError.style.whiteSpace = 'pre-line';
            valid = false;
        } else {
            username.classList.remove('is-invalid');
            usernameError.textContent = '';

            // Agregar el nuevo nombre de usuario a la lista en localStorage
            // existingUsernames.push(username.value);
            // localStorage.setItem('usernames', JSON.stringify(existingUsernames));
        }

        // Validación del correo electrónico
        let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo.value)) {
            correo.classList.add('is-invalid');
            correoError.textContent = 'Por favor, escribe un correo válido.';
            valid = false;
        } else {
            correo.classList.remove('is-invalid');
            correoError.textContent = '';
        }

        // validaciónes de la contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])[\w\d]{8,}$/;

        if (!passwordRegex.test(password.value)) {
            password.classList.add('is-invalid');
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres, la inicial en mayúscula y sin espacios.\n';
            passwordError.style.whiteSpace = 'pre-line';
            valid = false;
        } else {
            password.classList.remove('is-invalid');
            passwordError.textContent = '';
        }

        // validación de la confirmación de contraseña
        if (passwordConfirm.value.trim() === '') {
            passwordConfirm.classList.add('is-invalid');
            confirmError.textContent = 'Por favor, confirma tu contraseña.';
            valid = false;
        } else if (passwordConfirm.value !== password.value) {
            passwordConfirm.classList.add('is-invalid');
            confirmError.textContent = 'Las contraseñas no coinciden\n';
            valid = false;
        } else {
            passwordConfirm.classList.remove('is-invalid');
            confirmError.textContent = '';
        }

        // Validación del número de teléfono  
        let telefonoRegex =/^(?:(\d)(?!\1{4})){10}$/;
        if (!telefonoRegex.test(telefono.value)) {
            telefono.classList.add('is-invalid');
            telefonoError.textContent = 'Por favor ingresa tu número de teléfono válido a 10 dígitos.';
            valid = false;
        } else {
            telefono.classList.remove('is-invalid');
            telefonoError.textContent = '';
        }

    });
});
