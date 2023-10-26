import { Injectable } from '@angular/core';
import { Reserva } from './models/reserva.model';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private reservas: Reserva[] = [];

  constructor() {
    const storedReservas = localStorage.getItem('reservas');
    if (storedReservas) {
      this.reservas = JSON.parse(storedReservas);
    }
  }

  getReservas(): Reserva[] {
    return this.reservas;
  }

  getReserva(index: number): Reserva {
    return this.reservas[index];
  }

  addReserva(reserva: Reserva): void {
    this.reservas.push(reserva);
    this.saveReservasToLocalStorage();
  }

  updateReserva(index: number, reserva: Reserva): void {
    this.reservas[index] = reserva;
    this.saveReservasToLocalStorage();
  }

  deleteReserva(index: number): void {
    this.reservas.splice(index, 1);
    this.saveReservasToLocalStorage();
  }
  vaciarReservas(): void {
    this.reservas = [];
    this.saveReservasToLocalStorage();
  }

  private saveReservasToLocalStorage(): void {
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }
}
