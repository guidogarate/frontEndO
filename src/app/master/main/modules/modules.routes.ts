import { RouterModule, Route } from "@angular/router";
import { ModulesComponent } from "./modules.component";

const mainRoutes: Route[] = [
  {
    path: "10", // MODULO CONTABILIDAD
    component: ModulesComponent,
    loadChildren: () =>
      import("./CONT_000/con_000.module").then((mod) => mod.CONT00Module),
  },
  {
    path: "15", // MODULO ADQUISICIONES
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "17", // MODULO INVENTARIO
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "19", // MODULO FACTURACION
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "22", // MODULO TESORERIA
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "24", // MODULO CARTERA
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "26", // MODULO OBLIGACIONES
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "30", // MODULO SERVICIOS
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "35", // MODULO IMPUESTOS
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "40", // MODULO RECURSOS HUMANOS
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "45", // MODULO BIENES DE USO
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "48", // MODULO SOCIOS
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRHH_000/rrhh_000.module").then((mod) => mod.RRHH00Module),
  },
  {
    path: "90", // MODULO ADMINISTRACION
    component: ModulesComponent,
    loadChildren: () =>
      import("./ADMI_000/adm_000.module").then((mod) => mod.ADM00Module),
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
