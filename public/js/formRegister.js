const expresiones = {
	//usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	usuario: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

window.addEventListener('load', function() {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');
    
    const validarFormulario = function(e){
        switch (e.target.name){
            case "name":
                validarEspacio(expresiones.usuario, e.target, "usuario");
                breack;
            case "lastName":
                validarEspacio(expresiones.usuario, e.target, "lastName");
                breack;
            case "telefono":
                validarEspacio(expresiones.telefono, e.target, "telefono");
                breack;
            case "email":
                validarEspacio(expresiones.correo, e.target, "correo");
                breack;
            case "password":
                validarEspacio(expresiones.password, e.target, "password");
                validarPassword();
                breack;
            case "passwordConfirm":
                validarPassword();
                breack;
            case "image":
                breack;
        }
    }
const validarEspacio = (expressiones, input, campo)=>{
    if(expressiones.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("form__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("form__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
//                    document.querySelector("#grupo__usuario .mensajesError").classList.remove("mensajesError-activo");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
    }else{
        document.getElementById(`grupo__${campo}`).classList.add("form__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
//                    document.querySelector("#grupo__usuario .mensajesError").classList.add("mensajesError-activo");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
    }
}
const validarPassword = ()=>{
    const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('passwordConfirm');
    
    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`grupo__passwordConfirm`).classList.add("form__grupo-incorrecto");
        document.getElementById(`grupo__passwordConfirm`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__passwordConfirm i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__passwordConfirm i`).classList.remove("fa-check-circle");
//                    document.querySelector("#grupo__usuario .mensajesError").classList.add("mensajesError-activo");
        document.querySelector(`#grupo__passwordConfirm .formulario__input-error`).classList.add("formulario__input-error-activo");
    }else{
        document.getElementById(`grupo__passwordConfirm`).classList.remove("form__grupo-incorrecto");
        document.getElementById(`grupo__passwordConfirm`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__passwordConfirm i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__passwordConfirm i`).classList.remove("fa-times-circle");
//                    document.querySelector("#grupo__usuario .mensajesError").classList.add("mensajesError-activo");
        document.querySelector(`#grupo__passwordConfirm .formulario__input-error`).classList.remove("formulario__input-error-activo");
    }
}

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    formulario.addEventListener('submit', (e) => {
      //  e.preventDefault()
    })
})

