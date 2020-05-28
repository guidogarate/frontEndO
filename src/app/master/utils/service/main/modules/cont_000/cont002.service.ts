import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Cont003 } from "src/app/master/utils/models/main/cont_000/index.models";
import cont002 from "src/app/master/config/cont000/cont002_url";

@Injectable()
export class Cont002Service {
  constructor(private httpClient: HttpClient) {}

  geCont002(modulo: string, indice: string, gestion: string, texto: string) {
    const url1 = `${url.prod}${cont002.geCont002}${modulo}/${indice}/${gestion}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  upCont002(cont_003: Cont003, gestion: string, id_cod: string) {
    const url1 = `${url.prod}${cont002.upCont002}${gestion}/${id_cod}`;
    let estado: string = "";
    if (cont_003.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    const json = JSON.stringify({
      descripcion: cont_003.descripcion,
      sigla: cont_003.sigla,
      estado,
    });
    return this.httpClient.put(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  deCont002(gestion: string, id_cod: string) {
    const url1 = `${url.prod}${cont002.deCont002}${gestion}/${id_cod}`;
    return this.httpClient.delete(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  inCont002(cont_003: Cont003) {
    const url1 = `${url.prod}${cont002.inCont002}`;
    let estado: string = "";
    let codigo: string = "";
    if (cont_003.estado === undefined) {
      cont_003.estado = false;
    }
    if (cont_003.estado) {
      estado = "1";
    } else {
      estado = "0";
    }
    if (cont_003.checkauto) {
      codigo = "auto";
    } else {
      codigo = cont_003.idunidaddivision;
    }
    const json = JSON.stringify({
      division: cont_003.division,
      dependencia: cont_003.dependencia,
      descripcion: cont_003.descripcion,
      sigla: cont_003.sigla,
      estado,
      codigo,
    });
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
