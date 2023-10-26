import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarReservasComponent } from './pages/listar-reservas/listar-reservas.component';
import { EditarReservaComponent } from './pages/editar-reserva/editar-reserva.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar-reservas', component: ListarReservasComponent },
      { path: 'editar-reserva/:id', component: EditarReservaComponent },
      { path: '', redirectTo: 'listar-reservas', pathMatch: 'full' },
      { path: '**', redirectTo: 'listar-reservas', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaRoutingModule {}
