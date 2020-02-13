import { Injectable } from '@angular/core';
import url from 'src/app/master/config/url.config';
import adm0010 from 'src/app/master/config/adm000/adm010_url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Adm010Service {
  
  token = sessionStorage.getItem("id");  
  
  constructor(private httpClient: HttpClient) { }
// parametros_iniciales
  ObtenerParametrosIniciales() {
    const url1 = `${url.prod}${adm0010.parametros_iniciales}`+'90/'+'0';
    console.log(url1);
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

  Insertar(data : any, gestion : number){

    console.log("service insertar data: ", data);
    const url1 = `${url.prod}${adm0010.insert_parametros_iniciales}${gestion}`;
    console.log(url1,data);
    return this.httpClient
      .post(url1, data, {
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
  Actualizar(data : any, gestion : number ){
    console.log("service actualizar data: ", data);
    const url1 = `${url.prod}${adm0010.update_parametros_iniciales}${gestion}`;
    console.log(url1,data);
    return this.httpClient
      .put(url1, data, {
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
  Eliminar( gestion : number, id : number){
    console.log("service Delete data: ", gestion);
    const url1 = `${url.prod}${adm0010.update_parametros_iniciales}${gestion}${id}`;
    console.log(url1);
    return this.httpClient
      .put(url1, null, {
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
