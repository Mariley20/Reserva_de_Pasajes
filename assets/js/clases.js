'use strict'
class Pasajero {
    constructor(nroAsiento, nombre, dni) {
        this.nroAsiento = nroAsiento;
        this.nombre = nombre;
        this.dni = dni;
    }
}
class Reserva {
    constructor() {
        this.pasajeros = [{
                nroAsiento: "39",
                nombre: "Maritza Fernandes",
                dni: "89898998"
            },
            {
                nroAsiento: "3",
                nombre: "Carolina Baez",
                dni: "89236723"
            },
            {
                nroAsiento: "15",
                nombre: "Elizabeth Mamani",
                dni: "78723211"
            }
        ];

    }
    guardarAsiento(nro_Asiento, nombre, dni) {
        this.pasajeros.push(new Pasajero(nro_Asiento, nombre, dni));
        console.log(this.pasajeros);
    }
    listarPasajeros() {
        let lista = "";
        this.pasajeros.map((elemento) => {
            lista += `<div class='row'>\
            <div class='col col-xl-2 col-sm-2'>${elemento.nroAsiento}</div>\
            <div class='col col-xl-5 col-sm-5'>${elemento.nombre}</div>\
            <div class='col col-xl-2 col-sm-2'>${elemento.dni}</div>\
            </div>`;
        });
        return lista;
    }
    buscar(dni) {
        let dniHTML;
        let dniBuscado = this.pasajeros.filter((elemento, i) => {
            return elemento.dni == dni;
        });
        if (dniBuscado.length != 0) {
            dniHTML = `<div class='row'>\
            <div class='col col-xl-2 col-sm-2 '>${dniBuscado[0].nroAsiento}</div>\
            <div class='col col-xl-5 col-sm-5'>${dniBuscado[0].nombre}</div>\
            <div class='col col-xl-2 col-sm-2'>${dniBuscado[0].dni}</div>\
            </div>`;
        } else {
            dniHTML = `No hay Resultados`;
        }
        return dniHTML;
    }
    eliminar(nro) {
        if (nro != '') {
            let indice;
            this.pasajeros.map((elemento, i) => {
                return (nro == elemento.nroAsiento) ? indice = i : '';
            });
            //console.log(indice);
            $('#' + this.pasajeros[indice].nroAsiento).removeClass('reservado')
            this.pasajeros.splice(indice, 1);
        } else {
            console.log('nada para eliminar')
        }
    }

}
class vistaHTML {
    constructor(cantidadAsientos, columnas) {
        this.cantidadAsiento = cantidadAsientos;
        this.columnas = columnas;
        this.reserva = new Reserva();
        this.busHTML = () => {
            this.filas = this.cantidadAsiento / columnas;
            let asientosHTML = "",
                numeroDeAsiento = 1;
            for (let i = 1; i <= this.filas; i++) {
                asientosHTML += `<div class='row' id='fila${i}'>`;

                for (let j = 0; j < this.columnas; j++) {
                    asientosHTML += `<div class='col col-xl-2' id='${numeroDeAsiento}'>${numeroDeAsiento}</div>`;
                    numeroDeAsiento += 1;
                    (j == 1) ? asientosHTML += "<div class='col col-xl-1'></div>": asientosHTML += "";

                }
                asientosHTML += "</div>";

            }
            return asientosHTML;
            //return $('#bus').html(asientosHTML);
        };
    }
    configurarBTN() {
        $('#bus').html(this.busHTML());
        this.colorearAsientos();
        $('.col-xl-2').click((event) => this.seleccionaAsiento(event));
        $('#guardarDatos').click((event) => this.guardarDatos(event));
        $('#mostrarLista').click((event) => this.mostrarLista(event));
        $('#btnBuscar').click((event) => this.buscarDNI(event));
        $('#eliminarReserva').click((event) => this.eliminarReserva(event));

    }
    seleccionaAsiento(event) {
        let nro = event.target.textContent;
        let clase = event.target.classList[2];
        $('#nro_Asiento').val(nro);
        if (clase != undefined) {
            let asiento = this.reserva.pasajeros.filter((elemento, i) => {
                return elemento.nroAsiento == nro;
            });
            $('#nombreApellido').val(asiento[0].nombre);
            $('#dni').val(asiento[0].dni);
        }
    }
    guardarDatos() {
        let clase = $('#' + $('#nro_Asiento').val())[0].classList[2];
        if ($('#nro_Asiento').val() != "" && $('#nombreApellido').val() != "" && $('#dni').val() != "" && clase != 'reservado') {
            $('#alerta').html(`<div class="alert alert-success" role="alert">Guardado con Exito!!</div>`);
            this.reserva.guardarAsiento($('#nro_Asiento').val(), $('#nombreApellido').val(), $('#dni').val())
            this.colorearAsientos();
            this.limpiarInputs();
        }
        if (clase == 'reservado') {
            $('#alerta').html(`<div class="alert alert-danger" role="alert">Eliminar Reserva para Agregar</div>`)
        }
    }
    mostrarLista() {
        $('#listaPasajeros').html(this.reserva.listarPasajeros())
    }
    buscarDNI() {
        $('#listaPasajeros').html((this.reserva.buscar($('#buscarDni').val())));
    }
    limpiarInputs() {
        $('#nro_Asiento').val('')
        $('#nombreApellido').val('');
        $('#dni').val('');
    }
    colorearAsientos() {
        this.reserva.pasajeros.map((elemento, i) => {
            return $('#' + elemento.nroAsiento).addClass('reservado');
        });
    }
    eliminarReserva() {
        this.reserva.eliminar($('#nro_Asiento').val());
        console.log(this.reserva.pasajeros)
        this.colorearAsientos();
        this.limpiarInputs();
    }
}

let dibujarBus = new vistaHTML(40, 4);
dibujarBus.configurarBTN();