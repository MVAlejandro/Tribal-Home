const encabezado= document.getElementById("encabezado")
const pie=document.getElementById("pie")

window.addEventListener("load", function(event){

    crearNavBar();
    crearFooter();

    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('.nav-link');
    const perfil = document.getElementById("perfil");
    const perfil2 = document.getElementById("perfil2");
    const carrito = document.getElementById("carrito");
    const carrito2 = document.getElementById("carrito2");
    
    if(this.localStorage.getItem("usuario_activo") == null){
        perfil.href = "./login.html";
        perfil2.href = "./login.html";
        carrito.href = "./login.html";
        carrito2.href = "./login.html";
        
    }else{
        perfil.href = "./perfil.html";            
        perfil2.href = "./perfil.html";
        carrito.href = "./carrito.html";
        carrito2.href = "./carrito.html";
        
        crearLogOut();
        const logOut = document.getElementById("logOut");
        const logOut2 = document.getElementById("logOut2");

        logOut.addEventListener("click", function(e){
            e.preventDefault();
            cerrarSesion();
        });

        logOut2.addEventListener("click", function(e){
            e.preventDefault();
            cerrarSesion();
        });
    }
    
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
});

function cerrarSesion (){
    this.localStorage.removeItem("usuario_activo");
    location.href = "index.html";
}

function crearNavBar(){
    encabezado.insertAdjacentHTML("afterbegin",
        `<nav class="navbar navbar-expand-lg" style="background-color: #FFF;">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">
                <img src="assets/nav-bar/Logo.png" alt="Logo_Tribal-Home" class="logo">
                </a>
                <div class="d-lg-none ms-auto">
                <a class="text-dark me-2" id="carrito2"href="carrito.html">
                    <img src="assets/nav-bar/bag-2.png" alt="carrito_de_compras" class="perfil-car">
                </a>
                <a class="text-dark me-2" id="perfil" href="login.html">
                    <img src="assets/nav-bar/user.png" alt="usuario" class="perfil-car">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                </div>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav mx-auto">
                 <li class="nav-item ms-4 me-4">
                        <a class="nav-link" href="index.html">Inicio</a>
                    </li>
                    <li class="nav-item ms-4 me-4">
                        <a class="nav-link" href="productos.html">Productos</a>
                    </li>
                    <li class="nav-item ms-4 me-4">
                        <a class="nav-link" href="servicios.html">Servicios</a>
                    </li>
                    <li class="nav-item ms-4 me-4">
                        <a class="nav-link" href="contactanos.html">Contacto</a>
                    </li>
                    <li class="nav-item ms-4 me-4">
                        <a class="nav-link" href="nosotros.html">Nosotros</a>
                    </li>
                </ul>
                </div>
                <div id="iconos" class="d-none d-lg-flex align-items-center ms-auto">
                    <a class="text-dark nav-link me-3" id="carrito" href="carrito.html">
                        <img src="assets/nav-bar/bag-2.png" alt="carrito_de_compras" class="perfil-car">
                    </a>
                    <a class="text-dark nav-link me-3" id="perfil2" href="login.html">
                        <img src="assets/nav-bar/user.png" alt="usuario" class="perfil-car">
                    </a>
                </div>  
            </div>
        </nav>`
    );
}

function crearFooter(){
    pie.insertAdjacentHTML("beforeend",
        `<div class="container-fluid">
            <hr>
            <div class="row align-items-center">
                <div class="col text-start">
                    <p class="mb-0">Tribal-Home © Copyright 2024, Inc. All rights reserved</p>
                </div>
                <div class="col text-end">
                    <a href="#" class="text-dark me-3"><img src="assets/footer/Facebook-icon.png" alt="Facebook" class="footer-icon"></a>
                    <a href="#" class="text-dark me-3"><img src="assets/footer/Instagram-icon.png" alt="Twitter" class="footer-icon"></a>
                    <a href="#" class="text-dark"><img src="assets/footer/Twitter-icon.png" alt="Instagram"  class="footer-icon"></a>
                </div>
            </div>
            <br>
        </div>`
    );
}

function crearLogOut(){
    perfil2.insertAdjacentHTML("afterend", `
        <a class="text-dark nav-link me-3" id="logOut2" href="carrito.html">
            <img src="assets/nav-bar/logout.png" alt="logout" class="logout perfil-car">
        </a>`
    );
    perfil.insertAdjacentHTML("afterend", `
        <a class="text-dark me-3" id="logOut" href="carrito.html">
            <img src="assets/nav-bar/logout.png" alt="logout" class="logout perfil-car">
        </a>`
    );
}