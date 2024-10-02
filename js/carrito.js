window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("usuario_activo") == null){
        location.href = "./login.html";
    }else{
        
    }
})

// Se crea la función para agregar productos en el HTML de carrito
function addItem(producto){
    const itemCarr = 
        '<div class="row pt-3 pt-lg-0  mt-4  card-carrito position-relative">\n' +
        '    <div class="col-lg-4 col-md-12 mt-lg-3 mb-lg-3 mb-md-0 d-flex justify-content-center">\n' +
        '        <img src="'+producto.img +'" alt="Producto del Carrito" class="carrito-producto">\n' +
        '    </div>\n' +
        '    <div class="col-lg-5 col-md-12 mt-lg-3 mt-md-0 mb-3">\n' +
        '        <div class="row titulo-row">\n' +
        '            <p class="nombre">'+producto.name+'</p>\n' +
        '        </div>\n' +
        '        <div class="row calificacion-row mb-4">\n' +
        '            <div class="calificacion">\n' +
        '                <img src="./assets/star.png" alt="" class="star">\n' +
        '                <img src="./assets/star.png" alt="" class="star">\n' +
        '                <img src="./assets/star.png" alt="" class="star">\n' +
        '                <img src="./assets/star.png" alt="" class="star">\n' +
        '                <img src="./assets/star.png" alt="" class="star">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="row"></div>\n' +
        '        <div class="row numero-productos-row">\n' +
        '            <div class="numero-productos">\n' +
        '                <button class="btn mas-menos">+</button>\n' +
        '                <p class="cantidad">Number: <span class="number">1</span></p>\n' +
        '                <button class="btn mas-menos">-</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-lg-3 col-md-12 mt-lg-3 mt-md-0 mb-3 d-flex flex-column justify-content-between">\n' +
        '        <div class="position-absolute top-0 end-0 m-2">\n' +
        '            <button type="button" class="btn">\n' +
        '                <img src="assets/shape.png" alt="Botón de eliminar" class="eliminar-icon">\n' +
        '            </button>\n' +
        '        </div>\n' +
        '        <div class="row mt-auto">\n' +
        '            <div class="col-12 align-self-end text-end">\n' +
        '                <p class="price"><strong>'+producto.price+'</strong></p>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +                
        '</div>\n';

    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.insertAdjacentHTML("beforeend", itemCarr);
}

// Se agregan productos manualmente
addItem({
    'img':'./assets/muebles/deco-8.png',
    'name':'Cesto en yute',
    'price':'$800.00'});

addItem({
    'img':'./assets/muebles/image-3.png',
    'name':'Funda de cojín con flecos en terciopelo',
    'price':'$249.00'});

addItem({
    'img':'./assets/muebles/mueble-8.png',
    'name':'Armario de madera tradicional',
    'price':'$6000.00'});
