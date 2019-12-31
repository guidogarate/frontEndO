import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import { CargacontentComponent } from "./cargacontent/cargacontent.component";
import { CargapageComponent } from "./cargapage/cargapage.component";

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [CargacontentComponent, CargapageComponent],
  exports: [CargacontentComponent, CargapageComponent]
})
export class GlobalModule {}
