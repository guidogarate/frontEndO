import { RouterModule, Routes } from "@angular/router";
import { ModulesComponent } from "./modules.component";

const componente = [
  {
    path: "90",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ADM_000/adm_000.module").then(mod => mod.ADM00Module)
  },
  {
    path: "91",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ADM_000/adm_000.module").then(mod => mod.ADM00Module)
  }
];

const menu = JSON.parse(sessionStorage.getItem("menu"));
const menuR: Routes = [];
if (menu === null) {
  // PONER PATH EN BIENVENIDO O PONER UN MENSAJE DE ALERTA
  menuR.push({
    path: "90",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ADM_000/adm_000.module").then(mod => mod.ADM00Module)
  });
} else {
  for (let index = 0; index < menu.length; index++) {
    const result = componente.find(compon => compon.path === menu[index].id);
    if (result !== undefined) {
      result.path = menu[index].ruta;
      menuR.push(result);
    }
  }
}
export const MODULES_ROUTES = RouterModule.forChild(menuR);
