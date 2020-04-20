import { RouterModule, Route } from "@angular/router";
import { MainComponent } from "./main.component";
console.log("main routes");

const mainRoutes: Route[] = [
  {
    path: "90",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/ADM_000/adm_000.module").then((mod) => mod.ADM00Module),
  },
  {
    path: "10",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/CON_000/con_000.module").then(
        (mod) => mod.CONT00Module
      ),
  },
  {
    path: "30",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/ABA_000/aba_000.module").then((mod) => mod.ABA00Module),
  },
  {
    path: "55",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/CDI_000/cdi_000.module").then((mod) => mod.CDI00Module),
  },
  {
    path: "13",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/VPS_000/vps_000.module").then((mod) => mod.VPS00Module),
  },
  {
    path: "15",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/CPC_000/cpc_000.module").then((mod) => mod.CPC00Module),
  },
  {
    path: "16",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/CPP_000/cpp_000.module").then((mod) => mod.CPP00Module),
  },
  {
    path: "17",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/CAJ_000/caj_000.module").then((mod) => mod.CAJ00Module),
  },
  {
    path: "18",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/TES_000/tes_000.module").then((mod) => mod.TES00Module),
  },
  {
    path: "19",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/IMP_000/imp_000.module").then((mod) => mod.IMP00Module),
  },
  {
    path: "25",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/RRH_000/rrh_000.module").then((mod) => mod.RRH00Module),
  },
  {
    path: "28",
    component: MainComponent,
    loadChildren: () =>
      import("./modules/ACF_000/acf_000.module").then((mod) => mod.ACF00Module),
  },
];

const menu = JSON.parse(sessionStorage.getItem("menu_principal")) || [];
const menuR: Route[] = [
  {
    path: "bienvenido",
    component: MainComponent,
    loadChildren: () =>
      import("./bienvenido/bienvenido.module").then(
        (mod) => mod.BienvenidoModule
      ),
  },
  {
    path: "",
    redirectTo: "/mod/bienvenido",
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
console.log(menuR);

export const MAIN_ROUTES = RouterModule.forChild(menuR);
