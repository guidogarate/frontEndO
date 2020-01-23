import { RouterModule, Routes } from "@angular/router";

import { BienvenidoComponent } from "./bienvenido.component";

const BienvenidoRoutes: Routes = [
  {
    path: "",
    component: BienvenidoComponent
  }
];

export const BIENVENIDO_ROUTES = RouterModule.forChild(BienvenidoRoutes);
