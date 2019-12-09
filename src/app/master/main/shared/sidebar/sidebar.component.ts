import { Component, OnInit } from "@angular/core";

import { SidebarService } from "src/app/master/utils/service/main/shared/index.shared.service";

import * as Noty from "src/assets/global_assets/js/plugins/notifications/noty.min.js";
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
    public wsService: SocketService
  ) {
    if (this.datosUser === null) {
      return;
    }
    this.imagen = this.datosUser.adusfoto;
    this.nombre = this.datosUser.adusnomb;
    this.email = this.datosUser.adusemai;
    this.cargarMenu();
    this.cargarFto();
  }

  ngOnInit() {
    // init_scroll();
    // setTimeout(() => {
    //   init_plugins();
    // }, 3000);
  }

  cargarMenu() {
    this.sidebarS.CargarMenu().subscribe(resp => {
      if (resp["ok"]) {
        this.datos = resp["menu"];
        this.cargandoMenu = false;
      } else {
        console.log("no se cargaron los datos");
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
      console.log(resp);
      if (resp["ok"]) {
        this.cargarFto();
        new Noty({
          text: resp["mensaje"],
          theme: "limitless",
          progressBar: true,
          timeout: 2000,
          type: "info",
          layout: "bottomRight",
          closeWith: ["button"]
        }).show();
      } else {
        new Noty({
          text: resp["error"],
          theme: "limitless",
          progressBar: true,
          timeout: 2000,
          type: "error",
          layout: "bottomRight",
          closeWith: ["button"]
        }).show();
      }
    });
  }

  eliminarFavorito(id: number) {
    this.sidebarS.eliminarFavorito(id).subscribe(resp => {
      console.log(resp);
      if (resp["ok"]) {
        this.cargarFto();
        new Noty({
          text: resp["mensaje"],
          theme: "limitless",
          progressBar: true,
          timeout: 2000,
          type: "info",
          layout: "bottomRight",
          closeWith: ["button"]
        }).show();
      } else {
        new Noty({
          text: resp["error"],
          theme: "limitless",
          progressBar: true,
          timeout: 2000,
          type: "error",
          layout: "bottomRight",
          closeWith: ["button"]
        }).show();
      }
    });
  }
}
