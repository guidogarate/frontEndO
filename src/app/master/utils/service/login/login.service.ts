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
    return this.httpClient.post(url1, null).pipe(
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
    return this.httpClient.post(url1, json).pipe(map((resp) => resp));
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
    return this.httpClient.post(url1, null).pipe(
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
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        if (resp["ok"]) {
          this.guardarToken(resp["datos"], resp["token"]);
          this.guardarMenu(resp["favoritos"], resp["menu"]);
          this.moduCompUsuario(resp["menu"]);
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
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  moduCompUsuario(data: any) {
    const moduloUser: Modulo[] = [];
    const componUser: Componente[] = [];
    const menu = data || [];
    for (let i = 0; i < menu.length; i++) {
      const modulo = menu[i].modulo || [];
      for (let j = 0; j < modulo.length; j++) {
        const mod = modulo[j].id_segundonivel;
        const comp = modulo[j].componente;
        moduloUser.push({ idModulo: mod, componente: comp });
        const subModulo = modulo[j].sub_modulo || [];
        for (let k = 0; k < subModulo.length; k++) {
          const component = subModulo[k].componentes || [];
          for (let l = 0; l < component.length; l++) {
            const modComp = component[l].id_unico;
            const compCom = component[l].componente;
            const idSegNivel = modulo[j].id_segundonivel;
            componUser.push({
              idComponen: modComp,
              componente: compCom,
              idSegNivel,
            });
          }
        }
      }
    }
    const sinRepetidos: Modulo[] = moduloUser.filter(
      (valorActual, indiceActual, arreglo) => {
        return (
          arreglo.findIndex(
            (valorDelArreglo) =>
              JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)
          ) === indiceActual
        );
      }
    );
    for (let j = 0; j < sinRepetidos.length; j++) {
      const agregarModulo: Componente[] = [];
      const componUserLneg = componUser.length;
      const idM: string = sinRepetidos[j].idModulo.toString();
      for (let i = 0; i < componUserLneg; i++) {
        if (idM === componUser[i].idSegNivel.toString()) {
          agregarModulo.push(componUser[i]);
        }
      }
      sinRepetidos[j].compArray = agregarModulo;
    }
    sessionStorage.setItem("modulo", JSON.stringify(sinRepetidos));
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

  estaAutenticado(): boolean {
    if (this.userToken.length < 1) {
      return false;
    }
    return true;
  }
}

export interface Modulo {
  idModulo: number;
  componente: string;
  compArray?: Componente[];
}
export interface Componente {
  idComponen: number;
  componente: string;
  idSegNivel: number;
}
