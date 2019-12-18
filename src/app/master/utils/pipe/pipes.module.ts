import { NgModule } from "@angular/core";
import { ImagenPipe } from "./imagen.pipe";
import { EmailPipe } from "./email.pipe";
import { NombreMes } from "./nombreMes.pipe";
import { FormatoNumeroPeriodo } from "./formatoNumeroPeriodo.pipe";

@NgModule({
  imports: [],
  declarations: [ImagenPipe, EmailPipe,NombreMes,FormatoNumeroPeriodo],
  exports: [ImagenPipe, EmailPipe,NombreMes, FormatoNumeroPeriodo]
})
export class PipesModule {}
