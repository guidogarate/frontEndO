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
            this.guardarMenu(resp["data"]);
            this.guardarMenu2();
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

  private guardarMenu(usuario: any) {
    sessionStorage.setItem("favoritos", JSON.stringify(usuario[0].favoritos));
    sessionStorage.setItem(
      "menu_principal",
      JSON.stringify(usuario[0].menu_principal)
    );
    sessionStorage.setItem("submenus", JSON.stringify(usuario[0].submenus));
  }
  private guardarMenu2() {
    const data = [
      {
        titulo: "Contabilidad",
        id: "10",
        ruta: "conta",
        log: "null",
        subMenu: [
          {
            titulo: "SUB-CONT1",
            proceso: "Componente de SUB-CONT1",
            ruta: "",
            nivel3: true,
            componentes: [
              { titulo: "Maestros de Item", id: "42", ruta: " " },
              { titulo: "Auxiliares de Maestros", id: "43", ruta: " " },
              { titulo: "Almacenes", id: "44", ruta: " " },
              { titulo: "Conceptos de transacciones", id: "45", ruta: " " },
              { titulo: "Equivalentes codigo de Barra", id: "46", ruta: "" },
              { titulo: "Item por Almacen", id: "47", ruta: " " },
              { titulo: "Ubicaciones", id: "48", ruta: "" },
            ],
          },
          {
            titulo: "SUB-CONT1",
            proceso: "Componente de SUB-CONT1",
            ruta: "",
            nivel3: true,
            componentes: [
              { titulo: "Maestros de Item", id: "50", ruta: " " },
              { titulo: "Auxiliares de Maestros", id: "51", ruta: " " },
              { titulo: "Almacenes", id: "52", ruta: " " },
              { titulo: "Conceptos de transacciones", id: "53", ruta: " " },
              { titulo: "Equivalentes codigo de Barra", id: "54", ruta: " " },
              { titulo: "Item por Almacen", id: "55", ruta: " " },
              { titulo: "Ubicaciones", id: "56", ruta: "" },
            ],
          },
          {
            titulo: "SUB-CONT3",
            proceso: "",
            ruta: "",
            nivel3: false,
            componentes: [
              { titulo: "Maestros de Item", id: "50", ruta: " " },
              { titulo: "Auxiliares de Maestros", id: "51", ruta: " " },
              { titulo: "Almacenes", id: "52", ruta: " " },
              { titulo: "Conceptos de transacciones", id: "53", ruta: " " },
              { titulo: "Equivalentes codigo de Barra", id: "54", ruta: " " },
              { titulo: "Item por Almacen", id: "55", ruta: " " },
              { titulo: "Ubicaciones", id: "56", ruta: "" },
            ],
          },
        ],
      },
      {
        titulo: "Administracion",
        id: "90",
        ruta: "admin",
        log: "null",
        subMenu: [
          {
            titulo: "SUB-ADMIN1",
            proceso: "",
            ruta: "",
            nivel3: false,
            componentes: [
              { titulo: "Maestros de Item", id: "42", ruta: " " },
              { titulo: "Auxiliares de Maestros", id: "43", ruta: " " },
              { titulo: "Almacenes", id: "44", ruta: " " },
              { titulo: "Conceptos de transacciones", id: "45", ruta: " " },
              { titulo: "Equivalentes codigo de Barra", id: "46", ruta: "" },
              { titulo: "Item por Almacen", id: "47", ruta: " " },
              { titulo: "Ubicaciones", id: "48", ruta: "" },
            ],
          },
          {
            titulo: "SUB-ADMIN2",
            proceso: "",
            ruta: "",
            nivel3: false,
            componentes: [
              { titulo: "Maestros de Item", id: "50", ruta: " " },
              { titulo: "Auxiliares de Maestros", id: "51", ruta: " " },
              { titulo: "Almacenes", id: "52", ruta: " " },
              { titulo: "Conceptos de transacciones", id: "53", ruta: " " },
              { titulo: "Equivalentes codigo de Barra", id: "54", ruta: " " },
              { titulo: "Item por Almacen", id: "55", ruta: " " },
              { titulo: "Ubicaciones", id: "56", ruta: "" },
            ],
          },
        ],
      },
    ];
    sessionStorage.setItem("menu2", JSON.stringify(data));
  }

  // metodo para guard(login.guard.ts)
  estaAutenticado(): boolean {
    if (this.userToken.length < 1) {
      return false;
    }
    return true;
  }
}
