document.addEventListener('DOMContentLoaded', function () {

        //Se obtiene miembro login de localStorage (OCULTAR DEL LOGUEO DE USUARIO)
        let iniciar_sesionUN = document.getElementById("iniciar_sesionUN");
        let Crear_cuentaUN = document.getElementById("Crear_cuentaUN");

        let miembroLogin = localStorage.getItem("login");
        if (miembroLogin != null){
            iniciar_sesionUN.classList.add('d-none');
            Crear_cuentaUN.classList.add('d-none');
        } else {
            iniciar_sesionUN.classList.remove('d-none');
            Crear_cuentaUN.classList.remove('d-none');
        }
});