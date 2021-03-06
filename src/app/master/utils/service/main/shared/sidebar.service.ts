import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import url from "src/app/master/config/url.config";

@Injectable()
export class SidebarService {
  token = sessionStorage.getItem("id");

  constructor(private httpClient: HttpClient) {}

  cargarMenuFavo() {
    const url1 = `${url.prod}${url.cargaMenuFavor}`;
    return this.httpClient
      .post(url1, null, {
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

  CargarFavoritos() {
    const url1 = `${url.prod}${url.cargarFto}`;
    return this.httpClient
      .post(url1, null, {
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

  eliminarFavorito(id: number) {
    const json = JSON.stringify({
      id_favorito: id
    });
    const url1 = `${url.prod}${url.eliminarFto}`;
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

  agregarFavorito(id: number) {
    const json = JSON.stringify({
      id_favorito: id
    });
    const url1 = `${url.prod}${url.agregarFto}`;
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
