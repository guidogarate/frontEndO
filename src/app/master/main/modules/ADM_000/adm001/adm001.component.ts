import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Adm001Service } from "../../../../utils/service/ADM-001/Adm001.service";
import * as Noty from "noty";

@Component({
  selector: "app-adm001",
  templateUrl: "./adm001.component.html",
  styleUrls: ["./adm001.component.css"]
})
export class Adm001Component implements OnInit {
  predeterminado: any;
  ListTipoCambio: any;
  indice: string;
  mes: string = "2";
  anho: string;
  loading : boolean = true;
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

  listaAnhos = [];
  totalPaginacion: any[];
  today: any = Date.now();
  tipoCambio: any;
  tipoCambioSend: any;
  editar: boolean = false;
  
  fechaMaxima: any;

  constructor(
    private adm001Service: Adm001Service,
    private datePipe: DatePipe
  ) {
    this.indice = "0";
  }

  ngOnInit() {
    this.ObtenerGestionesPredeterminado();
    setTimeout(() => {
      console.log("cargando arraypaginacion");
      setTimeout(() => {
        this.cargarLista();
        this.Paginacion();
      }, 1500);
    }, 1500);

    this.configurarFecha();

    this.Limpiar();
    this.loading= false;
  }
  cargarPredeterminado() {
    this.adm001Service.CargarPredeterminados().subscribe(resp => {
      if (resp["ok"]) {
        this.predeterminado = resp["adm_001_mostrarTodo"][0];
        this.predeterminado.fecha = this.datePipe.transform(
          this.predeterminado.fecha,
          "yyyy-MM-dd",
          "+0400"
        );
      } else {
        console.log("no se cargo el TC predeterminado");
      }
    });
  }

  cargarLista() {
    this.loading= true;
    this.adm001Service
      .CargarListaTipoCambio(this.indice, this.mes, this.anho)
      .subscribe(resp => {
        if (resp["ok"]) {
          this.ListTipoCambio = resp["adm_001_mostrarTodo"];
          console.log("listaTipoCambio: "  + this.indice + " ", this.ListTipoCambio);
        } else {
          console.log("no se cargo Lista", resp);
        }
      });
      this.loading= false;
  }

  cargarEdicion(item: any) {
    console.log("Pa Edicion: ", item);
    this.tipoCambio = {
      fecha: this.datePipe.transform(item.fecha, "yyyy-MM-dd", "+0400"),
      tc_oficial: item.tc_oficial,
      tc_compra: item.tc_compra,
      tc_venta: item.tc_venta,
      tc_ufv: item.tc_ufv,
      estado: item.estado == 1,
      pred: item.pred == 1
    };
    this.editar = true;
    console.log("Pa Edicion a vista: ", this.tipoCambio);
  }

  Paginacion() {
    console.log("anho: ", this.anho);
    console.log("mes: ", this.mes);
    this.adm001Service.paginado(this.mes, this.anho).subscribe(resp => {
      if (resp["ok"]) {
        this.totalPaginacion = resp["total"];
        console.log("Total paginacion: ", this.totalPaginacion);
      } else {
        console.log("no se cargo paginado", resp);
        return resp;
      }
    });
  }

  Guardar() {
    this.tipoCambioSend = {
      adtcfecd: this.datePipe.transform(this.tipoCambio.fecha, "yyyy-MM-dd"),
      adtctipo: this.tipoCambio.tc_oficial,
      adtctipc: this.tipoCambio.tc_compra,
      adtctipv: this.tipoCambio.tc_venta,
      adtccufv: this.tipoCambio.tc_ufv,
      adtcesta: this.tipoCambio.estado ? "1" : "0",
      adtcpred: this.tipoCambio.pred ? "1" : "0"
    };
    this.adm001Service.agregar(this.tipoCambioSend).subscribe(resp => {
      if (resp["ok"]) {
        new Noty({
          text: "Guardando",
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "error",
          layout: "bottomRight"
        }).show();
        console.log("Guardando: ", resp);
        this.Limpiar();
        this.cargarLista();
      } else {
        console.log("no se pudo guardar", resp);
        return resp;
      }
    });
  }

  Actualizar() {
    this.tipoCambioSend = {
      adtcfecd: this.datePipe.transform(
        this.tipoCambio.fecha,
        "yyyy-MM-dd",
        "+0400"
      ),
      adtctipo: this.tipoCambio.tc_oficial,
      adtctipc: this.tipoCambio.tc_compra,
      adtctipv: this.tipoCambio.tc_venta,
      adtccufv: this.tipoCambio.tc_ufv,
      adtcesta: this.tipoCambio.estado ? "1" : "0",
      adtcpred: this.tipoCambio.pred ? "1" : "0"
    };
    console.log("para actualizar: ", this.tipoCambioSend);
    this.adm001Service.actualizar(this.tipoCambioSend).subscribe(resp => {
      if (resp["ok"]) {
        new Noty({
          text: "actualizado",
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "error",
          layout: "bottomRight"
        }).show();
        console.log("Actualizando: ", resp);
        this.cargarLista();
        this.cargarPredeterminado();
        this.Cancelar();
      } else {
        console.log("no se pudo guardar", resp);
        return resp;
      }
    });
  }

  Limpiar() {
    this.tipoCambio = {
      fecha: this.datePipe.transform(this.today, "yyyy-MM-dd"),
      tc_oficial: "0",
      tc_compra: "0",
      tc_venta: "0",
      tc_ufv: "0",
      estado: false,
      pred: true
    };
  }

  Eliminar() {
    this.loading= true;
    this.adm001Service.eliminar(this.tipoCambio.fecha).subscribe(resp => {
      if (resp["ok"]) {
        this.Limpiar();
        this.cargarLista();
        this.Cancelar();
        this.cargarPredeterminado();
        new Noty({
          text: "Eliminando",
          theme: "nest",
          progressBar: false,
          timeout: 3500,
          type: "error",
          layout: "bottomRight"
        }).show();
      } else {
        console.log("no se pudo eliminar", resp);
        return resp;
      }
    });
    this.loading= false;
  }

  Cancelar() {
    this.Limpiar();
    this.editar = false;
  }

  Editar() {
    this.editar = true;
  }
 
  cargarPaginacion(item:string ) {
    console.log("cargando lista nro: ", item);
    this.indice = item;
    this.cargarLista();
  }
  /* Fin Paginacion */

  ObtenerGestion() {
    this.adm001Service.obtenerGestiones().subscribe(resp => {
      if (resp["ok"]) {
        this.listaAnhos = resp["gestDispo"];
        this.anho = this.listaAnhos[1].fecha;
      } else {
        console.log("no se cargo lista de Gestiones");
        return resp;
      }
    });
  }

  configurarFecha() {
    this.fechaMaxima = this.datePipe.transform(this.today, "yyyy-MM-dd");
  }

  ObtenerGestionesPredeterminado() {
    this.adm001Service
      .obtenerGestionesDisponiblesPredeterminado()
      .subscribe(resp => {
        if (resp["ok"]) {
          this.listaAnhos = resp["gestDispo"];
          this.anho = this.listaAnhos[1].fecha;
          this.predeterminado = resp["adm_001_mostrarTodo"][0];
          this.predeterminado.fecha = this.datePipe.transform(
            this.predeterminado.fecha,
            "yyyy-MM-dd",
            "+0400"
          );
        } else {
          console.log("no se cargo lista de Gestiones");
          return resp;
        }
      });
  }

  ActualizarLista(){
    this.ListTipoCambio = undefined;
    this.loading= true;
    this.indice="0";
    this.Paginacion()
    this.cargarLista();
    this.loading= false;
  }
  nada(){}

  //  fin de clase
}
