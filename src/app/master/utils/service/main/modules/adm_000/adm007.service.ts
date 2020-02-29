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

  // **** nuevo actualizar para foto
  // inAdm006(item : any, img: File) {
  //   const url1 = `${url.prod}${adm006.inAdm006}`;
  //   const fd = new FormData();
  //   fd.append("login", adm_006[0].login);
  //   fd.append("descripcion", adm_006[0].descripcion);
  //   fd.append("estado", adm_006[0].id_estado.toString());
  //   fd.append("id_grupo_acceso", adm_006[0].id_grupo_acceso);
  //   fd.append("id_grupo_perfil", adm_006[0].id_grupo_perfil.toString());
  //   fd.append("id_tipo_usuario", adm_006[0].id_tipo_usuario);
  //   fd.append("id_persona", adm_006[0].codigo_persona);
  //   if (img) {
  //     fd.append("foto", img, img.name);
  //   }
  //   return this.httpClient.post(url1, fd, {
  //     headers: new HttpHeaders({
  //       authorization: this.token
  //     })
  //   });
  // }

  /* 
  
   "razon_social": this.lista[0].razon_social,
      "sigla": this.lista[0].sigla,
      "id_actividad": this.lista[0].id_actividad_empresarial,
      "nit": this.lista[0].nit,
      "foto":"" ,
      "direcciones": this.direcciones,
      "contactos" : this.contactos
  */

  ActualizarDatos1(item: any,img: File) {
    console.log("service Actualizar data: ", item, img);
    const url1 = `${url.prod}${adm0007.insert_datos_empresa}`;
    
    const fd = new FormData();
    fd.append("razon_social", item.razon_social);
    fd.append("sigla", item.sigla);
    fd.append("id_actividad", item.id_actividad.toString());
    fd.append("nit", item.nit);
    fd.append("direcciones", item.direcciones);
    fd.append("contactos", item.contactos);
    if (img) {
      fd.append("logo", img, img.name);
      console.log("cargando logo");
    }else{
      fd.append("logo_url", item.logo_empresa.toString());
      console.log("cargando logo");
    }
    console.log(url1,fd);
    return this.httpClient
      .post(url1, fd, {
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
