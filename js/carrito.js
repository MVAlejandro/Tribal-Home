let carrito = new Array();
let  btn_pagar = document.getElementById("btn-pagar")
const carritoContainer = document.getElementById("carrito-container");
let sesionTok= JSON.parse(sessionStorage.getItem('usuarioActivo'));
//bandera que verifica si hay productos
isAny=false
// Validamos que haya un usuario activo, si no lo mandamos a que inicie sesión 
window.addEventListener("load", function(event){
    event.preventDefault();
    cargaCarrito();
});
function cargaCarrito(){
    if(sesionTok == null){
        location.href = "./login.html";
    }
    console.log("wahaha");
    carritoContainer.innerHTML="";
    //verifica si el usuario ha añadido algun producto a su carrito si es asi los muestra
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer: ${sesionTok.token.accessToken}`);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/api/carrito/", requestOptions)
    .then((response) =>  response.json())
    .then((result) =>{
    let sesionSto= JSON.parse(sessionStorage.getItem('usuarioActivo'));
        //Consultamos los datos en el carrito para buscar si hay un registro previo
        result.forEach((async element => {
            if(element.usuario_id_usuario==sesionSto.usuario.id  && element.estado=="pendiente"){
                isAny=true;
                let producto= await obtenerProducto(element.producto_id_producto);
                addItem(producto, element);
            }
            }));
            if(!isAny){
                carritoContainer.insertAdjacentHTML("beforeend", "No se han añadido productos");
            }
        
    } )
    .catch((error) => console.error(error));
    calcTotal()
}

// Función para obtener el total de los precios mediante una sumatoria
function calcTotal(){
    const precio_parcial = document.getElementById("precio_parcial");
    const precio_total = document.getElementById("precio_total");
    const card_carrito = document.getElementsByClassName("card-carrito");
    let total = 0;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer: ${sesionTok.token.accessToken}`);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/api/carrito/", requestOptions)
    .then((response) =>  response.json())
    .then((result) =>{
    let sesionSto= JSON.parse(sessionStorage.getItem('usuarioActivo'));
        //Consultamos los datos en el carrito para buscar si hay un registro previo
        result.forEach(( element => {
            if(element.usuario_id_usuario==sesionSto.usuario.id  && element.estado=="pendiente"){
                total=total+element.precio_total;
            }
            }));
            console.log(total)
            let precioTotal = total;
            precio_parcial.textContent = `$${total.toFixed(2)}`;
             if (precioTotal <= 0){
                precio_total.textContent = "$0"    
            }else{
                precio_total.textContent = `$${precioTotal.toFixed(2)}`;
            }
    } )
    .catch((error) => console.error(error));
    
    
   // for (let card of card_carrito){
  //      const price = Number(card.querySelector(".price strong").textContent.replace('$',''));
  //      total += price;
  //  }
    
    

}

// Se crea la función para agregar productos en el HTML de carrito
function addItem(producto, carrito){
    const itemCarr = `
        <div class="row pt-3 pt-lg-0  mt-4  card-carrito position-relative" id="card-carrito${carrito.id_carrito}">
            <div class="col-lg-4 col-md-12 mt-lg-3 mb-lg-3 mb-md-0 d-flex justify-content-center">
                <img src="${producto.imagen}" alt="Producto del Carrito" class="carrito-producto">
            </div>
            <div class="col-lg-5 col-md-12 mt-lg-3 mt-md-0 mb-3">
                <div class="row titulo-row">
                    <p class="nombre">${producto.nombre_producto}</p>
                </div>
                <div class="row calificacion-row mb-4">
                    <div class="calificacion">
                        <img src="./assets/star.png" alt="" class="star">
                        <img src="./assets/star.png" alt="" class="star">
                        <img src="./assets/star.png" alt="" class="star">
                        <img src="./assets/star.png" alt="" class="star">
                        <img src="./assets/star.png" alt="" class="star">
                    </div>
                </div>
                <div class="row"></div>
                <div class="row numero-productos-row">
                    <div class="numero-productos">
                        <button class="btn mas-menos" id="btn-menos${carrito.id_carrito}">-</button>
                        <p class="cantidad">Cantidad: <span class="number" id="cantidad${carrito.id_carrito}">${carrito.cantidad}</span></p>
                        <button class="btn mas-menos" id="btn-mas${carrito.id_carrito}">+</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-12 mt-lg-3 mt-md-0 mb-3 d-flex flex-column justify-content-between">
                <div class="position-absolute top-0 end-0 m-2">
                    <button type="button" class="btn" id="btn-eliminar${carrito.id_carrito}">
                        <img src="assets/shape.png" alt="Botón de eliminar" class="eliminar-icon">
                    </button>
                </div>
                <div class="row mt-auto">
                    <div class="col-12 align-self-end text-end">
                        <p class="price"><strong id="price${carrito.id_carrito}">$${carrito.precio_total}</strong></p>
                    </div>
                </div>
            </div>                
        </div>
        `
    
    carritoContainer.insertAdjacentHTML("beforeend", itemCarr);
    const cantidadElem = document.getElementById(`cantidad${carrito.id_carrito}`);
    const price = document.getElementById(`price${carrito.id_carrito}`)
    const btn_menos = document.getElementById(`btn-menos${carrito.id_carrito}`);
    const btn_mas = document.getElementById(`btn-mas${carrito.id_carrito}`);
    const btn_eliminar = document.getElementById(`btn-eliminar${carrito.id_carrito}`)
    //actualizarPrecio();

     // Función para actualizar el precio basado en la cantidad
     function actualizarPrecio() {
      //  const cantidad = Number(cantidadElem.textContent); // Convertir cantidad a número
       // let total = producto.price * cantidad;
      //  price.textContent = `$${total.toFixed(2)}`;
       // calcTotal() // Actualizamos el precio en el resumen del carrito
    }

    // Event listener para el botón de "menos"
    btn_menos.addEventListener("click", function() {
        //console.log(carrito);
       // let cantidad = parseInt(cantidadElem.textContent);
         if (carrito.cantidad > 1) {
            const raw = JSON.stringify({
                "cantidad": carrito.cantidad-1,
                "precio_total": carrito.precio_total-producto.precio,
                "estado": "pendiente",
                "usuario_id_usuario": carrito.usuario_id_usuario,
                "producto_id_producto" : carrito.producto_id_producto
            });
        //console.log("raww"+raw);
           putCarrito(raw, carrito.id_carrito)
          
       //     cantidad--;
       //     cantidadElem.textContent = cantidad;
        //    actualizarPrecio(); // Actualizar el precio al reducir la cantidad
        }else{
            Swal.fire({
                icon: "error",
                title: "No se puede reducir más el número de productos",
                text: "Si desea eliminar el producto del carrito pulso el icono de x en la parte superior derecha de la tarjeta",
            }); 
        }
        cargaCarrito();

    });

    // Event listener para el botón de "más"
    btn_mas.addEventListener("click", function() {
        if (carrito.cantidad+1 <= producto.stock) {
            const raw = JSON.stringify({
                "cantidad": carrito.cantidad+1,
                "precio_total": carrito.precio_total+producto.precio,
                "estado": "pendiente",
                "usuario_id_usuario": carrito.usuario_id_usuario,
                "producto_id_producto" : carrito.producto_id_producto
            });
        
           putCarrito(raw, carrito.id_carrito)
           cargaCarrito();
        }else{
            Swal.fire({
                icon: "error",
                title: "Límite de inventario excedido",
                //text: "Favor de establecer al menos un filtro antes de buscar",
            }); 
        }
       // let cantidad = parseInt(cantidadElem.textContent);
      //  cantidad++;
       // cantidadElem.textContent = cantidad;
       // actualizarPrecio(); // Actualizar el precio al aumentar la cantidad
    });

    // Event listener para el botón de "eliminar"
    btn_eliminar.addEventListener("click", function() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer: ${sesionTok.token.accessToken}`);

        const requestOptions = {
         method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch(`http://127.0.0.1:8080/api/carrito/eliminar/${carrito.id_carrito}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
        cargaCarrito();
      //  const card = document.getElementById(`card-carrito${producto.id}`);
       // card.remove(); // Eliminar el producto del DOM
       // carrito = carrito.filter(item => item.id !== producto.id);
        // Actualizar el localStorage con el carrito actualizado
      //  localStorage.setItem("carrito", JSON.stringify(carrito));
       // calcTotal() // Actualizamos el precio en el resumen del carrito
    });

}
// Evento del boton pagar
btn_pagar.addEventListener("click", function(event){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer: ${sesionTok.token.accessToken}`);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/api/carrito/", requestOptions)
    .then((response) =>  response.json())
    .then((result) =>{
    let sesionSto= JSON.parse(sessionStorage.getItem('usuarioActivo'));
        //Consultamos los datos en el carrito para buscar si hay un registro previo
        result.forEach((async element => {
            if(element.usuario_id_usuario==sesionSto.usuario.id  && element.estado=="pendiente"){
                const raw = JSON.stringify({
                    "cantidad": element.cantidad,
                    "precio_total": element.precio_total,
                    "estado": "pago",
                    "usuario_id_usuario": element.usuario_id_usuario,
                    "producto_id_producto" : element.producto_id_producto
                });
            //console.log("raww"+raw);
               putCarrito(raw, element.id_carrito)
            }
            }));
        }) .catch((error) => console.error(error));
   // event.preventDefault();
    //if(localStorage.getItem("carrito") != null){
    //    localStorage.removeItem("carrito");
   ///    carritoContainer.replaceChildren();
   // }
   Swal.fire({
    icon: "success",
    title: "Pago realizado con exito",
    showConfirmButton: false,
    timer: 1500
    });
    cargaCarrito();
})
//Obtiene el producto mediante el id
// function obtenerProducto()
// {
//     let producto=null;
//     const requestOptions = {
//         method: "GET",
//         redirect: "follow"
//       };
      
//       fetch(`http://127.0.0.1:8080/api/productos/${id_producto}`, requestOptions)
//         .then((response) => response.text())
//         .then((result) => producto=result)
//         .catch((error) => console.error(error));
//     return producto
// }
async function obtenerProducto(id_producto){
    let resultado = null
    // Se hace la petición a la api para obtener los datos
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/productos/${id_producto}`, requestOptions)
        const result = await response.json();
        resultado = result;
    } catch (error) {
        console.error(error);
    }finally{
        return resultado;
    }
}
function putCarrito(raw, id_pedido) {
    const myHeaders = new Headers();
    let sesionTok= JSON.parse(sessionStorage.getItem('usuarioActivo'));
    myHeaders.append("Authorization", `Bearer: ${sesionTok.token.accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    
    
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch(`http://127.0.0.1:8080/api/carrito/actualizar/${id_pedido}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error)); 
}
//f
// // Se agregan productos manualmente
// addItem({
//     'id': 1,
//     'img':'./assets/muebles/deco-8.png',
//     'name':'Cesto en yute',
//     'price':800.00});

// addItem({
//     'id': 2,
//     'img':'./assets/muebles/image-3.png',
//     'name':'Funda de cojín con flecos en terciopelo',
//     'price':249.00});

// addItem({
//     'id': 3,
//     'img':'./assets/muebles/mueble-8.png',
//     'name':'Armario de madera tradicional',
//     'price':6000.00});
