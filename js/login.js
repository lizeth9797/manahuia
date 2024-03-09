
document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("btnRegister").addEventListener("click", function(event){
    // obtiene el ultimo contador del input almacenado en localStorage iniciando en 1
    let idCounter = parseInt(localStorage.getItem('nextIdUser')) || 1;
    
    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;
    var valid = true;



    //Se agrega la funcion Json
     function addItem(nuevoLogin) {
    let login = JSON.parse(localStorage.getItem('login')) || [];

    login.push(nuevoLogin);
    localStorage.setItem('login', JSON.stringify(login));
    }//function addItem(nuevoLogin)-->Función para agregar un elemento al almacenamiento local






    // Validar correo
    //1. deja pasar espacios al inicio
    //2. deja pasar espacios al final del todo el correo
   
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


    //Almacenar datos en localstorage
    if (valid) {
        var nuevoLogin= {
            'id': idCounter, // Asignar un nuevo ID
            'correo': correo.value,
            'password': password.value,
        };//if

        addItem(nuevoLogin);//Llamada a la función para agregar un nuevo login al almacenamiento local
        

        // Limpiar los campos después de enviar el formulario
        limpiarCampos();
        idCounter++;
        localStorage.setItem('nextIdUser', idCounter.toString());
        // Agregar el nuevo correo a la lista en localStorage solo si no existe previamente
        existingCorreo.push(correo.value);
        localStorage.setItem('correo', JSON.stringify(existingCorreo));

    } //if(valid)



});//eventListener 

function limpiarCampos() {

    // Limpiar los campos después de enviar el formulario
    correo.value = '';
    password.value = '';
    
}//funcion limpiarCampos
});//document.addEventListener