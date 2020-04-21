import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cont000",
  templateUrl: "./cont000.component.html",
  styleUrls: ["./cont000.component.css"],
})
export class Cont000Component implements OnInit {
  data: any[] = JSON.parse(sessionStorage.getItem("menu2"));
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
