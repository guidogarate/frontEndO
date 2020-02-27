import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import adm009 from "src/app/master/config/adm000/adm009_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Adm009 } from "src/app/master/utils/models/main/adm_000/index.models";

@Injectable()
export class Adm009Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  geAdm009(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm009.geAdm009}${modulo}/${indice}/${texto}`;
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  upAdm009(adm_006: Adm009[], login: string, img: File) {
    const url1 = `${url.prod}${adm009.upAdm009}${login}`;
    const fd = "hjh";
    return this.httpClient.put(url1, fd, {
      headers: new HttpHeaders({
        authorization: this.token
      })
    });
  }

  deAdm009(login: string) {
    const url1 = `${url.prod}${adm009.deAdm009}${login}`;
    return this.httpClient
      .delete(url1, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }

  inAdm009(adm_006: Adm009[], img: File) {
    const url1 = `${url.prod}${adm009.inAdm009}`;
    const fd = "hjh";
    return this.httpClient.post(url1, fd, {
      headers: new HttpHeaders({
        authorization: this.token
      })
    });
  }
}
