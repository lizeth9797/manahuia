const pass = document.getElementById("password");
const passIcon = document.getElementById("passwordIcon");
const pass2 = document.getElementById("passwordConfirm");
const pass2Icon = document.getElementById("passwordConfirmIcon");

passIcon.addEventListener("click", function() {
    if (pass.type === "password") {
        pass.type = "text";
        passIcon.classList.remove('bx-show-alt');
        passIcon.classList.add('bx-hide');
    } else {
        pass.type = "password";
        passIcon.classList.remove('bx-hide');
        passIcon.classList.add('bx-show-alt');
    }
});

pass2Icon.addEventListener("click", function() {
    if (pass2.type === "password") {
        pass2.type = "text";
        pass2Icon.classList.remove('bx-show-alt');
        pass2Icon.classList.add('bx-hide');
    } else {
        pass2.type = "password";
        pass2Icon.classList.remove('bx-hide');
        pass2Icon.classList.add('bx-show-alt');
    }
});


//
