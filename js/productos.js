// Se importan las funciones de las validaciones 
import {validate, validarNumber, validateMensajeDescripcion} from "./validaciones.js"
//variable para obtener el tipo de usuario

//obtiene los campos de los filtros
let filtro_categoria=document.getElementById("filtro_categoria");
let filtro_nombre=document.getElementById("filtro_nombre");
let btn_filtrar=document.getElementById("btn_filtrar");
let btn_Nofiltrar=document.getElementById("btn_Nofiltrar");
//bandera filtros no quedo 
let isAny=false;
//bandera que verifica si el usuario es administrador
let isAdmi=false;
//div del contenedor de productos
let products_container=document.getElementById("products-container");
// Se obtienen los inputs del formulario
let nombre_producto = document.getElementById("nombre_producto");
let descripcion_producto = document.getElementById("descripcion_producto");
let categoria_producto = document.getElementById("categoria_producto");
let precio_producto = document.getElementById("precio_producto");
let unidades_producto = document.getElementById("unidades_producto");
let imagen_producto = document.getElementById("imagen_producto");
let btnCancelar = document.getElementById("btnCancelar");
// Se obtienen los div para mostrar los mensajes de error
let nombreInfo = document.getElementById("nombreInfo");
let descripcionInfo = document.getElementById("descripcionInfo");
let categoriaInfo = document.getElementById("categoriaInfo");
let precioInfo = document.getElementById("precioInfo");
let unidadesInfo = document.getElementById("unidadesInfo");
let imagenInfo = document.getElementById("imagenInfo");
// Obtenemos el formulario
let formulario = document.getElementById("formulario");
// Inicializamos nuestra bandera isValid en true
let isValid = true
//obtenemos el boton del modal
let btn_modal= document.getElementById("btn_modal");
// Declaramos las expresiones regulares para validar los datos
const evitarCaracteres = /^[^'";<>\\\/&()\[\]]+$/ // Expresión regular para el mensaje
// Creamos una lista de productos

let contadorCarrito = 0;
// Creamos una lista de productos agregadas al carrito
let carrito = new Array();
const boton_foto = document.getElementById('imagen_producto');
let imagen_producto_url = "";

const cloudName = 'ddtwywues';
const uploadPreset = 'tribal_home' 

const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      clientAllowedFormats: ["jpeg", "jpg", "png", "gif", "webp", "svg"], //restrict uploading to image files only
      
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            imagen_producto.textContent =  result.info.display_name + "." + result.info.format;
            imagen_producto_url = result.info.secure_url;
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
        `<div class="col-lg-4 col-sm-6 col-6 product d-flex flex-column">
            <div class="card me-auto ms-auto mb-3 bg-transparent border border-0">
                <img src="${product.imagen}" class="card-img-top" alt="image">
                <div class="card-body d-flex flex-column">
                    <p class="categoria">${product.categoria}</p>
                    <p class="nombre-producto">${product.nombre_producto}</p>
                    <p class="descripcion-producto">${product.descripcion}</p>
                    <p class="descripcion-producto">Disponibles: ${product.stock}</p>
                    <p class="precio">$ ${product.precio}</p>
                </div>
            </div>
                <button class="btn btn-carrito mt-auto mb-5 mx-auto" id="carrito${product.id_producto}">Agregar al carrito</button>
        </div>`
    const productsContainer = document.getElementById("products-container");
    productsContainer.insertAdjacentHTML("beforeend", itemHTML);
    // Se crean variables para con los datos que utilizaremos para el carrito
    const id_producto = product.id_producto;
    const imagen_producto = product.imagen;
    const nombre_producto = product.nombre_producto;
    const precio_producto = product.precio;
    const btn_carrito = document.getElementById(`carrito${id_producto}`);
    
    // Se creo el evento para el boton de Agregar al carrito
    btn_carrito.addEventListener("click", function(event){
        event.preventDefault();
        // Cuando se presiona el botón se guarda en nuestro arreglo carrito el nombre, precio e imagen del producto
        carrito.push({
            // Aumentamos el contador de productos agregados al Carrito
            "id": ++contadorCarrito,
            "img": imagen_producto,
            "name": nombre_producto,
            "price": precio_producto});
        // Actualizamos el localStorage con el nuevo producto que agregamos al carrito 
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Agregamos una alerta para avisar que se agregó al carrito el producto
        Swal.fire({
            icon: "success",
            title: "Se agregó " + nombre_producto + " al carrito" ,
            showConfirmButton: true,
        });
    })
}

// Función para agregar el producto a la lista
function listProduct(){

    //Creamos un objeto del producto si pasa las validaciones
    const raw = JSON.stringify({
    "nombre_producto": nombre_producto.value,
    "descripcion": descripcion_producto.value,
    "precio": precio_producto.value,
    "categoria": categoria_producto.value,
    "imagen": imagen_producto_url,
    "stock": unidades_producto.value
    });

    setProducto(raw);
}

// Agregamos el evento cuando se envie el formulario
formulario.addEventListener("submit",function (e) {
    e.preventDefault()
    // Cada que entramos al evento dejamos un estado inicial
    isValid = true
    // Inicializamos los valores de los campos
    inicializarValores();
    // Comprobamos que el nombre del producto proporcionado sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateMensajeDescripcion(nombre_producto, nombreInfo)) {
        nombre_producto.style.border = "solid red medium";
        isValid = false
    }
    // Comprobamos que la descripción proporcionada sea válido, si no es válido cambiamos el estado de nuestra bandera a falso
    if (!validateMensajeDescripcion(descripcion_producto, descripcionInfo)) {
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
    if (imagen_producto_url == "") {
        imagen_producto.style.borderColor= "red";
        imagen_producto.style.borderWidth = "medium";
        imagen_producto.style.borderStyle = "solid" ;
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
        imagen_producto.textContent ="";
        imagen_producto.insertAdjacentHTML("afterbegin", 
            `<img src="./assets/backup.png" alt="nube">
            <p class="upload-file">Max 10 MB files are allowed</p>`);
        imagen_producto_url = "";
        // Agregamos una alerta para avisar que se subio correctamente los datos
        Swal.fire({
            icon: "success",
            title: "El producto se subió correctamente",
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
// Evento para el boton cancelar
btnCancelar.addEventListener("click", function(event){
    event.preventDefault();
// Reiniciamos los valores 
    inicializarValores();
    nombre_producto.value = "";
    descripcion_producto.value = "";
    categoria_producto.value = "";
    precio_producto.value = "";
    unidades_producto.value="";
    imagen_producto.textContent ="";
    imagen_producto.insertAdjacentHTML("afterbegin", 
        `<img src="./assets/backup.png" alt="nube">
        <p class="upload-file">Max 10 MB files are allowed</p>`);
    imagen_producto_url = "";
})

function inicializarValores(){
    // Inicializamos los inputs sin bordes
    nombre_producto.style.border = "";
    descripcion_producto.style.border = "";
    categoria_producto.style.border = "";
    precio_producto.style.border = "";
    unidades_producto.style.border = "";
    imagen_producto.style.borderStyle = "dashed" ;
    imagen_producto.style.borderColor= "#000";    
    // Inicializamos los mensajes de error con vacio y que no sean visibles
    nombreInfo.innerHTML=""; nombreInfo.display="none";
    descripcionInfo.innerHTML=""; descripcionInfo.display="none";
    categoriaInfo.innerHTML=""; categoriaInfo.display="none";
    precioInfo.innerHTML=""; precioInfo.display="none";
    unidadesInfo.innerHTML=""; unidadesInfo.display="none";
    imagenInfo.innerHTML=""; imagenInfo.display="none";
}

window.addEventListener("load", function(event){    
    // Cuando carga la pantalla mandamos la solicitud a la API para obtener los productos
    getProductos();
    //verifica si es admi
    if (sessionStorage.getItem('usuario')!="") {
        console.log("Usuario existe");
        let sesionSto= JSON.parse(sessionStorage.getItem('usuarioActivo'));
        console.log(sesionSto)
        console.log(sesionSto.usuario.rol); 
        if (sesionSto.usuario.rol === "admin") {
            console.log("es admi");
            isAdmi=true;

           btn_modal.removeAttribute("hidden");
            
        }
        
    }
   
});
//añadde todos los productos
function getProductos(){
    // Se hace la petición a la api para obtener los datos
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    
  fetch("http://localhost:8080/api/productos/", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        // Se manda a imprimir en pantalla cada producto
        result.forEach((producto => {
            addItem(producto)
        }))
    })
    .catch((error) => console.error(error));
}

function setProducto(raw){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:8080/api/productos/agregar", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        // Mandamos a imprimir el producto en la página
        addItem(result);
    })
    .catch((error) => console.error(error));
}
//funcion filtar productos
btn_filtrar.addEventListener("click", async function (e) {
    e.preventDefault()
   
    let resultado = new Array();
    if(filtro_categoria.value==""&& filtro_nombre.value==""){
        Swal.fire({
            icon: "error",
            title: "Error al llenar los filtros",
            text: "Favor de establecer al menos un filtro antes de buscar",
          }); 
    }else
    {
        isAny=false;
        products_container.innerHTML="";
        btn_Nofiltrar.removeAttribute("hidden");
        if (filtro_nombre.value=="Wahaha") {
            isAny=true;
            products_container.innerHTML=`<img src="./assets/wahahaBoho.png"></img>`
            
        } else {
            resultado = await getAllProdutcs();
            console.log(resultado)
            if (filtro_categoria.value!="" && filtro_nombre.value!="") {
                resultado.forEach((producto => {
                    if(producto.nombre_producto.toLowerCase().includes(filtro_nombre.value.toLowerCase())&&producto.categoria==filtro_categoria.value){
                        isAny=true;
                        addItem(producto)
                    }
                }))
            
            } else {
                if (filtro_categoria.value!="") {
                    resultado.forEach((producto => {
                        if(producto.categoria==filtro_categoria.value){
                            isAny=true;
                            addItem(producto);
                        }                           
                    }))
                }
                    
                if (filtro_nombre.value!="") {
                    resultado.forEach((producto => {
                        if(producto.nombre_producto.toLowerCase().includes(filtro_nombre.value.toLowerCase())){
                            isAny=true;
                            addItem(producto);
                        }
                    }))

                }
            }
            if(!isAny){
                 products_container.innerHTML=`<p>No se encontró ningún producto</p>`
            }
        }
    } 
    
})
//función para quitar los filtros de los productos
btn_Nofiltrar.addEventListener("click", function(e){
    e.preventDefault()
    products_container.innerHTML="";
    btn_Nofiltrar.setAttribute("hidden", "");
    filtro_categoria.value="";
    filtro_nombre.value="";
    getProductos();

})
//funcion que retorna todos los productos en un arrgelos para los filtros
async function getAllProdutcs(){
    let resultado = null
    // Se hace la petición a la api para obtener los datos
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch("http://localhost:8080/api/productos/", requestOptions)
        const result = await response.json();
        resultado = result;
    } catch (error) {
        console.error(error);
    }finally{
        return resultado;
    }
}