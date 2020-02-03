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
  idTipoDireccion : string ="1" ;
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
        this.ListActividadEmpresarial = this.lista[0]["actividad_empresarial"];
        this.ListTipoDirecciones = this.lista[0]["tipo_direcciones"];
        this.ListDirecciones = this.lista[0]["direcciones"];
        console.log("direcciones: ",  this.ListDirecciones);
        this.ListTipoContactos = this.lista[0]["tipo_contactos"];
        this.ListContactos = this.lista[0]["contactos"];
        this.ListModulos = this.lista[0]["modulos"];
        this.ListPaises = this.lista[0]["paises"];
        this.ListDepartamentos = this.lista[0]["departamentos"];;
        this.ListCuidades = this.lista[0]["ciudades"];
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
