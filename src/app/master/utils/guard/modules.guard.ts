import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../service/login/login.service";

@Injectable()
export class ModulesGuard implements CanActivate {
  constructor(public usuarioService: LoginService, public router: Router) {}

  canActivate() {
    if (this.usuarioService.estaAutenticado()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
