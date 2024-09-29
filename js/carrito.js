window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("usuario_activo") == null){
        location.href = "./login.html";
    }else{
        
    }
})