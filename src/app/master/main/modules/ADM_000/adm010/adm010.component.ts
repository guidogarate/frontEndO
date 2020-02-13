import { Component, OnInit } from '@angular/core';
import { Adm010Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
declare function initLabels ();

@Component({
  selector: 'app-adm010',
  templateUrl: './adm010.component.html',
  styleUrls: ['./adm010.component.css']
})
export class Adm010Component implements OnInit {

  editar : boolean = false;
  lista : any ;
  actividadEmpresarial : any = [];
  estructuraPlanDeCuentas : any = [];
  Listnaturalezas : any = [];
  cuentas : any = [];
  allCodigosNaturalezas : any = [];
  allNaturalezas : any = [];
  gestiones : any = [];
  ultimoElemento : any ;
  estructuras : any = [];
  newEstructura : any = {};
  naturalezas : any = [];
  newNaturaleza : any = {};

  constructor(
    private _notyG : NotyGlobal,
    private _adm010Service : Adm010Service
  ) { }

  ngOnInit() {
    this.ObtenerDatos();
  }
  ModoVista(){
    this.editar = false;
  }
  ModoEdicion(){
    this.editar = true;
  }
  Actualizar(){
    this.editar = false;
  }

  /** */
  nada(){}

  ObtenerDatos(){

    this._adm010Service
    .ObtenerParametrosIniciales()
    .subscribe(resp => {
      console.log(resp);
      if (resp ["ok"]) {
        this.lista = resp["datos"];
        this.estructuraPlanDeCuentas = this.lista[0]["estructura_plan_cuentas"];
        this.ultimoElemento = this.estructuraPlanDeCuentas[this.estructuraPlanDeCuentas.length-1];
        this.estructuraPlanDeCuentas.pop(); 
        this.actividadEmpresarial = this.lista[0]["actividad_empresarial"];
        this.Listnaturalezas = this.lista[0]["naturalezas"];
        this.cuentas = this.lista[0]["cuentas"];
        this.allCodigosNaturalezas = this.lista[0]["all_codigos_naturalezas"];
        this.allNaturalezas = this.lista[0]["all_naturalezas"];
        this.gestiones = this.lista[0]["gestiones"];
        
        setTimeout(() => {
          initLabels();
        }, 800);
      }
      else {
        console.log("error: ", resp["mensaje"])
      }
    });
  }

  EliminarPlanDeCuenta( posicion : number){
    console.log("Eliminar plan de cuentas: " , posicion);
  }
  EliminarNaturaleza(posicion : number){
    console.log("eliminar naturaleza: ", posicion);
  }
  AñadirEstructura(){

  }

}
