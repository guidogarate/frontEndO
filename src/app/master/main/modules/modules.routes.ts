import { RouterModule, Routes } from "@angular/router";
import { ModulesComponent } from "./modules.component";

const componente = [
  {
    // path: "90",
    path: "Mod-Administracion",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ADM_000/adm_000.module").then(mod => mod.ADM00Module)
  },
  {
    // path: "90",
    path: "mod-cont",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CON_000/con_000.module").then(mod => mod.CONT00Module)
  },
  {
    path: "11",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ABA_000/aba_000.module").then(mod => mod.ABA00Module)
  },
  {
    path: "12",
    // path: "INVENTARIO",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CDI_000/cdi_000.module").then(mod => mod.CDI00Module)
  },
  {
    path: "13",
    component: ModulesComponent,
    loadChildren: () =>
      import("./VPS_000/vps_000.module").then(mod => mod.VPS00Module)
  },
  {
    path: "15",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CPC_000/cpc_000.module").then(mod => mod.CPC00Module)
  },
  {
    path: "16",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CPP_000/cpp_000.module").then(mod => mod.CPP00Module)
  },
  {
    path: "17",
    component: ModulesComponent,
    loadChildren: () =>
      import("./CAJ_000/caj_000.module").then(mod => mod.CAJ00Module)
  },
  {
    path: "18",
    component: ModulesComponent,
    loadChildren: () =>
      import("./TES_000/tes_000.module").then(mod => mod.TES00Module)
  },
  {
    path: "19",
    component: ModulesComponent,
    loadChildren: () =>
      import("./IMP_000/imp_000.module").then(mod => mod.IMP00Module)
  },
  {
    path: "25",
    component: ModulesComponent,
    loadChildren: () =>
      import("./RRH_000/rrh_000.module").then(mod => mod.RRH00Module)
  },
  {
    path: "28",
    component: ModulesComponent,
    loadChildren: () =>
      import("./ACF_000/acf_000.module").then(mod => mod.ACF00Module)
  }
];

// const menu = JSON.parse(sessionStorage.getItem("menu"));
// const menuR: Routes = [];
// for (let index = 0; index < menu.length; index++) {
//   const result = componente.find(compon => compon.path === menu[index].id);
//   if (result !== undefined) {
//     result.path = menu[index].ruta;
//     menuR.push(result);
//   }
// }
export const MODULES_ROUTES = RouterModule.forChild(componente);

// export const MODULES_ROUTES = RouterModule.forChild(url.menu);
