$(document).ready(function(){
    //instrucciones que se ejecutan cuando carga la página!
    })
////////////////////////////////////////////////////////////////////////FUNCIONES SCORE_RESERVAS/////////////////////////////////////

function leerScoreReservas() {
    $.ajax({
        url: "",
        type: 'GET',
        dataType: 'JSON',

        success: function (respuesta) {

            pintarScoreReservas(respuesta.items);

            // let cs=respuesta.items;

            // for(i=0;i<cs.length;i++){
            //     $("#listaClientes").append(cs[i].name);

            // }
        },
        error: function (xhr, status) {
            alert("error");
        }
    }

    )
}

function pintarScoreReservas(items) {

    $("#listaScoreReservas").empty();

    //declarar variables js
    let myTable = "<table>";
    myTable += "<tr><th>Calificación</th><th>Mensaje</th><th>Reserva</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";;
        myTable += "<td>" + items[i].scoreReserva + "</td>";
        myTable += "<td>" + items[i].mensajeReserva + "</td>";
        myTable += "<td>" + items[i].idReserva + "</td>";
        //myTable += "<td><button onclick='borrarCliente(" + items[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#listaScoreReservas").append(myTable);
}

function guardarCliente() {
    //Obtiene los valores de los input del formulario
    let scoreReserva = $("#scoreReserva").val();
    let mensajeReserva = $("#mensajeReserva").val();
    let idReserva = $("#idReserva").val();


    //guarda los datos del formulario en un arreglo
    let data = {
        
        scoreReserva: scoreReserva,
        mensajeReserva: mensajeReserva,
        idReserva: idReserva,
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
            $("#scoreReserva").val("");
            $("#mensajeReserva").val("");
            $("idReserva").val("");
        },
        error: function (xhr, status) {
            alert("error");
        }
    }

    );
}
