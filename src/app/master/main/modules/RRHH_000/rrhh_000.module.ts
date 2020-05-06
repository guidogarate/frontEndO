import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { RRHH_000_MODULES_ROUTES } from "./rrhh_000.routes";
import { Rrhh001Component } from "./rrhh001/rrhh001.component";

@NgModule({
  declarations: [Rrhh001Component],
  providers: [],
  imports: [CommonModule, RRHH_000_MODULES_ROUTES, FormsModule],
})
export class RRHH00Module {}
