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
let isValiid = true;
let userValid = false;
let usuario = null;
//debe validar la existencia del usuario y mandar a la pagina de inicio
//puede usar url o la sesion storage para mandar informacion del usuario

form.addEventListener("submit", async function(e){
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
        
        const raw = JSON.stringify({
            "correo": email_field.value,
            "contrasenia": password_field.value
        });

        await validateUser(raw)

        if(usuario != null){
            userValid = true;
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
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
                text: "Inténtalo más tarde",
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

async function validateUser(raw){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
    method: "POST",
    body: raw,
    headers: myHeaders,
    redirect: "follow"
    };

     await fetch("http://localhost:8080/api/login/", requestOptions)
    .then((response) => response.json())
    .then((result) => usuario = result)
    .catch((error) => console.error(error));
    
}