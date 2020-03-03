import { RouterModule, Routes } from "@angular/router";
import { Cont003Component } from "./cont003/cont003.component";

const cont000_Routes: Routes = [
  {
    path: "cont003",
    component: Cont003Component,
    data: { titulo: "adm001" }
  }
];

export const CONT_000_MODULES_ROUTES = RouterModule.forChild(cont000_Routes);
