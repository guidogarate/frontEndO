import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { CPC_000_MODULES_ROUTES } from "./cpc_000.routes";
import { Cpc001Component } from './cpc001/cpc001.component';

@NgModule({
  declarations: [Cpc001Component],
  providers: [],
  imports: [CommonModule, CPC_000_MODULES_ROUTES, FormsModule]
})
export class CPC00Module {}
