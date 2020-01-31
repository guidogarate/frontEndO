import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import adm0005 from "src/app/master/config/adm000/adm005_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";

@Injectable()
export class Adm005Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  buscarAdm005(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm0005.getData}${modulo}/${indice}/${texto}`;
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

  editaAdm005(codigo: string, estado: boolean) {
    const json = JSON.stringify({
      estado,
      codigo
    });
    console.log(json);

    const url1 = `${url.prod}${adm0005.resetContra}`;
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
