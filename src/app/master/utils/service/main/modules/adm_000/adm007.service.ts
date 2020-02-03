import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import url from 'src/app/master/config/url.config';
import adm0007 from 'src/app/master/config/adm000/adm007_url';
import { map } from 'rxjs/operators';

@Injectable()
export class Adm007Service {

  token = sessionStorage.getItem("id");  

  constructor(private httpClient: HttpClient) {
    console.log("cargando predeterminados adm004service: ");
  }

  ObtenerParametros() {
    const url1 = `${url.prod}${adm0007.get_datos_empresa}`+'90';
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
  // ObtenerParametrosMoneda(fecha : string) {
  //   const url1 = `${url.prod}${adm0004.get_monedas}${fecha}`;
  //   return this.httpClient
  //     .get(url1, {
  //       headers: new HttpHeaders({
  //         authorization: this.token
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //        console.log(resp);
  //         return resp;
  //       })
  //     );
  // }

  // ObtenerParametrosFolio(fecha : string) {
  //   const url1 = `${url.prod}${adm0004.get_folio}${fecha}`;
  //   console.log("cargando folio fecha: ",url1);
  //   return this.httpClient
  //     .get(url1, {
  //       headers: new HttpHeaders({
  //         authorization: this.token
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         console.log(resp);
  //         return resp;
  //       })
  //     );
  // }
  // ObtenerParametrosEspeciales(fecha : string) {
  //   const url1 = `${url.prod}${adm0004.parama_espec}${fecha}`;
  //   return this.httpClient
  //     .get(url1, {
  //       headers: new HttpHeaders({
  //         authorization: this.token
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         console.log(resp);
  //         return resp;
  //       })
  //     );
  // }

  // ObtenerParametrosUnidadNegocio(fecha : string) {
  //   const url1 = `${url.prod}${adm0004.unidad_negocio}${fecha}`;
  //   return this.httpClient
  //     .get(url1, {
  //       headers: new HttpHeaders({
  //         authorization: this.token
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         console.log(resp);
  //         return resp;
  //       })
  //     );
  // }

  // ObtenerParametrosRegistroMaestro(fecha : string) {
  //   const url1 = `${url.prod}${adm0004.reg_maest}${fecha}` ;
  //   return this.httpClient
  //     .get(url1, {
  //       headers: new HttpHeaders({
  //         authorization: this.token
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         console.log(resp);
  //         return resp;
  //       })
  //     );
  // }

  

  // ActualizarParametros(item: any, gestion : string) {
  //   // const json = JSON.stringify({
  //   //   descripcion: item.adgtdesc,
  //   //   actEmpresa: +item.adgtacte,
  //   //   cantPeridos: +item.adgtcanp,
  //   //   estPeriodo: +item.adgtesta,
  //   //   fechaInicio: item.adgtfegi,
  //   //   fechaFin: item.adgtfegf,
  //   //   gtionDefec: item.adgtgesd == true ? "1" : "0",
  //   //   modAutomatica: item.adgtmoda == true ? "1" : "0",
  //   //   fechaModAutomatica: new Date(item.adgtdiam+"-01"),
  //   // });
   
  //   console.log("service Actualizar Gestion: ", item);

  //   const url1 = `${url.prod}${adm0004.put_paraminicial}${gestion}`;
  //   console.log(url1);
  //   return this.httpClient
  //     .put(url1, item, {
  //       headers: new HttpHeaders({
  //         authorization: this.token,
  //         "Content-Type": "application/json"
  //       })
  //     })
  //     .pipe(
  //       map(resp => {
  //         console.log(resp);
  //         return resp;
  //       })
  //     );
  // }

  
}
