import { Component, OnInit } from '@angular/core';
import { Adm002Service } from '../../../../utils/service/ADM-002/Adm002.service';
import {Gestion} from '../../../../utils/models/Gestion';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

declare function initLabels ();
// declare function initModal();
declare function init_date();
declare var $: any;

@Component({
  selector: 'app-adm003',
  templateUrl: './adm003.component.html',
  styleUrls: ['./adm003.component.css']
})
export class Adm003Component implements OnInit {

  /* Lista de Datos */
  ListaGestiones: any;
  ListaPeriodos: any;
  ListaEstadosGestionPeriodos : any;
  estado : number ;
  ListaTiposEmpresa : any;
  idEmpresa : number;

  /*Acciones*/
  editGestion : boolean = false;
  editPeriodo : boolean = false;
  // editModifAutoGestion : boolean = false;

  fechainicial : Date ;
  mesInicial: string = "1";
  mesFinal: string = "1";

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
  gestionModel : Gestion;
  gestionModelo : any;
  periodoModelo : any;

  constructor(
    private adm002Service : Adm002Service
  ) {
    
   }

  ngOnInit() {
    this.obtenerGestionesPeriodos();
    setTimeout(() => {
      initLabels();
      init_date();
   //   initModal();
    }, 1000);
    //this.armarFecha("2019","abril");
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
  Eliminar() {
   // this.loading= true;
    this.adm002Service.EliminarGestion(this.gestionModel.gestion.toString()).subscribe(resp => {
      if (resp["ok"]) {
        /**
         * primera opcion  haciendo la llamada al backend
         */
        
        this.limpiarGestion();
        this.obtenerGestionesPeriodos();

        // this.cargarLista();
       // this.obtenerGestionesPeriodos();

       /**
        * Segunda opcion de eliminar para evitar la llamada al backend
        */
        this.ListaGestiones= this.ListaGestiones.filter( function(gestion){
          return gestion.gestion != this.gestionModel.gestion.toString(); 
        }); 
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

  verGestion(){

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
    // this.adm002Service.
    console.log("abrir modal");
    $('#modal_gestion').modal();
  }
  Nuevo(){
   
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
  }

  cerrarModal(){
    $('#modal_gestion').modal("hide");
    $('#modal_periodo').modal("hide");
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
  }

  limpiarGestion(){
    this.gestionModelo = {}
  }
  

  /**
   * para el Modal del Periodo
   */

   editarPeriodo(item : any){

  this.editPeriodo = true;
  this.CargarPeriodo(item);
  $('#modal_periodo').modal();
  setTimeout(() => {
    initLabels();
  }, 1000);
   }
  CargarPeriodo(item : any){

    this.periodoModelo = {
      adprideg: item.adprideg,
      adpridep : item.adpridep,
      adprmesp : item.adprmesp,
      adprdesc : item.adprdesc,
      adpresta : item.adpresta,
      adprfepi : item.adprfepi,
      adprfepf : item.adprfepf,
      adprmoda : item.adprmoda,
      adprdiam : item.adprdiam
    }

  }

  armarFecha(year: any , month :  any){

    console.log("fecha: ",year+"-"+month);
    console.log("fechaMes: ",this.mesInicial);
    
    let fechaAux1,fechaAux2 : string;
    let mes2 : number = month + 11;
    fechaAux1 = year+"-"+month;    
    this.fechainicial = new Date(fechaAux1);

    let fechafin  = new Date(fechaAux1);
    
    fechafin.setMonth(11);

    console.log("fecha : ",this.fechainicial);
    console.log("fecha : ",fechafin);
  }


}
