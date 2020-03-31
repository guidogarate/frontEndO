import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Cont005 } from "src/app/master/utils/models/main/cont_000/index.models";
import cont005 from "src/app/master/config/cont000/cont005_url";

@Injectable()
export class Cont005Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  geCont005(modulo: string, indice: string, mod: string, texto: string) {
    const url1 = `${url.prod}${cont005.geCont005}${modulo}/${indice}/${mod}/${texto}`;
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  geCont004Cta(modulo: string, idCta: number) {
    const url1 = `${url.prod}${cont005.geCont005Cta}${modulo}/${idCta}`;
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  upCont004(cont_004: Cont005, id_cod: string) {
    const url1 = `${url.prod}${cont005.upCont005}${id_cod}`;
    const json = JSON.stringify(cont_004);
    return this.httpClient
      .put(url1, json, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  deCont004(cont_004: Cont005) {
    const url1 = `${url.prod}${cont005.deCont005}`;
    const json = JSON.stringify({ cuentas: cont_004 });
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  inCont004(cont_004: Cont005) {
    const url1 = `${url.prod}${cont005.inCont005}`;
    let estado: string = "";
    if (cont_004.estado === undefined) {
      cont_004.estado = false;
    }
    if (cont_004.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    const json = JSON.stringify({
      descripcion: cont_004.descripcion,
      sigla: cont_004.sigla,
      estado
    });
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }
}
