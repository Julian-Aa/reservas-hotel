import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { Reserva } from '../models/reserva.model';
import { ReservaService } from '../reserva.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css'],
})
export class EditarReservaComponent implements OnInit {
  @Input() reserva: Reserva = {
    id: 0,
    nombre: '',
    apellidos: '',
    email: '',
    tipoCliente: '',
    fechaLlegada: new Date(),
    fechaSalida: new Date(),
  };
  @Output() guardarCambios = new EventEmitter<Reserva>();
  constructor(
    private router: Router,
    private reservaService: ReservaService,
    private route: ActivatedRoute
  ) {}
  id!: number;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('ID obtenido de la URL:', this.id);
    });
  }

  guardarReserva(): void {
    if (this.validarReserva(this.reserva)) {
      this.reservaService.updateReserva(this.id, this.reserva);
      this.guardarCambios.emit();
      this.mostrarNotificacion('Cambios guardados correctamente', 'success');
      this.router.navigate(['listar-reservas']);
    } else {
      this.mostrarNotificacion(
        'Por favor, complete todos los campos.',
        'error'
      );
    }
  }

  cancelarEdicion(): void {
    this.mostrarNotificacion('Edición cancelada', 'info');
  }

  private validarReserva(reserva: Reserva): boolean {
    return (
      !!reserva.nombre &&
      !!reserva.apellidos &&
      !!reserva.email &&
      !!reserva.tipoCliente &&
      !!reserva.fechaLlegada &&
      !!reserva.fechaSalida
    );
  }

  private mostrarNotificacion(
    mensaje: string,
    tipo: 'success' | 'error' | 'info'
  ): void {
    Swal.fire({
      text: mensaje,
      icon: tipo,
      timer: 2000,
    });
  }
}
