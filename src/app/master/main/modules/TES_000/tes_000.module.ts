import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { TES_000_MODULES_ROUTES } from "./tes_000.routes";
import { Tes001Component } from './tes001/tes001.component';

@NgModule({
  declarations: [Tes001Component],
  providers: [],
  imports: [CommonModule, TES_000_MODULES_ROUTES, FormsModule]
})
export class TES00Module {}
