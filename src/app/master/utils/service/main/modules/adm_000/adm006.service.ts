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

  upAdm006(adm_006: Adm006[], login: string, img: File) {
    const url1 = `${url.prod}${adm006.upAdm006}${login}`;
    const fd = new FormData();
    fd.append("login", adm_006[0].login);
    fd.append("descripcion", adm_006[0].descripcion);
    fd.append("estado", adm_006[0].id_estado.toString());
    fd.append("id_grupo_acceso", adm_006[0].id_grupo_acceso);
    fd.append("id_grupo_perfil", adm_006[0].id_grupo_perfil.toString());
    fd.append("id_tipo_usuario", adm_006[0].id_tipo_usuario);
    fd.append("id_persona", adm_006[0].codigo_persona);
    if (img) {
      fd.append("foto", img, img.name);
    } else {
      fd.append("foto_url", adm_006[0].foto);
    }
    return this.httpClient.put(url1, fd, {
      headers: new HttpHeaders({
        authorization: this.token
      })
    });
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

  inAdm006(adm_006: Adm006[], img: File) {
    const url1 = `${url.prod}${adm006.inAdm006}`;
    const fd = new FormData();
    fd.append("login", adm_006[0].login);
    fd.append("descripcion", adm_006[0].descripcion);
    fd.append("estado", adm_006[0].id_estado.toString());
    fd.append("id_grupo_acceso", adm_006[0].id_grupo_acceso);
    fd.append("id_grupo_perfil", adm_006[0].id_grupo_perfil.toString());
    fd.append("id_tipo_usuario", adm_006[0].id_tipo_usuario);
    fd.append("id_persona", adm_006[0].codigo_persona);
    if (img) {
      fd.append("foto", img, img.name);
    }
    return this.httpClient.post(url1, fd, {
      headers: new HttpHeaders({
        authorization: this.token
      })
    });
  }
}
