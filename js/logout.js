document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencia al elemento del botón de cierre de sesión
    var logoutViajera = document.getElementById('logoutViajera');
    var logoutAdmin = document.getElementById('logoutAdmin');

    // Agregar el event listener al enlace de cierre de sesión para usuario viajero
    logoutViajera.addEventListener('click', function (event) {
        // Eliminar datos de inicio de sesión del almacenamiento local
        localStorage.removeItem('login');
        localStorage.removeItem('nextIdLogin');
        localStorage.removeItem('tipoUsuario');
    });

    // Agregar el event listener al enlace de cierre de sesión para administrador
    logoutAdmin.addEventListener('click', function (event) {
        // Eliminar datos de inicio de sesión del almacenamiento local
        localStorage.removeItem('login');
        localStorage.removeItem('nextIdLogin');
        localStorage.removeItem('tipoUsuario');
    });
});