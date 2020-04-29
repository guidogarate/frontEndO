import { RouterModule, Route } from "@angular/router";
import { ModulesComponent } from "./modules.component";

const mainRoutes: Route[] = [
  {
    path: "10",
    component: ModulesComponent,
    loadChildren: () =>
      import("./MANT_000/mant_000.module").then((mod) => mod.MANT00Module),
  },
  {
    path: "20",
    component: ModulesComponent,
    loadChildren: () =>
      import("./TRAN_000/tran_000.module").then((mod) => mod.TRAN00Module),
  },
  {
    path: "30",
    component: ModulesComponent,
    loadChildren: () =>
      import("./REPO_000/repo_000.module").then((mod) => mod.REPO00Module),
  },
  {
    path: "40",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CON_000/con_000.module").then((mod) => mod.CONT00Module),
  },
  {
    path: "90",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ADM_000/adm_000.module").then((mod) => mod.ADM00Module),
  },
];

const menu = JSON.parse(sessionStorage.getItem("menu")) || [];
const menuR: Route[] = [
  {
    path: "",
    redirectTo: "/bienvenido",
    pathMatch: "full",
  },
];
for (let index = 0; index < menu.length; index++) {
  const primerNiv: string = menu[index].id_primernivel.toString();
  const result = mainRoutes.find((compon) => compon.path === primerNiv);
  if (result !== undefined) {
    result.path = menu[index].componente;
    menuR.push(result);
  }
}
// console.log(menuR);
// console.log(mainRoutes);

export const MODULES_ROUTES = RouterModule.forChild(mainRoutes);
