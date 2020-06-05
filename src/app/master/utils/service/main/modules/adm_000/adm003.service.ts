import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { adm000 } from "src/app/master/config/adm000/adm000_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";

@Injectable()
export class Adm003Service {
  constructor(private httpClient: HttpClient) {}

  buscarAdm003(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm000.adm003.getAdm003}${modulo}/${indice}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  nuevoAdm003(adamcodm: string, dato: any) {
    const json = JSON.stringify({
      adamcodm,
      adamtipa: dato.adamtipa,
      adamdesc: dato.adamdesc,
      adamesta: dato.adamesta,
      adamsigl: dato.adamsigl,
    });
    const url1 = `${url.prod}${adm000.adm003.insAdm003}`;
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  editarAdm003(adamcodm: string, adamtipa: string, datos: any) {
    const url1 = `${url.prod}${adm000.adm003.updAdm003}${adamcodm}/${adamtipa}`;
    return this.httpClient.put(url1, datos).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  buscarAdm003Sub(adamtipa: string) {
    const url1 = `${url.prod}${adm000.adm003.getAdm003Sub}${adamtipa}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  nuevoAdm003Sub(adamcodm: string, adamtipa: string, dato: any) {
    const datos = [dato[dato.length - 1]];
    const json = JSON.stringify({
      adamcodm,
      adamtipa,
      datos,
    });
    const url1 = `${url.prod}${adm000.adm003.insAdm003Sub}`;
    return this.httpClient.post(url1, json).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  editarAdm003Sub(adamcodm: string, adamtipa: string, datos: any) {
    const url1 = `${url.prod}${adm000.adm003.updAdm003Sub}${adamcodm}/${adamtipa}`;
    return this.httpClient.put(url1, datos).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  eliminarAdm003Ambos(adamcodm: string, adamtipa: string, adamidea: string) {
    const url1 = `${url.prod}${adm000.adm003.delAdm003}${adamcodm}/${adamtipa}/${adamidea}`;
    return this.httpClient.delete(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
