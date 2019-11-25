import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ADM_000_MODULES_ROUTES } from "./adm_000.routes";
import { Adm001Component } from "./adm001/adm001.component";

@NgModule({
  declarations: [Adm001Component],
  providers: [],
  imports: [CommonModule, ADM_000_MODULES_ROUTES, FormsModule]
})
export class ADM00Module {}
