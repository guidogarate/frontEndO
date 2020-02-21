import { Component, OnInit, LOCALE_ID } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Adm001Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
// import * as Noty from "noty";
import { NotyGlobal } from "src/app/master/utils/global/index.global";

declare function initLabels();

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
  nuevo : boolean = false;
  fechaMaxima: any;
  stade : number = 0;

  constructor(
    private _adm001Service: Adm001Service,
    private datePipe: DatePipe,
    private notyG: NotyGlobal
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
        initLabels();
      }, 1500);
    }, 1500);

    this.configurarFecha();

    this.Limpiar();
    this.loading= false;
  }
  cargarPredeterminado() {
    this._adm001Service.CargarPredeterminados().subscribe(resp => {
      if (resp["ok"]) {
        this.predeterminado = resp["adm_001_mostrarTodo"][0];
        this.predeterminado.fecha = this.datePipe.transform(
          this.predeterminado.fecha,
          "yyyy-MM-dd",
          "+0400"
        );
        this.predeterminado.estado = this.predeterminado.estado == "1" ? true: false;
      } else {
        console.log("no se cargo el TC predeterminado");
      }
    });
  }

  cargarLista() {
    this.loading= true;
    this._adm001Service
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
    setTimeout(() => {
      initLabels();
    }, 1000);
    this.editar = true;
    console.log("Pa Edicion a vista: ", this.tipoCambio);
  }

  Paginacion() {
    console.log("anho: ", this.anho);
    console.log("mes: ", this.mes);
    this._adm001Service.paginado(this.mes, this.anho).subscribe(resp => {
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
    this._adm001Service.agregar(this.tipoCambioSend).subscribe(resp => {
      if (resp["ok"]) {
        this.notyG.noty("success", "Guardando ", 3500);
        console.log("Guardando: ", resp);
        this.Limpiar();
        this.cargarLista();
        this.Cancelar();
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
    this._adm001Service.actualizar(this.tipoCambioSend).subscribe(resp => {
      if (resp["ok"]) {
        this.notyG.noty("success", "Actualizando ..", 3500);
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
      tc_oficial: "",
      tc_compra: "",
      tc_venta: "",
      tc_ufv: "",
      estado: true,
      pred: true
    };
  }

  Eliminar(item: any) {
    console.log("eliminando null",item.fecha);
    let confirmar = confirm("desea eliminar");
    if(confirmar){
      this.loading= true;
      this._adm001Service.eliminar(item.fecha).subscribe(resp => {
        if (resp["ok"]) {
          this.notyG.noty("success", "Eliminando ..", 3500);
          this.Limpiar();
          this.cargarLista();
          this.Cancelar();
          this.cargarPredeterminado();
         
        } else {
          console.log("no se pudo eliminar", resp);
          return resp;
        }
      });
      this.loading= false;
    }
  }

  Cancelar() {
    this.Limpiar();
    this.stade = 0;
  }

  Editar() {
    this.editar = true;
    this.stade = 1;
  }
 
  cargarPaginacion(item:string ) {
    console.log("cargando lista nro: ", item);
    this.indice = item;
    this.cargarLista();
  }
  /* Fin Paginacion */

  ObtenerGestion() {
    this._adm001Service.obtenerGestiones().subscribe(resp => {
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
    this._adm001Service
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

  Nuevo(){
    // this.editar = true;
    this.stade = 2;
    this.Limpiar();
  }
  Copiar(){
    if(this.stade == 2){
      this.tipoCambio = {
        fecha: this.datePipe.transform(this.today, "yyyy-MM-dd"),
        tc_oficial: this.predeterminado.tc_oficial,
        tc_compra: this.predeterminado.tc_compra,
        tc_venta: this.predeterminado.tc_venta,
        tc_ufv: this.predeterminado.tc_ufv,
        estado: true,
        pred: true
      };
      setTimeout(() => {
        initLabels();
      }, 800);
    }
  }
  nada(){}

  //  fin de clase
}
