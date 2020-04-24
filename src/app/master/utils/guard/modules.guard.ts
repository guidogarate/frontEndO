import { Injectable } from "@angular/core";
import { CanActivate, Router, CanLoad } from "@angular/router";
import { LoginService } from "../service/login/login.service";

@Injectable({
  providedIn: "root",
})
export class ModulesGuard implements CanActivate, CanLoad {
  constructor(public usuarioService: LoginService, public router: Router) {}

  canActivate() {
    if (this.usuarioService.estaAutenticado()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
  canLoad() {
    if (this.usuarioService.estaAutenticado()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
