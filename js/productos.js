// Se obtienen los inputs del formulario
let nombre_producto = document.getElementById("nombre_producto");
let descripcion_producto = document.getElementById("descripcion_producto");
let categoria_producto = document.getElementById("categoria_producto");
let precio_producto = document.getElementById("precio_producto");
let unidades_producto = document.getElementById("unidades_producto");
let imagen_producto = "";
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
const boton_foto = document.getElementById('imagen_producto');

const cloudName = 'ddtwywues';
const uploadPreset = 'tribal_home' 

const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      clientAllowedFormats: ["jpeg", "jpg", "png", "gif", "webp", "svg", ""], //restrict uploading to image files only
      
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            imagen_producto = result.info.secure_url;
      }
    }
  );

boton_foto.addEventListener("click",function (event) {
    event.preventDefault()
    myWidget.open();
},false);
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
        "img": imagen_producto
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
    // Comprobamos que se haya agregado una imagen
    if (imagen_producto == "") {
        imagenInfo.innerHTML=`Se requiere una imagen para subir el producto`;
        imagenInfo.display="block";
        isValid = false;
    }
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
        imagen_producto="";
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
        'img':'./assets/muebles/deco-1.png',
        'category':'Decoración',
        'name':'Enfriador de vino',
        'description':'Elegante enfriador de mármol ideal para mantener la temperatura de tu botella de vino.',
        'price':'$450.00'});
    
    addItem({
        'img':'./assets/muebles/deco-2.png',
        'category':'Decoración',
        'name':'Enfriador de vino',
        'description':'Elegante enfriador de mármol ideal para mantener la temperatura de tu botella de vino.',
        'price':'$450.00'});
    
    addItem({
        'img':'./assets/muebles/deco-3.png',
        'category':'Decoración',
        'name':'Jarrón cerámica',
        'description':'Jarrón pequeño en cerámica de gres esmaltada. Modelo con diseño irregular.',
        'price':'$500.00'});
    
    addItem({
        'img':'./assets/muebles/deco-4.png',
        'category':'Decoración',
        'name':'Jarrón cerámica',
        'description':'Jarrón pequeño en cerámica de gres esmaltada. Modelo con diseño irregular.',
        'price':'$500.00'});
    
    addItem({
        'img':'./assets/muebles/deco-5.png',
        'category':'Decoración',
        'name':'Jarra cerámica',
        'description':'Jarra en cerámica con pico vertedor y asa de diseño orgánico.',
        'price':'$650.00'});
    
    addItem({
        'img':'./assets/muebles/deco-6.png',
        'category':'Decoración',
        'name':'Jarra cerámica',
        'description':'Jarra en cerámica con pico vertedor y asa de diseño orgánico.',
        'price':'$650.00'});
    
    addItem({
        'img':'./assets/muebles/product-6.png',
        'category':'Decoración',
        'name':'Maceta con pedestal en metal',
        'description':'Maceta con pedestal en metal pintado, ideal tanto para interiores como exteriores.',
        'price':'$250.00'});
    
    addItem({
        'img':'./assets/muebles/product-7.png',
        'category':'Decoración',
        'name':'Maceta de cerámica con barniz jaspeado',
        'description':'Maceta en cerámica, modelo con un divertido acabado de burbujas y barniz jaspeado que aporta una apariencia única a cada pieza',
        'price':'$300.00'});
    
    addItem({
        'img':'./assets/muebles/product-8.png',
        'category':'Decoración',
        'name':'Maceta de concreto',
        'description':'Maceta de concreto con un diseño moderno y un acabado texturizado que aporta una apariencia única a cada pieza.',
        'price':'$200.00'});
    
    addItem({
        'img':'./assets/muebles/deco-7.png',
        'category':'Almacenamiento',
        'name':'Cesto de yute trenzado',
        'description':'Cesto hecho a mano en yute con dos asas superiores.',
        'price':'$600.00'});
    
    addItem({
        'img':'./assets/muebles/deco-8.png',
        'category':'Almacenamiento',
        'name':'Cesto en yute',
        'description':'Cesto para ropa en yute con dos asas superiores.',
        'price':'$800.00'});
    
    addItem({
        'img':'./assets/muebles/deco-9.png',
        'category':'Almacenamiento',
        'name':'Cesto de algodón',
        'description':'Cesto de almacenamiento en tejido grueso de algodón con dos asas superiores.',
        'price':'$400.00'});
    
    addItem({
        'img':'./assets/muebles/image-1.png',
        'category':'Decoración',
        'name':'Funda de cojín en mezcla de lino',
        'description':'Funda de cojín clásica en tejido de lino y algodón color verde.',
        'price':'$249.00'});
    
    addItem({
        'img':'./assets/muebles/image-2.png',
        'category':'Decoración',
        'name':'Funda de cojín en terciopelo',
        'description':'Funda de cojín en terciopelo color gris oscuro de algodón con zíper oculto.',
        'price':'$249.00'});
    
    addItem({
        'img':'./assets/muebles/image-3.png',
        'category':'Decoración',
        'name':'Funda de cojín con flecos en terciopelo',
        'description':'Funda de cojín en terciopelo color gris con borde de flecos y zíper oculto.',
        'price':'$249.00'});

    addItem({
        'img':'./assets/muebles/mueble-1.png',
        'category':'Muebles',
        'name':'Mesa de centro con cajón de vidrio',
        'description':'Mesa de centro, auxiliar o de café con estante y cajón de vidrio. Diseño moderno y versátil, elaborado en mdf y vidrio estriado.',
        'price':'$1500.00'});
    
    addItem({
        'img':'./assets/muebles/mueble-2.png',
        'category':'Muebles',
        'name':'Aparador multiusos nórdico',
        'description':'Aparador moderno estilo nórdico con amplios espacios de almacenamiento y se adapta a cualquier decoración con sus tonos blancos y café.',
        'price':'$2500.00'});

    addItem({
        'img':'./assets/muebles/mueble-3.png',
        'category':'Muebles',
        'name':'Aparador puertas de vidrio',
        'description':'Aparador moderno de mdf con puertas de vidrio, diseño color café claro adaptable a cualquier tipo de decoración.',
        'price':'$1500.00'});
    
    addItem({
        'img':'./assets/muebles/mueble-4.png',
        'category':'Muebles',
        'name':'Aparador ratán de 3 puertas',
        'description':'Aparador de mdf multiusos gran espacio de almacenamiento. Diseño en ratán con colores claros, ideal para obtener un estilo decorativo cálido.',
        'price':'$3000.00'});

    addItem({
        'img':'./assets/muebles/mueble-5.png',
        'category':'Muebles',
        'name':'Mueble para tv minimalista',
        'description':'Mueble de tv estilo minimalista cuenta con 2 puertas laterales y 2 entrepaños central, hecho a base de mdf de tonalidad clara.',
        'price':'$1500.00'});
    
    addItem({
        'img':'./assets/muebles/mueble-6.png',
        'category':'Muebles',
        'name':'Mueble para tv',
        'description':'Mueble de tv rack con estantes y puertas, elaborado en mdf y tratamiento térmico y barnizado, colores claros, ideal para obtener un estilo decorativo cálido y artesanal.',
        'price':'$2000.00'});
    
    addItem({
        'img':'./assets/muebles/mueble-7.png',
        'category':'Muebles',
        'name':'Librero nóridco',
        'description':'Elegante librero vertical de gran almacenamiento con dos estantes, dos cajones y una puerta. Estilo nórdico de diseño minimalista en tonos de madera clara y blanco.',
        'price':'$1500.00'});

    addItem({
        'img':'./assets/muebles/mueble-8.png',
        'category':'Muebles',
        'name':'Armario de madera tradicional',
        'description':'Armario de madera práctico y versátil, se adapta a diversas necesidades de almacenamiento con un diseño clásico.',
        'price':'$6000.00'});
    
    addItem({
        'img':'./assets/muebles/mueble-9.png',
        'category':'Muebles',
        'name':'Aparador moderno',
        'description':'Elegante aparador nórdico, diseñado para aportar estilo y funcionalidad a tu hogar, de acabado en tonos claros y líneas minimalistas.',
        'price':'$3000.00'});

// Se comprueba el localStorage
    if (this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        // Se mandan a imprimir los productos que estaban guardados en el localStorage
        datos.forEach(product => {
            addItem(product);
        });
    }

});