function obtenerTipoUsuario() {
    // Obtener el tipo de usuario desde el almacenamiento local
    var tipoUsuario = localStorage.getItem('tipoUsuario');
    return tipoUsuario;
}

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el tipo de usuario y actualizar el navbar
    var tipoUsuario = obtenerTipoUsuario();
    actualizarNavbar(tipoUsuario);
});

function actualizarNavbar(tipoUsuario) {
    // Obtener elementos del navbar
    var defaultDropdown = document.getElementById('defaultDropdown');
    var userDropdown = document.getElementById("userDropdown");
    var adminDropdown = document.getElementById("adminDropdown");

    // Si el tipo de usuario es administrador, mostrar el navbar de administrador y ocultar el de usuario normal
    if (tipoUsuario === "1") {
        userDropdown.classList.add('d-none');
        adminDropdown.classList.remove('d-none');
        defaultDropdown.classList.add('d-none');
    } else if (tipoUsuario === "0") { // Si el tipo de usuario es usuario normal
        userDropdown.classList.remove('d-none');
        adminDropdown.classList.add('d-none');
        defaultDropdown.classList.add('d-none');
    } else { // Si no se ha definido un tipo de usuario o es otro valor
        userDropdown.classList.add('d-none');
        adminDropdown.classList.add('d-none');
        defaultDropdown.classList.remove('d-none');
    }
}