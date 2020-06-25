import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import adm013 from "src/app/master/config/adm000/adm013_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Adm013 } from "src/app/master/utils/models/main/adm_000/index.models";

@Injectable()
export class Adm013Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  // nroRegistros: string,
  // /${nroRegistros}
  getAdm013(modulo: string, indice: string, idModulo: number, texto: string) {
    const url1 = `${url.prod}${adm013.getListTiposTransaccion}${modulo}/${indice}/${idModulo}/${texto}`;
    console.log("url get adm013: ", url1);
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
  getAdm013TiposTransaccion(
    modulo: string,
    idModulo: number,
    id_formato: string
  ) {
    const url1 = `${url.prod}${adm013.getTipoTransaccion}${modulo}/${idModulo}/${id_formato}`;
    console.log("url get adm013 typeTran: ", url1);
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

  inAdm013(adm_013: Adm013) {
    const url1 = `${url.prod}${adm013.inAdm013}`;
    const json = JSON.stringify({
      id_modulo: adm_013.id_modulo,
      id_tipotran: adm_013.id_tipotran,
      descripcion: adm_013.descripcion,
      sigla: adm_013.sigla,
      id_clase_documento: adm_013.id_clase_documento,
      id_codigo_transaccion: adm_013.id_codigo_transaccion,
      id_moneda: adm_013.id_moneda,
      cantidad_lineas: adm_013.cantidad_lineas,
      comprobante_estandar: adm_013.comprobante_estandar,
      duplicado: adm_013.duplicado,
      id_rol: adm_013.id_moneda,
      documento_preliminar: adm_013.documento_preliminar,
      id_formato_impresion: adm_013.id_formato_impresion,
      estado: adm_013.estado,
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

  upAdm012(adm_013: Adm013, id_modulo: number, id_formato: string) {
    const url1 = `${url.prod}${adm013.upAdm013}${id_modulo}/${id_formato}`;
    console.log("UPD adm013", adm_013);
    const json = JSON.stringify({
      descripcion: adm_013.descripcion,
      sigla: adm_013.sigla,
      id_clase_documento: adm_013.id_clase_documento,
      id_codigo_transaccion: adm_013.id_codigo_transaccion,
      id_moneda: adm_013.id_moneda,
      cantidad_lineas: adm_013.cantidad_lineas,
      comprobante_estandar: adm_013.comprobante_estandar,
      duplicado: adm_013.duplicado,
      id_rol: adm_013.id_moneda,
      documento_preliminar: adm_013.documento_preliminar,
      id_formato_impresion: adm_013.id_formato_impresion,
      estado: adm_013.estado,
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

  delAdm013(id_modulo: number, id_tipotran: string) {
    const url1 = `${url.prod}${adm013.delAdm013}${id_modulo}/${id_tipotran}`;
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
  getAdm013Pdf(usuario: string, idModulo: number) {
    const url1 = `${url.prod}${adm013.getPdf}${usuario}/${idModulo}`;
    console.log("url getAdm013: ", url1);
    return this.httpClient.get(url1, {
      headers: new HttpHeaders({
        authorization: this.token,
        "Content-Type": "application/pdf",
      }),
    });
  }

  getAdm013Excel(usuario: string, idModulo: number) {
    console.log("excel adm013", usuario, idModulo);
    const url1 = `${url.prod}${adm013.getPdf}${usuario}/${idModulo}`;
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
