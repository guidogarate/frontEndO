import { RouterModule, Routes } from "@angular/router";

import { ModulesComponent } from "./modules.component";

const modulesRoutes: Routes = [
  {
    path: "adm_000",
    component: ModulesComponent,
    loadChildren: "./ADM_000/adm_000.module#ADM00Module"
  }
  // {
  //   path: "gestion-comercio",
  //   component: ModulesComponent,
  //   loadChildren:
  //     "./gest-privilegio/gest-privilegio.module#GestionPrivilegioModule"
  // }
];

export const MODULES_ROUTES = RouterModule.forChild(modulesRoutes);
