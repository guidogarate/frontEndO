import { NgModule } from "@angular/core";
import { ImagenPipe } from "./imagen.pipe";
import { EmailPipe } from "./email.pipe";
import { NombreMes } from "./nombreMes.pipe";
import { FormatoNumeroPeriodo } from "./formatoNumeroPeriodo.pipe";
import { Estado } from "./estado.pipe";
import { EstadoPeriodo } from "./estadoPeriodo.pipe";

@NgModule({
  imports: [],
  declarations: [ImagenPipe, EmailPipe,NombreMes,FormatoNumeroPeriodo, Estado, EstadoPeriodo],
  exports: [ImagenPipe, EmailPipe,NombreMes, FormatoNumeroPeriodo, Estado , EstadoPeriodo]
})
export class PipesModule {}
