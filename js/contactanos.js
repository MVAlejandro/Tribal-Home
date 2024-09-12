// Se obtienen los inputs del formulario
let nombre_usuario = document.getElementById("nombre_usuario");
let apellidos_usuario = document.getElementById("apellidos_usuario");
let email_usuario = document.getElementById("email_usuario");
let telefono_usuario = document.getElementById("telefono_usuario");
let mensaje = document.getElementById("mensaje");
// Se obtienen los div para mostrar los mensajes de error
let nombresInfo = document.getElementById("nombresInfo");
let apellidosInfo = document.getElementById("apellidosInfo");
let emailInfo = document.getElementById("emailInfo");
let telefonoInfo = document.getElementById("telefonoInfo");
let mensajeInfo = document.getElementById("mensajeInfo");
// Obtenemos el formulario
let formulario = document.getElementById("formulario");
// Inicializamos nuestra bandera isValid en tru
let isValid = true
// Declaramos las expresiones regulares para validar los datos
const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Expresión regular para el nombre y el apellido
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/; // Expresión regular para el email
const evitarCaracteres = /^[^'";<>\\\/&()\[\]]+$/ // Expresión regular para el mensaje

// Agregamos el evento cuando se envie el formulario
formulario.addEventListener("submit",function (e) {
    e.preventDefault()
    // Cada que entramos al evento dejamos un estado inicial
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
    
    // Comprobamos que el nombre proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validate(nombre_usuario, nombresInfo)) {
        nombre_usuario.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que el apellido proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validate(apellidos_usuario, apellidosInfo)) {
        apellidos_usuario.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que el email proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateEmail(email_usuario, emailInfo)) {
        email_usuario.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que el número telefónico proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validarCantidad()) {
        telefono_usuario.style.border = "solid medium red";
        isValid = false;
    }
    // Comprobamos que el mensaje proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateMensaje(mensaje)) {
        mensaje.style.border = "solid medium red";
        isValid = false;
    }
    // Si se pasaron todas las validaciones, se enviará el formulario 
    if (isValid) {
        const serviceID = 'default_service';
        const templateID = 'template_xtz5zgp';
        emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            nombre_usuario.value = "";
            apellidos_usuario.value = "";
            email_usuario.value = "";
            telefono_usuario.value = "";
            mensaje.value="";
            // Si el correo se envio correctamente lanzará una alerta de que se envio correctamente
            Swal.fire({
                icon: "success",
                title: "El correo se envió correctamente!",
                showConfirmButton: false,
                timer: 1500
              });
            // Si hubo algun error lanzará una alerta diciendo que lo intente más tarde junto con el error
        }, (err) => {
            Swal.fire({
                icon: "error",
                title: "Error al enviar el correo",
                text: "Intenta enviar el correo más tarde. \n Error: " + err ,
              });  
        });
    // Si no pasó todas las validaciones mandará una alerta diciendo que corriga los datos ingresados
    }else{
        Swal.fire({
            icon: "error",
            title: "Error en el llenado del formulario",
            text: "Favor de corregir las casillas resaltadas en rojo",
          });  
    }
})

// Función que valida que los campos sean solo letras y que haya almenos 3 caracteres
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

// Función que valida que el correo tenga un formato válido
function validateEmail(email, info) {
    if (!emailRegex.test(email.value)) {
        info.innerHTML=`El correo debe de cumplir con el formato example@example.com`;
        info.display="block";
        return false
    }
    return true
}

// Función que valida que sea un número y que tenga de 10 a 13 caracteres 
function validarCantidad() {
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
// Función que valida que el mensaje tenga almenos 3 caracteres y que no contenga ciertos caracteres especiales 
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











