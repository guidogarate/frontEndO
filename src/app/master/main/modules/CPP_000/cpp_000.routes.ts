import { RouterModule, Routes } from "@angular/router";
import { Cpp001Component } from "./cpp001/cpp001.component";

const cpp000_Routes: Routes = [
  {
    path: "cpp_001",
    component: Cpp001Component,
    data: { titulo: "cpp_001" }
  },

  {
    path: "",
    redirectTo: "/md/cpp_000/cpp_001",
    pathMatch: "full"
  }
];

export const CPP_000_MODULES_ROUTES = RouterModule.forChild(cpp000_Routes);
