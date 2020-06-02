import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import url from "src/app/master/config/url.config";
import adm0007 from "src/app/master/config/adm000/adm007_url";
import { map } from "rxjs/operators";

@Injectable()
export class Adm007Service {
  constructor(private httpClient: HttpClient) {}

  ObtenerParametros() {
    const url1 = `${url.prod}${adm0007.get_datos_empresa}` + "90";
    return this.httpClient.get(url1).pipe(
      map((resp) => {
        console.log(resp);
        return resp;
      })
    );
  }

  ActualizarDatos(item: any) {
    console.log("service Actualizar data: ", item);
    const url1 = `${url.prod}${adm0007.insert_datos_empresa}`;
    console.log(url1, item);
    return this.httpClient.post(url1, item).pipe(
      map((resp) => {
        console.log(resp);
        return resp;
      })
    );
  }

  Eliminar(tipo: number, id: number) {
    console.log("service Actualizar data: ", tipo, id);
    const url1 = `${url.prod}${adm0007.delete_datos_empresa}` + tipo + "/" + id;
    console.log(url1);
    return this.httpClient.delete(url1).pipe(
      map((resp) => {
        console.log(resp);
        return resp;
      })
    );
  }

  InsertarImagen(img: File) {
    sessionStorage.setItem("img", "1");
    const url1 = `${url.prod}${adm0007.insert_logo_empresa}`;
    const fd = new FormData();
    if (img) {
      fd.append("logo", img, img.name);
      console.log("cargando logo");
    }
    return this.httpClient.post(url1, fd).pipe(
      map((resp) => {
        console.log(resp);
        return resp;
      })
    );
  }
}
