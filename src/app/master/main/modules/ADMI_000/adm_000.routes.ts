import { RouterModule, Routes } from "@angular/router";

import { Adm001Component } from "./adm001/adm001.component";
import { Adm002Component } from "./adm002/adm002.component";
import { Adm003Component } from "./adm003/adm003.component";
import { Adm004Component } from "./adm004/adm004.component";
import { Adm005Component } from "./adm005/adm005.component";
import { Adm006Component } from "./adm006/adm006.component";
import { Adm007Component } from "./adm007/adm007.component";
import { Adm008Component } from "./adm008/adm008.component";
import { Adm009Component } from "./adm009/adm009.component";
import { Adm010Component } from "./adm010/adm010.component";
import { Adm012Component } from "./adm012/adm012.component";

let adm000_Routes: Routes = [
  {
    path: "7",
    component: Adm001Component,
    data: { titulo: "adm001" },
  },
  {
    path: "112",
    component: Adm002Component,
    data: { titulo: "adm002" },
  },
  {
    path: "8",
    component: Adm003Component,
    data: { titulo: "adm003" },
  },
  {
    path: "113",
    component: Adm004Component,
    data: { titulo: "adm004" },
  },
  {
    path: "130",
    component: Adm005Component,
    data: { titulo: "adm005" },
  },
  {
    path: "131",
    component: Adm006Component,
    data: { titulo: "adm006" },
  },
  {
    path: "111",
    component: Adm007Component,
    data: { titulo: "adm007" },
  },
  {
    path: "132",
    component: Adm008Component,
    data: { titulo: "adm008" },
  },
  {
    path: "128",
    component: Adm009Component,
    data: { titulo: "adm009" },
  },
  {
    path: "114",
    component: Adm010Component,
    data: { titulo: "adm010" },
  },
  {
    path: "adm012",
    component: Adm012Component,
    data: { titulo: "adm012" },
  },
  {
    path: "",
    redirectTo: "/bienvenido",
    pathMatch: "full",
  },
];

const componentR: Routes = [
  {
    path: "",
    redirectTo: "/bienvenido",
    pathMatch: "full",
  },
];

let modulo = JSON.parse(sessionStorage.getItem("modulo")) || [];
let b: boolean = true;
for (let i = 0; i < modulo.length && b; i++) {
  const idMod: string = modulo[i].idModulo.toString();
  if (idMod === "90") {
    const compon = modulo[i].compArray || [];
    for (let j = 0; j < compon.length; j++) {
      const idComp: string = compon[j].idComponen.toString();
      const result = adm000_Routes.find((compon) => compon.path === idComp);
      if (result !== undefined) {
        result.path = compon[j].componente;
        componentR.push(result);
      }
    }
    b = false;
  }
}
setTimeout(() => {
  b = null;
  modulo = null;
  adm000_Routes = null;
}, 4000);
export const ADM_000_MODULES_ROUTES = RouterModule.forChild(componentR);
