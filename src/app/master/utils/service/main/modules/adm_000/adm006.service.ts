import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import adm006 from "src/app/master/config/adm000/adm006_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";

@Injectable()
export class Adm006Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  geAdm006(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm006.geAdm006}${modulo}/${indice}/${texto}`;
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

  geAdm006getUser(modulo: string, texto: string) {
    const url1 = `${url.prod}${adm006.geAdm006getUser}${modulo}/${texto}`;
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

  upAdm005(codigo: string, estado: boolean) {
    const json = JSON.stringify({
      estado,
      codigo
    });
    const url1 = `${url.prod}${adm006.geAdm006}`;
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
