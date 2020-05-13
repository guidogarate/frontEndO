import { RouterModule, Routes } from "@angular/router";

import { Cont002Component } from "./cont002/cont002.component";
import { Cont003Component } from "./cont003/cont003.component";
import { Cont004Component } from "./cont004/cont004.component";
import { Cont005Component } from "./cont005/cont005.component";

const cont000_Routes: Routes = [
  {
    path: "con002",
    component: Cont002Component,
    data: { titulo: "cont002" },
  },
  {
    path: "con003",
    component: Cont003Component,
    data: { titulo: "cont003" },
  },
  {
    path: "con004",
    component: Cont004Component,
    data: { titulo: "cont004" },
  },
  {
    path: "con005",
    component: Cont005Component,
    data: { titulo: "cont005" },
  },
  {
    path: "",
    redirectTo: "/bienvenido",
    pathMatch: "full",
  },
];

export const CONT_000_MODULES_ROUTES = RouterModule.forChild(cont000_Routes);
