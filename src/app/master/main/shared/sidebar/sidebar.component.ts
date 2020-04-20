import { Component } from "@angular/core";
import { SocketService } from "src/app/master/utils/service/socket/socket.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  menuPrin: any;
  cargandoMenu = true;
  datosUser: any = JSON.parse(sessionStorage.getItem("datos_user"));
  imagen: string;
  nombre: string;
  email: string;

  constructor(public wsService: SocketService, public router: Router) {
    if (this.datosUser === null) {
      return;
    }
    this.imagen = this.datosUser.adusfoto;
    this.nombre = this.datosUser.adusnomb;
    this.email = this.datosUser.adusemai;
    this.cargarMenuFavo();
  }

  cargarMenuFavo() {
    const menu: string = sessionStorage.getItem("menu_principal");
    if (menu) {
      this.menuPrin = JSON.parse(menu);
      this.cargandoMenu = false;
    }
  }

  menuComponent(menu: string) {
    console.log(menu);
    // this.router.navigate(["/mod", "90"]);
  }
}
