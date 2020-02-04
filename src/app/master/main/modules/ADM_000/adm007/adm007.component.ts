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
  ListTipoRedesSociales : any;
  ListTipoTelefono : any;
  ListTipoEmail : any ; 
  ListaFiltrada : any ;
  ListContactos : any;
  ListModulos : any;
  ListCiudades : any ;
  idCiudad : string ="0010101" ;
  textPais : string = "";
  textDepartamento : string = "";
  ListDepartamentos : any;
  ListPaises : any ;

  constructor( private _adm007Service : Adm007Service,
              private _notyG: NotyGlobal) { 

  }

  ngOnInit() {
    this.ObtenerDatos();
    setTimeout(() => {
      initLabels();
    }, 1000);

  }

  /**@description */
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
        console.log("direcciones: ",  this.ListDirecciones);
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
  /* metodos auxiliares*/
  nada(){}
  Actualizar(){
    this.editar = false;
  }
  ModoEdicion(){
    this.editar = true;
  }
  ModoVista(){
    this.editar = false;
  }
  AgregarDireccion(){

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
  // SeparaTiposContacto(id : any){
  //   this.ListTipoContactos.forEach(element => {
  //     if(element.id_tipo_contacto == id){
  //       this.ListaFiltrada.push(element);
  //     }
  //   });
  // }
  AgregarId(){
    this.ListContactos.forEach(element => {
      element.id_contacto = ""+element.id_tipo_contacto+"-"+element.id_subtipo_contacto;
    });
    this.ListTipoContactos.forEach(element => {
      element.id_contacto = ""+element.id_tipo_contacto+"-"+element.id_tipo;
    });
  }
  MostrarCiudad(data : any){
    this.ListCiudades.forEach(element => {
      if(element.nombre_pais == data.ciudad){
        this.idCiudad = element.id_pais;
        this.textPais = data.pais;
        this.textDepartamento = data.departamento;
      }
    });
  }
  /**metodos auxiliares del tab */
}
