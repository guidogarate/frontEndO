import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { MANT_000_MODULES_ROUTES } from "./mant_000.routes";
import { Mant001Component } from "./mant001/mant001.component";

@NgModule({
  declarations: [Mant001Component],
  providers: [],
  imports: [CommonModule, MANT_000_MODULES_ROUTES, FormsModule],
})
export class MANT00Module {}
