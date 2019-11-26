import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/master/utils/service/login/login.service";
import url from "src/app/master/config/url.config";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private loginS: LoginService, public router: Router) {}

  ngOnInit() {}
  salir() {
    this.loginS.logout().subscribe(resp => {
      // this.router.navigate(["/login"]);
      window.location.href = "#/login";
    });
  }

  buscar( termino:string ){
    // console.log(termino);
    this.router.navigate( ['/buscar',termino] );
  }
  
}
