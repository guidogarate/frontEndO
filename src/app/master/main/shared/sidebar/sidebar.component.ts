import { Component } from "@angular/core";
import { SocketService } from "src/app/master/utils/service/socket/socket.service";
import { Router } from "@angular/router";
import { ComunicacionService } from "src/app/master/utils/service/comunicacion/comunicacion.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  menuPrin: any;
  cargandoMenu = true;
  datosUser: any = JSON.parse(sessionStorage.getItem("datos_user"));
  favoritos: any = JSON.parse(sessionStorage.getItem("favoritos"));
  imagen: string;
  nombre: string;
  email: string;

  constructor(
    public wsService: SocketService,
    public router: Router,
    public comunicacionService: ComunicacionService
  ) {
    if (this.datosUser === null) {
      return;
    }
    this.imagen = this.datosUser.adusfoto;
    this.nombre = this.datosUser.adusnomb;
    this.email = this.datosUser.adusemai;
    this.cargarMenuFavo();
  }

  cargarMenuFavo() {
    const menu: string = sessionStorage.getItem("menu");
    if (menu) {
      this.menuPrin = JSON.parse(menu);
      this.cargandoMenu = false;
    }
  }

  menuComponent(ruta: string) {
    this.comunicacionService.cambiarNivel(ruta);
    this.router.navigate(["/modulo", ruta]);
  }
}
