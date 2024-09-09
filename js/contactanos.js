

let nombre_usuario = document.getElementById("nombre_usuario")
let apellidos_usuario = document.getElementById("apellidos_usuario")
let email_usuario = document.getElementById("email_usuario")
let telefono_usuario = document.getElementById("telefono_usuario")
let mensaje = document.getElementById("mensaje")
let btnEnviar = document.getElementById("btnEnviar")
let isValid = true

const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;


function validarCantidad() {
    if (telefono_usuario.value.length == 0) {
        return false;
    }// legth==0
    if (isNaN(telefono_usuario.value)) {
        return false;
    }//isNaN
    if (!(Number(telefono_usuario.value.length) <= 13 && Number(telefono_usuario.value.length) >= 10)) {
        return false;
    }

    return true;
}


btnEnviar.addEventListener("click", function (e) {
    e.preventDefault()
    isValid = true
    nombre_usuario.style.border = "";
    apellidos_usuario.style.border = "";
    email_usuario.style.border = ""
    telefono_usuario.style.border = ""
    mensaje.style.border = ""
    
    // console.log("que hongo")
    if (!validate(nombre_usuario)) {
        nombre_usuario.style.border = "solid red medium";
        console.log("error nombre")
        isValid = false
    }
    if (!validate(apellidos_usuario)) {
        apellidos_usuario.style.border = "solid red medium";
        console.log("error apellido")
        isValid = false
    }
    if (!validateEmail(email_usuario)) {
        email_usuario.style.border = "solid red medium";
        console.log("error email")
        isValid = false
    }

    if (!validarCantidad()) {
        telefono_usuario.style.border = "solid medium red";
        isValid = false;
        console.log("error telefono")
    }

    if (!validateMensaje(mensaje)) {
        mensaje.style.border = "solid medium red";
        isValid = false;
        console.log("error mensaje")
    }

    if (!isValid) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Los datos en las casillas rojas no son validos",
          });
        
    }
})

function validate(data) {

    if (data.value.length < 3) {
        return false
    }
    if (!nombreRegex.test(data.value)) {
        return false
    }
    return true
}

function validateEmail(email) {
    if (email.value.length < 3) {
        return false
    }
    if (!emailRegex.test(email.value)) {
        return false
    }
    return true
}

function validateMensaje(mensaje) {
    if (mensaje.value.length < 3) {
        return false
    }
    if (!nombreRegex.test(mensaje.value)) {
        return false
    }
    return true

}











