import { Component, OnInit } from '@angular/core';
import { Adm004Service } from 'src/app/master/utils/service/ADM-004/Adm004.service';

import { NotyGlobal } from "src/app/master/utils/global/index.global";

declare function initLabels ();

@Component({
  selector: 'app-adm004',
  templateUrl: './adm004.component.html',
  styleUrls: ['./adm004.component.css']
})
export class Adm004Component implements OnInit {
  /* para el encabezado*/
  Lista : any = [];
  parametrosIniciales: any = [];
  razonSocial : any = [];
  sigla: any = [];
  actividad: any = [];
  gestion : any = [];
  listaGestion: any = [];
  idGestion : string = "2019";

  /* Para seccion Moneda*/
  paremetroMoneda : any;
  moneda : any;
  listImputacion : any;
  listConversion : any;
  idImputacion : string = "1" ;
  idConversion : string = "1";

  /* Seccion Folio*/

  folio : any;
  listFolio : any;
  idFolio : string = "1";

  constructor(
    private _adm004Service: Adm004Service,
    private notyG: NotyGlobal
  ) { }

  ngOnInit() {
    this.ObtenerParametrosIniciales();
    setTimeout(() => {
      initLabels();
    }, 1000);
  }

  ObtenerParametrosIniciales(){
    this._adm004Service
    .ObtenerParametros()
    .subscribe(resp => {
      if(["ok"])
      {
        
        this.parametrosIniciales = resp["datos1"];
        this.razonSocial = this.parametrosIniciales[0];
        this.sigla = this.parametrosIniciales[1];
        this.actividad = this.parametrosIniciales[2];
        this.gestion = this.parametrosIniciales[3];
        this.listaGestion = this.gestion.content;
        //this.notyG.noty("success", "Obteniendo ..", 3500);
        //initLabels();
        this.ObtenerParametrosMoneda();
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Iniciales", 3500);
      }
    });
  }

  ObtenerParametrosMoneda(){
    this._adm004Service
    .ObtenerParametrosMoneda(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        this.moneda = resp["datos2"][0];
        this.listImputacion = resp["datos2"][1];
        this.listConversion = resp["datos2"][2];
        // this.parametrosIniciales = resp["datos1"];
        // this.razonSocial = this.parametrosIniciales[0];
        console.log("moneda: ", this.moneda);
        console.log("lista conversion: ", this.listConversion);
        //this.notyG.noty("success", "Obteniendo ..", 3500);
        console.log("list imputacion: ", this.listImputacion);
        setTimeout(() => {
          initLabels();
        }, 1000);
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Iniciales", 3500);
      }
    });
  }

  ObtenerParametrosFoliacion(){
    this._adm004Service
    .ObtenerParametrosFolio(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        this.folio = resp["datos3"][0];
        this.listFolio = resp["datos3"][1];
        
        // this.parametrosIniciales = resp["datos1"];
        // this.razonSocial = this.parametrosIniciales[0];
        console.log("folio: ", this.folio);
        console.log("lista folio: ", this.listFolio);
        //this.notyG.noty("success", "Obteniendo ..", 3500);
        // console.log("list imputacion: ", this.listImputacion);
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Iniciales", 3500);
      }
    });
  }

  ObtenerParametrosEspeciales(){
    this._adm004Service
    .ObtenerParametrosEspeciales(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        this.moneda = resp["datos4"][0];
        this.listImputacion = resp["datos4"][1];
        this.listConversion = resp["datos4"][2];
        // this.parametrosIniciales = resp["datos1"];
        // this.razonSocial = this.parametrosIniciales[0];
        console.log("moneda: ", this.moneda);
        console.log("lista conversion: ", this.listConversion);
        //this.notyG.noty("success", "Obteniendo ..", 3500);
        console.log("list imputacion: ", this.listImputacion);
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Iniciales", 3500);
      }
    });
  }

  ObtenerParametrosRegistroMaestro(){
    this._adm004Service
    .ObtenerParametrosRegistroMaestro(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        this.moneda = resp["datos4"][0];
        this.listImputacion = resp["datos4"][1];
        this.listConversion = resp["datos4"][2];
        // this.parametrosIniciales = resp["datos1"];
        // this.razonSocial = this.parametrosIniciales[0];
        console.log("moneda: ", this.moneda);
        console.log("lista conversion: ", this.listConversion);
        //this.notyG.noty("success", "Obteniendo ..", 3500);
        console.log("list imputacion: ", this.listImputacion);
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Iniciales", 3500);
      }
    });
  }




}
