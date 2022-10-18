$(document).ready(function(){
    //instrucciones que se ejecutan cuando carga la página!
    })

////////////////////////////////////////////////////////////FUNCIONES ADMIN//////////////////////////////////////////////////////////////////////////////////////////

function leerAdmin() {
    $.ajax({
        url: "",
        type: 'GET',
        dataType: 'JSON',

        success: function (respuesta) {

            pintarAdmin(respuesta.items);

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

function pintarAdmin(items) {

    $("#listaAdmin").empty();

    //declarar variables js
    let myTable = "<table>";
    myTable += "<tr><th>Nombre</th><th>Correo</th><th>Contraseña</th></tr>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";;
        myTable += "<td>" + items[i].nameAdmin + "</td>";
        myTable += "<td>" + items[i].mailAdmin + "</td>";
        myTable += "<td>" + items[i].passwordAdmin + "</td>";
        //myTable += "<td><button onclick='borrarCliente(" + items[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#listaAdmin").append(myTable);
}

function guardarAdmin() {
    //Obtiene los valores de los input del formulario
    let nameAdmin = $("#nameAdmin").val();
    let mailAdmin = $("#mailAdmin").val();
    let passwordAdmin = $("#passwordAdmin").val();

    //guarda los datos del formulario en un arreglo
    let data = {
        
        nameAdmin: nameAdmin,
        mailAdmin: mailAdmin,
        passwordAdmin: passwordAdmin,
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
            $("#nameAdmin").val("");
            $("#mailAdmin").val("");
            $("#passwordAdmin").val("");
        },
        error: function (xhr, status) {
            alert("error");
        }
    }

    );
}
