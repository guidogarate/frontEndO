import { NgModule } from "@angular/core";

import { BIENVENIDO_ROUTES } from "./bienvenido.routes";

import { GlobalElemModule } from "../global/elementos/globalEleme.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { BienvenidoComponent } from "./bienvenido.component";

@NgModule({
  declarations: [BienvenidoComponent],
  exports: [],
  providers: [],
  imports: [CommonModule, FormsModule, GlobalElemModule, BIENVENIDO_ROUTES],
})
export class BienvenidoModule {}
