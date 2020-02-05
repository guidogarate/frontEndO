import { Component, OnInit } from '@angular/core';
import { Adm007Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
import { element } from 'protractor';
declare function initLabels ();

@Component({
  selector: 'app-adm007',
  templateUrl: './adm007.component.html',
  styleUrls: ['./adm007.component.css']
})
export class Adm007Component implements OnInit {

  editar : boolean = false;
  ocultarSeccion : boolean = false;
  lista : any ;
  ListActividadEmpresarial :  any;
  ListTipoDirecciones : any;
  idTipoDireccion : string ="1" ;
  ListDirecciones : any ;
  ListTipoContactos: any ;
  ListContactos : any;
  ListModulos : any;
  ListCiudades : any ;
  idCiudad : string ="";
  textPais : string = "";
  textDepartamento : string = "";
  ListDepartamentos : any;
  ListPaises : any ;
  direcciones : any  = [];
  contactos : any = [];
  // nueva direccion a adicionar
  ListSend : any = {}; 
  newDirection : any = {
    "id_tipo_direccion": 1,
    "estado": true,
    "direccion": "",
    "id_direccion": 1,
    "tipo_direccion": "Propietario",
    "pais": "",
    "departamento": "",
    "ciudad": "Santa Cruz ",
    "id_ciudad":"0010101"
  };

  newContacto : any =   {
    "id_tipo_contacto": 33,
    "id_subtipo_contacto": 2,
    "id_contacto": "33-2",
    "codigo_contacto": "",
    "contacto": "",
    "estado": true,
    "tipo": "Fijo"
  };

  constructor( private _adm007Service : Adm007Service,
              private _notyG: NotyGlobal) { 

  }

  ngOnInit() {
    this.ObtenerDatos();
    setTimeout(() => {
      initLabels();
    }, 1000);

  }

  ObtenerDatos(){
    this._adm007Service
    .ObtenerParametros()
    .subscribe(resp => {
      if (resp ["ok"]) {
        this.lista = resp["datos"];
        this.ListActividadEmpresarial = this.lista[0]["actividad_empresarial"];
        this.ListTipoDirecciones = this.lista[0]["tipo_direcciones"];
        this.ListDirecciones = this.lista[0]["direcciones"];
        this.CambiarTipoEstado();
        this.ListContactos = this.lista[0]["contactos"];
        this.ListTipoContactos = this.lista[0]["tipo_contactos"];
        this.AgregarId();
        this.ListModulos = this.lista[0]["modulos"];
        this.ListPaises = this.lista[0]["paises"];
        this.ListDepartamentos = this.lista[0]["departamentos"];;
        this.ListCiudades = this.lista[0]["ciudades"];
        initLabels();
      }
      else {
        console.log("error: ", resp["mensaje"])
      }
    });
  }

  ActualizarDatos(){
    console.log("lista para guardar: ", this.ListSend);
    this._adm007Service
    .ActualizarDatos(this.ListSend)
    .subscribe(resp => {
      if(resp["true"]){
        console.log("datos actualizados correctamente");
      }
      else {
        console.log("error al guardar los datos");
        console.log(resp);
      }
    });
  }
  /* metodos auxiliares*/
  nada(){}

  Actualizar(){
    this.AgregarDireccion();
    this.editar = false;
    this.ActualizarDatos();
  }
  ModoEdicion(){
    this.editar = true;
    // this.AgregarDireccion();
  }
  ModoVista(){
    this.editar = false;
    this.LimpiarData();
    this.limpiarDataContacto();
  }
  AgregarDireccion(){
    this.pasarDatosDireccion();
    this.newContacto.estado= this.newContacto.estado == true ? 0 : 1
    this.newDirection.estado= this.newDirection.estado == true ? 0 : 1
    this.direcciones.push(this.newDirection);
    this.contactos.push(this.newContacto);
    this.ListDirecciones.push(this.newDirection); 
    this.ListContactos.push(this.newContacto);
    this.LimpiarData();
    this.limpiarDataContacto();
  }

  pasarDatosDireccion (){
    this.ListSend ={
      "razon_social": this.lista[0].razon_social,
      "sigla": this.lista[0].sigla,
      "id_actividad": this.lista[0].id_actividad_empresarial,
      "nit": this.lista[0].nit,
      "direcciones": this.direcciones,
      "contactos" : this.contactos
      };
  }

  LimpiarData(){
    this.idCiudad="0010101";
    this.newDirection  = {
      "id_tipo_direccion": 1,
      "estado": true,
      "direccion": "",
      "id_direccion": 1,
      "tipo_direccion": "Propietario",
      "pais": "",
      "departamento": "",
      "ciudad": "Santa Cruz ",
      "id_ciudad":"0010101"
    };
    this.textPais = "";
    this.textDepartamento = "";
  }

  limpiarDataContacto(){
    this.newContacto =  {
      "id_tipo_contacto": 33,
      "id_subtipo_contacto": 2,
      "id_contacto": "33-2",
      "codigo_contacto": "",
      "contacto": "",
      "estado": true,
      "tipo": "Fijo"
    };
  }
  AgregarTelefono(){
    
  }

  Ocultar(){
    this.ocultarSeccion = true;
  }

  Mostrar(){
    this.ocultarSeccion = false;
  }

  /** poner estado a uno o cero en las direcciones */
  CambiarTipoEstado(){
    this.ListDirecciones.forEach( element => {
      element = element.estado == 0 ? true : false
    });
  }

  AgregarId(){
    this.ListContactos.forEach(element => {
      element.id_contacto = ""+element.id_tipo_contacto+"-"+element.id_subtipo_contacto;
    });
    this.ListTipoContactos.forEach(element => {
      element.id_contacto = ""+element.id_tipo_contacto+"-"+element.id_tipo;
    });
  }

  ColocarCodigoContacto( ){
    this.newContacto.id_tipo_contacto = this.newContacto.id_contacto.slice(0,2);
    this.newContacto.id_subtipo_contacto = this.newContacto.id_contacto.slice(3);
    this.BuscarNombreTipoContacto( +this.newContacto.id_tipo_contacto, +this.newContacto.id_subtipo_contacto);
  }

  BuscarNombreTipoContacto(tipo : number, subtipo : number){
    this.ListTipoContactos.forEach( element => {
      if(element.id_tipo_contacto == tipo && element.id_tipo == subtipo){
          this.newContacto.tipo = element.tipo;
      }
    });
  }
  ObtenerPais(codigo : string){
    var codPais = codigo.slice(0, 3);
    return codPais;
  }
  BuscarPais(codigo: string){
    this.ListPaises.forEach(element => {
      if (element.id_pais == codigo){
        this.newDirection.pais = element.nombre_pais;
      }
    });
  }
  ObtenerDepartamento(codigo : string){
    var codDep = codigo.slice(0, 5);
    return codDep;
  }
  BuscarDepartamento(codigo : string){
    this.ListDepartamentos.forEach( element => {
      if(element.id_pais == codigo){
        this.newDirection.departamento = element.nombre_pais;
      }
    });
  }
  BuscarNombreCiudad(codigo : string){
    this.ListCiudades.forEach( element => {
      if(element.id_pais == codigo){
        this.newDirection.ciudad = element.nombre_pais;
      }
    });
  }
  MostrarCiudad(data : any){
    if(this.editar){
          this.BuscarDepartamento(this.ObtenerDepartamento(this.idCiudad));
          this.BuscarPais(this.ObtenerPais(this.idCiudad));
          this.newDirection.id_ciudad = this.idCiudad;
          this.BuscarNombreCiudad(this.idCiudad);
        
    }else{
      this.ListCiudades.forEach(element => {
        if(element.nombre_pais == data.ciudad){
          this.idCiudad = element.id_pais;
          this.textPais = data.pais;
          this.textDepartamento = data.departamento;
        }
      });
    }
  }
  /**metodos auxiliares del tab */
}
