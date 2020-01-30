import { Component, OnInit } from "@angular/core";
import { Adm002Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { DatePipe } from "@angular/common";
import { from, empty } from "rxjs";
import { filter } from "rxjs/operators";
import { NotyGlobal } from "src/app/master/utils/global/index.global";

declare function initLabels();
declare function init_date();
declare var $: any;

@Component({
  selector: "app-adm002",
  templateUrl: "./adm002.component.html",
  styleUrls: ["./adm002.component.css"]
})
export class Adm002Component implements OnInit {
  /* Lista de Datos */
  ListaGestiones: any;
  ListaPeriodos: any;
  ListaEstadosGestionPeriodos: any;
  estado: number;
  ListaTiposEmpresa: any;
  idEmpresa: number = 0;
  cargando: boolean = false;
  /*Acciones*/
  editGestion: boolean = true;
  nuevo: boolean = false;
  editPeriodo: boolean = false;
  // editModifAutoGestion : boolean = false;

  fechainicial: Date;
  mesInicial: string = "0";
  mesFinal: string = "0";
  fechaInicioGestion: string;
  /* valores predeterminados de Gestion*/
  estadoPredeterminado: string = "";
  tipoEmpresaPredeterminado: string = "";

  listaMeses = [
    { id: 0, name: "Seleccione Mes" },
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
  // gestionModel : Gestion;
  gestionModelo: any;
  periodoModelo: any;

  /* Periodo*/
  DiaInicioGestion: string;
  constructor(
    private _adm002Service: Adm002Service,
    private datePipe: DatePipe,
    private notyG: NotyGlobal
  ) {}

  ngOnInit() {
    this.obtenerGestionesPeriodos();

    setTimeout(() => {
      initLabels();
      // init_date();
    }, 1000);
  }

  /* Peticiones */
  obtenerGestionesPeriodos() {
    this.cargando = true;
    this._adm002Service.ObtenerGestionesPeriodos().subscribe(resp => {
      if (resp["ok"]) {
        this.ListaGestiones = resp["gestion"];
        // var removed = this.ListaGestiones.splice(3);
        this.ListaPeriodos = resp["periodos"];
        this.ListaEstadosGestionPeriodos = resp["EstGestion"];
        this.ListaTiposEmpresa = resp["ActiEmpres"];
        this.estadoPredeterminado = this.ListaEstadosGestionPeriodos[0].adampred;
        console.warn("predeterminados : ", this.estadoPredeterminado);
        this.tipoEmpresaPredeterminado = this.ListaTiposEmpresa[0].adampred;
      } else {
        console.log("No se cargo gestiones ni periodos");
        console.error(resp);
      }
    });
    this.cargando = false;
  }

  GuardarGestion() {
    this.nuevo = true;
    //console.log(this.gestionModelo);
    this._adm002Service.AgregarGestion(this.gestionModelo).subscribe(resp => {
      if (resp["ok"]) {
        //  console.log("registrado correctamente");
        this.limpiarGestion();
        this.cerrarModal();
        this.obtenerGestionesPeriodos();
        this.notyG.noty("success", "Agregando", 3500);
      } else {
        console.log("no se ha podido registrar: ", resp);
        this.notyG.noty("error", "No se ha podido Agregar", 3500);
      }
    });
  }

  ActualizarGestion() {
    console.log(this.gestionModelo);
    this._adm002Service.ActualizarGestion(this.gestionModelo).subscribe(resp => {
      if (resp["ok"]) {
        console.log("registrado correctamente");
        this.limpiarGestion();
        this.cerrarModal();
        this.obtenerGestionesPeriodos();
        this.notyG.noty("success", "Actualizando", 3500);
      } else {
        console.log("no se ha podido Actualizar: ", resp);
        this.notyG.noty("error", "No se ha podido Actualizar", 3500);
      }
    });
  }

  VerPeriodos(gestion: any) {
    this.cargando = true;
    this._adm002Service.ObtenerPeriodos(gestion.adgtideg).subscribe(resp => {
      if (resp["ok"]) {
        this.ListaPeriodos = resp["periodos"];
        this.notyG.noty(
          "success",
          "Cargando Periodos " + gestion.adgtideg,
          3500
        );
      } else {
        console.log("No se cargo gestiones ni periodos");
        this.notyG.noty(
          "error",
          "No se ha podido recuperar los periodos " + gestion.adgtideg,
          3500
        );
        resp;
      }
    });
    this.cargando = false;
  }

  EliminarGestion(item: any) {
    let result = confirm("Esta Seguro que desea Eliminar?");
    if (result) {
      //Logic to delete the item
      if (item != undefined || item != null) {
        this.gestionModelo = item;
      }
      console.log("eliminando: ", this.gestionModelo);
      this._adm002Service
        .EliminarGestion(this.gestionModelo.adgtideg)
        .subscribe(resp => {
          if (resp["ok"]) {
            /**
             * primera opcion  haciendo la llamada al backend
             */

            this.limpiarGestion();
            this.cerrarModal();
            this.obtenerGestionesPeriodos();

            /**
             * Segunda opcion de eliminar para evitar la llamada al backend
             */
            // this.ListaGestiones= this.ListaGestiones.filter( function(gestion){
            //   return gestion.gestion != this.gestionModelo.adgtideg;
            // });
            this.notyG.noty(
              "info",
              "Eliminando Gestion" + this.gestionModelo.adgtideg,
              3500
            );
          } else {
            console.log("no se pudo eliminar", resp);
            this.notyG.noty("error", "No se puede eliminar la Gestion", 3500);
            return resp;
          }
        });
    }
  }

  editar() {
    this.editGestion = false;
    this.nuevo = false;
  }

  VerGestion(item: any) {
    this.editGestion = true;
    this.cargarGestion(item);
  }

  EditarGestion(item: any) {
    this.editGestion = false;
    this.nuevo = false;
    this.cargarGestion(item);
  }

  AgregarGestion() {
    this.editGestion = false;
    this.editPeriodo = false;
    this.nuevo = true;
    this.limpiarGestion();
  }

  Nuevo() {
    this.editGestion = false;
    this.nuevo = true;
    if (this.gestionModelo != undefined) {
      this.limpiarGestion();
    } else {
      console.log("abrir modal");
    }
  }

  Cancelar() {
    this.cerrarModal();
    this.editGestion = false;
    this.editPeriodo = false;
    this.nuevo = false;
  }

  cerrarModal() {
    $("#modal_gestion").modal("hide");
    $("#modal_periodo_gestion").modal("hide");
    this.editGestion = true;
    this.editPeriodo = true;
    this.nuevo = false;
  }

  cargarGestion(item: any) {
    this.gestionModelo = {
      adgtideg: item.adgtideg,
      adgtdesc: item.adgtdesc,
      adgtacte: item.adgtacte,
      adgtcanp: item.adgtcanp,
      adgtesta: item.adgtesta == 1 ? "1" : "2",
      adgtfegi: item.adgtfegi,
      adgtfegf: item.adgtfegf,
      adgtmoda: item.adgtmoda == "1" ? true : false,
      adgtdiam: item.adgtdiam,
      adgtgesd: item.adgtgesd == 1 ? true : false
    };
    if (this.gestionModelo.adgtfegi != null) {
      // console.log("cargando data fechas: ");
      this.mesInicial = (
        new Date(this.gestionModelo.adgtfegi).getUTCMonth() + 1
      ).toString();
      this.mesFinal = (
        new Date(this.gestionModelo.adgtfegf).getUTCMonth() + 1
      ).toString();
      this.gestionModelo.adgtdiam = this.datePipe.transform(
        this.gestionModelo.adgtdiam,
        "yyyy-MM",
        "+0430"
      );
      this.fechaInicioGestion = this.datePipe.transform(
        this.gestionModelo.adgtfegi,
        "yyyy-MM-dd",
        "+0430"
      );
    }
  }

  limpiarGestion() {
    setTimeout(() => {
      initLabels();
    }, 1000);
    this.gestionModelo = {
      adgtacte: this.tipoEmpresaPredeterminado,
      adgtesta: this.estadoPredeterminado,
      adgtmoda: false,
      adgtdiam: null,
      adgtgesd: true,
      adgtcanp: 12
    };
    this.fechaInicioGestion = null;
    this.mesInicial = "1";
    this.mesFinal = "1";
  }

  /**
   * para el Modal del Periodo
   */

  VerPeriodo(item: any) {
    this.CargarPeriodo(item);
    setTimeout(() => {
      initLabels();
    }, 1000);
  }

  editarPeriodoModal() {
    this.editPeriodo = true;
  }
  EditarPeriodo(item: any) {
    this.editPeriodo = true;
    this.CargarPeriodo(item);
    setTimeout(() => {
      initLabels();
    }, 1000);
  }

  CargarPeriodo(item: any) {
    this.periodoModelo = {
      adprideg: item.adprideg,
      adpridep: item.adpridep, //== null  ? (('1').padStart(2,'0')) : item.adpridep,
      adprmesp: item.adprmesp,
      adprdesc: item.adprdesc,
      adpresta: item.adpresta == 1 ? "1" : "2",
      adprfepi: item.adprfepi,
      adprfepf: item.adprfepf,
      adprmoda: item.adprmoda == "1" ? true : false,
      adprdiam: item.adprdiam
    };

    if (item.adprdiam != null) {
      let fechita = this.datePipe.transform(
        item.adprdiam,
        "yyyy-MM-dd",
        "+0430"
      );
      this.dia = new Date(fechita).getUTCDate();
      this.periodoModelo.adprdiam = fechita;
    } else {
      this.dia = 0;
    }
  }

  armarFecha(year: any, month: any) {
    // console.log("armando Fecha: ", year + "-" + month);
    if (
      year == null ||
      month == null ||
      year.length == 0 ||
      month.length == 0
    ) {
      this.notyG.noty("warning", "debe LLenar la Gestion", 1500);
      this.mesInicial = "0";
    } else {
      let fechaAux1: string;
      fechaAux1 = year + "-" + month;
      this.fechainicial = new Date(year, month - 1);
      this.gestionModelo.adgtfegi = this.fechainicial;
      let fechafin = new Date(this.gestionModelo.adgtfegi);
      fechafin.setMonth(fechafin.getMonth() + 12);
      fechafin.setDate(0); // poniendo a fin de dia de mes
      this.gestionModelo.adgtfegf = fechafin;
      this.mesFinal = (fechafin.getMonth() + 1).toString();
      this.fechaInicioGestion = this.datePipe.transform(
        this.fechainicial,
        "yyyy-MM-dd"
      );
      this.IniciarfechaModificacionAutomatica();
    }
  }

  IniciarfechaModificacionAutomatica() {
    if (this.gestionModelo.adgtmoda != false) {
      this.gestionModelo.adgtdiam = null;
    }
  }

  IniciarfechaModificacionAutomaticaPeriodo() {
    if (this.periodoModelo.adprmoda != false) {
      this.periodoModelo.adprdiam = null;
      this.dia = 0;
    }
  }
  dia: number = 0;
  mostrarFecha = false;

  CalcularGestion(idGestion: string) {
    switch (idGestion) {
      case "1": {
        this.mesInicial = "1";
        break;
      }
      case "2": {
        this.mesInicial = "4";
        break;
      }
      case "3": {
        this.mesInicial = "4";
        break;
      }
      default: {
        this.mesInicial = "0";
        break;
      }
    }
    if (
      this.gestionModelo.adgtideg == null ||
      this.gestionModelo.adgtideg.length == 0
    ) {
      this.notyG.noty("warning", "debe colocar una gestion válida", 1500);
    } else {
      this.armarFecha(this.gestionModelo.adgtideg, this.mesInicial);
    }
  }

  ActualizarPeriodo() {
    let anhoDia: string = "";
    if (this.periodoModelo.adprdiam != null) {
      // let FechaAux = new Date((this.periodoModelo.adprdiam).toString());
      // FechaAux.setDate(this.dia);
      // this.periodoModelo.adprdiam = FechaAux;
      // this.periodoModelo.adprdiam = this.datePipe.transform(
      //   FechaAux,
      //   "yyyy-MM-dd" );
      //console.log("periodo modelo para enviar: ", this.periodoModelo.adprdiam);
    } else {
      // let fechaDiaAux : string ="";
      // fechaDiaAux = ""+this.periodoModelo.adprideg+"-"+ this.periodoModelo.adprmesp+"-"+this.dia;
      // this.periodoModelo.adprdiam = new Date(fechaDiaAux);
    }
    anhoDia =
      "" + this.periodoModelo.adprideg + "/" + this.periodoModelo.adprmesp;
    console.warn("Actualizar Periodo: ", this.periodoModelo);
    this._adm002Service
      .ActualizarPeriodo(this.periodoModelo, anhoDia)
      .subscribe(resp => {
        if (resp["ok"]) {
          this.cerrarModal();
          this.obtenerGestionesPeriodos();
          this.notyG.noty("success", "Periodo actualizado", 3500);
        } else {
          console.error(resp);
          this.notyG.noty("error", "No se pudo actualizar", 3500);
        }
      });
  }

  nada() {}
}
