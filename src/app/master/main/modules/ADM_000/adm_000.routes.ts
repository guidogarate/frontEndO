import { RouterModule, Routes } from "@angular/router";

import { Adm001Component } from "./adm001/adm001.component";
import { Adm002Component } from "./adm002/adm002.component";
import { Adm003Component } from "./adm003/adm003.component";
import { Adm004Component } from "./adm004/adm004.component";
import { Adm005Component } from "./adm005/adm005.component";
import { Adm006Component } from "./adm006/adm006.component";
import { Adm007Component } from "./adm007/adm007.component";
import { Adm008Component } from "./adm008/adm008.component";
import { Adm010Component } from "./adm010/adm010.component";
import { Adm009Component } from "./adm009/adm009.component";
import { Adm011Component } from "./adm011/adm011.component";

// console.log(window.location);
// console.log(window.location.href);
// console.log(window.location.search);

const adm000_Routes: Routes = [
  {
    path: "adm001",
    component: Adm001Component,
    data: { titulo: "adm001" }
  },
  {
    path: "adm002",
    component: Adm002Component,
    data: { titulo: "adm002" }
  },
  {
    path: "adm003",
    component: Adm003Component,
    data: { titulo: "adm003" }
  },
  {
    path: "adm004",
    component: Adm004Component,
    data: { titulo: "adm004" }
  },
  { path: "adm005", component: Adm005Component, data: { titulo: "adm005" } },
  {
    path: "adm006",
    component: Adm006Component,
    data: { titulo: "adm006" }
  },
  {
    path: "adm007",
    component: Adm007Component,
    data: { titulo: "adm007" }
  },
  {
    path: "adm008",
    component: Adm008Component,
    data: { titulo: "adm008" }
  },
  {
    path: "adm009",
    component: Adm009Component,
    data: { titulo: "adm009" }
  },
  {
    path: "adm010",
    component: Adm010Component,
    data: { titulo: "adm010" }
  },
  {
    path: "adm011",
    component: Adm011Component,
    data: { titulo: "adm011" }
  },
  {
    path: "",
    redirectTo: "/md/adm_000/adm_003",
    pathMatch: "full"
  }
];

export const ADM_000_MODULES_ROUTES = RouterModule.forChild(adm000_Routes);
