    // Capturar elementos//
    let form = document.querySelector(".formulario");
    //Email
    let email = document.getElementById("email");
    let textEmail = document.getElementById("text_validation_email")
    let inputEmail = document.getElementById("email")
    let iconoCruzEmail = document.querySelector("#mensaje-validacion-email .icono-cruz")
    let iconoCheckEmail = document.querySelector("#mensaje-validacion-email .icono-check")

    let patternEmail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    //Contraseña
    let contraseña = document.getElementById("password");
    let textContraseña = document.getElementById("text_validation_password")
    let inputContraseña = document.getElementById("password")
    let iconoCruzContraseña = document.querySelector("#mensaje-validacion-contraseña .icono-cruz")
    let iconoCheckContraseña = document.querySelector("#mensaje-validacion-contraseña .icono-check")

    // Eventos
    form.addEventListener('submit', function(e) {
        let hasError = {
            email: validationEmail(),
            contraseña: validationContraseña(),
        };
        if (hasError.email || hasError.contraseña)
        e.preventDefault(); 
    })    
    email.addEventListener('blur', validationEmail);
    contraseña.addEventListener('blur', validationContraseña);

    //Funciones

    //Validacion de Email
    function validationEmail() {
        if (email.value == "") {
            textEmail.innerHTML = "El campo esta vacío"
            inputEmail.style.border =  "5px solid red"
            textEmail.style.color = "red"
            iconoCruzEmail.style.display = "inline"
            iconoCheckEmail.style.display = "none"
            return true;
        }

        else if(!email.value.match(patternEmail)) {
            textEmail.innerHTML = "Ingrese un email correcto"
            textEmail.style.color = "red"
            inputEmail.style.border =  "5px solid red"
            iconoCruzEmail.style.display = "inline"
            iconoCheckEmail.style.display = "none"
            return true;
            }

        if(email.value.match(patternEmail)){
            textEmail.innerHTML = "Tu email es valido"
            textEmail.style.color = "#1ed12d"
            inputEmail.style.border =  "5px solid #1ed12d"
            iconoCruzEmail.style.display = "none"
            iconoCheckEmail.style.display = "inline"
            return false;
        }
    }
    //Validacion de contraseña
    function validationContraseña() {
        if (contraseña.value == "") {
            textContraseña.innerHTML = "El campo esta vacío"
            textContraseña.style.color = "red"
            inputContraseña.style.border =  "5px solid red"
            iconoCruzContraseña.style.display = "inline"
            iconoCheckContraseña.style.display = "none"
            return true;
        }

        else if (contraseña.value.length < 8) {
            textContraseña.innerHTML = "El campo tiene que tener minimo 8 caracteres"
            textContraseña.style.color = "red"
            inputContraseña.style.border =  "5px solid red"
            iconoCruzContraseña.style.display = "inline"
            iconoCheckContraseña.style.display = "none"
            return true;
        }

        if(contraseña.value.length >= 8){
            textContraseña.innerHTML = "El campo esta completo"
            textContraseña.style.color = "#1ed12d"
            inputContraseña.style.border =  "5px solid #1ed12d"
            iconoCruzContraseña.style.display = "none"
            iconoCheckContraseña.style.display = "inline"
            return false;
        }
    }