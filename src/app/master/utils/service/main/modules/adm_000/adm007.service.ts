import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import url from 'src/app/master/config/url.config';
import adm0007 from 'src/app/master/config/adm000/adm007_url';
import { map } from 'rxjs/operators';

@Injectable()
export class Adm007Service {

  token = sessionStorage.getItem("id");  

  constructor(private httpClient: HttpClient) {
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

  Eliminar(tipo: number,id : number){
    console.log("service Actualizar data: ",tipo, id);
    const url1 = `${url.prod}${adm0007.delete_datos_empresa}`+tipo+'/'+id;
    console.log(url1);
    return this.httpClient
      .delete(url1, {
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

  ActualizarDatos1(item: any,img: File) {
    // console.log("service Actualizar data: ", item, img);
    // console.log("contactos: ", item.contactos);
    const url1 = `${url.prod}${adm0007.insert_datos_empresa}`;
    const fd = new FormData();
    fd.append("razon_social", item.razon_social);
    fd.append("sigla", item.sigla);
    fd.append("id_actividad", item.id_actividad.toString());
    fd.append("nit", item.nit);
    fd.append("direcciones", item.direcciones);
      fd.append("contactos",item.contactos );
    if (img) {
      fd.append("logo", img, img.name);
      console.log("cargando logo");
    }else{
      if(item.logo_empresa!= null){
        fd.append("logo_url", item.logo_empresa.toString());
      }else{
        fd.append("logo_url", null);
      }
      console.log("cargando logo_url");
    }
    console.log("razon social form data: ",fd.get("razon_social"));
    console.log("sigla form data: ",fd.get("sigla"));
    console.log("id actividad form data: ",fd.get("id_actividad"));
    console.log("nit form data: ",fd.get("nit"));
    console.log("direcciones form data: ",fd.get("direcciones"));
    console.log("contactos form data: ",fd.get("contactos"));
    console.log("logo form data: ",fd.get("logo"));
    return this.httpClient.post(url1, fd, {
      headers: new HttpHeaders({
        authorization: this.token
      })
    });
  }
  
}
