import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { RRH_000_MODULES_ROUTES } from "./rrh_000.routes";
import { Rrh001Component } from './rrh001/rrh001.component';

@NgModule({
  declarations: [Rrh001Component],
  providers: [],
  imports: [CommonModule, RRH_000_MODULES_ROUTES, FormsModule]
})
export class RRH00Module {}
