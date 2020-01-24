import { RouterModule, Routes } from "@angular/router";
import { Rrh001Component } from "./rrh001/rrh001.component";

const rrh000_Routes: Routes = [
  {
    path: "rrh_001",
    component: Rrh001Component,
    data: { titulo: "rrh_001" }
  },
  {
    path: "",
    redirectTo: "/md/rrh_000/rrh_001",
    pathMatch: "full"
  }
];

export const RRH_000_MODULES_ROUTES = RouterModule.forChild(rrh000_Routes);
