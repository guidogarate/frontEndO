import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { IndexCont000Module } from "src/app/master/utils/service/main/modules/cont_000/index.adm000.module";
import { PipesModule } from "src/app/master/utils/pipe/pipes.module";

import { CONT_000_MODULES_ROUTES } from "./con_000.routes";
import { Cont003Component } from "./cont003/cont003.component";
import { GlobalModule } from "src/app/master/main/global/global.module";

@NgModule({
  declarations: [Cont003Component],
  providers: [DatePipe],
  imports: [
    CommonModule,
    CONT_000_MODULES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    IndexCont000Module,
    PipesModule,
    GlobalModule
  ]
})
export class CONT00Module {}
