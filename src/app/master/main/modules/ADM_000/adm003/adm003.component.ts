import { Component, OnInit } from '@angular/core';
import { Adm002Service } from '../../../../utils/service/ADM-002/Adm002.service';
import {Gestion} from '../../../../utils/models/Gestion';
import { from } from 'rxjs';

declare function initLabels ();
declare function initModal();
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
  editar : boolean = false;

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

  constructor(
    private adm002Service : Adm002Service
  ) {
    
   }

  ngOnInit() {
    this.obtenerGestionesPeriodos();
    setTimeout(() => {
      initLabels();
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
        this.ListaTiposEmpresa = resp ["ActiEmpres"];
        console.log("Listas: ", resp);
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
        //this.Limpiar();
        // this.cargarLista();
        this.obtenerGestionesPeriodos();
        // this.Cancelar();
        // this.cargarPredeterminado();
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
    
  $('#modal_gestion').modal();
  this.cargarGestion(item );

  }

  borrarGestion(){

  }

  AgregarGestion(){
    // this.adm002Service.
    console.log("abrir modal");
    $('#modal_gestion').modal();
  }
  Nuevo(){
    // this.adm002Service.
    console.log("abrir modal");
    $('#modal_gestion').modal();
  }



  cargarGestion( item : any){
    this.gestionModel = {
        gestion : 2017,
        descripcion : "Gestion 2021",
        actEmpresa : 1,
        cantPeridos : 12,
        estPeriodo : 1,
        fechaFin :  new Date(),
        fechaInicio : new Date (),
        gtionDefec :"0" ,
        modAutomatica : "1",
        fechaModAutomatica : new Date()
    }

    this.gestionModelo =  {
      adgtideg : item.adgtideg,//
      adgtdesc : item.adgtdesc,//
      adgtacte : item.adgtacte,//
      adgtcanp : item.adgtcanp,//
      adgtesta : item.adgtesta,//
      adgtfegi : item.adgtfegi,
      adgtfegf : item.adgtfegf,
      adgtmoda : item.adgtmoda,//
      adgtdiam : item.adgtdiam,//
      adgtgesd : item.adgtgesd//
  }


  }
}
