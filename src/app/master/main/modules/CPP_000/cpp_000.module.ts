import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { CPP_000_MODULES_ROUTES } from "./cpp_000.routes";
import { Cpp001Component } from './cpp001/cpp001.component';

@NgModule({
  declarations: [Cpp001Component],
  providers: [],
  imports: [CommonModule, CPP_000_MODULES_ROUTES, FormsModule]
})
export class CPP00Module {}
