import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import url from "src/app/master/config/url.config";
import { TipoCambio } from "../../models/TipoCambio";
import { from } from "rxjs";

@Injectable()
export class Adm002Service {
  token = sessionStorage.getItem("id");

  // tipoCambio: TipoCambio = new TipoCambio();
  /* campos de tipo de cambio*/

  constructor(private httpClient: HttpClient) {
    console.log("cargando predeterminados adm001service: ");
  }

  ObtenerPeriodos(fecha: any) {
    const url1 = `${url.prod}${url.get_periodos}${fecha}`;
    console.log("obteniendo Periodo: ", url1);
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
  ObtenerGestionesPeriodos() {
    const url1 = `${url.prod}${url.get_gestion_periodos}`;
    console.log("token", this.token);
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token
        })
      })
      .pipe(
        map(resp => {
          console.log(resp);
          return resp;
        })
      );
  }

  // CargarListaTipoCambio(indice: string, mes: string, anho: string) {
  //   const json = JSON.stringify({
  //     indice,
  //     mes,
  //     anho
  //   });
  //   const url1 = `${url.prod}${url.busqPagi}`;
  //   return this.httpClient
  //     .post(url1, json, {
  //       headers: new HttpHeaders({
  //         authorization: this.token,
  //         "Content-Type": "application/json"
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         // console.log("mostrar Lista", resp);
  //         return resp;
  //       })
  //     );
  // }

  /* metodos para llamada al service*/
  // paginado(mes: string, anho: string) {
  //   const json = JSON.stringify({
  //     mes,
  //     anho
  //   });
  //   const url1 = `${url.prod}${url.paginado}`;
  //   return this.httpClient
  //     .post(url1, json, {
  //       headers: new HttpHeaders({
  //         authorization: this.token,
  //         "Content-Type": "application/json"
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         return resp;
  //       })
  //     );
  // }

 

  // agregar(tipoCambio: TipoCambio) {
  //   const json = JSON.stringify({
  //     adtcfecd: tipoCambio.adtcfecd,
  //     adtctipo: tipoCambio.adtctipo,
  //     adtctipc: tipoCambio.adtctipc,
  //     adtctipv: tipoCambio.adtctipv,
  //     adtccufv: tipoCambio.adtccufv,
  //     adtcesta: tipoCambio.adtcesta,
  //     adtcpred: tipoCambio.adtcpred
  //   });
  //   console.log("service guardar: ", json);
  //   const url1 = `${url.prod}${url.agregar}`;
  //   return this.httpClient
  //     .post(url1, json, {
  //       headers: new HttpHeaders({
  //         authorization: this.token,
  //         "Content-Type": "application/json"
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         return resp;
  //       })
  //     );
  // }

  // actualizar(tipoCambio: TipoCambio) {
  //   const json = JSON.stringify({
  //     adtctipo: tipoCambio.adtctipo,
  //     adtctipc: tipoCambio.adtctipc,
  //     adtctipv: tipoCambio.adtctipv,
  //     adtccufv: tipoCambio.adtccufv,
  //     adtcesta: tipoCambio.adtcesta,
  //     adtcpred: tipoCambio.adtcpred
  //   });
  //   const url1 = `${url.prod}${url.actualizar}${tipoCambio.adtcfecd}`;
  //   console.log("actualizando a: ", tipoCambio.adtcfecd);
  //   console.log("actualizando a: ", json);
  //   return this.httpClient
  //     .put(url1, json, {
  //       headers: new HttpHeaders({
  //         authorization: this.token,
  //         "Content-Type": "application/json"
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         return resp;
  //       })
  //     );
  // }

  // obtenerGestiones() {
  //   const url1 = `${url.prod}${url.gestionesDisponibles}`;
  //   console.log("Obteniendo Gestiones Disponibles: ", url1);
  //   return this.httpClient
  //     .get(url1, {
  //       headers: new HttpHeaders({
  //         authorization: this.token,
  //         "Content-Type": "application/json"
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         return resp;
  //       })
  //     );
  // }
  // obtenerGestionesDisponiblesPredeterminado() {
  //   const url1 = `${url.prod}${url.gest_dispo_y_predet}`;
  //   console.log("Obteniendo Gestiones Disponibles y Predeterminado: ", url1);
  //   return this.httpClient
  //     .get(url1, {
  //       headers: new HttpHeaders({
  //         authorization: this.token,
  //         "Content-Type": "application/json"
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         return resp;
  //       })
  //     );
  // }
}
