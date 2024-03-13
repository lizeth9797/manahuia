function obtenerTipoUsuario() {
    // Obtener el tipo de usuario desde el almacenamiento local
    // Si no existe, establecerlo en 0 (usuario normal) por defecto
    var tipoUsuario = localStorage.getItem('tipoUsuario') || 0;
    return tipoUsuario;
}
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el tipo de usuario y actualizar el navbar
    var tipoUsuario = obtenerTipoUsuario();
    actualizarNavbar(tipoUsuario);
});

// Función para actualizar el navbar según el tipo de usuario
function actualizarNavbar(tipoUsuario) {
    // Obtener elementos del navbar
    var defaultDropdown = document.getElementById('defaultDropdown');
    var userDropdown = document.getElementById("userDropdown");
    var adminDropdown = document.getElementById("adminDropdown");

    // Si el tipo de usuario es administrador, mostrar el navbar de administrador y ocultar el de usuario normal
    if (tipoUsuario == 1) {
        userDropdown.classList.add('d-none');
        adminDropdown.classList.remove('d-none');
        defaultDropdown.classList.add('d-none');
        
    } else { // Si el tipo de usuario es usuario normal, mostrar el navbar de usuario normal y ocultar el de administrador
        userDropdown.classList.remove('d-none');
        adminDropdown.classList.add('d-none');
        defaultDropdown.classList.add('d-none');

    }
}