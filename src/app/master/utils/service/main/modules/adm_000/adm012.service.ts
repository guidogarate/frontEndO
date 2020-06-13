import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { adm000 } from "src/app/master/config/adm000/adm000_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Adm012 } from "src/app/master/utils/models/main/adm_000/index.models";

@Injectable()
export class Adm012Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  getAdm012(
    modulo: string,
    indice: string,
    idModulo: number,
    nroRegistros: string,
    texto: string
  ) {
    const url1 = `${url.prod}${adm000.adm012.getListFormatoImpresion}${modulo}/${indice}/${idModulo}/${nroRegistros}/${texto}`;
    console.log("url get: ", url1);
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((resp) => {
          console.log(resp);
          return resp;
        })
      );
  }
  getAdm012Formato(modulo: string, idModulo: number, id_formato: string) {
    const url1 = `${url.prod}${adm000.adm012.getFormatoImpresion}${modulo}/${idModulo}/${id_formato}`;
    console.log("url get: ", url1);
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((resp) => {
          console.log(resp);
          return resp;
        })
      );
  }

  upAdm012(adm_012: Adm012, id_modulo: number, id_formato: string) {
    const url1 = `${url.prod}${adm000.adm012.upAdm012}${id_modulo}/${id_formato}`;
    console.log("UPD adm012", adm_012);
    const json = JSON.stringify({
      descripcion: adm_012.descripcion,
      sigla: adm_012.sigla,
      tamaño_impresion: adm_012.tamaño_impresion,
      moneda: adm_012.moneda,
      codigo_cuenta: adm_012.codigo_cuenta,
      numero_copias: adm_012.numero_copias,
      codigo_qr: adm_012.codigo_qr,
      logo_empresa: adm_012.logo_empresa,
      estado: adm_012.estado,
    });
    return this.httpClient
      .put(url1, json, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  delAdm012(id_modulo: number, id_formato: string) {
    const url1 = `${url.prod}${adm000.adm012.delAdm012}${id_modulo}/${id_formato}`;
    return this.httpClient
      .delete(url1, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  inAdm012(adm_012: Adm012) {
    const url1 = `${url.prod}${adm000.adm012.inAdm012}`;
    console.info("url INS 012: ", url1);
    console.info("INS adm_012: ", adm_012);
    const json = JSON.stringify({
      id_modulo: adm_012.id_modulo,
      id_formato: adm_012.id_formato,
      descripcion: adm_012.descripcion,
      sigla: adm_012.sigla,
      tamaño_impresion: adm_012.tamaño_impresion,
      moneda: adm_012.moneda,
      codigo_cuenta: adm_012.codigo_cuenta,
      numero_copias: adm_012.numero_copias,
      codigo_qr: adm_012.codigo_qr,
      logo_empresa: adm_012.logo_empresa,
      estado: adm_012.estado,
    });
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }
  getAdm012Pdf(usuario: string, idModulo: number) {
    const url1 = `${url.prod}${adm000.adm012.getPdf}${usuario}/${idModulo}`;
    console.log("url get: ", url1);
    return this.httpClient.get(url1, {
      headers: new HttpHeaders({
        authorization: this.token,
        "Content-Type": "application/pdf",
      }),
    });
  }

  getAdm012Excel(usuario: string, idModulo: number) {
    console.log("excel");
    const url1 = `${url.prod}${adm000.adm012.getPdf}${usuario}/${idModulo}`;
    console.log("url get: ", url1);
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token,
        }),
      })
      .pipe(
        map((resp) => {
          window.open(url1);
          console.log(resp);
          return resp;
        })
      );
  }
}
