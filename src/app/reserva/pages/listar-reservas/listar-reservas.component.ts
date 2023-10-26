import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../../models/reserva.model';
import { ReservaService } from '../../../reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css'],
})
export class ListarReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  nuevaReserva: Reserva = {
    id: -1,
    nombre: '',
    apellidos: '',
    email: '',
    tipoCliente: '',
    fechaLlegada: new Date(),
    fechaSalida: new Date(),
  };

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservas = this.reservaService.getReservas();
  }
  agregarReserva(): void {
    Swal.fire({
      title: 'Agregar Nueva Reserva',
      html:
        '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
        '<input id="apellidos" class="swal2-input" placeholder="Apellidos">' +
        '<input id="email" class="swal2-input" placeholder="Email">' +
        '<select id="tipoCliente" class="swal2-input">' +
        '  <option value="VIP">VIP</option>' +
        '  <option value="Socio">Socio</option>' +
        '  <option value="No Socio">No Socio</option>' +
        '</select>' +
        '<input id="fechaLlegada" class="swal2-input" placeholder="Fecha de Llegada" type="date">' +
        '<input id="fechaSalida" class="swal2-input" placeholder="Fecha de Salida" type="date">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (<HTMLInputElement>document.getElementById('nombre'))
          .value;
        const apellidos = (<HTMLInputElement>(
          document.getElementById('apellidos')
        )).value;
        const email = (<HTMLInputElement>document.getElementById('email'))
          .value;
        const tipoCliente = (<HTMLSelectElement>(
          document.getElementById('tipoCliente')
        )).value;
        const fechaLlegada = (<HTMLInputElement>(
          document.getElementById('fechaLlegada')
        )).value;
        const fechaSalida = (<HTMLInputElement>(
          document.getElementById('fechaSalida')
        )).value;

        if (
          !nombre ||
          !apellidos ||
          !email ||
          !tipoCliente ||
          !fechaLlegada ||
          !fechaSalida
        ) {
          Swal.showValidationMessage('Por favor, completa todos los campos');
        }

        return {
          nombre,
          apellidos,
          email,
          tipoCliente,
          fechaLlegada,
          fechaSalida,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevaReserva: Reserva = result.value;
        this.reservaService.addReserva(nuevaReserva);

        this.reservas = this.reservaService.getReservas();
      }
    });
  }
  listarReservas() {
    console.log(this.reservas);
  }
  guardarReserva() {
    if (
      this.nuevaReserva.nombre === '' ||
      this.nuevaReserva.apellidos === '' ||
      this.nuevaReserva.email === '' ||
      this.nuevaReserva.tipoCliente === ''
    ) {
    } else {
      this.reservaService.addReserva(this.nuevaReserva);
      this.reservas.push(this.nuevaReserva);
      this.nuevaReserva = {
        id: -1,
        nombre: '',
        apellidos: '',
        email: '',
        tipoCliente: '',
        fechaLlegada: new Date(),
        fechaSalida: new Date(),
      };
    }
  }

  eliminarReserva(index: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.deleteReserva(index);

        this.reservas = this.reservaService.getReservas();
      }
    });
  }
  vaciarReservas(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará todas las reservas y no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar reservas',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.vaciarReservas();

        this.reservas = [];
      }
    });
  }
}
