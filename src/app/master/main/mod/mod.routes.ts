import { RouterModule, Routes } from "@angular/router";
import { ModComponent } from "./mod.component";

const BienvenidoRoutes: Routes = [
  {
    path: "",
    component: ModComponent,
  },
];
export const MOD_ROUTES = RouterModule.forChild(BienvenidoRoutes);
