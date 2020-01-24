import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { VPS_000_MODULES_ROUTES } from "./vps_000.routes";
import { Vps001Component } from './vps001/vps001.component';

@NgModule({
  declarations: [Vps001Component],
  providers: [],
  imports: [CommonModule, VPS_000_MODULES_ROUTES, FormsModule]
})
export class VPS00Module {}
