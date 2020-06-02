import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { cont000 } from "src/app/master/config/cont000/cont000_url";
import url from "src/app/master/config/url.config";
import {
  Cont004,
  Cont004Del,
} from "src/app/master/utils/models/main/cont_000/index.models";

@Injectable()
export class Cont004Service {
  constructor(private httpClient: HttpClient) {}

  geCont004Ctas(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${cont000.cont004.getCont004Ctas}${modulo}/${indice}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  geCont004Cta(modulo: string, idCta: number) {
    const url1 = `${url.prod}${cont000.cont004.getCont004Cta}${modulo}/${idCta}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  upCont004(cont_004: Cont004, id_cod: string) {
    console.log("editando");

    const url1 = `${url.prod}${cont000.cont004.updCont004}${id_cod}`;
    const json = JSON.stringify(cont_004);
    return this.httpClient.put(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  deCont004(cont_004: Cont004Del) {
    const url1 = `${url.prod}${cont000.cont004.delCont004}`;
    const json = JSON.stringify({ cuentas: cont_004 });
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  inCont004(cont_004: Cont004) {
    const url1 = `${url.prod}${cont000.cont004.insCont004}`;
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
      descripcion: cont_004.descripcion,
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
