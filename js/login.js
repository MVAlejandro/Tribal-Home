
//botones
const btn_facebook= document.getElementById("btn-facebook");
const btn_google= document.getElementById("btn-google");
const btn_cuestionario= document.getElementById("btnEnviar")
//campos
const email_field= document.getElementById("email-field");
const password_field= document.getElementById("password-field");
//variables
let isValid=false 
let usuarios = new Array();

//debe validar la existencia del usuario y mandar a la pagina de inicio
//puede usar url o la sesion storage para mandar informacion del usuario

btn_cuestionario.addEventListener("click", function(e){
    e.preventDefault();
    if(!(localStorage.getItem("usuario") == null)){
        usuarios = JSON.parse(localStorage.getItem("usuario"));
        usuarios.forEach((user) => {
            if(user.email_usuario == email_field.value && password_field.value == user.password_usuario) {
                localStorage.setItem("usuario_activo", JSON.stringify(user));
                location.href = "index.html";
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error al iniciar sesión",
                    text: "Usuario y/o contraseña incorrectos",
                  }); 
            }
        });
    }else{
        Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Usuario y/o contraseña incorrectos",
          }); 
    }
});