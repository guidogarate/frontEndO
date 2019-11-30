import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import url from "src/app/master/config/url.config";

@Injectable()
export class Adm001Service {
  token = localStorage.getItem("id");
  indice = "0";
  constructor(private httpClient: HttpClient) {
    console.log("cargando predeterminados adm001service: ");
  }

  CargarPredeterminados() {
    const url1 = `${url.prod}${url.cargarTipoCambioPredeterminado}`;
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
            authorization : this.token
        })
      })
      .pipe(
        map(resp => {
            console.log(resp);
          return resp;
        })
      );
  }

//   CargarListaTipoCambio() {
//     const url1 = `${url.prod}${url.cargarListaTipoCambio}`;
//     return this.httpClient
//       .post(url1, null, {
//         headers: new HttpHeaders({
//           authorization: this.token,
//           indice : this.indice
//         })
//       })
//       .pipe(
//         map(resp => {
//           return resp;
//         })
//       );
//   }

//   eliminarFavorito(id: number) {
//     const json = JSON.stringify({
//       id_favorito: id
//     });
//     const url1 = `${url.prod}${url.eliminarFto}`;
//     return this.httpClient
//       .post(url1, json, {
//         headers: new HttpHeaders({
//           authorization: this.token,
//           "Content-Type": "application/json"
//         })
//       })
//       .pipe(
//         map(resp => {
//           return resp;
//         })
//       );
//   }

//   agregarFavorito(id: number) {
//     const json = JSON.stringify({
//       id_favorito: id
//     });
//     const url1 = `${url.prod}${url.agregarFto}`;
//     return this.httpClient
//       .post(url1, json, {
//         headers: new HttpHeaders({
//           authorization: this.token,
//           "Content-Type": "application/json"
//         })
//       })
//       .pipe(
//         map(resp => {
//           return resp;
//         })
//       );
//   }
}
