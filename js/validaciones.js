// Declaramos las expresiones regulares para validar los datos
const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Expresión regular para el nombre y el apellido
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/; // Expresión regular para el email
const evitarCaracteres = /^[^'";<>\\\/&()\[\]]+$/ // Expresión regular para el mensaje
const numeroTelefonicoRegex = /^[1-9]\d{9}$/; // Expresión regular para El número telefónico
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.+/<#_-])[A-Za-z\d@$!%*?&.+/<#_-]{6,}$/ // Expresión regular para la contraseña
const cpRegex = /^\d{5}$/ // Expresión regular para el código postal
// Variables
let usuarios = new Array();
//declara arreglos de estado
const arrEstados=["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Coahuila", "Colima", 
    " Chiapas", "Chihuahua","Ciudad de México","Durango"," Guanajuato", "Guerrero","Hidalgo", "Jalisco", "México", "Michoacán", 
   " Morelos", "Nayarit","Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", 
   "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];
   
// Función que valida que los campos sean solo letras y que haya al menos 3 caracteres
export function validate(data, info) {
    if (data.value.length < 3) {
        info.innerHTML=`El campo debe de tener al menos 3 caracteres`;
        info.display="block";
        return false;
    }
    if (!nombreRegex.test(data.value)) {
        info.innerHTML=`El campo no acepta caracteres especiales ni números`;
        info.display="block";
        return false;
    }
    return true;
}

// Función que valida que el correo tenga un formato válido
export  function validateEmail(email, info) {
    if (!emailRegex.test(email.value)) {
        info.innerHTML=`El correo debe de cumplir con el formato example@example.com`;
        info.display="block";
        return false;
    }
    return true;
}

// Función que valida que el correo sea nuevo (que no esté ya registrado)
export async function existEmail(email) {
    let existEmail = false;
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch(`http://localhost:8080/api/usuarios/validar-registro?correo=${email.value}`, requestOptions);
        const result = await response.json();
        existEmail = Boolean(result);
    } catch (error) {
        console.error(error);
    }finally{
        return existEmail;
    }
}

// Función que valida que sea un número telefónico
export function validarTelefono(telefono, info) {
    if (!numeroTelefonicoRegex.test(telefono.value.trim())) {
        info.innerHTML=`El número telefónico no es válido`;
        info.display="block";
        return false;
    }
    return true;
}
// Función que valida que el mensaje tenga almenos 3 caracteres y que no contenga ciertos caracteres especiales 
export function validateMensajeDescripcion(mensaje, info) {
    if (mensaje.value.length < 3) {
        info.innerHTML=`Debe de contener al menos 3 caracteres`;
        info.display="block";
        return false;
    }
    if (!evitarCaracteres.test(mensaje.value)) {
        info.innerHTML=`No se aceptan caracteres especiales`;
        info.display="block";
        return false;
    }
    return true;
}

// Función que valida el precio y cantidad
export function validarNumber(data, info) {
    if (isNaN(data.value)) {
        info.innerHTML=`Este campo solo puede contener números`;
        info.display="block";
        return false;
    }//isNaN
    if (data.value <= 0) {
        info.innerHTML=`Debe ser mayor a 0`;
        info.display="block";
        return false;
    }

    return true;
}

// Función que valida que el correo tenga un formato válido
export function validatePassword(pass, info) {
    if (!passwordRegex.test(pass.value)) {
        info.innerHTML=`La contraseña debe de tener al menos 6 caracteres, una mayúscula y un número`;
        info.display="block";
        return false;
    }
    return true;
}

export function validateCP (cp, info){
    if(!cpRegex.test(cp.value)){
        info.innerHTML=`El código postal no es válido`;
        info.display="block";
        return false;
    }
    return true;
}

// Comprueba que la contraseña actual sea la misma que la que está en la bd
export async function samePassword(token, password, id){
    let samePassword = false;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer: ${token}`);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
    "currentPassword": password
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    try {
        const response = await fetch(`http://localhost:8080/api/usuarios/validar-cambio/${id}`, requestOptions)
        const result = await response.json();
        samePassword = Boolean(result);
    } catch (error) {
        console.error(error);
    }finally{
        return samePassword;
    }
}

//llena el select con el arreglo de los estados
export function llenarSelect(ubicacion_usuarios){
    let cad=""
    arrEstados.forEach(estado => {
        cad=cad+`<option value="${estado}">${estado}</option>`
        
    });
    ubicacion_usuarios.insertAdjacentHTML("beforeend", cad);
}
