import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./master/login/login.component";
import { NopagefoundComponent } from "./master/nopagefound/nopagefound.component";

import { MainComponent } from "./master/main/main.component";

const appRoutes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  { path: "login", component: LoginComponent },
  { path: "**", component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {
  useHash: true
});
