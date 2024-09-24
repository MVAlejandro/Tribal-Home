//botones
const btn_cuestionario=document.getElementById("btn_cuestionario");
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
//declara arreglos de estado
const arrEstados=["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Coahuila", "Colima", 
   " Chiapas", "Chihuahua", "Durango", "Distrito Federal"," Guanajuato", "Guerrero","Hidalgo", "Jalisco", "México", "Michoacán", 
  " Morelos", "Nayarit","Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", 
  "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];
// Obtenemos el formulario
const formulario = document.getElementById("formulario");
// Inicializamos nuestra bandera isValid en true
let isValid = true;
// Creamos la variable usuario
let usuario;
// Declaramos las expresiones regulares para validar los datos
const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Expresión regular para el nombre y el apellido
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/; // Expresión regular para el email
const evitarCaracteres = /^[^'";<>\\\/&()\[\]]+$/; // Expresión regular para el mensaje
const numeroTelefonicoRegex = /^[1-9]\d{9}$/; // Expresión regular para El número telefónico
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/ // Expresión regular para la contraseña
const cpRegex = /^\d{5}$/ // Expresión regular para el codigo postal

//*--------------funciones-----------------*
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
// Función que valida que sea un número telefónico
function validarTelefono(telefono, info) {
    if (!numeroTelefonicoRegex.test(telefono.value)) {
        info.innerHTML=`El número telefónico no es valido`;
        info.display="block";
        return false
    }
    return true;
}
// Función que valida que el correo tenga un formato válido
function validatePassword(pass, info) {
    if (!passwordRegex.test(pass.value)) {
        info.innerHTML=`La contraseña debe de tener almenos 6 carácteres, una mayúscula y un número`;
        info.display="block";
        return false
    }
    return true
}
// Función que valida que el mensaje tenga almenos 3 caracteres y que no contenga ciertos caracteres especiales 
function validateDireccion(direccion, info) {
    if (direccion.value.length < 3) {
        info.innerHTML=`La dirección debe de contener al menos 3 carácteres`;
        info.display="block";
        return false
    }
    if (!evitarCaracteres.test(direccion.value)) {
        info.innerHTML=`La dirección no acepta carácters especiales`;
        info.display="block";
        return false
    }
    return true
}

function validateCP (cp, info){
    if(!cpRegex.test(cp.value)){
        info.innerHTML=`El código postal no es válido`;
        info.display="block";
        return false;
    }
    return true;
}
//llena el select con el arreglo de los estados
function llenarSelect(){
    let cad=""
    arrEstados.forEach(estado => {
                        
        cad=cad+`<option value="${estado}">${estado}</option>`
        
    });
    ubicacion_usuarios.insertAdjacentHTML("beforeend", cad);

}

//verifica los datos y de ser correcto crear la cuenta por el momento en el local storage
// Agregamos el evento cuando se envie el formulario
formulario.addEventListener("submit",function (e) {
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
    direccionlInfo.innerHTML=""; direccionlInfo.display="none";
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
    if (!validateDireccion(direccion_usuario, direccionlInfo)) {
        direccion_usuario.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que el email proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateEmail(email_usuario, emailInfo)) {
        email_usuario.style.border = "solid red medium";
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
        usuario = {"nombre_usuario": nombre_usuario.value,
                   "apellidos_usuario": apellidos_usuario.value,
                   "ubicacion_usuarios": ubicacion_usuarios.value,
                   "email_usuario": email_usuario.value,
                   "cp_usuario": cp_usuario.value,
                   "direccion_usuario": direccion_usuario.value,
                   "telefono_usuario": telefono_usuario.value,
                   "password_usuario": password_usuario.value
        }
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
            title: "Registro conmpletado correctamente",
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

//*---------------metodo al cargar pagina-----------*
window.addEventListener("load", function(){
    llenarSelect();
});