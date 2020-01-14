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
  
  Lista : any = [];
  parametrosIniciales: any = [];
  razonSocial : any = [];
  sigla: any = [];
  actividad: any = [];
  gestion : any = [];
  listaGestion: any = [];
  idGestion : number = 2019;
  constructor(
    private _adm004Service: Adm004Service,
    private notyG: NotyGlobal
  ) { }

  ngOnInit() {
    setTimeout(() => {
      initLabels();
    }, 1500);
    this.ObtenerParametrosIniciales();
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
        console.log("gestion: ", this.listaGestion);
        console.log("gestion.content: ", this.gestion.content);
        //this.notyG.noty("success", "Obteniendo ..", 3500);
        console.log("dataBackend: ", this.parametrosIniciales);
        //initLabels();
      }
      else{

      }
    });

  }

}
