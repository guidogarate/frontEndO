import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./master/login/login.component";
import { NopagefoundComponent } from "./master/nopagefound/nopagefound.component";

import { ModulesGuard } from "src/app/master/utils/guard/modules.guard";

const appRoutes: Routes = [
  {
    path: "mod",
    canLoad: [ModulesGuard],
    loadChildren: () =>
      import("src/app/master/main/main.module").then((mod) => mod.MainModule),
  },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "mod", pathMatch: "full" },
  { path: "**", component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
