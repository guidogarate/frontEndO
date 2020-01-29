import { Component, OnInit } from '@angular/core';
import { Adm007Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
declare function initLabels ();

@Component({
  selector: 'app-adm007',
  templateUrl: './adm007.component.html',
  styleUrls: ['./adm007.component.css']
})
export class Adm007Component implements OnInit {

  editar : boolean = false;

  constructor( private _adm007Service : Adm007Service,
              private _notyG: NotyGlobal) { 

  }

  ngOnInit() {
    initLabels();
  }

  

  /* metodos auxiliares*/
  nada(){}
  Actualizar(){
    this.editar = false;
  }
  ModoEdicion(){
    this.editar = true;
  }
  ModoVista(){
    this.editar = false;
  }
  AgregarDireccion(){

  }
  AgregarTelefono(){
    
  }

}
