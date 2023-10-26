import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarReservasComponent } from './listar-reservas/listar-reservas.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';

@NgModule({
  declarations: [AppComponent, ListarReservasComponent, EditarReservaComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
