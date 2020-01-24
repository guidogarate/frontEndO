import { RouterModule, Routes } from "@angular/router";
import { Cdi001Component } from "./cdi001/cdi001.component";

const cdi000_Routes: Routes = [
  {
    path: "cdi_001",
    component: Cdi001Component,
    data: { titulo: "cdi_001" }
  },

  {
    path: "",
    redirectTo: "/md/cdi_000/cdi_003",
    pathMatch: "full"
  }
];

export const CDI_000_MODULES_ROUTES = RouterModule.forChild(cdi000_Routes);
