import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ABA_000_MODULES_ROUTES } from "./aba_000.routes";
import { Aba001Component } from "./aba001/aba001.component";

@NgModule({
  declarations: [Aba001Component],
  providers: [],
  imports: [CommonModule, ABA_000_MODULES_ROUTES, FormsModule]
})
export class ABA00Module {}
