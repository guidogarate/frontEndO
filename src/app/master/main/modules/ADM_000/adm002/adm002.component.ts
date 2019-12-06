import { Component, OnInit } from '@angular/core';
import { DatePipe} from '@angular/common';
import { Adm001Service } from '../../../../utils/service/ADM-001/Adm001.service';
import { stringify } from 'querystring';
//import { Adm001Service } from 'src/app/master/utils/service/ADM-001/Adm001.service';
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
  mes : string ="2";
  anho : string ="2019";
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
    { id: 12, name: "Diciembre" },
  ];

  listaAnhos = [
    { id: 2014, name: "2014" },
    { id: 2015, name: "2015" },
    { id: 2016, name: "2016" },
    { id: 2017, name: "2017" },
    { id: 2018, name: "2018" },
    { id: 2019, name: "2019" },
    { id: 2020, name: "2020" },
    { id: 2021, name: "2021" },
    { id: 2022, name: "2022" },
    { id: 2023, name: "2023" },
    { id: 2024, name: "2024" },
    { id: 2025, name: "2025" },
  ];
  totalPaginacion : number;
  today: any = Date.now();
  tipoCambio: any;
  tipoCambioSend: any;
  editar: boolean = false;
  ArrayPaginacion : string [] ;

  constructor( private adm001Service: Adm001Service, private datePipe : DatePipe) { 
    
   // this.cargarPredeterminado();
    this.indice = "0";
    // this.mes = "2";
    // this.anho = "2019" ;
    this.Paginacion();
    this.cargarLista();
    setTimeout(() => {
      this.cargarArrayPaginacion();
    }, 3000);
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
        this.predeterminado.fecha = this.datePipe.transform(this.predeterminado.fecha,"yyy-MM-dd","+0400");
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
        console.log("no se cargo Lista",resp);
      }
    });
   }

   cargarEdicion(item: any){
    this.tipoCambio={
      fecha: this.datePipe.transform(item.fecha,"yyyy-MM-dd","+0400"),
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
            adtcfecd: this.datePipe.transform(this.tipoCambio.fecha,"yyyy-MM-dd"),
            adtctipo:  this.tipoCambio.tc_oficial,
            adtctipc: this.tipoCambio.tc_compra,
            adtctipv : this.tipoCambio.tc_venta,
            adtccufv : this.tipoCambio.tc_ufv,
            adtcesta :  this.tipoCambio.estado ? "1" : "0",
            adtcpred : this.tipoCambio.pred ? "1": "0"
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
              this.cargarPredeterminado();
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
            fecha: this.datePipe.transform(this.today,"yyyy-MM-dd"),
            tc_oficial: "0",
            tc_compra: "0",
            tc_venta : "0",
            tc_ufv : "0",
            estado : false,
            pred : true
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

        cargarArrayPaginacion(){
          // let a = "";
          this.ArrayPaginacion= new Array();
          for (var i = 0; i <=this.totalPaginacion ; i++) {
            // a = i.toString();
            console.log("valor de elemento al array: ", i);
            this.ArrayPaginacion.push(i.toString());
         }
        }
        cargarPaginacion(item: string){
          console.log("cargando lista nro: ", item);

          this.indice= item;

          this.cargarLista();
        }


//  fin de clase
}
