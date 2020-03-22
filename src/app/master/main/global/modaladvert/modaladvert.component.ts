import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-modaladvert",
  templateUrl: "./modaladvert.component.html",
  styleUrls: ["./modaladvert.component.css"]
})
export class ModaladvertComponent implements OnInit {
  cerrarmod = "";
  constructor() {}

  ngOnInit() {}

  cerrar() {
    console.log("cerrar");
    const res = confirm("desea cerrar modal");
    if (res) {
      this.cerrarmod = "modal";
    } else {
      this.cerrarmod = "";
    }
  }
}
