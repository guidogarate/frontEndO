import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ACF_000_MODULES_ROUTES } from "./acf_000.routes";
import { Acf001Component } from './acf001/acf001.component';

@NgModule({
  declarations: [Acf001Component],
  providers: [],
  imports: [CommonModule, ACF_000_MODULES_ROUTES, FormsModule]
})
export class ACF00Module {}
