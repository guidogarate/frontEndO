import { RouterModule, Routes } from "@angular/router";
import { Aba001Component } from "./aba001/aba001.component";

const aba000_Routes: Routes = [
  {
    path: "aba_001",
    component: Aba001Component,
    data: { titulo: "adm_001" }
  },
  {
    path: "",
    redirectTo: "/md/aba_000/aba_003",
    pathMatch: "full"
  }
];

export const ABA_000_MODULES_ROUTES = RouterModule.forChild(aba000_Routes);
