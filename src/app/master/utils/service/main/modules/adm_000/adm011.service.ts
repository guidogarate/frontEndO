import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import adm011 from "src/app/master/config/adm000/adm011_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Adm011 } from "src/app/master/utils/models/main/adm_000/index.models";

@Injectable()
export class Adm011Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  getAdm011(modulo: string, indice: string, idModulo: number, texto: string) {
    const url1 = `${url.prod}${adm011.getAdm011}${modulo}/${indice}/${idModulo}/${texto}`;
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          console.log(resp);
          return resp;
        })
      );
  }

  upAdm011(adm_011: Adm011, id_modulo: number, id_documento: string) {
    const url1 = `${url.prod}${adm011.upAdm011}/${id_modulo}/${id_documento}`;
    const json = JSON.stringify({
      descripcion: adm_011.descripcion,
      sigla: adm_011.sigla,
      componente: adm_011.componente,
      estado: adm_011.estado
    });
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

  delAdm011(id_modulo: number, id_documento: number) {
    const url1 = `${url.prod}${adm011.delAdm011}/${id_modulo}/${id_documento}`;
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

  inAdm011(adm_011: Adm011) {
    const url1 = `${url.prod}${adm011.inAdm011}`;
    const json = JSON.stringify({
      id_modulo: adm_011.id_Modulo,
      id_documento: adm_011.id_documento,
      descripcion: adm_011.descripcion,
      sigla: adm_011.sigla,
      componente: adm_011.componente,
      estado: adm_011.estado
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
