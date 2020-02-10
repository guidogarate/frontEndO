import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import url from 'src/app/master/config/url.config';
import adm0007 from 'src/app/master/config/adm000/adm007_url';
import { map } from 'rxjs/operators';

@Injectable()
export class Adm007Service {

  token = sessionStorage.getItem("id");  

  constructor(private httpClient: HttpClient) {
    console.log("cargando predeterminados adm004service: ");
  }

  ObtenerParametros() {
    const url1 = `${url.prod}${adm0007.get_datos_empresa}`+'90';
    return this.httpClient
      .get(url1, {
        headers: new HttpHeaders({
          authorization: this.token
        })
      })
      .pipe(
        map(resp => {
          console.log(resp);
          return resp;
        })
      );
  }
 
  

  ActualizarDatos(item: any) {
    console.log("service Actualizar data: ", item);
    const url1 = `${url.prod}${adm0007.insert_datos_empresa}`;
    console.log(url1,item);
    return this.httpClient
      .post(url1, item, {
        headers: new HttpHeaders({
          authorization: this.token,
          "Content-Type": "application/json"
        })
      })
      .pipe(
        map(resp => {
          console.log(resp);
          return resp;
        })
      );
  }

  
}
