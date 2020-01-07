import { Component, OnInit } from '@angular/core';
import { Adm002Service } from '../../../../utils/service/ADM-002/Adm002.service';
import { DatePipe } from "@angular/common";
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotyGlobal } from "src/app/master/utils/global/index.global";

declare function initLabels ();
declare function init_date();
declare var $: any;

@Component({
  selector: 'app-adm002',
  templateUrl: './adm002.component.html',
  styleUrls: ['./adm002.component.css']
})
export class Adm002Component implements OnInit {

  /* Lista de Datos */
  ListaGestiones: any;
  ListaPeriodos: any;
  ListaEstadosGestionPeriodos : any;
  estado : number ;
  ListaTiposEmpresa : any;
  idEmpresa : number;

  /*Acciones*/
  editGestion : boolean = true;
  nuevo : boolean = false;
  editPeriodo : boolean = false;
  // editModifAutoGestion : boolean = false;

  fechainicial : Date ;
  mesInicial: string = "1";
  mesFinal: string = "1";
  fechaInicioGestion : string;

  listaMeses = [
    { id: 1, name: "Enero" },
    { id: 2, name: "Febrero" },
    { id: 3, name: "Marzo" },
    { id: 4, name: "Abril" },
    { id: 5, name: "Mayo" },
    { id: 6, name: "Junio" },
    { id: 7, name: "Julio" },
    { id: 8, name: "Agosto" },
    { id: 9, name: "Septiembre" },
    { id: 10, name: "Octubre" },
    { id: 11, name: "Noviembre" },
    { id: 12, name: "Diciembre" }
  ];
  // gestionModel : Gestion;
  gestionModelo : any;
  periodoModelo : any;

  /* Periodo*/
  DiaInicioGestion : string;
  constructor(
    private adm002Service : Adm002Service,
    private datePipe: DatePipe,
    private notyG: NotyGlobal
  ) {

   }

  ngOnInit() {
    this.obtenerGestionesPeriodos();
    setTimeout(() => {
      initLabels();
      init_date();
    }, 1000);

  }
  /* Peticiones */
  obtenerGestionesPeriodos(){
    this.adm002Service.ObtenerGestionesPeriodos().subscribe( resp => {
      if( resp["ok"]){
        this.ListaGestiones = resp["gestion"];
        var removed = this.ListaGestiones.splice(3);
        this.ListaPeriodos = resp["periodos"];
        this.ListaEstadosGestionPeriodos = resp ["EstGestion"];
        this.ListaTiposEmpresa = resp ["ActiEmpres"];
      }
      else{
        console.log("No se cargo gestiones ni periodos");
        resp;
      }
    });
  }

  GuardarGestion(){
    this.nuevo= true;
    console.log(this.gestionModelo);
    this.adm002Service.AgregarGestion(this.gestionModelo).subscribe( resp => {
      if (resp ["ok"]){
        console.log("registrado correctamente");
        this.limpiarGestion();
        this.cerrarModal();
        this.obtenerGestionesPeriodos();
        this.notyG.noty("success","Agregando", 3500);
      }
      else {
        console.log("no se ha podido registrar: ",  resp);
        this.notyG.noty("error","No se ha podido Agregar", 3500);
      }
    });
  }

  ActualizarGestion(){

    console.log(this.gestionModelo);
    this.adm002Service.ActualizarGestion(this.gestionModelo).subscribe( resp => {
      if (resp ["ok"]){
        console.log("registrado correctamente");
        this.limpiarGestion();
        this.cerrarModal();
        this.obtenerGestionesPeriodos();
        this.notyG.noty("success", "Actualizando", 3500);
      }
      else {
        console.log("no se ha podido Actualizar: ",  resp);
        this.notyG.noty("error", "No se ha podido Actualizar", 3500);
      }
    });
  }


  EliminarGestion(item : any) {
    if(item != undefined || item !=null){
      this.gestionModelo = item;
    }
    console.log("eliminando: ", this.gestionModelo);
    this.adm002Service.EliminarGestion(this.gestionModelo.adgtideg).subscribe(resp => {
      if (resp["ok"]) {
        /**
         * primera opcion  haciendo la llamada al backend
         */

        this.limpiarGestion();
        this.cerrarModal();
        this.obtenerGestionesPeriodos();

      //   this.cargarLista();
      //  this.obtenerGestionesPeriodos();

       /**
        * Segunda opcion de eliminar para evitar la llamada al backend
        */
        // this.ListaGestiones= this.ListaGestiones.filter( function(gestion){
        //   return gestion.gestion != this.gestionModelo.adgtideg;
        // });
        this.notyG.noty("info", resp["message"], 3500);
      } else {
        console.log("no se pudo eliminar", resp);
        this.notyG.noty("error", "No se puede eliminar la Gestion", 3500);
        return resp;
      }
    });
  }

  editar(){
    this.editGestion= false;
    this.nuevo = false;
  }

  VerGestion( item : any){
    this.editGestion = true;
    this.cargarGestion(item);
    $('#modal_gestion').modal();
    setTimeout(() => {
      initLabels();
    }, 1000);

  }

  EditarGestion( item : any){
    this.editGestion= false;
    this.nuevo = false;
    this.cargarGestion(item);
    $('#modal_gestion').modal();
    setTimeout(() => {
      initLabels();
    }, 1000);
  }

  AgregarGestion(){
    this.editGestion = false;
    this.editPeriodo = false;
    this.nuevo = true;
    this.limpiarGestion();
    console.log("abrir modal");
    $('#modal_gestion').modal();
    setTimeout(() => {
      initLabels();
    }, 1000);
  }

  Nuevo(){
    this.editGestion= false;
    this.nuevo = true;
    if(this.gestionModelo!= undefined){
      this.limpiarGestion();
    }else{
      console.log("abrir modal");
      $('#modal_gestion').modal();
    }
  }

  Cancelar(){
    this.cerrarModal();
    this.editGestion = false;
    this.editPeriodo = false;
    this.nuevo = false;
  }

  cerrarModal(){
    $('#modal_gestion').modal("hide");
    $('#modal_periodo').modal("hide");
    this.editGestion = true;
    this.editPeriodo = true;
    this.nuevo = false;
  }

  cargarGestion( item : any){
    this.gestionModelo =  {
      adgtideg : item.adgtideg,
      adgtdesc : item.adgtdesc,
      adgtacte : item.adgtacte,
      adgtcanp : item.adgtcanp,
      adgtesta : item.adgtesta,
      adgtfegi : item.adgtfegi,
      adgtfegf : item.adgtfegf,
      adgtmoda : item.adgtmoda == "1" ? true : false,
      adgtdiam : item.adgtdiam,
      adgtgesd : item.adgtgesd == 1 ? true : false,
    }
    if(this.gestionModelo.adgtfegi!= null){
      console.log("cargando data fechas: ");
      this.mesInicial = (new Date(this.gestionModelo.adgtfegi).getUTCMonth()+1).toString();
      this.mesFinal = (new Date(this.gestionModelo.adgtfegf).getUTCMonth()+1).toString();
      this.gestionModelo.adgtdiam =  this.datePipe.transform(
        this.gestionModelo.adgtdiam,
        "yyyy-MM",'+0430');
        this.fechaInicioGestion =  this.datePipe.transform(
          this.gestionModelo.adgtfegi,
          "yyyy-MM-dd",'+0430');

    }
  }

  limpiarGestion(){
    this.gestionModelo =   {
      "adgtacte": 1,
      "adgtesta": "1",
      "adgtmoda": false,
      "adgtdiam": null,
      "adgtgesd": false,
      "adgtcanp" : 12
    };
    this.fechaInicioGestion = null;
  }

  /**
   * para el Modal del Periodo
   */

   VerPeriodo(item : any){
    this.CargarPeriodo(item);
    $('#modal_periodo_gestion').modal();
    setTimeout(() => {
      initLabels();
    }, 1000);
   }

   editarPeriodoModal(){
    this.editPeriodo = true;
   }
   EditarPeriodo(item : any){

    this.editPeriodo = true;
    this.CargarPeriodo(item);
    $('#modal_periodo_gestion').modal();
    setTimeout(() => {
      initLabels();
    }, 1000);
   }

  CargarPeriodo(item : any){
    console.log("periodo : ", item);
    this.periodoModelo = {
      adprideg : item.adprideg,
      adpridep : item.adpridep, //== null  ? (('1').padStart(2,'0')) : item.adpridep,
      adprmesp : item.adprmesp,
      adprdesc : item.adprdesc,
      adpresta : item.adpresta,
      adprfepi : item.adprfepi,
      adprfepf : item.adprfepf,
      adprmoda : item.adprmoda == "1" ? true : false,
      adprdiam : item.adprdiam
    }
    
    if(item.adprdiam!=null){
      let fechita = this.datePipe.transform(
        item.adprdiam,
        "yyyy-MM-dd",'+0430');
      this.dia =  new Date(fechita).getUTCDate();
      console.info("Fechita: ", fechita);
    }
    else{
      this.dia = 0
    }
    console.info("dia: ", this.dia);
  }

  armarFecha(year: any , month :  any){
    console.log("armando Fecha: ", year + "-" + month);
    let fechaAux1 : string;
    fechaAux1 = year+"-"+month;
    this.fechainicial = new Date(year,month-1);
    this.gestionModelo.adgtfegi= this.fechainicial;
    let fechafin  = new Date(this.gestionModelo.adgtfegi);
    fechafin.setMonth( fechafin.getMonth() + 12);
    fechafin.setDate(0); // poniendo a fin de dia de mes
    this.gestionModelo.adgtfegf = fechafin;
    this.mesFinal = (fechafin.getMonth()+1).toString();
    this.fechaInicioGestion =  this.datePipe.transform(
      this.fechainicial,
      "yyyy-MM-dd" );
      this.IniciarfechaModificacionAutomatica();
  }

  IniciarfechaModificacionAutomatica(){
    if (this.gestionModelo.adgtmoda != false){
      this.gestionModelo.adgtdiam = null;
      }
  }

IniciarfechaModificacionAutomaticaPeriodo(){
    if (this.periodoModelo.adprmoda != false){
      this.periodoModelo.adprdiam = null;
      this.dia = 0; 
    }
  }
 dia : number = 0;
 mostrarFecha = false;

 CalcularGestion(idGestion : string){
   console.log("gestion : ", idGestion);
   switch(idGestion) { 
    case "1": { 
      this.mesInicial = "1";
       break; 
    } 
    case "2": { 
      this.mesInicial = "4";
       break; 
    } 
    case "3": {
      this.mesInicial = "4";
      break; 
    }
    default: { 
       console.log("sin Match: ", idGestion); 
       break; 
    } 
 } 
    
  this.armarFecha( this.gestionModelo.adgtideg,this.mesInicial);

 }

ActualizarPeriodo( ){
  let anhoDia : string = "";
  if(this.periodoModelo.adprdiam != null){
    let FechaAux = new Date((this.periodoModelo.adprdiam).toString());
    FechaAux.setDate(this.dia);
    this.periodoModelo.adprdiam = FechaAux;
    this.periodoModelo.adprdiam = this.datePipe.transform(
      FechaAux,
      "yyyy-MM-dd" );
    
    console.log("periodo modelo para enviar: ", this.periodoModelo.adprdiam);
  }else{
    let fechaDiaAux : string ="";
    fechaDiaAux = ""+this.periodoModelo.adprideg+"-"+ this.periodoModelo.adprmesp+"-"+this.dia;
    this.periodoModelo.adprdiam = new Date(fechaDiaAux);
  }
  anhoDia = ""+this.periodoModelo.adprideg+"/"+this.periodoModelo.adprmesp;
  this.adm002Service.ActualizarPeriodo(this.periodoModelo,anhoDia).subscribe( resp => {
    if (resp ["ok"]){
      this.cerrarModal();
      this.obtenerGestionesPeriodos();
      this.notyG.noty("success", "Periodo actualizado", 3500);
    }
    else {
      console.log("no se ha podido Actualizar: ",  resp);
      this.notyG.noty("error", "No se pudo actualizar", 3500);
    }
  });
}

  nada(){}

}
