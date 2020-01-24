import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { CDI_000_MODULES_ROUTES } from "./cdi_000.routes";
import { Cdi001Component } from './cdi001/cdi001.component';

@NgModule({
  declarations: [Cdi001Component],
  providers: [],
  imports: [CommonModule, CDI_000_MODULES_ROUTES, FormsModule]
})
export class CDI00Module {}
