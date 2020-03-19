import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { MainComponent } from "./main.component";
import { ModulesGuard } from "../utils/guard/modules.guard";

const mainRoutes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [ModulesGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/modules.module").then(m => m.ModulesModule)
      },
      {
        path: "bienvenido",
        loadChildren: () =>
          import("./bienvenido/bienvenido.module").then(m => m.BienvenidoModule)
      }
    ]
  }
];

export const MAIN_ROUTES = RouterModule.forRoot(mainRoutes);

// export const MAIN_ROUTES = RouterModule.forRoot(mainRoutes, {
//   preloadingStrategy: PreloadAllModules
// });
