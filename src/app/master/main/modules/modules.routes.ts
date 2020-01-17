import { RouterModule, Routes } from "@angular/router";

import { ModulesComponent } from "./modules.component";

// const menu = JSON.parse(sessionStorage.getItem("menu"));

// const menuR: any = [];
// let adminRuta = "";
// for (let index = 0; index < menu.length; index++) {
//   // const element = array[index];
//   menuR[index] = menu[index].titulo;
// }
// adminRuta = menuR[0];
// console.log(adminRuta);

const modulesRoutes: Routes = [
  {
    path: "adm_000",
    // path: adminRuta,
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
