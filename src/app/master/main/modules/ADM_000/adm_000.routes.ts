import { RouterModule, Routes } from "@angular/router";
import { Adm001Component } from "./adm001/adm001.component";
import { Adm002Component } from "./adm002/adm002.component";
import { Adm003Component } from "./adm003/adm003.component";
import { Adm004Component } from "./adm004/adm004.component";

// const menu = JSON.parse(sessionStorage.getItem("datos_user"));
// console.log(menu);
// console.log(menu.ok);
// console.log("cargando ruta");

const adm000_Routes: Routes = [
  {
    path: "adm_001",
    component: Adm001Component,
    data: { titulo: "adm_001" }
  },
  {
    path: "adm_002",
    component: Adm002Component,
    data: { titulo: "adm_002" }
  },
  {
    path: "adm_003",
    component: Adm003Component,
    data: { titulo: "adm_003" }
  },
  {
    path: "adm_003/editar",
    component: Adm003Component,
    data: { titulo: "adm_003" }
  },
  {
    path: "adm_003/agregar",
    component: Adm003Component,
    data: { titulo: "adm_003" }
  },
  {
    path: "adm_004",
    component: Adm004Component,
    data: { titulo: "adm_004" }
  }
];

export const ADM_000_MODULES_ROUTES = RouterModule.forChild(adm000_Routes);
