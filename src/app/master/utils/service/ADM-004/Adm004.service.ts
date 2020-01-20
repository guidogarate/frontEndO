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
          // console.log(resp);
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
         // console.log(resp);
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
          // console.log(resp);
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
          // console.log(resp);
          return resp;
        })
      );
  }

  ObtenerParametrosUnidadNegocio(fecha : string) {
    const url1 = `${url.prod}${url.unidad_negocio}`+fecha;
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token
        })
      })
      .pipe(
        map(resp => {
          // console.log(resp);
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
          // console.log(resp);
          return resp;
        })
      );
  }

  

  ActualizarParametros(item: any) {
    const json = JSON.stringify({
      descripcion: item.adgtdesc,
      actEmpresa: +item.adgtacte,
      cantPeridos: +item.adgtcanp,
      estPeriodo: +item.adgtesta,
      fechaInicio: item.adgtfegi,
      fechaFin: item.adgtfegf,
      gtionDefec: item.adgtgesd == true ? "1" : "0",
      modAutomatica: item.adgtmoda == true ? "1" : "0",
      fechaModAutomatica: new Date(item.adgtdiam+"-01"),
    });
    const gson = JSON.stringify(
      [ 
        {
            "adpicori": "20",
            "adpiatr1": false
          },
          {
            "adpicori": "21",
            "adpiatr1": 1
          },
          {
            "adpicori": "22",
            "adpiatr1": 2
          },
          {
            "adpicori": "31",
            "adpiatr1": 1
          },
          {
            "adpicori": "32",
            "adpiatr1": true
          },
          {
            "adpicori": "34",
            "adpiatr2": "-"
          },
          {
            "adpicori": "35",
            "adpiatr2": "-"
          },
          {
            "adpicori": "36",
            "adpiatr2": "-"
          },
          {
            "adpicori": "37",
            "adpiatr1": "6"
          },
          {
            "adpicori": "41",
            "adpiatr1": false
          },
          {
            "adpicori": "42",
            "adpiatr1": false
          },
          {
            "adpicori": "43",
            "adpiatr1": false
          },
          {
            "adpicori": "44",
            "adpiatr1": false
          },
          {
            "adpicori": "45",
            "adpiatr1": false
          },
          {
            "adpicori": "46",
            "adpiatr1": false
          },
          {
            "adpicori": "61",
            "adpiatr1": 1
          },
          {
            "adpicori": "62",
            "adpiatr1": 1
          },
          {
            "adpicori": "63",
            "adpiatr1": false
          },
          {
            "adpicori": "64",
            "adpiatr2": "-"
          },
          {
            "adpicori": "65",
            "adpiatr1": 6
          },
          {
            "adpicori": "71",
            "adpiatr1": true
          },
          {
            "adpicori": "72",
            "adpiatr1": 6
          },
          {
            "adpicori": "81",
            "adpiatr2": "unidad de costo",
            "adpiatr1": 1
          },
          {
            "adpicori": "82",
            "adpiatr2": "centro de costo",
            "adpiatr1": 2
          },
          {
            "adpicori": "83",
            "adpiatr2": "",
            "adpiatr1": 3
          },
          {
            "adpicori": "84",
            "adpiatr2": "",
            "adpiatr1": 4
          },
          {
            "adpicori": "85",
            "adpiatr2": "",
            "adpiatr1": 5
          },
          {
            "adpicori": "86",
            "adpiatr2": "",
            "adpiatr1": 6
          }
      ]
    );
    console.log("service Actualizar Gestion: ", json);

    const url1 = `${url.prod}${url.actualizar_gestion}${item.adgtideg}`;
    console.log(url1);
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
