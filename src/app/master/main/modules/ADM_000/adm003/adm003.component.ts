import { Component, OnInit } from '@angular/core';
import { Adm002Service } from '../../../../utils/service/ADM-002/Adm002.service';

declare function initLabels ();
declare function initModal();

@Component({
  selector: 'app-adm003',
  templateUrl: './adm003.component.html',
  styleUrls: ['./adm003.component.css']
})
export class Adm003Component implements OnInit {

  ListaGestiones: any;
  ListaPeriodos: any;
  editar: boolean = false;
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

  obtenerGestionesPeriodos(){
    this.adm002Service
    .ObtenerGestionesPeriodos()
    .subscribe( resp => {
      if( resp["ok"]){
        this.ListaGestiones = resp["gestion"];
        this.ListaPeriodos = resp["periodos"];
        console.log("Listas: ", resp);
      }
      else{
        console.log("No se cargo gestiones ni periodos");
        resp;
      }
    });
  }

}
