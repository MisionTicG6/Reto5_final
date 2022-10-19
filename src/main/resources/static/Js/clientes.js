$(document).ready(function(){
    leerClientes();
})

let URL = "http://localhost:8080/api/Client/";

///////////////////////////////////////////////////FUNCIONES CLIENTE/////////////////////////////////////////////////////////////////////

function leerClientes() {
    $.ajax({
        url: URL + "all",
        type: 'GET',
        dataType: 'JSON',

        success: function (respuesta) {

            pintarClientes(respuesta);

        },
        error: function (xhr, status) {
            alert("error");
        }
    }

    )
}

function pintarClientes(respuesta) {

    $("#listaClientes").empty();

    //declarar variables js
    let myTable = "<table>";
    myTable += "<tr><th>Nombre</th><th>Correo</th><th>Edad</th></tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";;
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>"
        myTable += "<td><button class=\"btn btn-danger\" onclick='borrarCliente(" + respuesta[i].idClient + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#listaClientes").append(myTable);
}

function guardarCliente() {
    //Obtiene los valores de los input del formulario
    let nombre = $("#nameClient").val();
    let correo = $("#mailClient").val();
    let edad = $("#ageClient").val();
    let password = $("#passwordClient").val();

    //guarda los datos del formulario en un arreglo
    let data = {
        name: nombre,
        email: correo,
        age: edad,
        password: password
    };

    //convierte el arreglo en formato JSON
    let dataToSend = JSON.stringify(data);


    $.ajax({
        url: URL + "save",
        type: 'POST',
        //dataType: 'JSON',
        data: dataToSend,
        contentType: 'application/json',

        success: function (algo) {
            $("#nameClient").val("");
            $("#mailClient").val("");
            $("#ageClient").val("");
            $("#passwordClient").val("");
            leerClientes();
        },
        error: function (xhr, status) {
            alert("error");
        }
    }

    );
}

function borrarCliente(idElemento) {

    let myData = { idClient: idElemento }
    let dataToSend = JSON.stringify(myData);
    $.ajax(
        {
            url: URL + idElemento,
            type: 'DELETE',
            data: dataToSend,
            contentType: 'application/json',
            datatype: "JSON",
            success: function (respuesta) {
                alert("Borrado exitoso");
            },
            error: function (xhr, status) {
                alert('Operacion no satisfactoria,' + xhr.status);
            },
            //Muestra los clientes despues de borrarlos
            complete: function () {
                leerClientes();
            }
        }
    );

}

