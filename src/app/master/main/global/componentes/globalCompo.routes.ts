import { RouterModule, Routes } from "@angular/router";
import { ClaseDocComponent } from "./clase-doc/clase-doc.component";
import { ComponentesComponent } from "./componentes.component";

const ClaseDocdoRoutes: Routes = [
  {
    path: "clase",
    component: ClaseDocComponent,
  },
  // {
  //   path: "",
  //   component: ComponentesComponent,
  //   children: [
  //     {
  //       path: "clase",
  //       component: ClaseDocComponent,
  //     },
  //   ],
  // },
];
console.log(ClaseDocdoRoutes);
export const CLASE_DOC_ROUTES = RouterModule.forChild(ClaseDocdoRoutes);
