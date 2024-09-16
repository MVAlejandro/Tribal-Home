const encabezado= document.getElementById("encabezado")
const pie=document.getElementById("pie")

window.addEventListener("load",
    function(event){
        encabezado.insertAdjacentHTML("afterbegin",
            `<nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html">
                    <img src="assets/nav-bar/Logo.png" alt="Logo_Tribal-Home" class="logo">
                    </a>
                    <div class="d-lg-none ms-auto">
                    <a class="text-dark me-2" href="carrito.html">
                        <img src="assets/nav-bar/bag-2.png" alt="carrito_de_compras" class="perfil-car">
                    </a>
                    <a class="text-dark me-2" href="login.html">
                        <img src="assets/nav-bar/user.png" alt="usuario" class="perfil-car">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav mx-auto">
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
                    <div class="d-none d-lg-flex align-items-center ms-auto">
                        <a class="text-dark nav-link me-3" href="carrito.html">
                            <img src="assets/nav-bar/bag-2.png" alt="carrito_de_compras" class="perfil-car">
                        </a>
                        <a class="text-dark nav-link me-3" href="login.html">
                            <img src="assets/nav-bar/user.png" alt="usuario" class="perfil-car">
                        </a>
                    </div>  
                </div>
            </nav>`
        );

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

        const currentLocation = window.location.href;
        const menuItems = document.querySelectorAll('.nav-link');
        
        menuItems.forEach(item => {
            if (item.href === currentLocation) {
                item.classList.add('active');
            }
        });

    }
)
