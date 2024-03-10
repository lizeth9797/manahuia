document.getElementById("btnRegister").addEventListener("click", function(event){
    var correo = document.getElementById("correo").value.trim();
    var password = document.getElementById("password").value.trim();
    var valid = true;

    // Validar si el correo está vacío o solo tiene espacios
    if(correo === ""){
        document.getElementById("correoError").innerText = "Información obligatoria";
        valid = false;
    } else {
        // Validar formato de correo
        if(!correo.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            document.getElementById("correoError").innerText = "El correo es incorrecto";
            valid = false;
        } else {
            document.getElementById("correoError").innerText = "";
        }
    }

    // Validar si la contraseña está vacía o solo tiene espacios
    if(password === ""){
        document.getElementById("passwordError").innerText = "Información obligatoria";
        valid = false;
    } else {
        // Validar longitud de contraseña
        if(password.length < 6){
            document.getElementById("passwordError").innerText = "La contraseña es incorrecta.";
            valid = false;
        } else {
            document.getElementById("passwordError").innerText = "";
        }
    }

    // Evitar el envío si hay errores
    if(!valid){
        event.preventDefault();
    }
});
