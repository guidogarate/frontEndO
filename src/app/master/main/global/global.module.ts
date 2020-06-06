import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IndexAdm000Module } from "src/app/master/utils/service/main/modules/adm_000/index.adm000.module";
import { PipesModule } from "src/app/master/utils/pipe/pipes.module";

import { RouterModule } from "@angular/router";
import { CargacontentComponent } from "./cargacontent/cargacontent.component";
import { CargapageComponent } from "./cargapage/cargapage.component";
import { ModaladvertComponent } from "./modaladvert/modaladvert.component";
import { ClaseDocComponent } from "./clase-doc/clase-doc.component";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IndexAdm000Module,
    PipesModule,
  ],
  declarations: [
    CargacontentComponent,
    CargapageComponent,
    ModaladvertComponent,
    ClaseDocComponent,
  ],
  exports: [
    CargacontentComponent,
    CargapageComponent,
    ModaladvertComponent,
    ClaseDocComponent,
  ],
})
export class GlobalModule {}
