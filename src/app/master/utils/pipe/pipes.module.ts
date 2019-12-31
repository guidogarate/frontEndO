import { NgModule } from "@angular/core";
import { ImagenPipe } from "./imagen.pipe";
import { EmailPipe } from "./email.pipe";
import { NombreMes } from "./nombreMes.pipe";
import { FormatoNumeroPeriodo } from "./formatoNumeroPeriodo.pipe";
import { Estado } from "./estado.pipe";

@NgModule({
  imports: [],
  declarations: [ImagenPipe, EmailPipe,NombreMes,FormatoNumeroPeriodo, Estado],
  exports: [ImagenPipe, EmailPipe,NombreMes, FormatoNumeroPeriodo, Estado]
})
export class PipesModule {}
