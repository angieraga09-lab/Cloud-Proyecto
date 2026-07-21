function registrar(){

    let nombre=document.getElementById("nombre").value;
    let apellido=document.getElementById("apellido").value;
    let edad=document.getElementById("edad").value;
    let carrera=document.getElementById("carrera").value;

    if(nombre=="" || apellido=="" || edad=="" || carrera==""){

        alert("Debe completar todos los campos.");

        return;

    }

    let tabla=document.getElementById("tablaEstudiantes");

    let fila=tabla.insertRow();

    fila.insertCell(0).innerHTML=nombre;
    fila.insertCell(1).innerHTML=apellido;
    fila.insertCell(2).innerHTML=edad;
    fila.insertCell(3).innerHTML=carrera;

    let accion=fila.insertCell(4);

    accion.innerHTML="<button class='eliminar' onclick='eliminar(this)'>Eliminar</button>";

    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("edad").value="";
    document.getElementById("carrera").value="";

}

function eliminar(boton){

    let fila=boton.parentNode.parentNode;

    fila.remove();

}
