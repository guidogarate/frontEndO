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
  indice : string;
  mes : string;
  anho : string;

  tipoCambio : any = {
    fecha: "",
    tc_oficial: "0",
    tc_compra: "0",
    tc_venta : "0",
    tc_ufv : "0",
    estado : "0",
    pred : "0"
  }

  constructor( private adm001Service: Adm001Service) { 
    console.log("en adm002");
    this.cargarPredeterminado();
    this.indice= "0";
    this.mes = "2";
    this.anho = "2019" ;
    this.cargarLista();
  }

  ngOnInit() {
    // init_plugins();
    // setTimeout(() => {
    //   init_plugins();
    // }, 3000);

   }
  cargarPredeterminado(){
    this.adm001Service.CargarPredeterminados().subscribe(resp =>{
      if(resp["ok"]){
        this.predeterminado = resp["adm_001_mostrarTodo"][0];
      }
      else {
        console.log("no se cargo el TC predeterminado");
      }
    });
   }

   cargarLista(){
     
    this.adm001Service.CargarListaTipoCambio(this.indice,this.mes,this.anho).subscribe(resp =>{

      if(resp["ok"]){
        this.ListTipoCambio = resp["adm_001_mostrarTodo"];
        console.log("listaTipoCambio: ", this.ListTipoCambio);
      }
      else {
        console.log("no se cargo LIsta",resp);
      }
    });
   }

   cargarEdicion(item: any){
    console.log("cargando fecha: ", item);
    this.tipoCambio={
      fecha: item.fecha,
      tc_oficial: item.tc_oficial,
      tc_compra: item.tc_compra,
      tc_venta : item.tc_venta,
      tc_ufv : item.tc_ufv,
      estado : item.estado,
      pred : item.pred
    }
    console.log("fecha edicion : ", this.tipoCambio);
   }

   checkValue(event: any){
    console.log(event);
 }


//  fin de clase
}
