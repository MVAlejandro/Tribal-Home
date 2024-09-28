// Importamos las funciones de validación
import {validateEmail, validatePassword} from "./validaciones.js"
//botones
const btn_facebook= document.getElementById("btn-facebook");
const btn_google= document.getElementById("btn-google");
const btn_cuestionario= document.getElementById("btnEnviar")
const form = document.getElementById("form");
//campos
const email_field= document.getElementById("email-field");
const password_field= document.getElementById("password-field");
//campos info
const emailInfo=document.getElementById("emailInfo");
const passwordInfo = document.getElementById("passwordInfo");
//variables
let isValid=false 
let usuarios = new Array();
let isValiid = true;
let userValid = false;

//debe validar la existencia del usuario y mandar a la pagina de inicio
//puede usar url o la sesion storage para mandar informacion del usuario

form.addEventListener("submit", function(e){
    e.preventDefault();
    // Cada que entramos al evento dejamos un estado inicial
    isValid = true;
    userValid = false;
    email_field.style.border = "";
    password_field.style.border = "";
    // Borramos los errores
    emailInfo.innerHTML=""; emailInfo.display="none";
    passwordInfo.innerHTML=""; passwordInfo.display="none";
    // Comprobamos que el email proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateEmail(email_field, emailInfo)) {
        email_field.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que la contraseña sea válida, si no es válida cambiamos el estado de nuestra bandera a falso
    if (!validatePassword(password_field, passwordInfo)) {
        password_field.style.border = "solid medium red";
        isValid = false;
    }
    if(isValid){
        if(!(localStorage.getItem("usuario") == null)){
            usuarios = JSON.parse(localStorage.getItem("usuario"));
            usuarios.forEach((user) => {
                if(user.email_usuario == email_field.value && password_field.value == user.password_usuario) {
                    userValid = true;
                    localStorage.setItem("usuario_activo", JSON.stringify(user));
                }
            });
            if(userValid){
                location.href = "index.html";
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error al iniciar sesión",
                    text: "Usuario y/o contraseña incorrectos",
                }); 
            }
        }else{
            Swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
                text: "Intentalo más tarde",
              }); 
        }
    }else{
        Swal.fire({
            icon: "error",
            title: "Error en el llenado del formulario",
            text: "Favor de corregir las casillas resaltadas en rojo",
          }); 
    }
    
});