import { RouterModule, Routes } from "@angular/router";
import { Acf001Component } from "./acf001/acf001.component";

const acf000_Routes: Routes = [
  {
    path: "acf_001",
    component: Acf001Component,
    data: { titulo: "acf_001" }
  },
  {
    path: "",
    redirectTo: "/md/acf_000/acf_001",
    pathMatch: "full"
  }
];

export const ACF_000_MODULES_ROUTES = RouterModule.forChild(acf000_Routes);
