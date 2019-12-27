import { Component, OnInit } from '@angular/core';
import { Adm002Service } from '../../../../utils/service/ADM-002/Adm002.service';
import {Gestion} from '../../../../utils/models/Gestion';
import { DatePipe } from "@angular/common";
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as Noty from "noty";

declare function initLabels ();
// declare function initModal();
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

  constructor(
    private adm002Service : Adm002Service,
    private datePipe: DatePipe
  ) {
    
   }

  ngOnInit() {
    this.obtenerGestionesPeriodos();
    setTimeout(() => {
      initLabels();
      init_date();
   //   initModal();
    }, 1000);
   
  }
  /* Peticiones */
  obtenerGestionesPeriodos(){
    this.adm002Service
    .ObtenerGestionesPeriodos()
    .subscribe( resp => {
      if( resp["ok"]){
        this.ListaGestiones = resp["gestion"];
        this.ListaPeriodos = resp["periodos"];
        this.ListaEstadosGestionPeriodos = resp ["EstGestion"];
        // console.log("listaestados: ", this.ListaEstadosGestionPeriodos);
        this.ListaTiposEmpresa = resp ["ActiEmpres"];
        // console.log("Listas: ", resp);
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

        new Noty({
          text: "Agregando",
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "success",
          layout: "bottomRight"
        }).show();
      }
      else {
        console.log("no se ha podido registrar: ",  resp);
        new Noty({
          text: "No se ha podido Agregar",
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "error",
          layout: "bottomRight"
        }).show();
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

        new Noty({
          text: "Actualizando",
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "success",
          layout: "bottomRight"
        }).show();
      }
      else {
        console.log("no se ha podido Actualizar: ",  resp);
        new Noty({
          text: "No se ha podido Actualizar",
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "error",
          layout: "bottomRight"
        }).show();
      }

    });

  }


  EliminarGestion() {
   // this.loading= true;
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
        new Noty({
          text: "Eliminando",
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "error",
          layout: "bottomRight"
        }).show();
      } else {
        console.log("no se pudo eliminar", resp);
        return resp;
      }
    });
    // this.loading= false;
  }

  // verGestion(){

  // }
  editar(){
    this.editGestion= false;
    this.nuevo = false;
  }

  editarGestion( item : any){
  this.editGestion = true;
  this.cargarGestion(item);
  $('#modal_gestion').modal();
  setTimeout(() => {
    initLabels();
  }, 1000);

  }

  borrarGestion(){

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
      this.mesInicial = (new Date(this.gestionModelo.adgtfegi).getUTCMonth()+1).toString();
      this.mesFinal = (new Date(this.gestionModelo.adgtfegf).getUTCMonth()+1).toString();   
    }
  }

  limpiarGestion(){
    this.gestionModelo =   {
      "adgtacte": 1,
      "adgtesta": "1",
      "adgtmoda": false,
      "adgtdiam": null,
      "adgtgesd": false
    };
  
  }
  

  /**
   * para el Modal del Periodo
   */

   editarPeriodo(item : any){

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
      adprideg: item.adprideg,
      adpridep : item.adpridep,
      adprmesp : item.adprmesp,
      adprdesc : item.adprdesc,
      adpresta : item.adpresta,
      adprfepi : item.adprfepi,
      adprfepf : item.adprfepf,
      adprmoda : item.adprmoda == "1" ? true : false,
      adprdiam : item.adprdiam
    }

  }

  armarFecha(year: any , month :  any){
    let fechaAux1 : string;
    fechaAux1 = year+"-"+month;    
    console.log(" fecha : ",fechaAux1);
    this.fechainicial = new Date(year,month-1);
    console.log(" this.fechainicial : ",this.fechainicial);
    this.gestionModelo.adgtfegi= this.fechainicial;
    console.log(" this.fechainicial : ",this.gestionModelo.adgtfegi);

    let fechafin  = new Date(this.gestionModelo.adgtfegi);
    console.log("fecha fin new :",fechafin);
    fechafin.setMonth( fechafin.getMonth() + 12);
    console.log("fecha fin set month 12 :",fechafin);
    // fechafin.setDate(1); // poniendo a fin de dia de mes
    fechafin.setDate(0); // poniendo a fin de dia de mes
    console.log("fecha fin set 0 :",fechafin);
    this.gestionModelo.adgtfegf = fechafin;

    this.mesFinal = (fechafin.getMonth()+1).toString();
    this.fechaInicioGestion =  this.datePipe.transform(
      this.fechainicial,
      "yyyy-MM-dd" );
      this.IniciarfechaModificacionAutomatica();
  }

  IniciarfechaModificacionAutomatica(){
    if (this.gestionModelo.adgtmoda == false){

      if(this.gestionModelo.adgtfegf!= null){
        this.gestionModelo.adgtdiam = new Date(this.gestionModelo.adgtfegf);
        this.gestionModelo.adgtdiam.setMonth(this.gestionModelo.adgtdiam.getMonth() + 2);
        this.gestionModelo.adgtdiam =  this.datePipe.transform(
          this.gestionModelo.adgtdiam,
          "y-MMM" );
      }
      else{
        this.gestionModelo.adgtdiam = null;
      }
      }else{
        this.gestionModelo.adgtdiam = null;
      }
      
  }

  nada(){}

}
