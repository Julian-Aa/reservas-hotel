import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ListarReservasComponent } from './pages/listar-reservas/listar-reservas.component';
import { EditarReservaComponent } from './pages/editar-reserva/editar-reserva.component';

@NgModule({
  declarations: [ListarReservasComponent, EditarReservaComponent],
  imports: [CommonModule, ReservaRoutingModule, FormsModule],
})
export class ReservaModule {}
