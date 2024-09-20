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
const evitarCaracteres = /^[^'";<>\\\/&()\[\]]+$/ // Expresión regular para el mensaje
// Creamos una lista de productos
let datos = new Array()

// Se crea la función para agregar productos en el HTML
function addItem(product){
    const itemHTML = 
        '<div class="col-lg-4 col-sm-6 col-6 product">\n' +
        '   <div class="card me-auto ms-auto mb-3 bg-transparent border border-0">\n' +
        '       <img src="'+product.img +'" class="card-img-top" alt="image">\n' +
        '       <div class="card-body">\n' +
        '           <p class="categoria">'+product.category+'</p>\n' +
        '           <p class="nombre-producto">'+product.name+'</p>\n' +
        '           <p class="descripcion-producto">'+product.description+'</p>\n' +
        '           <p class="precio">'+product.price+'</p>\n' +
        '           <!-- <a href="#" class="btn btn-primary">Agregar al carrito</a>-->\n' +
        '       </div>\n' +
        '   </div>\n' +
        '</div>\n';
    const productsContainer = document.getElementById("products-container");
    productsContainer.insertAdjacentHTML("beforeend", itemHTML);
}

// Función para agregar el producto a la lista
function listProduct(){
    //Creamos un objeto del mueble si pasa las validaciones
    let productos = {"name": nombre_producto.value, 
        "description": descripcion_producto.value, 
        "category": categoria_producto.value, 
        "price": "$" + precio_producto.value,
        "unidades": unidades_producto.value,
        "img": "./assets/muebles/product-1.png"//imagen_producto.value
    };
    // Guardamos el objeto en la lista de productos
    datos.push(productos);
    // Mandamos a imprimir el producto en la página
    addItem(productos);
    // Guardamos la lista de productos en el localStorage
    localStorage.setItem("datos", JSON.stringify(datos));
}

// Agregamos el evento cuando se envie el formulario
formulario.addEventListener("submit",function (e) {
    e.preventDefault()
    // Cada que entramos al evento dejamos un estado inicial
    isValid = true
    // Inicializamos los inputs sin bordes
    nombre_producto.style.border = "";
    descripcion_producto.style.border = "";
    categoria_producto.style.border = "";
    precio_producto.style.border = "";
    unidades_producto.style.border = "";
    // Inicializamos los mensajes de error con vacio y que no sean visibles
    nombreInfo.innerHTML=""; nombreInfo.display="none";
    descripcionInfo.innerHTML=""; descripcionInfo.display="none";
    categoriaInfo.innerHTML=""; categoriaInfo.display="none";
    precioInfo.innerHTML=""; precioInfo.display="none";
    unidadesInfo.innerHTML=""; unidadesInfo.display="none";
    imagenInfo.innerHTML=""; imagenInfo.display="none";
    
    // Comprobamos que el nombre del producto proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
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
    // Comprobamos que el precio proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validarNumber( precio_producto, precioInfo)) {
       precio_producto.style.border = "solid medium red";
        isValid = false;
    }
    // Comprobamos que la unidad proporcionada sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validarNumber(unidades_producto, unidadesInfo)) {
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
        // Agregamos el producto al localStorage
        listProduct();
        // Borramos los datos de los inputs
        nombre_producto.value = "";
        descripcion_producto.value = "";
        categoria_producto.value = "";
        precio_producto.value = "";
        unidades_producto.value="";
        //imagen_producto.value="";
        // Agregamos una alerta para avisar que se subio correctamente los datos
        Swal.fire({
            icon: "success",
            title: "El producto se subio correctamente",
            showConfirmButton: false,
            timer: 1500
        });
    // Si no pasó todas las validaciones mandará una alerta diciendo que corriga los datos ingresados
    }else{
        Swal.fire({
            icon: "error",
            title: "Error en el llenado del producto",
            text: "Favor de corregir las casillas resaltadas en rojo",
          });  
    }
})

// Función que valida que el mensaje tenga almenos 3 caracteres y que no contenga ciertos caracteres especiales
function validate(data, info) {
    if (data.value.length < 3) {
        info.innerHTML=`El campo debe de tener almenos 3 carácteres`;
        info.display="block";
        return false
    }
    if (!evitarCaracteres.test(data.value)) {
        info.innerHTML=`El campo no acepta caracters especiales`;
        info.display="block";
        return false
    }
    return true
}


// Función que valida el precio 
function validarNumber(data, info) {
    if (isNaN(data.value)) {
        info.innerHTML=`Este campo solo puede contener números`;
        info.display="block";
        return false;
    }//isNaN
    if (!data.value>0) {
        info.innerHTML=`Debe ser mayor a 0`;
        info.display="block";
        return false;
    }

    return true;
}

window.addEventListener("load", function(evenet){
// Se agregan productos manualmente
    addItem({
        'img':'./assets/muebles/product-1.png',
        'category':'Sillas',
        'name':'Silla blanca',
        'description':'Combinación de madera y lana.',
        'price':'$63.47'});
    
    addItem({
        'img':'./assets/muebles/product-2.png',
        'category':'Armarios',
        'name':'Armario de madera',
        'description':'Combinación de madera y lana.',
        'price':'$79.88'});
    
    addItem({
        'img':'./assets/muebles/product-3.png',
        'category':'Sillas',
        'name':'Sillón minimalista',
        'description':'Combinación de madera y lana.',
        'price':'$55.99'});
    
    addItem({
        'img':'./assets/muebles/product-4.png',
        'category':'Mesas',
        'name':'Escritorio de trabajo',
        'description':'Combinación de madera y lana.',
        'price':'$47.90'});
    
    addItem({
        'img':'./assets/muebles/product-5.png',
        'category':'Armarios',
        'name':'Armario blanco',
        'description':'Combinación de madera y lana.',
        'price':'$40.73'});
    
    addItem({
        'img':'./assets/muebles/product-6.png',
        'category':'Mesas',
        'name':'Mesa de comedor',
        'description':'Combinación de madera y lana.',
        'price':'$16.50'});
    
    addItem({
        'img':'./assets/muebles/product-7.png',
        'category':'Decoración',
        'name':'Jarrón blanco',
        'description':'Combinación de madera y lana.',
        'price':'$58.39'});
    
    addItem({
        'img':'./assets/muebles/product-8.png',
        'category':'Decoración',
        'name':'Planta / base de Arcilla',
        'description':'Combinación de madera y lana.',
        'price':'$61.49'});
    
    addItem({
        'img':'./assets/muebles/product-9.png',
        'category':'Decoración',
        'name':'Espejo dorado',
        'description':'Combinación de madera y lana.',
        'price':'$32.43'});
    
    addItem({
        'img':'./assets/muebles/product-10.png',
        'category':'Decoración',
        'name':'Espejo de madera',
        'description':'Combinación de madera y lana.',
        'price':'$63.47'});
    
    addItem({
        'img':'./assets/muebles/image-4.png',
        'category':'Silla',
        'name':'Silla de cóctel ',
        'description':'Combinación de madera y lana.',
        'price':'$34.99'});
    
    addItem({
        'img':'./assets/muebles/image-5.png',
        'category':'Armarios',
        'name':'Armario de madera',
        'description':'Combinación de madera y lana.',
        'price':'$79.23'});
    
    addItem({
        'img':'./assets/muebles/image-2.png',
        'category':'Sillas',
        'name':'Silla tradicional',
        'description':'Combinación de madera y lana.',
        'price':'$45.50'});
    
    addItem({
        'img':'./assets/muebles/image-3.png',
        'category':'Sillas',
        'name':'Silla con diseño verde',
        'description':'Combinación de madera y lana.',
        'price':'$45.99'});
    
    addItem({
        'img':'./assets/muebles/image-1.png',
        'category':'Libreros',
        'name':'Librero básico',
        'description':'Combinación de madera y lana.',
        'price':'$75.99'});
// Se comprueba el localStorage
    if (this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        // Se mandan a imprimir los productos que estaban guardados en el localStorage
        datos.forEach(product => {
            addItem(product);
        });
    }

});
