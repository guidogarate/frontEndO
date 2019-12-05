import { Component, OnInit } from '@angular/core';
import { DatePipe} from '@angular/common';
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
  totalPaginacion : string;
  today: any = Date.now();
  tipoCambio: any;
  tipoCambioSend: any;
  editar: boolean = false;

  constructor( private adm001Service: Adm001Service, private datePipe : DatePipe) { 
    
    this.cargarPredeterminado();
    this.indice = "0";
    this.mes = "2";
    this.anho = "2019" ;
    this.cargarLista();
    this.Paginacion();
    this.Limpiar();
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
    this.tipoCambio={
      fecha: this.datePipe.transform(item.fecha,"yyy-MM-dd","+0400"),
      tc_oficial: item.tc_oficial,
      tc_compra: item.tc_compra,
      tc_venta : item.tc_venta,
      tc_ufv : item.tc_ufv,
      estado :  item.estado == 1,
      pred : item.pred == 1
    }
    this.editar= true;
   }

        Paginacion(){
          this.adm001Service.paginado(this.mes,this.anho).subscribe(resp =>{
            console.log("cargando paginado");
            if(resp["ok"]){
              this.totalPaginacion = resp["total"];
              console.log("paginacion: ", this.totalPaginacion);
            }
            else {
              console.log("no se cargo paginado",resp);
              return resp;
            }
          });

        }
        Guardar(){
         
          this.tipoCambioSend={
            adtcfecd: this.datePipe.transform(this.tipoCambio.fecha,"yyyy-MM-dd","0000"),
            adtctipo:  this.tipoCambio.tc_oficial,
            adtctipc: this.tipoCambio.tc_compra,
            adtctipv : this.tipoCambio.tc_venta,
            adtccufv : this.tipoCambio.tc_ufv,
            adtcesta :  this.tipoCambio.estado ? "1" : "0",
            adtcpred : this.tipoCambio.pred ? "1 ": "0"
          }
          this.adm001Service.agregar(this.tipoCambioSend).subscribe(resp =>{
            if(resp["ok"]){
              console.log("Guardando: ", resp);
              this.Limpiar();
              this.cargarLista();
            }
            else {
              console.log("no se pudo guardar",resp);
              return resp;
            }
          });
        }

        Actualizar(){
          //console.log("fecha a actualizar: ", this.tipoCambio);
          this.tipoCambioSend={
            adtcfecd: this.datePipe.transform(this.tipoCambio.fecha,"yyyy-MM-dd","+0400"),
            adtctipo:  this.tipoCambio.tc_oficial,
            adtctipc: this.tipoCambio.tc_compra,
            adtctipv : this.tipoCambio.tc_venta,
            adtccufv : this.tipoCambio.tc_ufv,
            adtcesta :  this.tipoCambio.estado ? "1" : "0",
            adtcpred : this.tipoCambio.pred ? "1": "0"
          }
          console.log("para actualizar: ", this.tipoCambioSend);
          this.adm001Service.actualizar(this.tipoCambioSend).subscribe(resp =>{
            if(resp["ok"]){
              console.log("Actualizando: ", resp);
              this.cargarLista();
              this.Cancelar();
            }
            else {
              console.log("no se pudo guardar",resp);
              return resp;
            }
          });
        }

        Limpiar(){

          this.tipoCambio = {
            fecha: this.datePipe.transform(this.today,"yyy-MM-dd"),
            tc_oficial: "0",
            tc_compra: "0",
            tc_venta : "0",
            tc_ufv : "0",
            estado : false,
            pred : false
          }
        }

        Eliminar(){
          this.adm001Service.eliminar(this.tipoCambio.fecha).subscribe(resp =>{
            if(resp["ok"]){
              this.Limpiar();
              this.cargarLista();
            }
            else {
              console.log("no se pudo eliminar",resp);
              return resp;
            }
          });
        }

        Cancelar(){
          this.Limpiar();
          this.editar= false;
        }

        Editar(){
          this.editar= true;
        }


//  fin de clase
}
