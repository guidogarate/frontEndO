import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-adm000",
  templateUrl: "./adm000.component.html",
  styleUrls: ["./adm000.component.css"],
})
export class Adm000Component implements OnInit {
  data: any[] = JSON.parse(sessionStorage.getItem("menu"));
  datas: any[] = [];

  constructor(route: ActivatedRoute) {
    this.filtrar(route.snapshot.data.titulo);
  }

  ngOnInit() {}

  filtrar(modulo: string) {
    console.log(this.data);
    const len: number = this.data.length;
    for (let i = 0; i < len; i++) {
      if (this.data[i].ruta === modulo) {
        this.datas.push(this.data[i]);
        console.log(this.datas);
        return;
      }
    }
    console.log(modulo);
  }
}
