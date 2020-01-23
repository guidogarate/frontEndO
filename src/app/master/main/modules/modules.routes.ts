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

let menu = JSON.parse(sessionStorage.getItem("menu"));
const menuR: Routes = [];

if (menu === null) {
  menuR.push({
    path: "90",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ADM_000/adm_000.module").then(mod => mod.ADM00Module)
  });
  setTimeout(() => {
    menu = JSON.parse(sessionStorage.getItem("menu"));
    console.log(menu);
    for (let index = 0; index < menu.length; index++) {
      const result = componente.find(compon => compon.path === menu[index].id);
      if (result !== undefined) {
        // PARA PRUEBA AQUI COLOCAR  path: "91",
        menuR.push(result);
      }
    }
  }, 3000);
} else {
  for (let index = 0; index < menu.length; index++) {
    const result = componente.find(compon => compon.path === menu[index].id);
    if (result !== undefined) {
      menuR.push(result);
    }
  }
}

export const MODULES_ROUTES = RouterModule.forChild(menuR);
