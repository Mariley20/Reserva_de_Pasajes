'use strict'
const busMapa = function () {
    let cantidadAsiento = 40;
    let columnas = 4;
    let filas = cantidadAsiento / columnas;
    let asientosHTML = "", numeroDeAsiento = 1;
    for (let i = 1; i <= filas; i++) {
        asientosHTML += `<div class='row' id='fila${i}'>`;
        
        for (let j = 0; j < columnas; j++) {
            asientosHTML += `<div class='col col-xl-2' id='${numeroDeAsiento}'>${numeroDeAsiento}</div>`;
            numeroDeAsiento += 1;
            (j == 1) ? asientosHTML += "<div class='col col-xl-1'></div>": asientosHTML += "";
            
        }
        asientosHTML += "</div>";
        
    }
    return asientosHTML;
}
const reserva = {
    pasajeros: [{
            nroAsiento: "39",
            nombre: "Maritza Fernandes",
            dni: "89898998",
            estado: true
        },
        {
            nroAsiento: "3",
            nombre: "Carolina Baez",
            dni: "89236723",
            estado: true
        },
        {
            nroAsiento: "15",
            nombre: "Elizabeth Mamani",
            dni: "78723211",
            estado: true
        }
    ],
    dniBuscado : undefined,
    inicio: () => {
        $('#bus').html(busMapa);
        $('.col-xl-2').click(reserva.reservarAsiento);
        $('#guardarDatos').click(reserva.guardarDatos);
        $('#mostrarLista').click(reserva.mostrarLista);
        $('#btnBuscar').click(reserva.buscarDNI);
    },
    reservarAsiento: (event) => {
        console.log(event)
        let nro = event.target.textContent;
        let clase = event.target.classList[2];
        $('#nro_Asiento').val(nro);
        if(clase != undefined){
           let asiento = reserva.pasajeros.filter((elemento,i) => {
                return elemento.nroAsiento == nro;
           });
            $('#nombreApellido').val(asiento[0].nombre);
            $('#dni').val(asiento[0].dni);
        }
    },
    guardarDatos: () => {
        if ($('#nro_Asiento').val() != "" && $('#nombreApellido').val() != "" && $('#dni').val() != "") {
            let datos = {
                nroAsiento: $('#nro_Asiento').val(),
                nombre: $('#nombreApellido').val(),
                dni: $('#dni').val(),
                estado: true
            };
            reserva.pasajeros.push(datos);
            $('#'+datos.nroAsiento).addClass('reservado');
            reserva.limpiarInputs();
        }
        
    },
    mostrarLista: () => {
        let lista = "";
        reserva.pasajeros.map((elemento) => {
           lista += `<div class='row'>\
            <div class='col-sm-2'>${elemento.nroAsiento}</div>\
            <div class='col-sm-5'>${elemento.nombre}</div>\
            <div class='col-sm-4'>${elemento.dni}</div>\
            </div>`;
        });
        $('#listaPasajeros').html(lista)
    },
    buscarDNI: () => {
        let dni = $('#buscarDni').val();
        reserva.dniBuscado = reserva.pasajeros.filter((elemento,i) => {
            return elemento.dni == dni;
        });
        if (reserva.dniBuscado.length != 0) {
            $('#listaPasajeros').html(`<div class='row'>\
            <div class='col-sm-2'>${reserva.dniBuscado[0].nroAsiento}</div>\
            <div class='col-sm-5'>${reserva.dniBuscado[0].nombre}</div>\
            <div class='col-sm-4'>${reserva.dniBuscado[0].dni}</div>\
            </div>`);
        } else {
            $('#listaPasajeros').html(`No hay Resultados`);
        }
    },
    limpiarInputs : () => {
        $('#nro_Asiento').val('')
        $('#nombreApellido').val('');
        $('#dni').val('');
    }
 }
$(document).ready(reserva.inicio);