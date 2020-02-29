import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";

declare function init_select();
declare function initLabels();

@Component({
  selector: "app-cont003",
  templateUrl: "./cont003.component.html",
  styleUrls: ["./cont003.component.css"]
})
export class Cont003Component implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearForm();
  }

  crearForm() {
    this.form = this.fb.group({
      descripcion: ["", [Validators.minLength(3)]],
      sigla: ["", [Validators.required]],
      estado: [""]
    });
  }

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

  guardarDatos() {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }
  }

  guardarDatos2(formu: NgForm) {
    console.log(formu);
    if (formu.invalid) {
      return;
    }
  }
}
