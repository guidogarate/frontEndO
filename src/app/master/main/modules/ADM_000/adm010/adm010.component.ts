import { Component, OnInit } from '@angular/core';
import { Adm010Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
import { element } from 'protractor';
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
  topeNaturaleza : number = 0;
  totalLargo : number = 0;
  ListUpdatesPlan : any = [];
  ListUpdatesNaturalezas : any = [];
  ListLastStade : any = [];
  ListLastStadeNaturaleza : any = [];
  ListaforUpdate : any = [];
  agregar : boolean = false;
  constructor(
    private _notyG : NotyGlobal,
    private _adm010Service : Adm010Service
  ) { }

  ngOnInit() {
    this.ObtenerDatos();
  }
  ModoVista(id:string){
    this.editar = false;
    if(id == 'salir'){
      console.log("entro a volver estado :O");
      this.VolverEstadoAnterior();
    }
    this.InicializarEstructura();
    this.InicializarNaturaleza();
    this.ListLastStade = [];
    this.ListLastStadeNaturaleza = [];
  }
  ModoEdicion(){
    this.editar = true;
    this.GuardarEstado();
  }
  Actualizar(){
    this.editar = false;
  }

  // Agregar(){

  // }

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
        this.topeNaturaleza = this.Listnaturalezas.length;
        if(this.Listnaturalezas == null){
          this.Listnaturalezas = [];
        }
       
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
    let sum = 0;
    let v1 : number = 0;
    // const found = this.estructuraPlanDeCuentas.find(element => element.id_estructura == id);
    this.estructuraPlanDeCuentas.forEach( element => {
      if(element.id_estructura == id){
        valor = element.largo;
        console.log("valor: ",element);
        v1 = pos;
      }  
      sum = sum + element.largo;
        pos = pos + 1;
        console.log("pos: ", pos);
      
    });
    console.log("removiendo: ", v1);
    if ( v1 !== 0 ) {
        this.estructuraPlanDeCuentas.splice( (v1-1), 1 );
        this.totalLargo = sum - valor;
        this.ultimoElemento.largo = this.totalLargo;
    }
  }

  RemoverNaturaleza ( id : any ) {
    let valor = 1;
    let pos = 1;
    let v1 : number = 0;
    // const found = this.estructuraPlanDeCuentas.find(element => element.id_estructura == id);
    this.Listnaturalezas.forEach( element => {
      if(element.id_codigo == id){
        valor = element.largo;
        console.log("valor: ",element);
        v1 = pos;
      }  
        pos = pos + 1;
        console.log("pos: ", pos);
      
    });
    console.log("removiendo: ", v1);
    if ( v1 !== 0 ) {
        this.Listnaturalezas.splice( (v1-1), 1 );
    }
  }
  EliminarNaturaleza(item : number){
    console.log("eliminar naturaleza: ", item);
    this.RemoverNaturaleza(item);
    this.Eliminar(item);
    this.topeNaturaleza = this.topeNaturaleza - 1;
  }

  Insertar(){
    this._adm010Service
    .Insertar(this.listSend,this.idGestion)
    .subscribe(resp => {
      if(resp["ok"]){
        this.ModoVista('Insert');
        // this.ModoEdicion();
         this.ObtenerDatos();
        this._notyG.noty("success","datos guardados exitosamente",3500);
      }
      else{
        this._notyG.noty("warning","no se pudo guardar los datos",3500);
        this.InicializarEstructura();
      }
    });
    
  }
  Eliminar(id: number){
    this._adm010Service
    .Eliminar(id,this.idGestion)
    .subscribe( resp => {
      if(resp["ok"]){
          this._notyG.noty("success","datos eliminados correctamente",3500);
        }
        else{
          this._notyG.noty("warning","no se pudo eliminar los datos",3500);
          console.log(resp);
      }

    });   
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
      codigo : 0,
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
        this.ModoVista('Update');
        // this.ModoEdicion();
        // this.ObtenerDatos();
        this._notyG.noty("success","registro actualizado correctamente",3500);
      }
      else{
        this._notyG.noty("warning","no se actualizo los datos, revise los datos",3500);
      }
    });
  }

  CalcularTotal(){
    let sum: number =0;
    this.estructuraPlanDeCuentas.forEach( element => {
      sum = sum + (+element.largo);
    });

    return sum;
  }

  actualizarLargo(){
    this.ultimoElemento.largo = this.CalcularTotal();
  }
  CalcularLargo(){
    let sum: number = 0;
    this.estructuraPlanDeCuentas.forEach( element => {
      sum = sum + (+element.largo);
    });
    if(sum < 13){
       this._notyG.noty("success","cantidad aceptada",1200);
    }else{
      this._notyG.noty("warning","el total no debe pasar de 12",1200);
    }
    this.actualizarLargo();
  }

 

  AgregarPlanDeCuentas(){
    // this.agregar = true;
    if(this.CalcularTotal()>11 || this.estructuraPlanDeCuentas.length >5){
      this._notyG.noty("warning","el total no debe pasar de 12, la longitud menor igual a 6",1200);
    }
    else{
      this.InicializarEstructura();
      this.estructuraPlanDeCuentas.push(this.newEstructura);
      this.ultimoElemento.largo = this.CalcularTotal();
    }
  }

  Guardar(){
    this.ListarNuevos();
    // this.ListUpdatesPlan.pop();
    this.InicializarListsUpdates();
    console.log("lista plans update : ", this.ListUpdatesPlan );
    console.log("lista plans update : ", this.ListUpdatesNaturalezas );
    console.log("update: ", this.listSend);
    this.Update();
    if(this.estructuras.length > 0 || this.naturalezas.length > 0){
      this.InicializarListsSend();
      console.log("insert: ",this.listSend);
      this.Insertar();
    }
   
    this.ListUpdatesPlan = [];
    this.ListUpdatesNaturalezas = [];

  }

  GuardarEstado(){

    this.estructuraPlanDeCuentas.forEach( element => {
      let AuxEstructura : any =  {
        id_estructura : 0,
        nombre : "",
        largo : 0,
        separador : ""
      }
      AuxEstructura.id_estructura = element.id_estructura;
      AuxEstructura.nombre = element.nombre;
      AuxEstructura.largo = element.largo;
      AuxEstructura.separador = element.separador;
      this.ListLastStade.push(AuxEstructura);
    });
    this.Listnaturalezas.forEach( element => {
      let AuxNaturaleza = {
        id_codigo : 0,
        id_naturaleza : 0,
      }
      AuxNaturaleza.id_codigo = element.id_codigo;
      AuxNaturaleza.id_naturaleza = element.id_naturaleza;
      this.ListLastStadeNaturaleza.push(AuxNaturaleza);
    });
    console.log(this.ListLastStade);
    console.log(this.ListLastStadeNaturaleza);
  }
  
  VolverEstadoAnterior(){
    this.estructuraPlanDeCuentas = [];
    this.Listnaturalezas = [];

    this.ListLastStade.forEach( element => {
      let AuxEstructura : any =  {
        id_estructura : 0,
        nombre : "",
        largo : 0,
        separador : ""
      }
      AuxEstructura.id_estructura = element.id_estructura;
      AuxEstructura.nombre = element.nombre;
      AuxEstructura.largo = element.largo;
      AuxEstructura.separador = element.separador;
      this.estructuraPlanDeCuentas.push(AuxEstructura);
    });
    console.log(this.ListLastStade);
    console.log(this.estructuraPlanDeCuentas);

    this.ListLastStadeNaturaleza.forEach( element => {
      let AuxNaturaleza = {
        id_codigo : 0,
        id_naturaleza : 0,
      }
      AuxNaturaleza.id_codigo = element.id_codigo;
      AuxNaturaleza.id_naturaleza = element.id_naturaleza;
      this.Listnaturalezas.push(AuxNaturaleza);
    });
    this.ListLastStadeNaturaleza = [];
    this.ListLastStade = [];
  }

  ListarNuevos(){
    this.estructuraPlanDeCuentas.forEach(element =>{
      if(element.id_estructura == 0){
        this.estructuras.push(element);
      }else{
        this.ListUpdatesPlan.push(element);
      }
    });
    this.Listnaturalezas.forEach(element => {
      if(element.codigo == 0){
        this.naturalezas.push(element);
      }else{
        this.ListUpdatesNaturalezas.push(element);
      }
    });

  }

  AgregarNaturaleza(){
  
    if(this.estructuraPlanDeCuentas.length >8){
      this._notyG.noty("warning","el total no debe pasar de 9",1200);
    }
    else{
      this.InicializarNaturaleza();
      this.Listnaturalezas.push(this.newNaturaleza);
    }
  }
}
