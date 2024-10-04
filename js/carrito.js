// Validamos que haya un usuario activo, si no lo mandamos a que inicie sesión 
window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("usuario_activo") == null){
        location.href = "./login.html";
    }else{
        
    }
    calcTotal()
})

// Función para obtener el total de los precios
function calcTotal(){
    const precio_parcial = document.getElementById("precio_parcial");
    const precio_total = document.getElementById("precio_total");
    const descuento = Number(document.getElementById("descuento").textContent.replace('$',''));
    const card_carrito = document.getElementsByClassName("card-carrito");
    let total = 0;
    
    for (let card of card_carrito){
        const price = Number(card.querySelector(".price strong").textContent.replace('$',''));
        total += price;
    }
    let precioTotal = total + descuento;
    precio_parcial.textContent = `$${total.toFixed(2)}`;
    if (precioTotal < 0){
        precio_total.textContent = "$0"    
    }else{
        precio_total.textContent = `$${precioTotal.toFixed(2)}`;
    }
    

}

// Se crea la función para agregar productos en el HTML de carrito
function addItem(producto){
    const itemCarr = `
        <div class="row pt-3 pt-lg-0  mt-4  card-carrito position-relative" id="card-carrito${producto.id}">
            <div class="col-lg-4 col-md-12 mt-lg-3 mb-lg-3 mb-md-0 d-flex justify-content-center">
                <img src="${producto.img}" alt="Producto del Carrito" class="carrito-producto">
            </div>
            <div class="col-lg-5 col-md-12 mt-lg-3 mt-md-0 mb-3">
                <div class="row titulo-row">
                    <p class="nombre">${producto.name}</p>
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
                        <button class="btn mas-menos" id="btn-menos${producto.id}">-</button>
                        <p class="cantidad">Cantidad: <span class="number" id="cantidad${producto.id}">1</span></p>
                        <button class="btn mas-menos" id="btn-mas${producto.id}">+</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-12 mt-lg-3 mt-md-0 mb-3 d-flex flex-column justify-content-between">
                <div class="position-absolute top-0 end-0 m-2">
                    <button type="button" class="btn" id="btn-eliminar${producto.id}">
                        <img src="assets/shape.png" alt="Botón de eliminar" class="eliminar-icon">
                    </button>
                </div>
                <div class="row mt-auto">
                    <div class="col-12 align-self-end text-end">
                        <p class="price"><strong id="price${producto.id}"></strong></p>
                    </div>
                </div>
            </div>                
        </div>
        `
    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.insertAdjacentHTML("beforeend", itemCarr);
    const cantidadElem = document.getElementById(`cantidad${producto.id}`);
    const price = document.getElementById(`price${producto.id}`)
    const btn_menos = document.getElementById(`btn-menos${producto.id}`);
    const btn_mas = document.getElementById(`btn-mas${producto.id}`);
    const btn_eliminar = document.getElementById(`btn-eliminar${producto.id}`)
    actualizarPrecio();

     // Función para actualizar el precio basado en la cantidad
     function actualizarPrecio() {
        const cantidad = Number(cantidadElem.textContent); // Convertir cantidad a número
        let total = producto.price * cantidad;
        price.textContent = `$${total.toFixed(2)}`;
        calcTotal() // Actualizamos el precio en el resumen del carrito
    }

    // Event listener para el botón de "menos"
    btn_menos.addEventListener("click", function() {
        let cantidad = parseInt(cantidadElem.textContent);
        if (cantidad > 1) {
            cantidad--;
            cantidadElem.textContent = cantidad;
            actualizarPrecio(); // Actualizar el precio al reducir la cantidad
        }
    });

    // Event listener para el botón de "más"
    btn_mas.addEventListener("click", function() {
        let cantidad = parseInt(cantidadElem.textContent);
        cantidad++;
        cantidadElem.textContent = cantidad;
        actualizarPrecio(); // Actualizar el precio al aumentar la cantidad
    });

    // Event listener para el botón de "eliminar"
    btn_eliminar.addEventListener("click", function() {
        const card = document.getElementById(`card-carrito${producto.id}`);
        card.remove(); // Eliminar el producto del DOM
        calcTotal() // Actualizamos el precio en el resumen del carrito
    });

}

// Se agregan productos manualmente
addItem({
    'id': 1,
    'img':'./assets/muebles/deco-8.png',
    'name':'Cesto en yute',
    'price':800.00});

addItem({
    'id': 2,
    'img':'./assets/muebles/image-3.png',
    'name':'Funda de cojín con flecos en terciopelo',
    'price':249.00});

addItem({
    'id': 3,
    'img':'./assets/muebles/mueble-8.png',
    'name':'Armario de madera tradicional',
    'price':6000.00});
