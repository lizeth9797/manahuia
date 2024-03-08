document.getElementById("btnRegister").addEventListener("click", function(event){
    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;
    var valid = true;

    // Validar correo
    if(!correo.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        document.getElementById("correoError").innerText = "El correo es incorrecto";
        valid = false;
    } else {
        document.getElementById("correoError").innerText = "";
    }

    // Validar contraseña
    if(password.length < 6){
        document.getElementById("passwordError").innerText =  "La contraseña es incorrecta.";
        valid = false;
    } else {
        document.getElementById("passwordError").innerText = "";
    }

    // Evitar el envío si hay errores
    if(!valid){
        event.preventDefault();
    }
});
