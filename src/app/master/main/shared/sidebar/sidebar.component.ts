import { Component, OnInit } from "@angular/core";

import { SidebarService } from "src/app/master/utils/service/main/shared/index.shared.service";

import * as Noty from "noty";

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
  datosUser: any = JSON.parse(localStorage.getItem("datos_user"));
  imagen: string;
  nombre: string;
  email: string;

  constructor(private sidebarS: SidebarService) {
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
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "info",
          layout: "bottomRight"
        }).show();
      } else {
        new Noty({
          text: resp["error"],
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "error",
          layout: "bottomRight"
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
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "info",
          layout: "bottomRight"
        }).show();
      } else {
        new Noty({
          text: resp["error"],
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "error",
          layout: "bottomRight"
        }).show();
      }
    });
  }
}
