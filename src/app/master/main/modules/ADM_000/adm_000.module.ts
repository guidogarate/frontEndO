import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { IndexAdm000Module } from "src/app/master/utils/service/main/modules/adm_000/index.adm000.module";

import { ADM_000_MODULES_ROUTES } from "./adm_000.routes";

import { Adm001Component } from "./adm001/adm001.component";
import { Adm002Component } from "./adm002/adm002.component";
import { Adm001Service } from "../../../utils/service/ADM-001/Adm001.service";
import { Adm002Service } from "../../../utils/service/ADM-002/Adm002.service";
import { Adm003Component } from "./adm003/adm003.component";

@NgModule({
  declarations: [Adm001Component, Adm002Component, Adm003Component],
  providers: [Adm001Service, DatePipe, Adm002Service],
  imports: [
    CommonModule,
    ADM_000_MODULES_ROUTES,
    FormsModule,
    IndexAdm000Module
  ]
})
export class ADM00Module {}
