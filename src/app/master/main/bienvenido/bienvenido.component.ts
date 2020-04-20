import { Component } from "@angular/core";

@Component({
  selector: "app-bienvenido",
  templateUrl: "./bienvenido.component.html",
  styleUrls: ["./bienvenido.component.css"],
})
export class BienvenidoComponent {
  favoritos = [];

  constructor() {
    const favoritos: string = sessionStorage.getItem("favoritos");
    this.favoritos = JSON.parse(favoritos);
  }
}
