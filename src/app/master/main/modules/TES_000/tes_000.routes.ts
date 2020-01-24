import { RouterModule, Routes } from "@angular/router";
import { Tes001Component } from "./tes001/tes001.component";

const tes000_Routes: Routes = [
  {
    path: "tes_001",
    component: Tes001Component,
    data: { titulo: "tes_001" }
  },
  {
    path: "",
    redirectTo: "/md/tes_000/tes_001",
    pathMatch: "full"
  }
];

export const TES_000_MODULES_ROUTES = RouterModule.forChild(tes000_Routes);
