import { Component, OnInit } from "@angular/core";

declare function init_select();
declare function initLabels();

@Component({
  selector: "app-cont003",
  templateUrl: "./cont003.component.html",
  styleUrls: ["./cont003.component.css"]
})
export class Cont003Component implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initLabels();
    this.initSelect();
  }
  initLabels() {
    setTimeout(() => {
      initLabels();
    }, 5);
  }
  initSelect() {
    setTimeout(() => {
      init_select();
    }, 5);
  }
}
