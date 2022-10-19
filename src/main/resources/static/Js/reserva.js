$(document).ready(function(){
    leerReservas();
})

let URL = "http://localhost:8080/api/Reservation/";

//////////////////////////////////////////////////////////////FUNCIONES RESERVA////////////////////////////////////////////////////////////////

function leerReservas() {
    $.ajax({
        url: URL + "all",
        type: 'GET',
        dataType: 'JSON',

        success: function (respuesta) {

            pintarReservas(respuesta);

        },
        error: function (xhr, status) {
            alert("error");
        }
    }

    )
}

function pintarReservas(respuesta) {

    $("#listaReservas").empty();

    //declarar variables js
    let myTable = "<table>";
    myTable += "<tr><th>FechaInicio</th><th>FechaEntrega</th><th>Estado</th></tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td>" + respuesta[i].status + "</td>"
        myTable += "<td><button class=\"btn btn-danger\" onclick='borrarReserva(" + respuesta[i].idReservation + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#listaReservas").append(myTable);
}

function guardarReserva() {
    //Obtiene los valores de los input del formulario
    let carro = $("#reservaCar").val();
    let cliente = $("#reservaClient").val();
    let inicio = $("#fechaInicio").val();
    let entrega = $("#fechaEntrega").val();

    //guarda los datos del formulario en un arreglo
    let data = {
        idCar: carro,
        idClient: cliente,
        startDate: inicio,
        devolutionDate: entrega
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
            $("#reservaCar").val("");
            $("#reservaClient").val("");
            $("#fechaInicio").val("");
            $("#fechaEntrega").val("");
            leerReservas();
        },
        error: function (xhr, status) {
            alert("error");
        }
    }
    );
}

function borrarReserva(idElemento) {

    let myData = { idCar: idElemento }
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
                leerReservas();
            }
        }
    );

}