import {validate, validarTelefono, validatePassword, validateCP, validateMensajeDescripcion, llenarSelect} from "./validaciones.js";
// Se obtiene la sesión activa
let usuario_activo = JSON.parse(localStorage.getItem("usuario_activo"))
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

btn_modificar.addEventListener("click", function(event){
    event.preventDefault();
    blockInputs(false);
    estado_usuario.style.display = "none";
    estado_usuarios.style.display = "block";
    div_modificar.style.display = "none";
    div_guardar.style.display = "flex";
    password_usuario_now.display = "block"
    actual.style.display = "flex";
})

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

btn_guardar.addEventListener("click", function(event){
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
    if (!(password_usuario_now.value == usuario_activo.password_usuario)) {
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
            location.reload()
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
    if(this.localStorage.getItem("usuario_activo") == null){
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
    nombre_usuario.value = usuario_activo.nombre_usuario;
    apellido_usuario.value = usuario_activo.apellidos_usuario;
    email_usuario.value = usuario_activo.email_usuario;
    telefono_usuario.value = usuario_activo.telefono_usuario;
    cp_usuario.value = usuario_activo.cp_usuario;
    direccion_usuario.value = usuario_activo.direccion_usuario;
    // password_usuario.value = 
    estado_usuario.value = usuario_activo.ubicacion_usuarios;
}

function setData(){
    let usuario = [];
    let pass;
    if (!(password_usuario.value == null || password_usuario.value == "")){
        pass = password_usuario.value;
    }else{
        pass = usuario_activo.password_usuario;
    }
    usuario = {
        "nombre_usuario": nombre_usuario.value,
        "apellidos_usuario": apellido_usuario.value,
        "email_usuario": usuario_activo.email_usuario,
        "telefono_usuario": telefono_usuario.value,
        "cp_usuario": cp_usuario.value,
        "direccion_usuario": direccion_usuario.value,
        "password_usuario": pass,
        "ubicacion_usuarios": estado_usuarios.value
    };
    localStorage.setItem("usuario_activo", JSON.stringify(usuario));
}