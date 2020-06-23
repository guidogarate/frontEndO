import { RouterModule, Routes } from "@angular/router";
import { ClaseDocComponent } from "./clase-doc/clase-doc.component";
import { ComponentesComponent } from "./componentes.component";

let ClaseDocdoRoutes: Routes = [
  {
    path: "117",
    component: ClaseDocComponent,
    data: { titulo: "adm011" },
  },
  // {
  //   path: "",
  //   component: ComponentesComponent,
  //   children: [
  //     {
  //       path: "117",
  //       component: ClaseDocComponent,
  //       data: { modulo: "modulo" },
  //     },
  //   ],
  // },
];

const glbR: Routes = [
  {
    path: "",
    redirectTo: "/bienvenido",
    pathMatch: "full",
  },
];

let modulo = JSON.parse(sessionStorage.getItem("modulo")) || [];
let b: boolean = true;
for (let i = 0; i < modulo.length && b; i++) {
  const compon = modulo[i].compArray || [];
  for (let j = 0; j < compon.length; j++) {
    const idComp: string = compon[j].idComponen.toString();
    const result = ClaseDocdoRoutes.find((compon) => compon.path === idComp);
    if (result !== undefined) {
      result.path = compon[j].componente;
      glbR.push(result);
    }
  }
  b = false;
}
// console.log(glbR);
setTimeout(() => {
  ClaseDocdoRoutes = null;
  modulo = null;
}, 3500);
export const CLASE_DOC_ROUTES = RouterModule.forChild(glbR);