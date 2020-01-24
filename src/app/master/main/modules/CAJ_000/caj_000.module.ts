import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { CAJ_000_MODULES_ROUTES } from "./caj_000.routes";
import { Caj001Component } from './caj001/caj001.component';

@NgModule({
  declarations: [Caj001Component],
  providers: [],
  imports: [CommonModule, CAJ_000_MODULES_ROUTES, FormsModule]
})
export class CAJ00Module {}
