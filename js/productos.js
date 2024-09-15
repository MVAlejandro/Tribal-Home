
function addItem(product){
    const itemHTML = 
        '<div class="card me-4 ms-4 mb-3 bg-transparent border border-0">\n' +
        '    <img src="'+product.img +'" class="card-img-top" alt="image">\n' +
        '    <div class="card-body">\n' +
        '        <p class="categoria">'+product.category+'</p>\n' +
        '        <p class="nombre-producto">'+product.name+'</p>\n' +
        '        <p class="descripcion-producto">'+product.description+'</p>\n' +
        '        <p class="precio">'+product.price+'</p>\n' +
        '        <a href="#" class="btn btn-primary">Agregar al carrito</a>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<br/>';
    const productsContainer = document.getElementById("products-container");
    productsContainer.insertAdjacentHTML("beforeend", itemHTML);
}

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
