import { RouterModule, Routes } from "@angular/router";
import { Imp001Component } from "./imp001/imp001.component";

const imp000_Routes: Routes = [
  {
    path: "imp_001",
    component: Imp001Component,
    data: { titulo: "imp_001" }
  },
  {
    path: "",
    redirectTo: "/md/imp_000/imp_001",
    pathMatch: "full"
  }
];

export const IMP_000_MODULES_ROUTES = RouterModule.forChild(imp000_Routes);
