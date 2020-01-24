import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { IMP_000_MODULES_ROUTES } from "./imp_000.routes";
import { Imp001Component } from './imp001/imp001.component';

@NgModule({
  declarations: [Imp001Component],
  providers: [],
  imports: [CommonModule, IMP_000_MODULES_ROUTES, FormsModule]
})
export class IMP00Module {}
