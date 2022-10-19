$(document).ready(function(){
    leerCarros();
})

let URL = "http://localhost:8080/api/Car/";

/////////////////////////////////////////////////////FUNCIONES CAR////////////////////////////////////////////////////////////

function leerCarros() {
    $.ajax({
        url: URL + "all",
        type: 'GET',
        dataType: 'JSON',

        success: function (respuesta) {

            pintarCarros(respuesta);

        },
        error: function (xhr, status) {
            alert("error");
        }
    }
    )
}

function pintarCarros(respuesta) {

    $("#listaCarros").empty();
    //declarar variables js
    let myTable = '<div class="container"> <div class="row">';
    for (i = 0; i < respuesta.length; i++) {
        myTable +=`
            <div class="card m-2" style="width: 18rem;">
              <div className="card-body">
                <h5 className="card-title">${respuesta[i].brand}</h5>
                <h6 className="card-subtitle mb-2 text-muted">${respuesta[i].year}</h6>
                <p className="card-text">${respuesta[i].name}</p>
                <button class="btn btn-danger" onclick="borrarCarro(${respuesta[i].idCar})">Borrar</button>
              </div>
             </div>
             `
    }
    myTable += "</div></div>";
    $("#listaCarros").append(myTable);
}

function guardarCarros() {
    //Obtiene los valores de los input del formulario
    let brandCar = $("#brandCar").val();
    let nameCar = $("#nameCar").val();
    let modelCar = $("#modelCar").val();
    let descriptionCar = $("#descriptionCar").val();
    let gamaCar = $("#gamaCar").val();

    //guarda los datos del formulario en un arreglo
    let data = {
        brand: brandCar,
        name: nameCar,
        year: modelCar,
        description: descriptionCar,
        gamma: gamaCar
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
            $("#brandCar").val("");
            $("#nameCar").val("");
            $("#modelCar").val("");
            $("#descriptionCar").val("");
            $("#gamaCar").val("");
            leerCarros();
        },
        error: function (xhr, status) {
            alert("error");
        }
    }
    );
}

function borrarCarro(idElemento) {

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
                leerCarros();
            }
        }
    );

}
