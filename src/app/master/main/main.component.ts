import { Component, OnInit } from "@angular/core";
declare function init_plugins();
declare function init_scroll();
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    init_scroll();
    setTimeout(() => {
      init_plugins();
    }, 3000);
  }
}
