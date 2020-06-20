import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PipesModule } from "src/app/master/utils/pipe/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IndexAdm000Module } from "src/app/master/utils/service/main/modules/adm_000/index.adm000.module";
import { CLASE_DOC_ROUTES } from "./globalCompo.routes";
import { ComponentesComponent } from "./componentes.component";
import { ClaseDocComponent } from "./clase-doc/clase-doc.component";

@NgModule({
  declarations: [ComponentesComponent, ClaseDocComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IndexAdm000Module,
    PipesModule,
    CLASE_DOC_ROUTES,
  ],
  exports: [],
})
export class ClaseDocCompoModule {}
