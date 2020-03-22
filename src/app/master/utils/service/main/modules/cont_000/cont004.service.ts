import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Cont004 } from "src/app/master/utils/models/main/cont_000/index.models";
import cont004 from "src/app/master/config/cont000/cont004_url";

@Injectable()
export class Cont004Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  geCont004Ctas(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${cont004.geCont004Ctas}${modulo}/${indice}/${texto}`;
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
    const url1 = `${url.prod}${cont004.geCont004Cta}${modulo}/${idCta}`;
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

  upCont004(cont_004: Cont004, id_cod: string) {
    const url1 = `${url.prod}${cont004.upCont004}${id_cod}`;
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

  deCont004(cont_004: Cont004, id_cod: string) {
    // const ctaAdic=
    const url1 = `${url.prod}${cont004.deCont004}${id_cod}`;
    return this.httpClient
      .delete(url1, {
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

  inCont004(cont_004: Cont004) {
    const url1 = `${url.prod}${cont004.inCont004}`;
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
