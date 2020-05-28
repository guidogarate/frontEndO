import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import {
  Cont005,
  Cont005Mod,
} from "src/app/master/utils/models/main/cont_000/index.models";
import cont005 from "src/app/master/config/cont000/cont005_url";

@Injectable()
export class Cont005Service {
  constructor(private httpClient: HttpClient) {}

  geCont005(modulo: string, indice: string, cantDat: string, texto: string) {
    const url1 = `${url.prod}${cont005.geCont005}${modulo}/${indice}/${cantDat}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  geCont005Mod(mod: string, modulo: number, idCta: number) {
    const url1 = `${url.prod}${cont005.geCont005Mod}${mod}/${modulo}/${idCta}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  upCont005(cont_004: Cont005Mod, modulo: string, id: string) {
    const url1 = `${url.prod}${cont005.upCont005}${modulo}/${id}`;
    const json = JSON.stringify({
      descripcion: cont_004.descripcion,
      sigla: cont_004.sigla,
      estado: cont_004.estado,
      tipo_transaccion: cont_004.tipo_transaccion.toString(),
      formato_impresion: cont_004.formato_impresion.toString(),
    });
    return this.httpClient.put(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  deCont005(modulo: string, id: string) {
    const url1 = `${url.prod}${cont005.deCont005}${modulo}/${id}`;
    return this.httpClient.delete(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  inCont005(cont_004: Cont005Mod, id_modulo: string) {
    const url1 = `${url.prod}${cont005.inCont005}`;
    let estado: string = "";
    if (cont_004.estado === undefined) {
      cont_004.estado = false;
    }
    if (cont_004.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    const json = JSON.stringify({
      id_modulo,
      id_comprobante: "auto",
      descripcion: cont_004.descripcion,
      tipo_transaccion: cont_004.tipo_transaccion,
      formato_impresion: cont_004.formato_impresion,
      sigla: cont_004.sigla,
      estado,
    });
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
