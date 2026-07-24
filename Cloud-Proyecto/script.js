// ==========================================
// SISTEMA DE GESTIÓN DE BIBLIOTECA
// ==========================================

// Arreglo donde se almacenan los libros
let libros = JSON.parse(localStorage.getItem("libros")) || [];

// Contador automático de ID
let contador = libros.length > 0 ? libros[libros.length - 1].id + 1 : 1;

// ==========================================
// REGISTRAR LIBRO
// ==========================================

function agregarLibro() {

    let titulo = document.getElementById("titulo").value.trim();
    let autor = document.getElementById("autor").value.trim();
    let categoria = document.getElementById("categoria").value;
    let anio = document.getElementById("anio").value;
    let estado = document.getElementById("estado").value;

    if (
        titulo === "" ||
        autor === "" ||
        categoria === "" ||
        anio === "" ||
        estado === ""
    ) {

        alert("Debe completar todos los campos.");

        return;

    }

    let libro = {

        id: contador,
        titulo: titulo,
        autor: autor,
        categoria: categoria,
        anio: anio,
        estado: estado

    };

    libros.push(libro);

    contador++;

    guardarDatos();

    mostrarLibros();

    limpiarFormulario();

    alert("Libro registrado correctamente.");

}

// ==========================================
// MOSTRAR LIBROS
// ==========================================

function mostrarLibros() {

    let tabla = document.getElementById("tablaLibros");

    tabla.innerHTML = "";

    libros.forEach(function(libro, indice){

        tabla.innerHTML += `

        <tr>

            <td>${libro.id}</td>

            <td>${libro.titulo}</td>

            <td>${libro.autor}</td>

            <td>${libro.categoria}</td>

            <td>${libro.anio}</td>

            <td>${libro.estado}</td>

            <td>

                <button
                class="btn-editar"
                onclick="editarLibro(${indice})">

                Editar

                </button>

                <button
                class="btn-eliminar"
                onclick="eliminarLibro(${indice})">

                Eliminar

                </button>

            </td>

        </tr>

        `;

    });

    actualizarEstadisticas();

}

// ==========================================
// GUARDAR DATOS
// ==========================================

function guardarDatos(){

    localStorage.setItem(
        "libros",
        JSON.stringify(libros)
    );

}

// ==========================================
// LIMPIAR FORMULARIO
// ==========================================

function limpiarFormulario(){

    document.getElementById("titulo").value = "";

    document.getElementById("autor").value = "";

    document.getElementById("categoria").value = "";

    document.getElementById("anio").value = "";

    document.getElementById("estado").value = "";

}
// ==========================================
// EDITAR LIBRO
// ==========================================

function editarLibro(indice){

    let libro = libros[indice];

    document.getElementById("titulo").value = libro.titulo;
    document.getElementById("autor").value = libro.autor;
    document.getElementById("categoria").value = libro.categoria;
    document.getElementById("anio").value = libro.anio;
    document.getElementById("estado").value = libro.estado;

    libros.splice(indice,1);

    guardarDatos();

    mostrarLibros();

}

// ==========================================
// ELIMINAR LIBRO
// ==========================================

function eliminarLibro(indice){

    let respuesta = confirm(
        "¿Desea eliminar este libro?"
    );

    if(respuesta){

        libros.splice(indice,1);

        guardarDatos();

        mostrarLibros();

        alert("Libro eliminado correctamente.");

    }

}

// ==========================================
// BUSCAR LIBRO
// ==========================================

function buscarLibro(){

    let filtro = document
        .getElementById("buscar")
        .value
        .toLowerCase();

    let filas = document
        .getElementById("tablaLibros")
        .getElementsByTagName("tr");

    for(let i=0;i<filas.length;i++){

        let titulo =
            filas[i].getElementsByTagName("td")[1];

        let autor =
            filas[i].getElementsByTagName("td")[2];

        if(titulo && autor){

            let texto1 = titulo.textContent.toLowerCase();

            let texto2 = autor.textContent.toLowerCase();

            if(
                texto1.indexOf(filtro)>-1 ||
                texto2.indexOf(filtro)>-1
            ){

                filas[i].style.display="";

            }else{

                filas[i].style.display="none";

            }

        }

    }

}

// ==========================================
// ACTUALIZAR ESTADÍSTICAS
// ==========================================

function actualizarEstadisticas(){

    let disponibles = 0;

    let prestados = 0;

    libros.forEach(function(libro){

        if(libro.estado==="Disponible"){

            disponibles++;

        }else{

            prestados++;

        }

    });

    document.getElementById("totalLibros").textContent =
    libros.length;

    document.getElementById("librosDisponibles").textContent =
    disponibles;

    document.getElementById("librosPrestados").textContent =
    prestados;

}
// ==========================================
// CARGAR DATOS AL INICIAR
// ==========================================

window.onload = function () {

    mostrarLibros();

    actualizarFecha();

};

// ==========================================
// ACTUALIZAR FECHA Y HORA
// ==========================================

function actualizarFecha() {

    let fecha = new Date();

    let opciones = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };

    let texto = fecha.toLocaleDateString("es-ES", opciones);

    let footer = document.querySelector("footer p");

    footer.innerHTML =
        "© 2026 Biblioteca Virtual | Última actualización: " + texto;

}

// ==========================================
// ORDENAR LIBROS POR TÍTULO
// ==========================================

function ordenarLibros() {

    libros.sort(function(a, b) {

        return a.titulo.localeCompare(b.titulo);

    });

    guardarDatos();

    mostrarLibros();

}

// ==========================================
// CAMBIAR ESTADO DEL LIBRO
// ==========================================

function cambiarEstado(indice) {

    if (libros[indice].estado === "Disponible") {

        libros[indice].estado = "Prestado";

    } else {

        libros[indice].estado = "Disponible";

    }

    guardarDatos();

    mostrarLibros();

}

// ==========================================
// BORRAR TODOS LOS LIBROS
// ==========================================

function borrarBiblioteca() {

    let confirmar = confirm(
        "¿Desea eliminar toda la biblioteca?"
    );

    if (confirmar) {

        libros = [];

        contador = 1;

        guardarDatos();

        mostrarLibros();

        actualizarEstadisticas();

        alert("La biblioteca ha sido vaciada correctamente.");

    }

}

// ==========================================
// INFORMACIÓN EN CONSOLA
// ==========================================

console.log("===================================");

console.log(" Biblioteca Virtual iniciada ");

console.log(" HTML + CSS + JavaScript ");

console.log(" LocalStorage Activado ");

console.log("===================================");
