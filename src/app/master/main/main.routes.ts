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
    path: "bienvenido",
    component: MainComponent,
    canActivate: [ModulesGuard],
    loadChildren: "./bienvenido/bienvenido.module#BienvenidoModule"
  }
];

export const MAIN_ROUTES = RouterModule.forRoot(mainRoutes, {
  preloadingStrategy: PreloadAllModules
});
