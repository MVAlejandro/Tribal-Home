//botones
const btn_cuestionario=document.getElementById("btn_cuestionario");
//campos-input
const nombre_usuario=document.getElementById("nombre_usuario");
const apellidos_usuario=document.getElementById("apellidos_usuario");
const cp_usuario=document.getElementById("cp_usuarioo");
const direccion_usuario=document.getElementById("direccion_usuarioo");
const email_usuario=document.getElementById("email_usuario");
const telefono_usuario=document.getElementById("telefono_usuario");

//campos-info
const nombresInfo=document.getElementById("nombresInfo");
const apellidosInfo=document.getElementById("apellidosInfo");
const cpInfo=document.getElementById("cpInfo");
const direccionInfo=document.getElementById("direccionInfo");
const emailInfo=document.getElementById("emailInfo");
const telefonoInfo=document.getElementById("telefonoInfo");                         
                              
//declara el div en done se pondra el select de estados
const ubicacion_usuarios= document.getElementById("ubicacion_usuarios");
//declara arreglos de estado
const arrEstados=["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Coahuila", "Colima", 
   " Chiapas", "Chihuahua", "Durango", "Distrito Federal"," Guanajuato", "Guerrero","Hidalgo", "Jalisco", "México", "Michoacán", 
  " Morelos", "Nayarit","Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", 
  "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];
//*--------------funciones-----------------*
//llena el select con el arreglo de los estados
function llenarSelect(){
    let cad=""
    arrEstados.forEach(estado => {
                        
        cad=cad+` <option value="${estado}">${estado}</option>`
        
    });
    ubicacion_usuarios.insertAdjacentHTML("beforeend", cad);

}

//debe de verificar los datos y de ser correcto crear la cuenta por el momento en el local storage
btn_cuestionario.addEventListener("click", function () {
    
})


//*---------------metodo al cargar pagina-----------*
window.addEventListener("load", function(){
    llenarSelect();
});