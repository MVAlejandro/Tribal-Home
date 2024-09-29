// Se agregan campos
const data = document.getElementById("data");

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("usuario_activo") == null){
        location.href = "./login.html";
    }else{
        let usuario = JSON.parse(this.localStorage.getItem("usuario_activo"))
        data.insertAdjacentHTML("afterbegin", `
                <p>${usuario.nombre_usuario}  ${usuario.apellidos_usuario}</p>
                <p>${usuario.direccion_usuario}</p>
                <p>${usuario.telefono_usuario}</p>
                <p>${usuario.email_usuario}</p>
            `)
    }
})