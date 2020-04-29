import { NgModule } from "@angular/core";

import { MOD_ROUTES } from "./mod.routes";

import { GlobalModule } from "../global/global.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ModComponent } from "./mod.component";

@NgModule({
  declarations: [ModComponent],
  exports: [],
  providers: [],
  imports: [CommonModule, FormsModule, GlobalModule, MOD_ROUTES],
})
export class ModModule {}
