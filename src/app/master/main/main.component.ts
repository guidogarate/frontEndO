import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
declare function init_plugins();
declare function init_scroll();
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  animacion = true;

  constructor() {}

  ngOnInit() {
    init_scroll();
    setTimeout(() => {
      this.animacion = false;
      init_plugins();
    }, 3000);
  }
}
