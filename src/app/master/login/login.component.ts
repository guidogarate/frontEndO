import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginModels } from "../utils/models/login/login.models";
import { LoginService } from "../utils/service/login/login.service";
import * as Noty from "src/assets/global_assets/js/plugins/notifications/noty.min.js";
import { Observable } from "rxjs";
// declare function init_select();
import url from "src/app/master/config/url.config";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario: LoginModels = new LoginModels("", "", "", null);
  desabiliContra = true;
  databases: [];
  loading = false;
  loadingReg = false;
  btnIngre = "Ingresar";
  btnRegis = "Registrar Contraseña";
  ingresarContra = false;
  passw2 = false;
  BotonEnviar = true;

  constructor(private loginS: LoginService) {
    this.cargarDB();
  }

  ngOnInit() {
    // setTimeout(() => {
    //   init_select();
    // });
    if (this.loginS.estaAutenticado()) {
      window.location.href = url.principal;
    } else {
      window.location.href = url.salir;
    }
  }

  cargarDB() {
    this.loginS.cargarDB().subscribe(resp => {
      this.databases = resp;
    });
  }

  cargarLista(value: any) {
    console.log(value);
  }

  ingresar(form: NgForm) {
    console.log(this.databases);
    console.log(this.usuario);
    if (form.invalid) {
      return;
    }
    // return;
    let peticion: Observable<any>;
    this.estaRegistrado();
    if (this.usuario.passs === null) {
      this.btnIngre = "Ingresando...";
      this.loading = true;
      peticion = this.loginS.login(this.usuario);
    } else {
      this.btnRegis = "Registrando..";
      this.loadingReg = true;
      peticion = this.loginS.regContra(this.usuario);
    }
    this.desabiliContra = false;
    peticion.subscribe(resp => {
      this.btnRegis = "Registrar Contraseña";
      this.loadingReg = false;
      this.loading = false;
      this.btnIngre = "Ingresar";
      if (resp["ok"]) {
        if (resp["messagge"] === "contraseña registrado correctamente") {
          this.usuario.passs = null;
          this.usuario.passw = null;
          this.passw2 = false;
          this.ingresarContra = false;
          new Noty({
            theme: "limitless",
            layout: "bottomRight",
            type: "success",
            timeout: 6000,
            text: resp["messagge"],
            closeWith: ["button"]
          }).show();
        } else {
          this.btnIngre = "Ingresando...";
          this.loading = true;
          setTimeout(() => {
            form.reset();
          }, 1000);
          window.location.href = url.principal;
        }
      } else {
        new Noty({
          theme: "limitless",
          layout: "bottomRight",
          type: "info",
          timeout: 5000,
          text: resp["messagge"],
          closeWith: ["button"]
        }).show();
      }
    });
  }

  estaRegistrado() {
    if (this.usuario.databaseid === "") {
      new Noty({
        theme: "limitless",
        layout: "bottomRight",
        type: "info",
        timeout: 3000,
        text: "Debe seleccionar una base de datos",
        closeWith: ["button"]
      }).show();
    } else {
      if (this.usuario.cod_user !== "") {
        this.desabiliContra = false;
        this.loginS.estaRegistrado(this.usuario).subscribe(resp => {
          if (resp["messagge"] === "Registrar contraseña") {
            this.passw2 = true;
            this.ingresarContra = true;
          } else {
            this.usuario.passs = null;
            this.passw2 = false;
            this.ingresarContra = false;
          }
        });
      } else {
        return;
      }
    }
  }

  focusFunction() {
    console.log("focus de entrada");
  }
}
