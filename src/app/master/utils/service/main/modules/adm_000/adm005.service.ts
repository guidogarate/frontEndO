import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { adm000 } from "src/app/master/config/adm000/adm000_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";

@Injectable()
export class Adm005Service {
  constructor(private httpClient: HttpClient) {}

  buscarAdm005(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm000.adm005.getAdm005}${modulo}/${indice}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  editaAdm005(codigo: string) {
    const json = JSON.stringify({
      codigo,
    });
    const url1 = `${url.prod}${adm000.adm005.updAdm005Cont}`;
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
