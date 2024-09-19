// Se obtienen los inputs del formulario
let nombre_producto = document.getElementById("nombre_producto");
let descripcion_producto = document.getElementById("descripcion_producto");
let categoria_producto = document.getElementById("categoria_producto");
let precio_producto = document.getElementById("precio_producto");
let unidades_producto = document.getElementById("unidades_producto");
let imagen_producto = document.getElementById("imagen_producto");
// Se obtienen los div para mostrar los mensajes de error
let nombreInfo = document.getElementById("nombreInfo");
let descripcionInfo = document.getElementById("descripcionInfo");
let categoriaInfo = document.getElementById("categoriaInfo");
let precioInfo = document.getElementById("precioInfo");
let unidadesInfo = document.getElementById("unidadesInfo");
let imagenInfo = document.getElementById("imagenInfo");
// Obtenemos el formulario
let formulario = document.getElementById("formulario");
// Inicializamos nuestra bandera isValid en tru
let isValid = true
// Declaramos las expresiones regulares para validar los datos
const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Expresión regular para el nombre y el apellido
const numerosRegex = /^[0-9]+$/; // Expresión regular para el nombre y el apellido
const evitarCaracteres = /^[^'";<>\\\/&()\[\]]+$/ // Expresión regular para el mensaje

let datos = new Array()


// Agregamos el evento cuando se envie el formulario
formulario.addEventListener("submit",function (e) {
    e.preventDefault()
    // Cada que entramos al evento dejamos un estado inicial
    isValid = true
    // nombre_producto.style.border = "";
    descripcion_producto.style.border = "";
    // categoria_producto.style.border = "";
    precio_producto.style.border = "";
    unidadesInfo.style.border = "";
    imagenInfo.style.border = "";
    nombreInfo.innerHTML="";
    nombreInfo.display="none";
    descripcionInfo.innerHTML="";
    descripcionInfo.display="none";
    categoriaInfo.innerHTML="";
    categoriaInfo.display="none";
    precioInfo.innerHTML="";
    precioInfo.display="none";
    unidadesInfo.innerHTML="";
    unidadesInfo.display="none";
    imagenInfo.innerHTML="";
    imagenInfo.display="none";
    
    // Comprobamos que el nombre proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validate(nombre_producto, nombreInfo)) {
        nombre_producto.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que la descripción proporcionada sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validate(descripcion_producto, descripcionInfo)) {
        descripcion_producto.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que la categoria proporcionada sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validate(categoria_producto, categoriaInfo)) {
        categoria_producto.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que el precio telefónico proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validarPrecio( precio_producto, precioInfo)) {
       precio_producto.style.border = "solid medium red";
        isValid = false;
    }
    // Comprobamos que la unidad proporcionada sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validarCantidad(unidades_producto, unidadesInfo)) {
       unidades_producto.style.border = "solid medium red";
        isValid = false;
    }
    // // // Comprobamos que el producto proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    // if (!validateImagen(imagen_producto, imagenInfo)) {
    //     imagen_producto.style.border = "solid medium red";
    //     isValid = false;
    // }
    // Si se pasaron todas las validaciones, se enviará el formulario 
    if (isValid) {
        datos.push(nombre_producto.value, descripcion_producto.value, categoria_producto.value,
            precio_producto.value,  imagen_producto.value)
            localStorage.setItem("datos", JSON.stringify(datos))
            nombre_producto.value = "";
            descripcion_producto.value = "";
            categoria_producto.value = "";
            precio_producto.value = "";
            unidades_producto.value="";
            imagen_producto.value="";
            // Si el correo se envio correctamente lanzará una alerta de que se envio correctamente
            Swal.fire({
                icon: "success",
                title: "El producto se subio correctamente",
                showConfirmButton: false,
                timer: 1500
              });
            // Si hubo algun error lanzará una alerta diciendo que lo intente más tarde junto con el error
    // Si no pasó todas las validaciones mandará una alerta diciendo que corriga los datos ingresados
    }else{
        Swal.fire({
            icon: "error",
            title: "Error en el llenado del producto",
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


// Función que valida que sea un cantidad y precio 
function validarPrecio() {
    if (isNaN(precio_producto.value)) {
        precioInfo.innerHTML=`Este campo solo puede contener números`;
        precioInfo.display="block";
        return false;
    }//isNaN
    if (!precio_producto.value>0) {
        precioInfo.innerHTML=`Debe ser mayor a 0`;
        precioInfo.display="block";
        return false;
    }

    return true;
}
// Función que valida que sea un cantidad y precio 
function validarCantidad() {
    if (isNaN(unidades_producto.value)) {
        unidadesInfo.innerHTML=`Este campo solo puede contener números`;
        unidadesInfo.display="block";
        return false;
    }//isNaN
    if (!unidades_producto.value>0) {
       unidadesInfo.innerHTML=`Debe ser mayor a 0`;
       unidadesInfo.display="block";
        return false;
    }

    return true;
}
