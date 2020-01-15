import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import url from "src/app/master/config/url.config";
import { from } from "rxjs";
 

@Injectable()
export class Adm004Service {

  token = sessionStorage.getItem("id");  

  constructor(private httpClient: HttpClient) {
    console.log("cargando predeterminados adm004service: ");
  }

  ObtenerParametros() {
    const url1 = `${url.prod}${url.get_paraminicial}`;
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
  ObtenerParametrosMoneda(fecha : string) {
    const url1 = `${url.prod}${url.get_monedas}`+fecha;
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

  ObtenerParametrosFolio(fecha : string) {
    const url1 = `${url.prod}${url.get_folio}`+fecha;
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
  ObtenerParametrosEspeciales(fecha : string) {
    const url1 = `${url.prod}${url.parama_espec}`+fecha;
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

  ObtenerParametrosRegistroMaestro(fecha : string) {
    const url1 = `${url.prod}${url.reg_maest}`+fecha;
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

  // AgregarGestion(item: any) {
  //   const json = JSON.stringify({
  //     gestion: +item.adgtideg ,
  //     descripcion: item.adgtdesc,
  //     actEmpresa: +item.adgtacte,
  //     cantPeridos: +item.adgtcanp,
  //     estPeriodo: +item.adgtesta,
  //     fechaInicio: item.adgtfegi,
  //     fechaFin: item.adgtfegf,
  //     gtionDefec: item.adgtgesd == true ? "1" : "0",
  //     modAutomatica: item.adgtmoda == true ? "1" : "0",
  //     fechaModAutomatica: item.adgtdiam,
  //   });
  //   console.log("service Agregar: ", json);
  //   const url1 = `${url.prod}${url.agregar_gestion}`;
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

  // EliminarGestion(fecha: any) {
  //   const url1 = `${url.prod}${url.eliminar_Gestion}${fecha}`;
  //   console.log("eliminando Gestion: ", url1);
  //   return this.httpClient
  //     .delete(url1, {
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

  // ActualizarGestion(item: any) {
  //   const json = JSON.stringify({
  //     descripcion: item.adgtdesc,
  //     actEmpresa: +item.adgtacte,
  //     cantPeridos: +item.adgtcanp,
  //     estPeriodo: +item.adgtesta,
  //     fechaInicio: item.adgtfegi,
  //     fechaFin: item.adgtfegf,
  //     gtionDefec: item.adgtgesd == true ? "1" : "0",
  //     modAutomatica: item.adgtmoda == true ? "1" : "0",
  //     fechaModAutomatica: new Date(item.adgtdiam+"-01"),
  //   });
  //   console.log("service Actualizar Gestion: ", json);

  //   const url1 = `${url.prod}${url.actualizar_gestion}${item.adgtideg}`;
  //   console.log(url1);
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

  // ActualizarPeriodo(Periodo: any, fechaAnhoDia : string) {
  //   const json = JSON.stringify({
  //     estPeriodo: Periodo.adpresta == 1 ? "1":"0",
  //     modAutomatica : Periodo.adprmoda == true ? "1" : "2",
  //     fechaModAutomatica : Periodo.adprdiam
  //   });
  //   console.log("service Actualizar Periodo: ", json);
  //   const url1 = `${url.prod}${url.actualizar_periodo}${fechaAnhoDia}`;
  //   console.log(" fecha url para actualizar: ",url1);
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
}
