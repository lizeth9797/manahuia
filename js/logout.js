document.addEventListener("DOMContentLoaded", function() {
    
    function logout() {// si se presiona el botón logout entonces borra el registro del localStorage
         localStorage.removeItem('login');
         localStorage.removeItem('nextIdLogin');
     }


    document.getElementById("logout").addEventListener("click", function(event){
        event.preventDefault();
        logout();
    });

});