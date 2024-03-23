document.addEventListener('DOMContentLoaded', function() {
    const formularioPago = document.querySelector('.formPago');
    const btnPagar = document.getElementById("btnPagar");
    const modalResultadoPago = new bootstrap.Modal(document.getElementById('modalResultadoPago'), {});

    formularioPago.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validarFormulario()) {
            modalResultadoPago.show();
        }
    });

    btnPagar.addEventListener("click", function() {
        if (validarFormulario()) {
            modalResultadoPago.show();
        }
    });

    function validarFormulario() {
        const correo = document.getElementById('correo').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const estado = document.getElementById('estado').value.trim();
        const ciudad = document.getElementById('ciudad').value.trim();
        const codigoPostal = document.getElementById('codigoP').value.trim();
        const pais = document.getElementById('pais').value.trim();
        const tarjeta = document.getElementById('tarjeta').value.trim();
        const expiracionTarjeta = document.getElementById('tarjetaExp').value.trim();
        const cvc = document.getElementById('cvv').value.trim();
        
        const correoError = document.getElementById('correoError');
        const nombreError = document.getElementById('nombreError');
        const apellidosError = document.getElementById('apellidosError');
        const direccionError = document.getElementById('direccionError');
        const estadoError = document.getElementById('estadoError');
        const ciudadError = document.getElementById('ciudadError');
        const codigoPostalError = document.getElementById('codigoPError');
        const paisError = document.getElementById('paisError');
        const tarjetaError = document.getElementById('tarjetaError');
        const expiracionTarjetaError = document.getElementById('tarjetaExpError');
        const cvcError = document.getElementById('cvvError');

        let formularioValido = true;

        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (correo === "") {
            correoError.textContent = "Información obligatoria";
            formularioValido = false;
        } else {
            if (!correoRegex.test(correo)) {
                correoError.textContent = "El correo es incorrecto";
                formularioValido = false;
            } else {
                correoError.textContent = "";
            }
        }

        if (nombre === '' || !/^[a-zA-Z]+$/.test(nombre) || nombre.length < 3) {
            nombreError.textContent = 'Por favor, ingresa un nombre válido.';
            formularioValido = false;
        } else {
            nombreError.textContent = '';
        }

        if (apellidos === '' || !/^[a-zA-Z]+$/.test(apellidos) || apellidos.length < 3) {
            apellidosError.textContent = 'Por favor, ingresa un apellido válido.';
            formularioValido = false;
        } else {
            apellidosError.textContent = '';
        }

        if (direccion === '' || direccion.length < 10) {
            direccionError.textContent = 'Por favor, ingresa una dirección válida (mínimo 10 caracteres).';
            formularioValido = false;
        } else {
            direccionError.textContent = '';
        }

        if (estado === '' || estado.length < 4) {
            estadoError.textContent = 'Por favor, ingresa un estado válido (mínimo 4 caracteres).';
            formularioValido = false;
        } else {
            estadoError.textContent = '';
        }

        if (ciudad === '' || ciudad.length < 4) {
            ciudadError.textContent = 'Por favor, ingresa una ciudad válida (mínimo 4 caracteres).';
            formularioValido = false;
        } else {
            ciudadError.textContent = '';
        }

        if (codigoPostal === '' || codigoPostal.length < 5 || !/^\d+$/.test(codigoPostal)) {
            codigoPostalError.textContent = 'Por favor, ingresa un código postal válido (mínimo 5 caracteres, solo números).';
            formularioValido = false;
        } else {
            codigoPostalError.textContent = '';
        }

        if (pais === '' || pais.length < 4) {
            paisError.textContent = 'Por favor, ingresa un país válido (mínimo 4 caracteres).';
            formularioValido = false;
        } else {
            paisError.textContent = '';
        }

        if (tarjeta === '' || tarjeta.length < 16 || !/^\d+$/.test(tarjeta)) {
            tarjetaError.textContent = 'Por favor, ingresa un número de tarjeta válido (16 dígitos, solo números).';
            formularioValido = false;
        } else {
            tarjetaError.textContent = '';
        }

        if (!/^(\d{2})\/(\d{2})$/.test(expiracionTarjeta)) {
            expiracionTarjetaError.textContent = 'Por favor, ingresa una fecha de expiración válida (MM/YY).';
            formularioValido = false;
        } else {
            const expiracionArray = expiracionTarjeta.split('/');
            const expiracionMes = parseInt(expiracionArray[0]);
            const expiracionAnio = parseInt(expiracionArray[1]);
            const fechaActual = new Date();
            const anioActual = fechaActual.getFullYear() % 100;
            if (expiracionAnio < anioActual || expiracionMes > 12 || expiracionMes < 1) {
                expiracionTarjetaError.textContent = 'La fecha de expiración debe ser posterior a la actual.';
                formularioValido = false;
            } else {
                expiracionTarjetaError.textContent = '';
            }
        }

        if (cvc === '' || cvc.length !== 3 || !/^\d+$/.test(cvc)) {
            cvcError.textContent = 'Por favor, ingresa un código de seguridad (CVC) válido (3 dígitos, solo números).';
            formularioValido = false;
        } else {
            cvcError.textContent = '';
        }

        return formularioValido;
    }
});
