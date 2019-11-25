import { NgModule } from "@angular/core";

import { MODULES_ROUTES } from "./modules.routes";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ModulesComponent } from "./modules.component";

@NgModule({
  declarations: [ModulesComponent],
  exports: [],
  providers: [],
  imports: [CommonModule, FormsModule, MODULES_ROUTES]
})
export class ModulesModule {}
