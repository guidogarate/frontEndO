import { Component, OnInit } from '@angular/core';
import { Adm007Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
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
  ListDirecciones : any ;
  ListTipoContactos: any ;
  ListContactos : any;
  ListModulos : any;
  ListCuidades : any ;
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
        console.log("empresa: ",  this.lista[0].razon_social);
        this.ListActividadEmpresarial = this.lista["actividad_empresarial"];
        this.ListTipoDirecciones = this.lista["tipo_direcciones"];
        this.ListDirecciones = this.lista["direcciones"];
        this.ListTipoContactos = this.lista["tipo_contactos"];
        this.ListContactos = this.lista["contactos"];
        this.ListModulos = this.lista["modulos"];
        this.ListPaises = this.lista["paises"];
        this.ListDepartamentos = this.lista["departamentos"];;
        this.ListCuidades = this.lista["ciudades"];
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

  /**metodos auxiliares del tab */
}
