import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { MainComponent } from "./main.component";
import { ModulesGuard } from "../utils/guard/modules.guard";

const mainRoutes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "mod",
        canLoad: [ModulesGuard],
        loadChildren: () =>
          import("./modules/modules.module").then((m) => m.ModulesModule),
      },
      {
        path: "bienvenido",
        canActivate: [ModulesGuard],
        loadChildren: () =>
          import("./bienvenido/bienvenido.module").then(
            (m) => m.BienvenidoModule
          ),
      },
      { path: "", redirectTo: "/mod", pathMatch: "full" },
    ],
  },
];

export const MAIN_ROUTES = RouterModule.forRoot(mainRoutes);

// export const MAIN_ROUTES = RouterModule.forRoot(mainRoutes, {
//   preloadingStrategy: PreloadAllModules
// });
