import { RouterModule, Route } from "@angular/router";
import { ModulesComponent } from "./modules.component";

const mainRoutes: Route[] = [
  {
    path: "90",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ADM_000/adm_000.module").then((mod) => mod.ADM00Module),
  },
  {
    path: "10",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CON_000/con_000.module").then((mod) => mod.CONT00Module),
  },
  {
    path: "11",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ABA_000/aba_000.module").then((mod) => mod.ABA00Module),
  },
  {
    path: "55",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CDI_000/cdi_000.module").then((mod) => mod.CDI00Module),
  },
  {
    path: "13",
    component: ModulesComponent,
    loadChildren: () =>
      import("./VPS_000/vps_000.module").then((mod) => mod.VPS00Module),
  },
  {
    path: "15",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CPC_000/cpc_000.module").then((mod) => mod.CPC00Module),
  },
  {
    path: "16",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CPP_000/cpp_000.module").then((mod) => mod.CPP00Module),
  },
  {
    path: "17",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CAJ_000/caj_000.module").then((mod) => mod.CAJ00Module),
  },
  {
    path: "18",
    component: ModulesComponent,
    loadChildren: () =>
      import("./TES_000/tes_000.module").then((mod) => mod.TES00Module),
  },
  {
    path: "19",
    component: ModulesComponent,
    loadChildren: () =>
      import("./IMP_000/imp_000.module").then((mod) => mod.IMP00Module),
  },
  {
    path: "25",
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRH_000/rrh_000.module").then((mod) => mod.RRH00Module),
  },
  {
    path: "28",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ACF_000/acf_000.module").then((mod) => mod.ACF00Module),
  },
];

const menu = JSON.parse(sessionStorage.getItem("menu2")) || [];
const menuR: Route[] = [
  {
    path: "",
    redirectTo: "/bienvenido",
    pathMatch: "full",
  },
];
for (let index = 0; index < menu.length; index++) {
  const primerNiv: string = menu[index].id;
  const result = mainRoutes.find((compon) => compon.path === primerNiv);
  if (result !== undefined) {
    result.path = menu[index].ruta;
    menuR.push(result);
  }
}
// console.log(menuR);

export const MODULES_ROUTES = RouterModule.forChild(menuR);
