import { RouterModule, Routes } from "@angular/router";

import { ModulesComponent } from "./modules.component";

const componente = [];
componente.push({
  path: "90",
  modulo: ModulesComponent,
  loadChildren: "./ADM_000/adm_000.module#ADM00Module"
});
componente.push({
  path: "10",
  modulo: ModulesComponent,
  loadChildren: "./ADM_000/adm_000.module#ADM00Module"
});

const menu = JSON.parse(sessionStorage.getItem("menu"));
const menuR: Routes = [];

for (let index = 0; index < menu.length; index++) {
  const result = componente.find(compon => compon.path === menu[index].id);
  if (result !== undefined) {
    result.path = menu[index].ruta;
    menuR.push(result);
  }
}
menuR.push({
  path: "",
  redirectTo: "/md/adm_000/adm_003",
  pathMatch: "full"
});
const modulesRoutes: Routes = [
  {
    path: "adm_000",
    component: componente[0].modulo,
    loadChildren: "./ADM_000/adm_000.module#ADM00Module"
  },
  {
    path: "",
    redirectTo: "/md/adm_000/adm_003",
    pathMatch: "full"
  }
  // {
  //   path: "gestion-comercio",
  //   component: ModulesComponent,
  //   loadChildren:
  //     "./gest-privilegio/gest-privilegio.module#GestionPrivilegioModule"
  // }
];

export const MODULES_ROUTES = RouterModule.forChild(menuR);
