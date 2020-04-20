import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/master/utils/service/login/login.service";
import url from "src/app/master/config/url.config";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private loginS: LoginService) {}

  ngOnInit() {}
  salir() {
    this.loginS.logout().subscribe((resp) => {
      location.reload(true);
      // window.open(url.salir, "_self");
      // window.location.href = url.salir;
    });
  }

  IrDashboard() {
    window.location.href = url.principal;
  }
}
