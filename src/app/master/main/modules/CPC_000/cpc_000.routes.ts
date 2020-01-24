import { RouterModule, Routes } from "@angular/router";
import { Cpc001Component } from "./cpc001/cpc001.component";

const cpc000_Routes: Routes = [
  {
    path: "cpc_001",
    component: Cpc001Component,
    data: { titulo: "cpc_001" }
  },

  {
    path: "",
    redirectTo: "/md/cpc_000/cpc_001",
    pathMatch: "full"
  }
];

export const CPC_000_MODULES_ROUTES = RouterModule.forChild(cpc000_Routes);
