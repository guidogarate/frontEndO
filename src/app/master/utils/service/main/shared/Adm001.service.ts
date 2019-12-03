import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import url from "src/app/master/config/url.config";
import {TipoCambio} from '../../../models/TipoCambio';
  import { from } from 'rxjs';


@Injectable()
export class Adm001Service {
  token = localStorage.getItem("id");

  tipoCambio : TipoCambio = new TipoCambio();
  /* campos de tipo de cambio*/ 
  constructor(private httpClient: HttpClient) {
    console.log("cargando predeterminados adm001service: ");
  }

  CargarPredeterminados() {
    const url1 = `${url.prod}${url.mostrarPred}`;
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

  CargarListaTipoCambio(indice: string,mes: string, anho: string) {
    const json = JSON.stringify({
            indice: indice,
            mes : mes,
            anho : anho
          });
    const url1 = `${url.prod}${url.busqPagi}`;
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          console.log("mostrar Lista", resp);
          return resp;
        })
      );
  }

/* metodos para llamada al service*/
  paginado(mes: string,anho:string){

      const json = JSON.stringify({
        mes : mes,
        anho : anho
      });
      const url1 = `${url.prod}${url.paginado}`;
      return this.httpClient
      .post(url1,json,{
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

  eliminar() {
    const url1 = `${url.prod}${url.eliminar}`;
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

  agregar(tipoCambio: TipoCambio) {
    // id: number
    
    const json = JSON.stringify({
      adtcfecd: tipoCambio.adtcfecd,
      adtctipo: tipoCambio.adtctipo,
      adtctipc: tipoCambio.adtctipc,
      adtctipv : tipoCambio.adtctipv,
      adtccufv : tipoCambio.adtccufv,
      adtcesta : tipoCambio.adtcesta,
      adtcpred : tipoCambio.adtcpred
    });
    const url1 = `${url.prod}${url.agregar}`;
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

  actualizar(tipoCambio: TipoCambio) {
   
    const json = JSON.stringify({
      adtctipo: tipoCambio.adtctipo,
      adtctipc: tipoCambio.adtctipc,
      adtctipv : tipoCambio.adtctipv,
      adtccufv : tipoCambio.adtccufv,
      adtcesta : tipoCambio.adtcesta,
      adtcpred : tipoCambio.adtcpred
    });
    const url1 = `${url.prod}${url.actualizar}`;
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
}
