import { RouterModule, Routes } from "@angular/router";
import { Caj001Component } from "./caj001/caj001.component";

const caj000_Routes: Routes = [
  {
    path: "caj_001",
    component: Caj001Component,
    data: { titulo: "caj_001" }
  },
  {
    path: "",
    redirectTo: "/md/caj_000/caj_001",
    pathMatch: "full"
  }
];

export const CAJ_000_MODULES_ROUTES = RouterModule.forChild(caj000_Routes);
