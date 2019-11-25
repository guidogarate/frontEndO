import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../utils/service/login/login.service";
import url from "../config/url.config";
declare function init_plugins();
declare function init_scroll();
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  estaAutenticado = false;
  constructor(/* private loginS: LoginService, private router: Router */) {
    // if (!this.loginS.estaAutenticado()) {
    //   // this.router.navigateByUrl(url.salir);
    //   window.location.href = url.salir;
    //   return;
    // }
    // this.estaAutenticado = true;
  }

  ngOnInit() {
    init_scroll();
    setTimeout(() => {
      init_plugins();
    }, 3000);
  }
}
