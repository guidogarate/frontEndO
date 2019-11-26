import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginModels } from "../utils/models/login/login.models";
import { LoginService } from "../utils/service/login/login.service";
import * as Noty from "noty";
import url from "src/app/master/config/url.config";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario: LoginModels = new LoginModels();
  loginForm: FormGroup;
  desabiliContra = true;
  databases: [];
  loading = false;
  btnIngresar = "Ingresar";
  ingresarContra = false;
  passw2 = false;
  BotonEnviar = true;
  estaAutenticado = false;
  constructor(private loginS: LoginService, private router: Router) {
    this.formulario();
    this.cargarDB();
  }

  ngOnInit() {
    if (this.loginS.estaAutenticado()) {
      this.router.navigateByUrl(url.principal);
    } else {
      this.router.navigateByUrl(url.salir);
    }
    this.estaAutenticado = true;
  }

  formulario() {
    this.loginForm = new FormGroup({
      ingresoCompleto: new FormGroup({
        id_database: new FormControl("", [Validators.required]),
        cod_user: new FormControl(""),
        passw: new FormControl(""),
        passw2: new FormControl("")
      })
    });
    this.loginForm.get("ingresoCompleto.cod_user").reset();
    this.loginForm.get("ingresoCompleto.passw").reset();
  }
  cargarDB() {
    this.loginS.cargarDB().subscribe(resp => {
      this.databases = resp;
    });
  }

  ingresar(registra?: string) {
    this.usuario = this.loginForm.get("ingresoCompleto").value;
    if (
      this.loginForm.get("ingresoCompleto.id_database").valid &&
      this.loginForm.get("ingresoCompleto.cod_user").valid
    ) {
      this.estaRegistrado();
    }
    if (registra === "ingr") {
      this.usuario = this.loginForm.get("ingresoCompleto").value;
      if (this.loginForm.get("ingresoCompleto").valid) {
        // aqui va codigo
        this.loading = true;
        this.btnIngresar = "Ingresando...";
        this.loginS.login(this.usuario).subscribe(resp => {
          this.loading = false;
          this.btnIngresar = "Ingresar";
          console.log(resp);
          if (resp["ok"]) {
            new Noty({
              text: "Ingresando...",
              theme: "nest",
              progressBar: false,
              timeout: 3500,
              type: "error",
              layout: "bottomRight"
            }).show();
            window.location.href = url.principal;
            this.loginForm.get("ingresoCompleto.cod_user").reset();
            this.loginForm.get("ingresoCompleto.passw").reset();
          } else {
            if (resp["messagge"] === "ingresar contraseña") {
              new Noty({
                text: resp["messagge"],
                theme: "nest",
                progressBar: false,
                timeout: 3500,
                type: "error",
                layout: "bottomRight"
              }).show();
              this.loginForm.get("ingresoCompleto.passw").reset();
              this.passw2 = true;
              this.ingresarContra = true;
            } else {
              new Noty({
                text: resp["messagge"],
                theme: "nest",
                progressBar: false,
                timeout: 3500,
                type: "error",
                layout: "bottomRight"
              }).show();
            }
          }
        });
      } else {
        if (!this.loginForm.get("ingresoCompleto.id_database").valid) {
          new Noty({
            text: "Selecciona una base de datos",
            theme: "nest",
            progressBar: false,
            timeout: 3500,
            type: "error",
            layout: "bottomRight"
          }).show();
        }
        return;
      }
    } else {
      if (registra === "passw") {
        console.log("registrar contraseña");
        this.usuario = this.loginForm.get("ingresoCompleto").value;
        if (this.usuario.passw === this.usuario.passw2) {

          this.loginS.regContra(this.usuario).subscribe(resp => {
            if (resp["ok"]) {
              new Noty({
                text: "Contraseña registrado correctamente",
                theme: "nest",
                progressBar: false,
                timeout: 3500,
                type: "error",
                layout: "bottomRight"
              }).show();
              this.passw2 = false;
              this.ingresarContra = false;
              this.loginForm.get("ingresoCompleto.passw").reset();
            }
            return;
          });
        } else {
          new Noty({
            text: "Contraseñas incorrecta",
            theme: "nest",
            progressBar: false,
            timeout: 3500,
            type: "error",
            layout: "bottomRight"
          }).show();
        }
      } else {
        return;
      }
    }
  }

  estaRegistrado() {
    this.loginS.estaRegistrado(this.usuario).subscribe(resp => {
      if (resp["messagge"] === "Registrar contraseña") {
        this.passw2 = true;
        this.ingresarContra = true;
      }

    });
  }

  seleccione() {
    const id_db = this.loginForm.get("ingresoCompleto.id_database").value;
    const id_user = this.loginForm.get("ingresoCompleto.cod_user").value;
    if (id_user === null || id_user === "") {
      new Noty({
        text: "Complete el campo Usuario",
        theme: "nest",
        progressBar: false,
        timeout: 3500,
        type: "error",
        layout: "bottomRight"
      }).show();
    } else {
      if (id_db === null || id_db === "") {
        new Noty({
          text: "Seleccione una base de datos",
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "error",
          layout: "bottomRight"
        }).show();
      } else {
        this.usuario = this.loginForm.get("ingresoCompleto").value;
        this.estaRegistrado();
        this.desabiliContra = false;
        this.BotonEnviar = false;
      }
    }
  }

  focusFunction() {
    console.log("focus de entrada");
  }
}
