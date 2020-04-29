import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { TRAN_000_MODULES_ROUTES } from "./tran_000.routes";
import { Tran000Component } from "./tran000/tran000.component";

@NgModule({
  declarations: [Tran000Component],
  providers: [],
  imports: [CommonModule, TRAN_000_MODULES_ROUTES, FormsModule],
})
export class TRAN00Module {}
