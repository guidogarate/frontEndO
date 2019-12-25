import { RouterModule, Routes } from "@angular/router";
import { Adm001Component } from "./adm001/adm001.component";
import { Adm002Component } from "./adm002/adm002.component";
import { Adm003Component } from "./adm003/adm003.component";

const adm000_Routes: Routes = [
  {
    path: "adm_001",
    component: Adm001Component,
    data: { titulo: "perfil" }
  },
  {
    path: "adm_002",
    component: Adm002Component,
    data: { titulo: "fechadia" }
  },
  {
    path: "adm_003",
    component: Adm003Component,
    data: { titulo: "fechadia" }
  }
];

export const ADM_000_MODULES_ROUTES = RouterModule.forChild(adm000_Routes);
