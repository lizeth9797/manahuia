document.addEventListener("DOMContentLoaded", function() {
    //Se obtienen usuarios registrados y almacenados en LocalStorage:
    const storedUsers = localStorage.getItem('registro');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    var modalAdmin = document.getElementById('modalAdmin');
    var modalViajera = document.getElementById('modalViajera');
 
     //Se agrega la funcion Json
     function addItem(nuevoLogin) {
         let login = JSON.parse(localStorage.getItem('login')) || [];
         login.push(nuevoLogin);
         localStorage.setItem('login', JSON.stringify(login));
     }//function addItem(nuevoLogin)-->Función para agregar un elemento al almacenamiento local
     
 document.getElementById("btnRegister").addEventListener("click", function(event){
     let correo = document.getElementById("correo");
     let password = document.getElementById("password");
     // obtiene el ultimo contador del input almacenado en localStorage iniciando en 1
     let idCounter = parseInt(localStorage.getItem('nextIdLogin')) || 1;
     let valid = true;
     let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     var tipoUsuario=0;
 
     // Validar correo
     //1. deja pasar espacios al inicio
     //2. deja pasar espacios al final del todo el correo
     // Validar si el correo está vacío o solo tiene espacios
     if(correo.value === ""){
         document.getElementById("correoError").innerText = "Información obligatoria";
         valid = false;
     }
     else {
         if(!correoRegex.test(correo.value)) {
             document.getElementById("correoError").innerText = "El correo es incorrecto";
             valid = false;
         } 
         else {
             document.getElementById("correoError").innerText = "";
         }
     }
     
 
     // Validar si la contraseña está vacía o solo tiene espacios
     if(password.value === ""){
         document.getElementById("passwordError").innerText = "Información obligatoria";
         valid = false;
     } else {
         password=password.value.trim();
         // Validar que la contraseña coincida con el correo guardado
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
 
     function userExist(){
        if(users.length==0){
            valid=false;
            document.getElementById("passwordError").innerText = "Nombre de usuario o contraseña inválidos"; //mandar a escribir el error
        }else{
            for(let i=0;i<users.length;i++){
                document.getElementById("correoError").innerText = "";
                if(users[i].correo==correo.value){//si existe el correo en el localStorage, entonces compara la contraseña
                    if(users[i].password==password){
                        document.getElementById("correoError").innerText = "";
                        tipoUsuario=users[i].tipoUsuario;
                        i=users.length;
                        valid=true; 
                        //nos traemos el arreglo de login que está en localStorage
                        let x=JSON.parse(localStorage.getItem('login'));
                        if(x!=null){
                            for(let j=0; j<x.length;j++){
                                if(x[j].correo==correo.value){
                                    document.getElementById("passwordError").innerText = "Ya tienes una sesión abierta"; //mandar a escribir el error
                                    j=x.length;
                                    valid=false; 
                                }
                            } 
                        }
                    }else{
                        document.getElementById("passwordError").innerText = "Nombre de usuario o contraseña inválidos"; //mandar a escribir el error
                        valid=false; 
                    }
                }
                else if(i==(users.length)-1) {
                    document.getElementById("passwordError").innerText = "Nombre de usuario o contraseña inválidos"; //mandar a escribir el error
                    valid=false; 
                }
            }
        }
    }//userExist
     
 
     userExist(); //verifica si el usuario existe antes de registrarlo en el LocalStorage
     //Almacenar datos en localstorage
     if (valid) {
         var nuevoLogin= {   
             'id': idCounter, // Asignar un nuevo ID
             'correo': correo.value,
             'password': password,
             'tipoUsuario': tipoUsuario
         };
         addItem(nuevoLogin);//Llamada a la función para agregar un nuevo login al almacenamiento local
 
         function modalBienvenida (tipoUsuario) {
             if (tipoUsuario == 1){
                 $('#modalAdmin').modal('show');
             } else if(tipoUsuario == 0){
                 $('#modalViajera').modal ('show');
             }
         }
        
         
         // Limpiar los campos después de enviar el formulario
         
         idCounter++;
         localStorage.setItem('nextIdLogin', idCounter.toString());
         modalBienvenida(tipoUsuario);
         limpiarCampos();
     } //if(valid)
 });//eventListener 
 
 
 function limpiarCampos() {
     // Limpiar los campos después de enviar el formulario
     correo.value = '';
     password.value = '';
 }//funcion limpiarCampos
 
 });