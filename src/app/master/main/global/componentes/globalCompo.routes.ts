import { RouterModule, Routes } from "@angular/router";
import { ClaseDocComponent } from "./clase-doc/clase-doc.component";
import { ComponentesComponent } from "./componentes.component";

const ClaseDocdoRoutes: Routes = [
  // {
  //   path: ":modulo/117",
  //   component: ClaseDocComponent,
  //   data: { titulo: "adm011" },
  // },
  {
    path: "mod/:modulo",
    component: ComponentesComponent,
    children: [
      {
        path: "117",
        component: ClaseDocComponent,
        data: { modulo: "modulo" },
      },
    ],
  },
];
console.log(ClaseDocdoRoutes);
export const CLASE_DOC_ROUTES = RouterModule.forChild(ClaseDocdoRoutes);
