
//botones
const btn_facebook= document.getElementById("btn-facebook");
const btn_google= document.getElementById("btn-google");
const btn_cuestionario= document.getElementById("btn_cuestionario")
//campos
const name_field= document.getElementById("name-field");
const email_field= document.getElementById("email-field");
const password_field= document.getElementById("password-field");
//variables
let isValid=false 

//debe validar la existencia del usuario y mandar a la pagina de inicio
//puede usar url o la sesion storage para mandar informacion del usuario