import { Component, OnInit } from '@angular/core';
import { Adm001Service } from 'src/app/master/utils/service/main/shared/Adm001.service';
 declare function init_plugins();

@Component({
  selector: 'app-adm002',
  templateUrl: './adm002.component.html',
  styleUrls: ['./adm002.component.css']
})
export class Adm002Component implements OnInit {

  predeterminado : any;
  ListTipoCambio : any;
  indice: string;

  constructor( private adm001Service: Adm001Service) { 
    console.log("en adm002");
    this.cargarPredeterminado();
  }

  ngOnInit() {
    init_plugins();
    setTimeout(() => {
      init_plugins();
    }, 3000);

   }
  cargarPredeterminado(){

    this.adm001Service.CargarPredeterminados().subscribe(resp =>{
      if(resp["ok"]){
        console.log("cargando el TC predeterminado");
        this.predeterminado = resp["adm_001_mostrarTodo"][0];
        console.log("TC predeterminado: ", this.predeterminado);
      
        console.log("TC predeterminado fecha como array: ", this.predeterminado["fecha"]);
        console.log("TC predeterminado fecha como objeto: ", this.predeterminado.fecha);

      }
      else {
        console.log("no se cargo el TC predeterminado");
      }
    });

    
   }

}
