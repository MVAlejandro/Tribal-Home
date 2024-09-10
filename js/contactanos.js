let nombre_usuario = document.getElementById("nombre_usuario");
let apellidos_usuario = document.getElementById("apellidos_usuario");
let email_usuario = document.getElementById("email_usuario");
let telefono_usuario = document.getElementById("telefono_usuario");
let mensaje = document.getElementById("mensaje");
let nombresInfo = document.getElementById("nombresInfo");
let apellidosInfo = document.getElementById("apellidosInfo");
let emailInfo = document.getElementById("emailInfo");
let telefonoInfo = document.getElementById("telefonoInfo");
let mensajeInfo = document.getElementById("mensajeInfo");
let formulario = document.getElementById("formulario");
let btnEnviar = document.getElementById("btnEnviar");
let isValid = true

const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
const evitarCaracteres = /^[^'";<>\\\/&()\[\]]+$/

formulario.addEventListener("submit",function (e) {
    e.preventDefault()
    isValid = true
    nombre_usuario.style.border = "";
    apellidos_usuario.style.border = "";
    email_usuario.style.border = "";
    telefono_usuario.style.border = "";
    mensaje.style.border = "";
    nombresInfo.innerHTML="";
    nombresInfo.display="none";
    apellidosInfo.innerHTML="";
    apellidosInfo.display="none";
    emailInfo.innerHTML="";
    emailInfo.display="none";
    telefonoInfo.innerHTML="";
    telefonoInfo.display="none";
    mensajeInfo.innerHTML="";
    mensajeInfo.display="none";
    
    // console.log("que hongo")
    if (!validate(nombre_usuario, nombresInfo)) {
        nombre_usuario.style.border = "solid red medium";
       // console.log("error nombre")
        isValid = false
    }
    if (!validate(apellidos_usuario, apellidosInfo)) {
        apellidos_usuario.style.border = "solid red medium";
        //console.log("error apellido")
        isValid = false
    }
    if (!validateEmail(email_usuario, emailInfo)) {
        email_usuario.style.border = "solid red medium";
       // console.log("error email")
        isValid = false
    }

    if (!validarCantidad()) {
        telefono_usuario.style.border = "solid medium red";
        isValid = false;
       // console.log("error telefono")
    }

    if (!validateMensaje(mensaje)) {
        mensaje.style.border = "solid medium red";
        isValid = false;
        //console.log("error mensaje")
    }

    if (!isValid) {
        Swal.fire({
            icon: "error",
            title: "Error en el llenado del formulario",
            text: "Favor de corregir las casillas resaltadas en rojo",
          });  
    }else{
        const serviceID = 'default_service';
        const templateID = 'template_xtz5zgp';
        emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            nombre_usuario.value = "";
            apellidos_usuario.value = "";
            email_usuario.value = "";
            telefono_usuario.value = "";
            Swal.fire({
                icon: "success",
                title: "El correo se envió correctamente!",
                showConfirmButton: false,
                timer: 1500
              });

        }, (err) => {
            Swal.fire({
                icon: "error",
                title: "Error al enviar el correo",
                text: "Intenta enviar el correo más tarde",
              });  
        });
    }
})

function validate(data, info) {

    if (data.value.length < 3) {
        info.innerHTML=`El campo debe de tener almenos 3 carácteres`;
        info.display="block";
        return false
    }
    if (!nombreRegex.test(data.value)) {
        info.innerHTML=`El campo no acepta caracters especiales ni números`;
        info.display="block";
        return false
    }
    return true
}

function validateEmail(email, info) {
    if (email.value.length < 3) {
        info.innerHTML=`El correo debe de tener almenos 3 carácteres`;
        info.display="block";
        return false
    }
    if (!emailRegex.test(email.value)) {
        info.innerHTML=`El correo debe de cumplir con el formato example@example.com`;
        info.display="block";
        return false
    }
    return true
}

function validarCantidad() {
    if (telefono_usuario.value.length == 0) {
        telefonoInfo.innerHTML=`El campo telefono esta vacio`;
        telefonoInfo.display="block";
        return false;
    }// legth==0
    if (isNaN(telefono_usuario.value)) {
        telefonoInfo.innerHTML=`El campo telefono solo puede contener números`;
        telefonoInfo.display="block";
        return false;
    }//isNaN
    if (!(Number(telefono_usuario.value.length) <= 13 && Number(telefono_usuario.value.length) >= 10)) {
        telefonoInfo.innerHTML=`El campo telefono debe contener de 10 a 13 dígitos`;
        telefonoInfo.display="block";
        return false;
    }

    return true;
}

function validateMensaje(mensaje) {
    if (mensaje.value.length < 3) {
        mensajeInfo.innerHTML=`El mensaje debe de contener al menos 3 carácteres`;
        mensajeInfo.display="block";
        return false
    }
    if (!evitarCaracteres.test(mensaje.value)) {
        mensajeInfo.innerHTML=`El mensaje no acepta caracters especiales`;
        mensajeInfo.display="block";
        return false
    }
    return true

}











