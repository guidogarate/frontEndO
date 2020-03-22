import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import { CargacontentComponent } from "./cargacontent/cargacontent.component";
import { CargapageComponent } from "./cargapage/cargapage.component";
import { ModaladvertComponent } from "./modaladvert/modaladvert.component";

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [
    CargacontentComponent,
    CargapageComponent,
    ModaladvertComponent
  ],
  exports: [CargacontentComponent, CargapageComponent, ModaladvertComponent]
})
export class GlobalModule {}
