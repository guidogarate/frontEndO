import { RouterModule, Routes } from "@angular/router";
import { Vps001Component } from "./vps001/vps001.component";

const vps000_Routes: Routes = [
  {
    path: "vps_001",
    component: Vps001Component,
    data: { titulo: "vps_001" }
  },
  {
    path: "",
    redirectTo: "/md/vps_000/vps_001",
    pathMatch: "full"
  }
];

export const VPS_000_MODULES_ROUTES = RouterModule.forChild(vps000_Routes);
