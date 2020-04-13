import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import glb002 from "src/app/master/config/glb000/glb002_start";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-cont002",
  templateUrl: "./cont002.component.html",
  styleUrls: ["./cont002.component.css"],
})
export class Cont002Component implements OnInit {
  textBuscarCont002 = new FormControl("", []);
  start = glb002;
  constructor() {
    this.start.Conte = true;
  }

  ngOnInit() {}
}
