import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import adm009 from "src/app/master/config/adm000/adm009_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Adm009 } from "src/app/master/utils/models/main/adm_000/index.models";

@Injectable()
export class Adm009Service {
  constructor(private httpClient: HttpClient) {}

  geAdm009(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm009.geAdm009}${modulo}/${indice}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  upAdm009(adm_009: Adm009, id_cod: string) {
    const url1 = `${url.prod}${adm009.upAdm009}${id_cod}`;
    let estado: string = "";
    if (adm_009.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    const json = JSON.stringify({
      division: adm_009.tipo_territorio,
      dependencia: adm_009.dependencia,
      descripcion: adm_009.descripcion,
      sigla: adm_009.sigla,
      estado,
    });
    return this.httpClient.put(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  deAdm009(id_cod: string) {
    const url1 = `${url.prod}${adm009.deAdm009}${id_cod}`;
    return this.httpClient.delete(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  inAdm009(adm_009: Adm009) {
    const url1 = `${url.prod}${adm009.inAdm009}`;
    let estado: string = "";
    if (adm_009.estado === undefined) {
      adm_009.estado = false;
    }
    if (adm_009.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    if (adm_009.codigo === "" || adm_009.codigo === undefined) {
      adm_009.codigo = "auto";
    }
    const json = JSON.stringify({
      division: adm_009.tipo_territorio,
      dependencia: adm_009.dependencia,
      descripcion: adm_009.descripcion,
      sigla: adm_009.sigla,
      estado,
      codigo: adm_009.codigo,
    });
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
