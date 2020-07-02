import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { adm000 } from "src/app/master/config/adm000/adm000_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Adm012 } from "src/app/master/utils/models/main/adm_000/index.models";

@Injectable()
export class Adm012Service {
  constructor(private httpClient: HttpClient) {}

  getAdm012(
    modulo: string,
    indice: string,
    idModulo: number,
    nroRegistros: string,
    texto: string
  ) {
    const url1 = `${url.prod}${adm000.adm012.getListFormatoImpresion}${modulo}/${indice}/${idModulo}/${nroRegistros}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
  getAdm012Formato(modulo: string, idModulo: number, id_formato: number) {
    const url1 = `${url.prod}${adm000.adm012.getFormatoImpresion}${modulo}/${idModulo}/${id_formato}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  upAdm012(adm_012: Adm012, id_modulo: number, id_formato: string) {
    const url1 = `${url.prod}${adm000.adm012.upAdm012}${id_modulo}/${id_formato}`;
    const json = JSON.stringify({
      descripcion: adm_012.descripcion,
      sigla: adm_012.sigla,
      tamano_impresion: adm_012.tamano_impresion,
      moneda: adm_012.moneda,
      codigo_cuenta: adm_012.codigo_cuenta,
      numero_copias: adm_012.numero_copias,
      codigo_qr: adm_012.codigo_qr,
      logo_empresa: adm_012.logo_empresa,
      estado: adm_012.estado,
    });
    return this.httpClient.put(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  delAdm012(id_modulo: number, id_formato: string) {
    const url1 = `${url.prod}${adm000.adm012.delAdm012}${id_modulo}/${id_formato}`;
    return this.httpClient.delete(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  inAdm012(adm_012: Adm012) {
    const url1 = `${url.prod}${adm000.adm012.inAdm012}`;
    const json = JSON.stringify({
      id_modulo: adm_012.id_modulo,
      id_formato: adm_012.id_formato,
      descripcion: adm_012.descripcion,
      sigla: adm_012.sigla,
      tamaño_impresion: adm_012.tamano_impresion,
      moneda: adm_012.moneda,
      codigo_cuenta: adm_012.codigo_cuenta,
      numero_copias: adm_012.numero_copias,
      codigo_qr: adm_012.codigo_qr,
      logo_empresa: adm_012.logo_empresa,
      estado: adm_012.estado,
    });
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  getAdm012Impr(idMod: string, idModulo: number, texto: string) {
    const url1 = `${url.prod}${adm000.adm012.getAdm012Impr}${idMod}/${idModulo}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
