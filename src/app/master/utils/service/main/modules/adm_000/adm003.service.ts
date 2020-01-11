import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import adm0003 from "src/app/master/config/adm000/adm003_config";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";

@Injectable()
export class Adm003Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  buscarAdm003(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm0003.cargarDato}${modulo}/${indice}/${texto}`;
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  nuevoAdm003(adamcodm: string, adamtipa: string, dato: any) {
    const datos = [dato[dato.length - 1]];
    const json = JSON.stringify({
      adamcodm,
      adamtipa,
      datos
    });
    const url1 = `${url.prod}${adm0003.nuevoDato}`;
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

  editarAdm003(adamcodm: string, adamtipa: string, datos: any) {
    const url1 = `${url.prod}${adm0003.editarDato}${adamcodm}/${adamtipa}`;
    return this.httpClient
      .put(url1, datos, {
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

  buscarAdm003Sub(adamtipa: string) {
    const url1 = `${url.prod}${adm0003.cargarDatoSub}${adamtipa}`;
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  nuevoAdm003Sub(adamcodm: string, adamtipa: string, dato: any) {
    const datos = [dato[dato.length - 1]];
    const json = JSON.stringify({
      adamcodm,
      adamtipa,
      datos
    });
    const url1 = `${url.prod}${adm0003.nuevoDatoSub}`;
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

  editarAdm003Sub(adamcodm: string, adamtipa: string, datos: any) {
    const url1 = `${url.prod}${adm0003.editarDatoSub}${adamcodm}/${adamtipa}`;
    return this.httpClient
      .put(url1, datos, {
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

  eliminarAdm003Ambos(adamcodm: string, adamtipa: string, adamidea: string) {
    const url1 = `${url.prod}${adm0003.eliminDatoAmbos}${adamcodm}/${adamtipa}/${adamidea}`;
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
}
