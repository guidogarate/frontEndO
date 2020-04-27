import { RouterModule, Routes } from "@angular/router";
import { Repo000Component } from "./repo000/repo000.component";

const repo000_Routes: Routes = [
  {
    path: "",
    component: Repo000Component,
    data: { titulo: "30" },
  },
];

export const REPO_000_MODULES_ROUTES = RouterModule.forChild(repo000_Routes);
