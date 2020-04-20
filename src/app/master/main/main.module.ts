import { NgModule } from "@angular/core";

import { MAIN_ROUTES } from "./main.routes";
import { SharedModule } from "./shared/shared.module";

import { PipesModule } from "../utils/pipe/pipes.module";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { GlobalModule } from "./global/global.module";

@NgModule({
  declarations: [MainComponent],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MAIN_ROUTES,
    PipesModule,
    GlobalModule,
  ],
})
export class MainModule {}
