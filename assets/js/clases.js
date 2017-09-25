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
        return lista
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
}

let dibujarBus = new vistaHTML(40, 4);
dibujarBus.configurarBTN();
//dibujarBus.busHTML(); //imprime bus y asientos
//let reservaAsiento = new Reserva(mapabus)





/*
    class  reserva {
    
    dniBuscado: undefined,
    inicio: () => {
        $('#bus').html(busMapa);
        reserva.colorearAsientos();
        $('.col-xl-2').click(reserva.reservarAsiento);
        $('#guardarDatos').click(reserva.guardarDatos);
        $('#mostrarLista').click(reserva.mostrarLista);
        $('#btnBuscar').click(reserva.buscarDNI);
        $('#eliminarReserva').click(reserva.eliminarReserva);
    },
    reservarAsiento: (event) => {
        let nro = event.target.textContent;
        let clase = event.target.classList[2];
        $('#nro_Asiento').val(nro);
        if (clase != undefined) {
            let asiento = reserva.pasajeros.filter((elemento, i) => {
                return elemento.nroAsiento == nro;
            });
            $('#nombreApellido').val(asiento[0].nombre);
            $('#dni').val(asiento[0].dni);
        }
    },
    guardarDatos: () => {
        let clase = $('#' + $('#nro_Asiento').val())[0].classList[2];
        console.log(clase)
        if ($('#nro_Asiento').val() != "" && $('#nombreApellido').val() != "" && $('#dni').val() != "" && clase != 'reservado') {
            let datos = {
                nroAsiento: $('#nro_Asiento').val(),
                nombre: $('#nombreApellido').val(),
                dni: $('#dni').val(),
                estado: true
            };
            $('#alerta').html(`<div class="alert alert-success" role="alert">Guardado con Exito!!</div>`)
            reserva.pasajeros.push(datos);
            reserva.colorearAsientos();
            reserva.limpiarInputs();
        }
        if (clase == 'reservado') {
            $('#alerta').html(`<div class="alert alert-danger" role="alert">Eliminar Reserva para Agregar</div>`)
        }

    },
    mostrarLista: () => {
        let lista = "";
        reserva.pasajeros.map((elemento) => {
            lista += `<div class='row'>\
            <div class='col col-xl-2 col-sm-2'>${elemento.nroAsiento}</div>\
            <div class='col col-xl-5 col-sm-5'>${elemento.nombre}</div>\
            <div class='col col-xl-2 col-sm-2'>${elemento.dni}</div>\
            </div>`;
        });
        $('#listaPasajeros').html(lista)
    },
    buscarDNI: () => {
        let dni = $('#buscarDni').val();
        reserva.dniBuscado = reserva.pasajeros.filter((elemento, i) => {
            return elemento.dni == dni;
        });
        if (reserva.dniBuscado.length != 0) {
            $('#listaPasajeros').html(`<div class='row'>\
            <div class='col col-xl-2 col-sm-2 '>${reserva.dniBuscado[0].nroAsiento}</div>\
            <div class='col col-xl-5 col-sm-5'>${reserva.dniBuscado[0].nombre}</div>\
            <div class='col col-xl-2 col-sm-3'>${reserva.dniBuscado[0].dni}</div>\
            </div>`);
        } else {
            $('#listaPasajeros').html(`No hay Resultados`);
        }
    },
    eliminarReserva: () => {
        let nro = $('#nro_Asiento').val();
        let indice;
        reserva.pasajeros.map((elemento, i) => {
            return (nro == elemento.nroAsiento) ? indice = i : '';
        });
        //console.log(indice);
        $('#' + reserva.pasajeros[indice].nroAsiento).removeClass('reservado')
        reserva.pasajeros.splice(indice, 1);
        reserva.colorearAsientos();
        reserva.limpiarInputs();

    },
    limpiarInputs: () => {
        $('#nro_Asiento').val('')
        $('#nombreApellido').val('');
        $('#dni').val('');
    },
    colorearAsientos: () => {
        reserva.pasajeros.map((elemento, i) => {
            return $('#' + elemento.nroAsiento).addClass('reservado');
        });
    }
}
*/
/*
new Pasajeros("39", "Maritza Fernandes", "89898998");
new Pasajeros("3", "Carolina Baez", "89823398");
console.log(MapaBus);
console.log(Pasajeros);
console.log(new Pasajeros("15", "Elizabeth Mamani", "12121298"));*/