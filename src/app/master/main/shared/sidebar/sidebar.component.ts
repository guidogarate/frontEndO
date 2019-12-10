import { Component, OnInit } from "@angular/core";

import { SidebarService } from "src/app/master/utils/service/main/shared/index.shared.service";

import { NotyGlobal } from "src/app/master/utils/global/index.global";

import { SocketService } from "src/app/master/utils/service/socket/socket.service";

// declare function init_plugins();
// declare function init_scroll();
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  datos: any;
  favoritos: any;
  cargandoMenu = true;
  datosUser: any = JSON.parse(sessionStorage.getItem("datos_user"));
  imagen: string;
  nombre: string;
  email: string;

  constructor(
    private sidebarS: SidebarService,
    public wsService: SocketService,
    private notyG: NotyGlobal
  ) {
    if (this.datosUser === null) {
      return;
    }
    this.imagen = this.datosUser.adusfoto;
    this.nombre = this.datosUser.adusnomb;
    this.email = this.datosUser.adusemai;
    this.cargarMenuFavo();
  }

  ngOnInit() {
    // init_scroll();
    // setTimeout(() => {
    //   init_plugins();
    // }, 3000);
  }

  cargarMenuFavo() {
    this.sidebarS.cargarMenuFavo().subscribe(resp => {
      if (resp["ok"]) {
        this.datos = resp["menu"];
        this.favoritos = resp["favoritos"];
        this.cargandoMenu = false;
      } else {
        console.log("NO SE CARGARON LOS DATOS MENU FAVORITOS");
      }
    });
  }

  cargarFto() {
    this.sidebarS.CargarFavoritos().subscribe(resp => {
      if (resp["ok"]) {
        this.favoritos = resp["favoritos"];
      } else {
        console.log("no se cargaron los datos");
      }
    });
  }

  agregarFavorito(id: number) {
    this.sidebarS.agregarFavorito(id).subscribe(resp => {
      if (resp["ok"]) {
        this.cargarFto();
        this.notyG.noty("info", resp["mensaje"], 2000);
      } else {
        this.notyG.noty("error", resp["error"], 2000);
      }
    });
  }

  eliminarFavorito(id: number) {
    this.sidebarS.eliminarFavorito(id).subscribe(resp => {
      if (resp["ok"]) {
        this.cargarFto();
        this.notyG.noty("info", resp["mensaje"], 2000);
      } else {
        this.notyG.noty("error", resp["error"], 2000);
      }
    });
  }
}
