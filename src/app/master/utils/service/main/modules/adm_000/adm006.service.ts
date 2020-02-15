import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import adm006 from "src/app/master/config/adm000/adm006_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Adm006 } from "src/app/master/utils/models/main/adm_000/index.models";

@Injectable()
export class Adm006Service {
  token = sessionStorage.getItem("id");
  constructor(private httpClient: HttpClient) {}

  geAdm006(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm006.geAdm006}${modulo}/${indice}/${texto}`;
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

  geAdm006getUser(modulo: string, texto: string) {
    const url1 = `${url.prod}${adm006.geAdm006getUser}${modulo}/${texto}`;
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

  upAdm005(adm_006: Adm006[], login: string) {
    const json = JSON.stringify({
      login: adm_006[0].login,
      descripcion: adm_006[0].descripcion,
      foto:
        "https://www.socialtools.me/blog/wp-content/uploads/2016/04/foto-de-perfil.jpg",
      estado: adm_006[0].activo.toString(),
      id_grupo_acceso: adm_006[0].id_grupo_acceso,
      id_grupo_perfil: adm_006[0].id_grupo_perfil,
      id_tipo_usuario: adm_006[0].id_tipo_usuario,
      id_persona: adm_006[0].codigo_persona
    });
    const url1 = `${url.prod}${adm006.upAdm006}${login}`;
    return this.httpClient
      .put(url1, json, {
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

  deAdm006(login: string) {
    const url1 = `${url.prod}${adm006.deAdm006}${login}`;
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

  inAdm006(adm_006: Adm006[]) {
    const json = JSON.stringify({
      login: adm_006[0].login,
      descripcion: adm_006[0].descripcion,
      foto:
        "https://www.socialtools.me/blog/wp-content/uploads/2016/04/foto-de-perfil.jpg",
      estado: adm_006[0].activo.toString(),
      id_grupo_acceso: adm_006[0].id_grupo_acceso,
      id_grupo_perfil: adm_006[0].id_grupo_perfil,
      id_tipo_usuario: adm_006[0].id_tipo_usuario,
      id_persona: adm_006[0].codigo_persona
    });
    console.log(JSON.parse(json));

    const url1 = `${url.prod}${adm006.inAdm006}`;
    return this.httpClient
      .post(url1, json, {
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
}
