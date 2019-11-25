import { RouterModule, Routes } from "@angular/router";
import { Adm001Component } from "./adm001/adm001.component";

const adm000_Routes: Routes = [
  {
    path: "adm_001",
    component: Adm001Component,
    data: { titulo: "perfil" }
  }
];

export const ADM_000_MODULES_ROUTES = RouterModule.forChild(adm000_Routes);
