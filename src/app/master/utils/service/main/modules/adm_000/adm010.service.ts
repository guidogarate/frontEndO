import { Injectable } from '@angular/core';
import url from 'src/app/master/config/url.config';
import adm0010 from 'src/app/master/config/adm000/adm010_url';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Adm010Service {
  httpClient: any;
  token = sessionStorage.getItem("id");  


  constructor() { }
// parametros_iniciales
ObtenerParametrosIniciales() {
  const url1 = `${url.prod}${adm0010.parametros_iniciales}`+'90';
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
}
