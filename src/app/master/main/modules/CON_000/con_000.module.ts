import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { IndexAdm000Module } from "src/app/master/utils/service/main/modules/adm_000/index.adm000.module";

import { CONT_000_MODULES_ROUTES } from "./con_000.routes";
import { Cont003Component } from "./cont003/cont003.component";

@NgModule({
  declarations: [Cont003Component],
  providers: [DatePipe],
  imports: [
    CommonModule,
    CONT_000_MODULES_ROUTES,
    FormsModule,
    IndexAdm000Module
  ]
})
export class CONT00Module {}
