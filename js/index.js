const encabezado= document.getElementById("encabezado")
const pie=document.getElementById("pie")


window.addEventListener("load",
    function(event){
        encabezado.insertAdjacentHTML("afterbegin",
        `<nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand col-3" href="../index.html"><img src="./assets/image 5 1.png" alt="Logo_Tribal-Home" class="logo"></a>
            <div class="collapse navbar-collapse col-sm-5" id="navbarNavDropdown">
              <ul class="navbar-nav mx-auto">
                  <li class="nav-item ms-4 me-4">
                      <a class="nav-link active" aria-current="page" href="../productos.html">Productos</a>
                  </li>
                  <li class="nav-item ms-4 me-4">
                      <a class="nav-link" href="servicios.html">Servicios</a>
                  </li>
                  <li class="nav-item ms-4 me-4">
                      <a class="nav-link" href="contactanos.html">Contactos</a>
                  </li>
                  <li class="nav-item ms-4 me-4">
                      <a class="nav-link" href="nosotros.html">Nosotros</a>
                  </li>
              </ul>
            </div>
            <div class="col-4 text-end me-5">
              <a class="text-dark col-1" href="#"><img src="assets/bag-2.png" alt="carrito_de_compras" class="perfil-car" ></a>
              <a class="text-dark col-1" href="#"><img src="assets/user.png" alt="usuario" class="perfil-car"></a>
              <button class="navbar-toggler col-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            </div>         
        </div>
    </nav>`)

    pie.insertAdjacentHTML("beforeend",
    `<div class="container-fluid">
    <hr>
    <div class="row align-items-center">
        <div class="col text-start">
            <p class="mb-0">Tribal-Home © Copyright 2020, Inc. All rights reserved</p>
         </div>
        <div class="col text-end">
            <a href="#" class="text-dark me-3"><img src="assets/Path.png" alt="Facebook" class="footer-icon"></a>
            <a href="#" class="text-dark me-3"><img src="assets/Path (1).png" alt="Twitter" class="footer-icon"></a>
            <a href="#" class="text-dark"><img src="assets/Shape.png" alt="Instagram"  class="footer-icon"></a>
        </div>
    </div>
</div>`
)

    }
)












