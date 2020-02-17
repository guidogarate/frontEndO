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
  nuevo : boolean = false;
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
  listSend : any = {};
  idGestion : number = 2019;
  idActividad : number = 1;

  constructor(
    private _notyG : NotyGlobal,
    private _adm010Service : Adm010Service
  ) { }

  ngOnInit() {
    this.ObtenerDatos();
  }
  ModoVista(){
    this.editar = false;
    this.InicializarEstructura();
    this.InicializarNaturaleza();
  }
  ModoEdicion(){
    this.editar = true;
  }
  Actualizar(){
    this.editar = false;
  }

  Agregar(){

  }

  /** */
  nada(){}

  ObtenerDatos(){
    this._adm010Service
    .ObtenerParametrosIniciales(this.idGestion)
    .subscribe(resp => {
      console.log(resp);
      if (resp ["ok"]) {
        this.lista = resp["datos"];
        this.estructuraPlanDeCuentas = this.lista[0]["estructura_plan_cuentas"];
        if(this.estructuraPlanDeCuentas != null){
          this.ultimoElemento = this.estructuraPlanDeCuentas[this.estructuraPlanDeCuentas.length-1];
          this.estructuraPlanDeCuentas.pop(); 
        }
        else {
          this.ultimoElemento =  null;
        }
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

  EliminarPlanDeCuenta( item :number){
    console.log("Eliminar plan de cuentas: " , item);
    console.log(" count List: ", this.estructuraPlanDeCuentas.length);
    this.Eliminar(item);
  }
  EliminarNaturaleza(item : number){
    console.log("eliminar naturaleza: ", item);
    this.Eliminar(item);
  }
  AddEstructura(){
    this.InicializarListsSend();
    this.estructuras.push(this.newEstructura);
    console.log(this.newEstructura);
    console.log(this.listSend);
    this.Insertar();
    this.estructuras = [];
  }

  Insertar(){
    this._adm010Service
    .Insertar(this.listSend,this.idGestion)
    .subscribe(resp => {
      if(resp["ok"]){
        this.ModoVista();
        this.ModoEdicion();
        this.ObtenerDatos();
        this._notyG.noty("success","datos guardados exitosamente",3500);
      }
      else{
        this._notyG.noty("warning","no se pudo guardar los datos",3500);
      }
    });
    
  }
  Eliminar(id: number){
    this._adm010Service
    .Eliminar(id,this.idGestion)
    .subscribe( resp => {
      if(resp["ok"]){
          this._notyG.noty("success","datos eliminados correctamente",3500);
          this.ObtenerDatos();
          this.InicializarEstructura();
          this.InicializarNaturaleza();
        }
        else{
          this._notyG.noty("warning","no se pudo eliminar los datos",3500);
          console.log(resp);
      }

    });   
  }
  AddNaturaleza(){
    this.InicializarListsSend();
    this.naturalezas.push(this.newNaturaleza);
    console.log(this.newNaturaleza);
    console.log(this.listSend);
    this.Insertar();
    this.naturalezas = [];

  }
  InicializarEstructura(){
    this.newEstructura = {
      nombre : "",
      largo : 0,
      separador : ""
    }
  }
  InicializarNaturaleza(){
    this.newNaturaleza = {
      id_codigo : 0,
      id_naturaleza : 0
    }
  }
  InicializarListsSend(){
    this.listSend = {
      "estructuras": this.estructuras,
      "naturalezas": this.naturalezas
    }
  }

  Update( ){
    this._adm010Service
    .Actualizar(this.listSend , this.idGestion )
    .subscribe(resp => {
      if(resp["ok"]){
        this.ModoVista();
        this.ModoEdicion();
        this.ObtenerDatos();
        this._notyG.noty("success","registro actualizado correctamente",3500);
      }
      else{
        this._notyG.noty("warning","no se actualizo los datos, revise los datos",3500);
      }
    });
  }

  ActualizarEd(item : any){
    console.log(item);
    this.InicializarListsSend();
    this.newEstructura.id_estructura = item.id_estructura;
    this.newEstructura.nombre = item.nombre;
    this.newEstructura.largo = item.largo;
    this.newEstructura.separador = item.separador;
    this.estructuras.push(this.newEstructura);
    console.log(this.listSend);
    this.Update();
    this.estructuras = [];
  }
  ActualizarNat(item : any){
    console.log(item);
    this.InicializarListsSend();
    this.newNaturaleza.id_codigo = item.id_codigo;
    this.newNaturaleza.id_naturaleza = item.id_naturaleza;
    this.naturalezas.push(this.newNaturaleza);
    console.log(this.listSend);
    this.Update();
    this.estructuras = [];
  }

}
