import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable()
export class SettingService {
  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/blue-dark.css",
    tema: "blue"
  };
  constructor(@Inject(DOCUMENT) private document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    sessionStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    const ajuste = sessionStorage.getItem("ajustes");
    if (ajuste) {
      this.ajustes = JSON.parse(ajuste);
      this.aplicarTema(this.ajustes.tema);
    } else {
      // console.log("usando valores por defecto");
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(color: string) {
    const url = `assets/css/colors/${color}.css`;
    this.document.getElementById("theme").setAttribute("href", url);
    this.ajustes.tema = color;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
