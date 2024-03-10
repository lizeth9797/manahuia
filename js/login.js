document.addEventListener("DOMContentLoaded", function () {
    var idCounter = localStorage.getItem('nextIdUser') || '1';
    var existingCorreo = JSON.parse(localStorage.getItem('correo')) || [];

    document.getElementById("btnRegister").addEventListener("click", function (event) {
        var correo = document.getElementById("correo").value.trim();
        var password = document.getElementById("password").value.trim();
        var valid = true;

        // Validar si el correo está vacío o solo tiene espacios
        if (correo === "") {
            document.getElementById("correoError").innerText = "Información obligatoria";
            valid = false;
        } else {
            document.getElementById("correoError").innerText = "";
        }

        // Validar correo
        if (!correo.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            document.getElementById("correoError").innerText = "El formato del correo es incorrecto";
            valid = false;
        } else {
            document.getElementById("correoError").innerText = "";
        }

        // Validar si la contraseña está vacía o solo tiene espacios
        if (password === "") {
            document.getElementById("passwordError").innerText = "Información obligatoria";
            valid = false;
        } else {
            // Validar longitud de contraseña
            if (password.length < 6) {
                document.getElementById("passwordError").innerText = "La contraseña debe tener al menos 6 caracteres.";
                valid = false;
            } else {
                document.getElementById("passwordError").innerText = "";
            }
        }

        // Evitar el envío si hay errores
        if (!valid) {
            event.preventDefault();
        }

        // Almacenar datos en localStorage
        if (valid) {
            var nuevoLogin = {
                'id': idCounter,
                'correo': correo,
                'password': password,
            };

            // Llamada a la función para agregar un nuevo login al almacenamiento local
            addItem(nuevoLogin);

            // Limpiar los campos después de enviar el formulario
            limpiarCampos();

            // Incrementar el contador de IDs
            idCounter++;
            localStorage.setItem('nextIdUser', idCounter.toString());

            // Agregar el nuevo correo a la lista en localStorage solo si no existe previamente
            if (!existingCorreo.includes(correo)) {
                existingCorreo.push(correo);
                localStorage.setItem('correo', JSON.stringify(existingCorreo));
            }
        }
    });

    function addItem(nuevoLogin) {
        let login = JSON.parse(localStorage.getItem('login')) || [];
        login.push(nuevoLogin);
        localStorage.setItem('login', JSON.stringify(login));
    }

    function limpiarCampos() {
        // Limpiar los campos después de enviar el formulario
        document.getElementById("correo").value = '';
        document.getElementById("password").value = '';
    }
});
