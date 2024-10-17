import {validate, validarTelefono, validatePassword, validateCP, validateMensajeDescripcion, llenarSelect, samePassword} from "./validaciones.js";
// Se obtiene la sesión activa
let usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"))
// Se agregan campos
const nombre_usuario = document.getElementById("nombre_usuario");
const apellido_usuario = document.getElementById("apellido_usuario");
const email_usuario = document.getElementById("email_usuario");
const telefono_usuario = document.getElementById("telefono_usuario");
const estado_usuarios = document.getElementById("estado_usuarios");
const estado_usuario = document.getElementById("estado_usuario");
const cp_usuario = document.getElementById("cp_usuario");
const direccion_usuario = document.getElementById("direccion_usuario");
const password_usuario = document.getElementById("password_usuario");
const password_usuario_new = document.getElementById("password_usuario_new");
const password_usuario_now = document.getElementById("password_now");
// Campos-info
const nombresInfo=document.getElementById("nombresInfo");
const apellidosInfo=document.getElementById("apellidosInfo");
const cpInfo=document.getElementById("cpInfo");
const direccionInfo=document.getElementById("direccionInfo");
const telefonoInfo=document.getElementById("telefonoInfo");                         
const passwordInfo = document.getElementById("passwordInfo");
const passwordConfirmationInfo = document.getElementById("passwordConfirmationInfo");                              
const passwordNowConfirmationInfo = document.getElementById("passwordNowConfirmationInfo");  
// Declaración de botones
const btn_modificar = document.getElementById("btn-modificar");
const btn_guardar = document.getElementById("btn-guardar");
const btn_cancelar = document.getElementById("btn-cancelar");
const actual= document.getElementById("actual");
const div_guardar = document.getElementById("div_guardar");
const div_modificar = document.getElementById("div_modificar");
// Declaración de bandera
let isValid = true;
// Evento para cuando se toca el botón de modificar
btn_modificar.addEventListener("click", function(event){
    event.preventDefault();
    blockInputs(false);
    estado_usuario.style.display = "none";
    estado_usuarios.style.display = "block";
    estado_usuarios.value = usuarioActivo.usuario.estado;
    div_modificar.style.display = "none";
    div_guardar.style.display = "flex";
    password_usuario_now.display = "block"
    actual.style.display = "flex";
})
// Evento para cuando se toca el botón de cancelar
btn_cancelar.addEventListener("click", function(event) {
    event.preventDefault();
    blockInputs(true);
    estado_usuarios.style.display = "none";
    estado_usuario.style.display = "block";
    div_modificar.style.display = "flex";
    div_guardar.style.display = "none";
    actual.style.display = "none";
    setTimeout(function(){
        location.reload()
    }, 1000);
})
// Evento para cuando se toca el botón de guardar
btn_guardar.addEventListener("click", async function(event){
    event.preventDefault();
    isValid = true
    nombre_usuario.style.border = "";
    apellido_usuario.style.border = "";
    estado_usuarios.style.border = "";
    cp_usuario.style.border = "";
    direccion_usuario.style.border = "";
    telefono_usuario.style.border = "";
    password_usuario.style.border = "";
    password_usuario_new.style.border = "";
    // Borramos los errores
    nombresInfo.innerHTML=""; nombresInfo.display="none";
    apellidosInfo.innerHTML=""; apellidosInfo.display="none";
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
    if (!validate(apellido_usuario, apellidosInfo)) {
        apellido_usuario.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que la ubicación proporcionada sea válida, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateMensajeDescripcion(direccion_usuario, direccionInfo)) {
        direccion_usuario.style.border = "solid red medium";
        isValid = false
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
    // Si se trató de cambiar la contraseña procede a validar la nueva contraseña, de lo contrario no valida los campos
    if (!(password_usuario.value === null || password_usuario.value === "")){
        // Comprobamos que la contraseña sea válida, si no es válida cambiamos el estado de nuestra bandera a falso
        if (!validatePassword(password_usuario, passwordInfo)) {
            password_usuario.style.border = "solid medium red";
            isValid = false;
        }
        // Comprobamos que la contraseña sea válida, si no es válida cambiamos el estado de nuestra bandera a falso
        if (!(password_usuario_new.value === password_usuario.value)) {
            password_usuario_new.style.border = "solid medium red";
            passwordConfirmationInfo.innerHTML=`Las contraseñas no coinciden`;
            passwordConfirmationInfo.display="block";
            isValid = false;
        }
    }
    // Para hacer los cambios comprueba que la contraseña coincida con la del usuario
    if (! await samePassword(usuarioActivo.token.accessToken, password_usuario_now.value, usuarioActivo.usuario.id)) {
        password_usuario_now.style.border = "solid medium red";
        passwordNowConfirmationInfo.innerHTML=`La contraseña no es correcta`;
        passwordNowConfirmationInfo.display="block";
        isValid = false;
    }
    // Si se pasaron todas las validaciones, se enviará el formulario 
    if (isValid) {
        setData();
        blockInputs(true);
        estado_usuarios.style.display = "none";
        estado_usuario.style.display = "block";
        div_modificar.style.display = "flex";
        div_guardar.style.display = "none";
        actual.style.display = "none";
        Swal.fire({
            icon: "success",
            title: "Se actualizaron los datos correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(function(){
            loadData();
        }, 1000);
    }else{
        Swal.fire({
            icon: "error",
            title: "Error en el llenado del formulario",
            text: "Favor de corregir las casillas resaltadas en rojo",
          });  
    }

})

window.addEventListener("load", function(event){
    event.preventDefault();
    email_usuario.disabled = true;
    llenarSelect(estado_usuarios);
    if(this.sessionStorage.getItem("usuarioActivo") == null){
        location.href = "./login.html";
    }else{
        loadData();
    }
})

function blockInputs(status){
    nombre_usuario.disabled = status;
    apellido_usuario.disabled = status;
    telefono_usuario.disabled = status;
    estado_usuarios.disabled = status;
    estado_usuario.disabled = status;
    cp_usuario.disabled = status;
    direccion_usuario.disabled = status;
    password_usuario.disabled = status;
    password_usuario_new.disabled = status;
}

function loadData(){
    nombre_usuario.value = usuarioActivo.usuario.nombre;
    apellido_usuario.value = usuarioActivo.usuario.apellidos;
    email_usuario.value = usuarioActivo.usuario.correo;
    telefono_usuario.value = usuarioActivo.usuario.telefono;
    cp_usuario.value = usuarioActivo.usuario.codigo_postal;
    direccion_usuario.value = usuarioActivo.usuario.direccion;
    estado_usuario.value = usuarioActivo.usuario.estado;
}

function setData(){
    let pass;
    if (!(password_usuario.value == null || password_usuario.value == "")){
        pass = password_usuario.value;
    }else{
        pass = null
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb3NlZGJhcnJlcmExQGdtYWlsLmNvbSIsInJvbGUiOiJjbGllbnRlIiwiaWF0IjoxNzI5MDY0MjUyLCJleHAiOjE3MjkxMDc0NTJ9.b7TvqqZH0q1SJsKbvkB4HpFiCrfZCEMgc-U-CwWwEu4");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "nombre": nombre_usuario.value,
    "apellidos": apellido_usuario.value,
    "codigo_postal": cp_usuario.value,
    "direccion": direccion_usuario.value,
    "telefono": telefono_usuario.value,
    "estado": estado_usuarios.value,
    "currentPassword": password_usuario_now.value,
    "newPassword": pass
    });

    const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(`http://3.16.138.251/api/usuarios/${usuarioActivo.usuario.id}/edit-usuario`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        usuarioActivo.usuario = result
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo))
    })
    .catch((error) => console.error(error));

    // localStorage.setItem("usuario_activo", JSON.stringify(usuario));
}