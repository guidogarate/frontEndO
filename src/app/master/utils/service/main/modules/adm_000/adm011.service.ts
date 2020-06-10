import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { adm000 } from "src/app/master/config/adm000/adm000_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Adm011 } from "src/app/master/utils/models/main/adm_000/index.models";

@Injectable()
export class Adm011Service {
  constructor(private httpClient: HttpClient) {}

  getAdm011(
    modulo: string,
    indice: string,
    idModulo: number,
    nroRegistros: string,
    texto: string
  ) {
    const url1 = `${url.prod}${adm000.adm011.getAdm011}${modulo}/${indice}/${idModulo}/${nroRegistros}/${texto}`;

    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  upAdm011(adm_011: Adm011, id_modulo: number, id_documento: string) {
    const url1 = `${url.prod}${adm000.adm011.upAdm011}${id_modulo}/${id_documento}`;
    console.log("adm011", adm_011);
    const json = JSON.stringify({
      descripcion: adm_011.descripcion,
      sigla: adm_011.sigla,
      componente: adm_011.componente,
      estado: adm_011.estado,
    });
    return this.httpClient.put(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  delAdm011(id_modulo: number, id_documento: string) {
    const url1 = `${url.prod}${adm000.adm011.delAdm011}${id_modulo}/${id_documento}`;
    return this.httpClient.delete(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  inAdm011(adm_011: Adm011) {
    const url1 = `${url.prod}${adm000.adm011.inAdm011}`;
    console.info("url1 in: ", url1);
    console.info("adm_011: ", adm_011);
    const json = JSON.stringify({
      id_modulo: adm_011.id_modulo,
      id_documento: adm_011.id_documento,
      descripcion: adm_011.descripcion,
      sigla: adm_011.sigla,
      componente: adm_011.componente,
      estado: adm_011.estado,
    });
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  getAdm011Pdf(usuario: string, idModulo: number) {
    const url1 = `${url.prod}${adm000.adm011.getPdf}${usuario}/${idModulo}`;
    console.log("url get: ", url1);
    return this.httpClient.get(url1);
  }

  getAdm011Impr(idMod: string, pag: string, texto: string) {
    const url1 = `${url.prod}${adm000.adm011.getAdm011Impr}${idMod}/${pag}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  getAdm011Excel(usuario: string, idModulo: number) {
    console.log("excel");
    const url1 = `${url.prod}${adm000.adm011.getPdf}${usuario}/${idModulo}`;
    console.log("url get: ", url1);
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        window.open(url1);
        console.log(resp);
        return resp;
      })
    );
  }
}
