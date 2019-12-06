import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { PipesModule } from "../../utils/pipe/pipes.module";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

import { IndexSharedModule } from "../../utils/service/main/shared/index.shared.module";
import { ControlComponent } from "./control/control.component";

@NgModule({
  imports: [RouterModule, CommonModule, IndexSharedModule, PipesModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ControlComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ControlComponent
  ]
})
export class SharedModule {}
