import { Component, OnInit } from "@angular/core";
import { InitGlobal } from "src/app/master/utils/global/index.global";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  animacion = true;

  constructor(private initG: InitGlobal) {}

  ngOnInit() {
    this.initG.scroll();
    setTimeout(() => {
      this.animacion = false;
      this.initG.app();
    }, 3000);
  }
}
