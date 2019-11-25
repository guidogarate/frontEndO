import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { LoginModels } from "../../models/login/login.models";
import url from "src/app/master/config/url.config";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  userToken: string;

  constructor(private httpClient: HttpClient) {
    this.leerToken();
  }

  cargarDB() {
    const url1 = `${url.prod}${url.database}`;
    return this.httpClient
      .post(url1, null, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          if (resp["ok"]) {
            // console.log(resp["newDatabase"]);
            return resp["newDatabase"];
          } else {
            return resp;
          }
        })
      );
  }

  estaRegistrado(usuario: LoginModels) {
    const json = JSON.stringify({
      cod_user: usuario.cod_user,
      id_database: usuario.id_database
    });
    console.log(json);
    const url1 = `${url.prod}${url.validarUser}`;
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  leerToken() {
    if (localStorage.getItem("id")) {
      this.userToken = localStorage.getItem("id");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  logout() {
    const url1 = `${url.prod}${url.cerrarSesion}`;
    return this.httpClient
      .post(url1, null, {
        headers: new HttpHeaders({
          authorization: localStorage.getItem("id")
        })
      })
      .pipe(
        map(resp => {
          localStorage.clear();
          this.leerToken();
          return resp;
        })
      );
  }

  login(usuario: LoginModels) {
    const json = JSON.stringify({
      id_database: usuario.id_database,
      cod_user: usuario.cod_user,
      passw: usuario.passw
    });
    const url1 = `${url.prod}${url.ingresar}`;
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          if (resp["ok"]) {
            this.guardarToken(resp["datos"], resp["token"]);
            return { ok: true };
          } else {
            return resp;
          }
        })
      );
  }

  regContra(usuario: LoginModels) {
    const json = JSON.stringify({
      id_database: usuario.id_database,
      cod_user: usuario.cod_user,
      passw1: usuario.passw,
      passw2: usuario.passs2
    });
    const url1 = `${url.prod}${url.regContra}`;
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          if (resp["ok"]) {
            console.log(resp);
            return { ok: true };
          } else {
            return resp;
          }
        })
      );
  }

  private guardarToken(usuario: any, token: string) {
    this.userToken = token;
    localStorage.setItem("datos_user", JSON.stringify(usuario));
    localStorage.setItem("id", token);
  }

  // metodo para guard(login.guard.ts)
  estaAutenticado(): boolean {
    console.log(this.userToken.length);

    if (this.userToken.length < 1) {
      return false;
    }
    return true;
  }
}
