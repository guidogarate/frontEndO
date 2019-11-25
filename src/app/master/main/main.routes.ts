import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { MainComponent } from "./main.component";

const mainRoutes: Routes = [
  {
    path: "md",
    component: MainComponent,
    loadChildren: "./modules/modules.module#ModulesModule"
  },
  {
    path: "",
    redirectTo: "/md/adm_000/adm_001",
    pathMatch: "full"
  }
];

export const MAIN_ROUTES = RouterModule.forRoot(mainRoutes, {
  preloadingStrategy: PreloadAllModules
});
