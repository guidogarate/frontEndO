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

  constructor(
    notyG : NotyGlobal,
    _adm010Service : Adm010Service
  ) { }

  ngOnInit() {
  }
  ModoVista(){
    this.editar = false;
  }
  ModoEdicion(){
    this.editar = true;
  }
  Actualizar(){
    this.editar = false;
  }

  /** */
  nada(){}

}
