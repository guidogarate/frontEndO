import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { adm000 } from "src/app/master/config/adm000/adm000_url";
import url from "src/app/master/config/url.config";
import { map } from "rxjs/operators";
import { Adm006 } from "src/app/master/utils/models/main/adm_000/index.models";

@Injectable()
export class Adm006Service {
  constructor(private httpClient: HttpClient) {}

  geAdm006(modulo: string, indice: string, texto: string) {
    const url1 = `${url.prod}${adm000.adm006.getAdm006}${modulo}/${indice}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  geAdm006getUser(modulo: string, texto: string) {
    const url1 = `${url.prod}${adm000.adm006.geAdm006User}${modulo}/${texto}`;
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  upAdm006(adm_006: Adm006, login: string, img: File, foto_url: string) {
    sessionStorage.setItem("img", "1");
    const url1 = `${url.prod}${adm000.adm006.updAdm006}${login}`;
    const fd = new FormData();
    fd.append("login", adm_006.login);
    fd.append("descripcion", adm_006.descripcion);
    fd.append("estado", adm_006.id_estado.toString());
    fd.append("id_grupo_acceso", adm_006.id_grupo_acceso);
    fd.append("id_grupo_perfil", adm_006.id_grupo_perfil.toString());
    fd.append("id_tipo_usuario", adm_006.id_tipo_usuario);
    fd.append("id_persona", adm_006.codigo_persona);
    if (img) {
      fd.append("foto", img, img.name);
    } else {
      fd.append("foto_url", foto_url);
    }
    return this.httpClient.put(url1, fd);
  }

  deAdm006(login: string) {
    const url1 = `${url.prod}${adm000.adm006.delAdm006}${login}`;
    return this.httpClient.delete(url1).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  inAdm006(adm_006: Adm006, img: File) {
    sessionStorage.setItem("img", "1");
    const url1 = `${url.prod}${adm000.adm006.insAdm006}`;
    const fd = new FormData();
    fd.append("login", adm_006.login);
    fd.append("descripcion", adm_006.descripcion);
    fd.append("estado", adm_006.id_estado.toString());
    fd.append("id_grupo_acceso", adm_006.id_grupo_acceso);
    fd.append("id_grupo_perfil", adm_006.id_grupo_perfil.toString());
    fd.append("id_tipo_usuario", adm_006.id_tipo_usuario);
    fd.append("id_persona", adm_006.codigo_persona);
    if (img) {
      fd.append("foto", img, img.name);
    }
    return this.httpClient.post(url1, fd);
  }
}
