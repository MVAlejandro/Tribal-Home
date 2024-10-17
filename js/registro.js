// Importamos las funciones de validación
import {validate, validateEmail, validarTelefono, validatePassword, validateCP, validateMensajeDescripcion, existEmail, llenarSelect} from "./validaciones.js";
//campos-input
const nombre_usuario=document.getElementById("nombre_usuario");
const apellidos_usuario=document.getElementById("apellidos_usuario");
const cp_usuario=document.getElementById("cp_usuario");
const direccion_usuario=document.getElementById("direccion_usuario");
const email_usuario=document.getElementById("email_usuario");
const telefono_usuario=document.getElementById("telefono_usuario");
const password_usuario = document.getElementById("password_usuario");
const password_confirmation = document.getElementById("password_confirmation");
//campos-info
const nombresInfo=document.getElementById("nombresInfo");
const apellidosInfo=document.getElementById("apellidosInfo");
const cpInfo=document.getElementById("cpInfo");
const direccionInfo=document.getElementById("direccionInfo");
const emailInfo=document.getElementById("emailInfo");
const telefonoInfo=document.getElementById("telefonoInfo");                         
const passwordInfo = document.getElementById("passwordInfo");
const passwordConfirmationInfo = document.getElementById("passwordConfirmationInfo");                              
//declara el div en done se pondra el select de estados
const ubicacion_usuarios= document.getElementById("ubicacion_usuarios");
// Obtenemos el formulario
const formulario = document.getElementById("formulario");
// Inicializamos nuestra bandera isValid en true
let isValid = true;
// Creamos la variable usuario
let usuario;
let usuarios = new Array();

//*--------------funciones-----------------*


//verifica los datos y de ser correcto crear la cuenta por el momento en el local storage
// Agregamos el evento cuando se envie el formulario
formulario.addEventListener("submit",async function (e) {
    e.preventDefault()
    // Cada que entramos al evento dejamos un estado inicial
    isValid = true
    nombre_usuario.style.border = "";
    apellidos_usuario.style.border = "";
    ubicacion_usuarios.style.border = "";
    cp_usuario.style.border = "";
    direccion_usuario.style.border = "";
    email_usuario.style.border = "";
    telefono_usuario.style.border = "";
    password_usuario.style.border = "";
    password_confirmation.style.border = "";
    // Borramos los errores
    nombresInfo.innerHTML=""; nombresInfo.display="none";
    apellidosInfo.innerHTML=""; apellidosInfo.display="none";
    emailInfo.innerHTML=""; emailInfo.display="none";
    cpInfo.innerHTML=""; cpInfo.display="none";
    direccionInfo.innerHTML=""; direccionInfo.display="none";
    telefonoInfo.innerHTML=""; telefonoInfo.display="none";
    passwordInfo.innerHTML=""; passwordInfo.display="none";
    passwordConfirmationInfo.innerHTML=""; passwordConfirmationInfo.display="none";
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
    // Comprobamos que la ubicación proporcionada sea válida, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateMensajeDescripcion(direccion_usuario, direccionInfo)) {
        direccion_usuario.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que el email proporcionado sea válido y que no haya sido registrado antes, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateEmail(email_usuario, emailInfo)) {
        email_usuario.style.border = "solid red medium";
        isValid = false
    }else {
        const emailExists = await existEmail(email_usuario);
        if (!emailExists) {
            emailInfo.innerHTML = `El correo que tratas de utilizar ya está registrado`;
            email_usuario.style.border = "solid red medium";
            isValid = false;
        }
    }
    // Comprobamos que el email proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateCP(cp_usuario, cpInfo)) {
        cp_usuario.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que el número telefónico proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validarTelefono(telefono_usuario, telefonoInfo)) {
        telefono_usuario.style.border = "solid medium red";
        isValid = false;
    }
    // Comprobamos que la contraseña sea válida, si no es válida cambiamos el estado de nuestra bandera a falso
    if (!validatePassword(password_usuario, passwordInfo)) {
        password_usuario.style.border = "solid medium red";
        isValid = false;
    }
    // Comprobamos que la contraseña sea válida, si no es válida cambiamos el estado de nuestra bandera a falso
    if (!(password_confirmation.value === password_usuario.value)) {
        password_confirmation.style.border = "solid medium red";
        passwordConfirmationInfo.innerHTML=`Las contraseñas no coinciden`;
        passwordConfirmationInfo.display="block";
        isValid = false;
    }
    // Si se pasaron todas las validaciones, se enviará el formulario 
    if (isValid) {
        const raw = JSON.stringify({
            "nombre": nombre_usuario.value,
            "apellidos": apellidos_usuario.value,
            "estado": ubicacion_usuarios.value,
            "codigo_postal": cp_usuario.value,
            "direccion": direccion_usuario.value,
            "telefono": telefono_usuario.value.trim(),
            "correo": email_usuario.value,
            "contrasenia": password_usuario.value,
            "rol": "cliente"
            });

        setUsuario(raw);

        nombre_usuario.value = "";
        apellidos_usuario.value = "";
        ubicacion_usuarios.value = "";
        email_usuario.value = "";
        cp_usuario.value = "";
        direccion_usuario.value = "";
        password_usuario.value = "";
        password_confirmation.value = "";
        telefono_usuario.value = "";
        // Si el correo se envio correctamente lanzará una alerta de que se envio correctamente
        Swal.fire({
            icon: "success",
            title: "Registro completado correctamente",
            showConfirmButton: false,
            timer: 1500
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

function setUsuario(raw){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    
    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://3.16.138.251/api/usuarios/registro", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

//*---------------metodo al cargar pagina-----------*
window.addEventListener("load", function(){
    llenarSelect(ubicacion_usuarios);
    
});