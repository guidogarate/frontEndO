import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { MainComponent } from "./main.component";
import { ModulesGuard } from "../utils/guard/modules.guard";

const mainRoutes: Routes = [
  {
    path: "md",
    component: MainComponent,
    canActivate: [ModulesGuard],
    loadChildren: "./modules/modules.module#ModulesModule"
  },
  {
    path: "",
    redirectTo: "/md/adm_000/adm_003",
    pathMatch: "full"
  }
];

export const MAIN_ROUTES = RouterModule.forRoot(mainRoutes, {
  preloadingStrategy: PreloadAllModules
});
