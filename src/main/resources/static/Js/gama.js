$(document).ready(function(){
    leerGama();
    })

let URL = "http://localhost:8080/api/Gama/";

////////////////////////////////////////////////////FUNCIONES GAMA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
function leerGama() {
    $.ajax({
        url: URL + "all",
        type: 'GET',
        dataType: 'JSON',

        success: function (respuesta) {
            pintarGama(respuesta);
        },
        error: function (xhr, status) {
            alert("error");
        }
    }
    )
}

function pintarGama(respuesta) {

    $("#listaGama").empty();

    //declarar variables js
    let myTable = "<table>";
    myTable += "<tr><th>Nombre</th><th>Descripción</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td><button class=\"btn btn-danger\" onclick='borrarGama(" + respuesta[i].idGama + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#listaGama").append(myTable);
}

function guardarGama() {
    //Obtiene los valores de los input del formulario
    let nameGama = $("#nameGama").val();
    let descriptionGama = $("#descriptionGama").val();


    //guarda los datos del formulario en un arreglo
    let data = {
        name: nameGama,
        description: descriptionGama,
    };

    //convierte el arreglo en formato JSON
    let dataToSend = JSON.stringify(data);


    $.ajax({
        url: URL + "save",
        type: 'POST',
        //dataType: 'JSON',
        data: dataToSend,
        contentType: 'application/json',

        success: function (anything) {
            $("#nameGama").val("");
            $("#descriptionGama").val("");
            leerGama();
        },
        error: function (xhr, status) {
            alert("error");
        }
    }
    );
}

function borrarGama(idElemento) {

    let myData = { idGama: idElemento }
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
                leerGama();
            }
        }
    );

}

function actualizarMensaje() {

    //Obtiene los valores de los input del formulario
    let idCarro = $("#idMensaje").val();
    let marca = $("#mensaje").val();

    //guarda los datos del formulario en un arreglo
    let data = {
        id: idCarro,
        messagetext: marca,
    };

    //convierte el arreglo en formato JSON
    let dataToSend = JSON.stringify(data);


    $.ajax({
            url: URL + "update",
            type: 'PUT',
            //dataType: 'JSON',
            data: dataToSend,
            contentType: 'application/json',

            success: function (algo) {
                $("#idMensaje").val("");
                $("#mensaje").val("");
            },
            error: function (xhr, status) {
                alert("error");
            }
        }
    );
}
