import { NgModule } from "@angular/core";

import { MAIN_ROUTES } from "./main.routes";
import { SharedModule } from "./shared/shared.module";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";

@NgModule({
  declarations: [MainComponent],
  exports: [],
  providers: [],
  imports: [CommonModule, SharedModule, FormsModule, MAIN_ROUTES]
})
export class MainModule {}
