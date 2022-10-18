$(document).ready(function(){
    leerMensajes();
})

let URL = "http://localhost:8080/api/Message/";

////////////////////////////////////////////////FUNCIONES MENSAJE/////////////////////////////////////////////////////////////////////////////////////

function leerMensajes() {
    $.ajax({
        url: URL + "all",
        type: 'GET',
        dataType: 'JSON',

        success: function (respuesta) {

            pintarMensajes(respuesta);

        },
        error: function (xhr, status) {
            alert("error");
        }
    }

    )
}

function pintarMensajes(respuesta) {

    $("#listaMensajes").empty();

    //declarar variables js
    let myTable = "<table>";
    myTable += "<tr><th>Mensaje</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "<td><button onclick='borrarMensaje(" + respuesta[i].idMessage + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#listaMensajes").append(myTable);
}

function guardarMensaje() {
    //Obtiene los valores de los input del formulario
    let mensaje = $("#mensaje").val();
    let carro = $("#carro").val();
    let cliente = $("#cliente").val();


    //guarda los datos del formulario en un arreglo
    let data = {
        messageText: mensaje,
        idCar: carro,
        idClient: cliente
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
            $("#mensaje").val("");
            $("#carro").val("");
            $("#cliente").val("");
            leerMensajes();
        },
        error: function (xhr, status) {
            alert("error");
        }
    }

    );
}

function borrarMensaje(idElemento) {

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
                leerMensajes();
            }
        }
    );

}
