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
  tope : number = 0;
  totalLargo : number = 0;
  ListUpdatesPlan : any = [];
  ListUpdatesNaturalezas : any = [];

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
          this.tope = this.estructuraPlanDeCuentas.length;
          this.totalLargo = this.ultimoElemento.largo;
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
    this.RemoverPlan(item);
    this.Eliminar(item);
    this.tope = this.tope - 1;
  }

  RemoverPlan ( id : any ) {
    let valor = 1;
    let pos = 1;
    let v1 : number = 0;
    // const found = this.estructuraPlanDeCuentas.find(element => element.id_estructura == id);
    this.estructuraPlanDeCuentas.forEach( element => {
      if(element.id_estructura == id){
        valor = element.largo;
        console.log("valor: ",element);
        v1 = pos;
      }  
        pos = pos + 1;
        console.log("pos: ", pos);
      
    });
    console.log("removiendo: ", v1);
    if ( v1 !== 0 ) {
        this.estructuraPlanDeCuentas.splice( (v1-1), 1 );
        this.totalLargo = this.totalLargo - valor;
        this.ultimoElemento.largo = this.totalLargo;
    }
    console.log(this.estructuraPlanDeCuentas);
    console.log(this.totalLargo);
    console.log(this.ultimoElemento);
  }

  EliminarNaturaleza(item : number){
    console.log("eliminar naturaleza: ", item);
    this.Eliminar(item);
  }
  AddEstructura(){
    // this.InicializarListsSend();
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
        // this.ModoEdicion();
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
          // this.ObtenerDatos();
          // this.InicializarEstructura();
          // this.InicializarNaturaleza();
        }
        else{
          this._notyG.noty("warning","no se pudo eliminar los datos",3500);
          console.log(resp);
      }

    });   
  }
  AddNaturaleza(){
    // this.InicializarListsSend();
    this.naturalezas.push(this.newNaturaleza);
    console.log(this.newNaturaleza);
    console.log(this.listSend);
    this.Insertar();
    this.naturalezas = [];

  }
  InicializarEstructura(){
    this.newEstructura = {
      id_estructura : 0,
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
  InicializarListsUpdates(){
    this.listSend = {
      "estructuras": this.ListUpdatesPlan,
      "naturalezas": this.ListUpdatesNaturalezas
    }
  }

  Update( ){
    this._adm010Service
    .Actualizar(this.listSend , this.idGestion )
    .subscribe(resp => {
      if(resp["ok"]){
        this.ModoVista();
        this.ModoEdicion();
        // this.ObtenerDatos();
        this._notyG.noty("success","registro actualizado correctamente",3500);
      }
      else{
        this._notyG.noty("warning","no se actualizo los datos, revise los datos",3500);
      }
    });
  }

  ActualizarEd(item : any){
    console.log(item);
    this.InicializarListsUpdates();
    this.newEstructura.id_estructura = item.id_estructura;
    this.newEstructura.nombre = item.nombre;
    this.newEstructura.largo = +item.largo;
    this.newEstructura.separador = item.separador;
    this.ListUpdatesPlan.push(this.newEstructura);
    // this.estructuras.push(this.ListUpdatesPlan);
    console.log(this.ListUpdatesPlan);

    if(this.CalcularTotal()< 13){
      this.totalLargo= this.CalcularTotal();
      this.ultimoElemento.largo = this.totalLargo;
      this.Update();
      this.InicializarEstructura();
    }else{
      this._notyG.noty("warning","el valor total del largo no debe pasar de 12 ",1200);
    }
  
  }

  CalcularTotal(){
    let sum: number =0;
    this.estructuraPlanDeCuentas.forEach( element => {
      sum = sum + (+element.id_estructura);
    });
    return sum;
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

  AgregarPlanDeCuentas(){   

    let suma : number =0 +(+this.totalLargo) + (+(this.newEstructura.largo)) ;
    if(( this.estructuraPlanDeCuentas.length < 6) && (suma < 13) ){
      this.estructuraPlanDeCuentas.push(this.newEstructura);
      this.estructuras.push(this.newEstructura);
      this.InicializarEstructura();
      this.ultimoElemento.largo = suma ;
      this.totalLargo = suma;
      console.log( this.ultimoElemento.largo);
    }
    else {
      this._notyG.noty("warning","solo puede agregarse 6 elementos",1200);
      console.log(suma);
    }
    // this.tope = this.tope +1;
  }

  Guardar(){
    this.InicializarListsSend();
    this.Insertar();
    this.estructuras = [];
    this.naturalezas = [];
  }

}
