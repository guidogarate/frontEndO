import { RouterModule, Routes } from "@angular/router";
import { Tran000Component } from "./tran000/tran000.component";

const tran000_Routes: Routes = [
  {
    path: "",
    component: Tran000Component,
    data: { titulo: "20" },
  },
];

export const TRAN_000_MODULES_ROUTES = RouterModule.forChild(tran000_Routes);
