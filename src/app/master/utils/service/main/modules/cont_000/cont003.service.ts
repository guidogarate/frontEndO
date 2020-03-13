import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Cont003 } from "src/app/master/utils/models/main/cont_000/index.models";
import cont003 from "src/app/master/config/cont000/cont003_url";

@Injectable()
export class Cont003Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  geCont003(modulo: string, indice: string, gestion: string, texto: string) {
    const url1 = `${url.prod}${cont003.geCont003}${modulo}/${indice}/${gestion}/${texto}`;
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

  upCont003(cont_003: Cont003, id_cod: string) {
    const url1 = `${url.prod}${cont003.upCont003}${id_cod}`;
    let estado: string = "";
    if (cont_003.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    const json = JSON.stringify({
      descripcion: cont_003.descripcion,
      sigla: cont_003.sigla,
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

  deCont003(id_cod: string) {
    const url1 = `${url.prod}${cont003.deCont003}${id_cod}`;
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

  inCont003(cont_003: Cont003, gestion: string) {
    const url1 = `${url.prod}${cont003.inCont003}/${gestion}`;
    let estado: string = "";
    let codigo: string = "";
    if (cont_003.estado === undefined) {
      cont_003.estado = false;
    }
    if (cont_003.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    if (cont_003.checkauto) {
      codigo = "auto";
    } else {
      codigo = cont_003.idunidaddivision;
    }
    const json = JSON.stringify({
      division: cont_003.division,
      dependencia: cont_003.dependencia,
      descripcion: cont_003.descripcion,
      sigla: cont_003.sigla,
      estado,
      codigo
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
