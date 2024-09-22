//declara el div en done se pondra el select de estados
const ubicacion_usuarios= document.getElementById("ubicacion_usuarios");
//declara arreglos de estado
const arrEstados=["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Coahuila", "Colima", 
   " Chiapas", "Chihuahua", "Durango", "Distrito Federal"," Guanajuato", "Guerrero","Hidalgo", "Jalisco", "México", "Michoacán", 
  " Morelos", "Nayarit","Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", 
  "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];
//llena el select con el arreglo de los estados
function llenarSelect(){
    let cad=""
    arrEstados.forEach(estado => {
                        
        cad=cad+` <option value="${estado}">${estado}</option>`
        
    });
    ubicacion_usuarios.insertAdjacentHTML("beforeend", cad);

}

window.addEventListener("load", function(){
    llenarSelect();
});