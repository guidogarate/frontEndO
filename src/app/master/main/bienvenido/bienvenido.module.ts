import { NgModule } from "@angular/core";

import { BIENVENIDO_ROUTES } from "./bienvenido.routes";

import { GlobalModule } from "../global/global.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { BienvenidoComponent } from "./bienvenido.component";

@NgModule({
  declarations: [BienvenidoComponent],
  exports: [],
  providers: [],
  imports: [CommonModule, FormsModule, GlobalModule, BIENVENIDO_ROUTES]
})
export class BienvenidoModule {}
