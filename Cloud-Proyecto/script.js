function sumar(){

    let n1 = Number(document.getElementById("num1").value);

    let n2 = Number(document.getElementById("num2").value);

    let resultado = n1 + n2;

    document.getElementById("resultado").innerHTML =
    "Resultado: " + resultado;

}

let contador = 0;

function aumentar(){

    contador++;

    document.getElementById("contador").innerHTML = contador;

}

function disminuir(){

    contador--;

    document.getElementById("contador").innerHTML = contador;

}

function mostrarFecha(){

    let fecha = new Date();

    document.getElementById("fecha").innerHTML =
    fecha.toLocaleString();

}

function saludar(){

    let nombre = document.getElementById("nombre").value;

    document.getElementById("saludo").innerHTML =
    "Bienvenido " + nombre +"

}
