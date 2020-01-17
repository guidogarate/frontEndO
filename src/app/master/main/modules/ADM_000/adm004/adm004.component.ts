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
  // razonSocial : any = [];
  // sigla: any = [];
  // actividad: any = [];
  // gestion : any = [];
  // listaGestion: any = [];
  idGestion : string = "2019";

  /* Para seccion Moneda*/
  parametroMoneda : any = [];
  moneda : any;
  listImputacion : any;
  listConversion : any;
  idImputacion : string = "1" ;
  idConversion : string = "1";

  /* Seccion Folio*/

  folio : any;
  TipoFolio : any;
  idFolio : string = "1";
  prefijo : any;
  sepFolio : any;
  sepFolioGestion : any;
  sepFolioPeriodo : any;
  sepFolioDocumento : any;
  digFolio : any;
  idDigito : string = "1";
  /** parametros especiales */
  parametroEspecial : any;
  listaParametrosEspeciales : any = [];
  /** Unidad de negocio */
  unidadNegocio : any;
  CheckUniNeg : any;
  selectUniNegocio : any;
  ListUnidadNegocio : any = [];
  idUnidadNegocio : string = "1";
  /** regisro Maestro */
  registroMaestro : any ;
  tipoRegistroMaestro : any;
  idTipoRegistro : string = "1";
  numerador : any;
  idNumerador : string = "1";
  adicionadorPrefijo : any;
  separadorRol : any;
  cantDigitos : any;
  idCantDigito : string = "1";



  constructor(
    private _adm004Service: Adm004Service,
    private notyG: NotyGlobal
  ) { }

  ngOnInit() {
    this.ObtenerParametrosIniciales();
    setTimeout(() => {
    // this.ObtenerParametrosMoneda();
    // this.ObtenerParametrosFoliacion();
   ///  this.ObtenerParametrosEspeciales();
      this.ObtenerParametrosUnidadNegocio();
      this.ObtenerParametrosRegistroMaestro();
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
        // this.razonSocial = this.parametrosIniciales[0];
        // this.sigla = this.parametrosIniciales[1];
        // this.actividad = this.parametrosIniciales[2];
        // this.gestion = this.parametrosIniciales[3];
        // this.listaGestion = this.gestion.content;
        //this.notyG.noty("success", "Obteniendo ..", 3500);
        //initLabels();
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
        // this.parametroMoneda = resp["datos2"]
        this.moneda = resp["datos2"][0];
        this.listImputacion = resp["datos2"][1];
        this.listConversion = resp["datos2"][2];
        // console.log("list parametro Moneda: ", this.parametroMoneda);
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
        this.TipoFolio = resp["datos3"][1];
        this.prefijo = resp["datos3"][2];
        this.sepFolio = resp["datos3"][3];
        this.sepFolioGestion = resp["datos3"][4];
        this.sepFolioPeriodo = resp["datos3"][5];
        this.sepFolioDocumento = resp["datos3"][6];
        this.digFolio = resp["datos3"][7];
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros de Foliacion", 3500);
      }
    });
  }

  ObtenerParametrosEspeciales(){
    this._adm004Service
    .ObtenerParametrosEspeciales(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        this.listaParametrosEspeciales = resp["datos4"];
        console.log("Parametros Especiales total: ", this.listaParametrosEspeciales);
        this.parametroEspecial = this.listaParametrosEspeciales[0];
        console.log("Parametros Especial: ", this.parametroEspecial);
        this.listaParametrosEspeciales.shift();
        console.log("Parametros Especiales shift: ", this.listaParametrosEspeciales);
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Iniciales", 3500);
      }
    });
  }

  ObtenerParametrosUnidadNegocio(){
    this._adm004Service
    .ObtenerParametrosUnidadNegocio(this.idGestion)
    .subscribe(resp => {
      if(["ok"])
      {
        this.ListUnidadNegocio = resp["datos5"]
        console.log("List U Negocio: ", this.ListUnidadNegocio);
        this.unidadNegocio = resp["datos5"][0];
        this.CheckUniNeg = resp["datos5"][1];
        this.selectUniNegocio = resp["datos5"][2];
       
        this.ListUnidadNegocio.shift();
        this.ListUnidadNegocio.shift();
        this.ListUnidadNegocio.shift();
        // this.idUnidadNegocio = this.ListUnidadNegocio.length();
        console.log("lista U Negocio shitf: ", this.ListUnidadNegocio);
        console.log("lista U Negocio shitf length: ", this.ListUnidadNegocio.length);
        this.idUnidadNegocio = ""+this.CalcularIdNiveles(this.ListUnidadNegocio);
        console.log("id : ", this.idUnidadNegocio);
      }
      else{
          this.notyG.noty("error", "no se pudo Obtener Parametros Unidad de negocio", 3500);
      }
    });
  }

  CalcularIdNiveles(lista : any){
    console.log("calculando id");
    // const found = lista.findIndex(element => element.adpiatr2 == "");
    const index = lista.findIndex(elemento => elemento.adpiatr2 == null);
    return index;
  }

  ObtenerParametrosRegistroMaestro(){
    this._adm004Service
    .ObtenerParametrosRegistroMaestro(this.idGestion)
    .subscribe(resp => {
      if(resp["ok"]){
        this.registroMaestro = resp["datos6"][0];
        this.tipoRegistroMaestro = resp["datos6"][1];
        this.numerador = resp["datos6"][2];
        this.adicionadorPrefijo = resp["datos6"][3];
        this.separadorRol = resp["datos6"][4];
        this.cantDigitos = resp["datos6"][5];
        console.log(this.registroMaestro);
        console.log(this.tipoRegistroMaestro);
        console.log(this.numerador);
        console.log(this.adicionadorPrefijo);
        console.log(this.separadorRol);
        console.log(this.cantDigitos);
        
      }
      else{
        this.notyG.noty("error", "no se pudo Obtener Parametros Registro Maestro", 3500);
      }
    });
  }




}
