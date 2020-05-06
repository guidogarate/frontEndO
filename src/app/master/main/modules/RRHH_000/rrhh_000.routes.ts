import { RouterModule, Routes } from "@angular/router";
import { Rrhh001Component } from "./rrhh001/rrhh001.component";

const rrhh000_Routes: Routes = [
  {
    path: "",
    component: Rrhh001Component,
    data: { titulo: "10" },
  },
];

export const RRHH_000_MODULES_ROUTES = RouterModule.forChild(rrhh000_Routes);
