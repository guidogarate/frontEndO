import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { LoginModels } from "../../models/login/login.models";
import url from "src/app/master/config/url.config";

@Injectable({
  providedIn: "root",
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
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((resp) => {
          if (resp["ok"]) {
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
      id_database: usuario.databaseid,
    });
    const url1 = `${url.prod}${url.validarUser}`;
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  leerToken() {
    if (sessionStorage.getItem("id")) {
      this.userToken = sessionStorage.getItem("id");
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
          authorization: sessionStorage.getItem("id"),
        }),
      })
      .pipe(
        map((resp) => {
          sessionStorage.clear();
          // actualizando el token
          this.leerToken();

          return resp;
        })
      );
  }

  login(usuario: LoginModels) {
    const json = JSON.stringify({
      id_database: usuario.databaseid,
      cod_user: usuario.cod_user,
      passw: usuario.passw,
    });
    const url1 = `${url.prod}${url.ingresar}`;
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((resp) => {
          if (resp["ok"]) {
            this.guardarToken(resp["datos"], resp["token"]);
            this.guardarMenu(resp["favoritos"], resp["menu"]);
            return resp;
          } else {
            return resp;
          }
        })
      );
  }

  regContra(usuario: LoginModels) {
    const json = JSON.stringify({
      id_database: usuario.databaseid,
      cod_user: usuario.cod_user,
      passw1: usuario.passw,
      passw2: usuario.passs,
    });
    const url1 = `${url.prod}${url.regContra}`;
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  private guardarToken(usuario: any, token: string) {
    this.userToken = token;
    sessionStorage.setItem("datos_user", JSON.stringify(usuario));
    sessionStorage.setItem("id", token);
  }

  private guardarMenu(favor: any, menu: any) {
    sessionStorage.setItem("favoritos", JSON.stringify(favor));
    sessionStorage.setItem("menu", JSON.stringify(menu));
  }

  // metodo para guard(login.guard.ts)
  estaAutenticado(): boolean {
    if (this.userToken.length < 1) {
      return false;
    }
    return true;
  }
}
