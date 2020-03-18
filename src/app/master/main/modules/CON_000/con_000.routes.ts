import { RouterModule, Routes } from "@angular/router";
import { Cont003Component } from "./cont003/cont003.component";
import { Cont004Component } from "./cont004/cont004.component";

const cont000_Routes: Routes = [
  {
    path: "cont003",
    component: Cont003Component,
    data: { titulo: "cont003" }
  },
  {
    path: "cont004",
    component: Cont004Component,
    data: { titulo: "cont004" }
  }
];

export const CONT_000_MODULES_ROUTES = RouterModule.forChild(cont000_Routes);
