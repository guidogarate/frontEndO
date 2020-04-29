import { RouterModule, Routes } from "@angular/router";
import { Mant001Component } from "./mant001/mant001.component";

const mant000_Routes: Routes = [
  {
    path: "",
    component: Mant001Component,
    data: { titulo: "10" },
  },
];

export const MANT_000_MODULES_ROUTES = RouterModule.forChild(mant000_Routes);
