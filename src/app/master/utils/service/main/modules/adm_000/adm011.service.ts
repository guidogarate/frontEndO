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

  getAdm011(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm011.getAdm011}${modulo}/${indice}/${texto}`;
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

  upAdm011(adm_011: Adm011, id_cod: string) {
    const url1 = `${url.prod}${adm011.upAdm011}${id_cod}`;
    let estado: string = "";
    if (adm_011.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    const json = JSON.stringify({
      division: adm_011.tipo_territorio,
      dependencia: adm_011.dependencia,
      descripcion: adm_011.descripcion,
      sigla: adm_011.sigla,
      estado
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

  delAdm011(id_cod: string) {
    const url1 = `${url.prod}${adm011.delAdm011}${id_cod}`;
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
    let estado: string = "";
    if (adm_011.estado === undefined) {
      adm_011.estado = false;
    }
    if (adm_011.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    if (adm_011.codigo === "" || adm_011.codigo === undefined) {
      adm_011.codigo = "auto";
    }
    const json = JSON.stringify({
      division: adm_011.tipo_territorio,
      dependencia: adm_011.dependencia,
      descripcion: adm_011.descripcion,
      sigla: adm_011.sigla,
      estado,
      codigo: adm_011.codigo
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
