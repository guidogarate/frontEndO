// import { RouterModule, Routes } from "@angular/router";

// import { ModulesComponent } from "./modules.component";

// const componente = [];
// componente.push({
//   path: "90",
//   modulo: ModulesComponent,
//   loadChildren: "./ADM_000/adm_000.module#ADM00Module"
// });
// componente.push({
//   path: "10",
//   modulo: ModulesComponent,
//   loadChildren: "./ADM_000/adm_000.module#ADM00Module"
// });

// const menu = JSON.parse(sessionStorage.getItem("menu"));
// console.log(menu);

// const menuR: Routes = [];

// for (let index = 0; index < menu.length; index++) {
//   const result = componente.find(compon => compon.path === menu[index].id);
//   if (result !== undefined) {
//     result.path = menu[index].ruta;
//     menuR.push(result);
//   }
// }
// menuR.push({
//   path: "",
//   redirectTo: "/md/adm_000/adm_003",
//   pathMatch: "full"
// });
// export const MODULES_ROUTES = RouterModule.forChild(menuR);
import { RouterModule, Routes } from "@angular/router";
import { ModulesComponent } from "./modules.component";

const menu = JSON.parse(sessionStorage.getItem("menu"));

const componente = [];
componente.push({
  path: "90",
  modulo: ModulesComponent,
  loadChildren: "./ADM_000/adm_000.module#ADM00Module"
});
componente.push({
  path: "10",
  modulo: ModulesComponent,
  loadChildren: "./ADM_000/adm_000.module#ADM00Module"
});

const menuR: Routes = [];

for (let index = 0; index < menu.length; index++) {
  const result = componente.find(compon => compon.path === menu[index].id);
  let dato = { path: "" };
  const datos = new Promise(resolve => {
    dato = componente.find(compon => compon.path === menu[index].id);
    setTimeout(() => {
      resolve();
    }, 20000);
  });
  // console.log(dato.path);
  console.log(result);
  if (dato !== undefined) {
    result.path = menu[index].ruta;
    console.log(result);
    menuR.push(result);
  }
}
console.log(menuR);
const modulesRoutes: Routes = [
  {
    path: "adm_000",
    component: ModulesComponent,
    loadChildren: "./ADM_000/adm_000.module#ADM00Module"
  }
];

export const MODULES_ROUTES = RouterModule.forChild(menuR);
