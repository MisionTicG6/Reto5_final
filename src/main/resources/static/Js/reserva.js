$(document).ready(function(){
    leerReservas();
})

//////////////////////////////////////////////////////////////FUNCIONES RESERVA////////////////////////////////////////////////////////////////

function leerReservas() {
    $.ajax({
        url: "",
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
    myTable += "<tr><th>Carrp</th><th>Cliente</th><th>FechaInicio</th><th>FechaEntrega</th></tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";;
        myTable += "<td>" + respuesta[i].reservaCar + "</td>";
        myTable += "<td>" + respuesta[i].reservaClient + "</td>";
        myTable += "<td>" + respuesta[i].FechaInicio + "</td>";
        myTable += "<td>" + respuesta[i].FechaEntrega + "</td>"
        myTable += "<td><button onclick='borrarCliente(" + items[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#listaReservas").append(myTable);
}

function guardarCliente() {
    //Obtiene los valores de los input del formulario
    let carro = $("#reservaCar").val();
    let cliente = $("#reservaClient").val();
    let inicio = $("#fechaInicio").val();
    let entrega = $("#fechaEntrega").val();

    //guarda los datos del formulario en un arreglo
    let data = {
        car: carro,
        client: cliente,
        inicio: inicio,
        entrega: entrega
    };

    //convierte el arreglo en formato JSON
    let dataToSend = JSON.stringify(data);


    $.ajax({
        url: "",
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