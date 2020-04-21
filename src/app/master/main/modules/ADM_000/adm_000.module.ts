import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { IndexAdm000Module } from "src/app/master/utils/service/main/modules/adm_000/index.adm000.module";

import { ADM_000_MODULES_ROUTES } from "./adm_000.routes";

import { Adm000Component } from "./adm000/adm000.component";
import { Adm001Component } from "./adm001/adm001.component";
import { Adm002Component } from "./adm002/adm002.component";
import { Adm003Component } from "./adm003/adm003.component";
import { Adm004Component } from "./adm004/adm004.component";
import { Adm005Component } from "./adm005/adm005.component";
import { Adm006Component } from "./adm006/adm006.component";
import { Adm007Component } from "./adm007/adm007.component";
import { Adm008Component } from "./adm008/adm008.component";
import { Adm010Component } from "./adm010/adm010.component";

import { PipesModule } from "../../../utils/pipe/pipes.module";
import { Adm009Component } from "./adm009/adm009.component";
import { Adm011Component } from "./adm011/adm011.component";
import { Adm012Component } from "./adm012/adm012.component";
console.log("modules adm");

@NgModule({
  declarations: [
    Adm000Component,
    Adm001Component,
    Adm002Component,
    Adm003Component,
    Adm004Component,
    Adm005Component,
    Adm006Component,
    Adm007Component,
    Adm008Component,
    Adm009Component,
    Adm010Component,
    Adm011Component,
    Adm012Component,
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    ADM_000_MODULES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    IndexAdm000Module,
    PipesModule,
  ],
})
export class ADM00Module {}
