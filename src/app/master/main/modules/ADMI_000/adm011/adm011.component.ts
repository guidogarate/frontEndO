import { Component } from "@angular/core";
import {
  Adm011,
  Adm011Select,
  Adm011SelectRegistros,
} from "src/app/master/utils/models/main/adm_000/index.models";
import { Adm011Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import {
  NotyGlobal,
  InitGlobal,
} from "src/app/master/utils/global/index.global";
import glb001 from "src/app/master/config/glb000/glb001_btn";
import glb002 from "src/app/master/config/glb000/glb002_start";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Paginacion } from "src/app/master/utils/models/main/global/pagin.models";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import url from "src/app/master/config/url.config";
import { FileService } from "../../../../utils/service/main/global/file.service";
declare var $: any;
import { saveAs } from "file-saver";

@Component({
  selector: "app-adm011",
  templateUrl: "./adm011.component.html",
  styleUrls: ["./adm011.component.css"],
})
export class Adm011Component {
  textBuscarAdm011 = new FormControl("", []);
  // buscar = true;
  // texto = "all_data";
  sus: Subscription;
  numeroPag = 1;
  auxma: Adm011[];
  auxmaModal: Adm011;
  selecDivModal: Adm011Select[];
  selecRegistros: Adm011SelectRegistros[];
  pagi: Paginacion[];
  loading = true;
  btnGrupo = glb001;
  start = glb002;
  disabled = {
    division: true,
    dependencia: true,
    codigo: true,
    descripci: true,
    sigla: true,
    estado: true,
  };
  id_adm011 = "";
  contorlAccion: string = "";
  loadingSub = false;
  controlLoginModal = "";
  // TODO: new variables
  id_cod = "";
  idModulo = 10;
  ListDocumentos: any = [];
  forma: FormGroup;
  table = false;
  ocultarSelect = true;
  mostrarCheck = false;
  placeholdeAuto = "automatico";
  insertar = "fall";
  // selectModulo: Adm011Select;
  idNroRegistro: string = "10";

  constructor(
    private adm011S: Adm011Service,
    private fb: FormBuilder,
    private notyG: NotyGlobal,
    private initG: InitGlobal,
    private fileS: FileService
  ) {
    this.getAdm011(this.start.Texto);
    this.crearFormulario();
    this.cargarSelecRegistros();
    this.textBuscarAdm011.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (value.length > 1) {
          this.getAdm011(value, "1");
        } else {
          this.start.Texto = "all_data";
          this.getAdm011(this.start.Texto);
        }
      });
  }

  getAdm011(texto: string, numePag = "1") {
    this.start.Busca = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.Texto = "all_data";
      peticion = this.adm011S.getAdm011(
        "90",
        numePag,
        this.idModulo,
        this.idNroRegistro,
        this.start.Texto
      );
    } else {
      this.start.Texto = texto;
      peticion = this.adm011S.getAdm011(
        "90",
        numePag,
        this.idModulo,
        this.idNroRegistro,
        this.start.Texto
      );
    }
    this.sus = peticion.subscribe((resp) => {
      // this.gestion = resp.usr[0].datos_empresa[0].gestiones[0].gestion;
      if (!this.start.Conte) {
        this.start.Conte = true;
      }
      this.start.NumPa = Number(numePag);
      if (resp["ok"]) {
        this.auxma = resp.data[0].clase_documentos;
        if (this.selecDivModal == undefined) {
          this.selecDivModal = resp.data[0].modulos;
        }
        this.initG.labels();
        this.initG.select();
        this.pagi = resp["cant"];
        this.table = false;
      } else {
        if (resp["messagge"] === "No se encontraron registros") {
          if (this.selecDivModal == undefined) {
            this.selecDivModal = resp.data[0].modulos;
          }
          this.auxma = [];
          this.initG.labels();
          this.initG.select();
          this.pagi = resp["cant"];
          this.table = false;
        } else {
          this.notyG.noty("error", resp["messagge"], 5000);
          this.selecDivModal = [];
          this.auxma = [];
          this.pagi = [];
          this.table = true;
        }
      }
      this.start.Busca = false;
      this.start.Loadi = false;
      this.start.Table = true;
      this.initG.select();
      this.initG.labels();
      this.initG.uniform();
    });
  }

  cargarSelecRegistros() {
    this.selecRegistros = [
      { id_registro: 10, cantidad: "10" },
      { id_registro: 25, cantidad: "25" },
      { id_registro: 50, cantidad: "50" },
      { id_registro: 100, cantidad: "100" },
    ];
  }
  crearFormulario() {
    this.forma = this.fb.group({
      id_modulo: ["10", [Validators.required]],
      nombre_modulo: [""],
      sigla: ["", [Validators.required]],
      checkauto: [""],
      descripcion: ["", [Validators.required]],
      id_documento: ["", [Validators.required]],
      componente: ["", [Validators.required]],
      estado: ["", [Validators.required]],
    });
  }

  paginacion(numero: string, eliminar = true) {
    const nume = Number(numero);
    if (this.numeroPag === nume && eliminar) {
      return;
    }
    const total = this.pagi.length;
    let peticion: Observable<any>;
    if (nume > 0 && nume <= total) {
      this.numeroPag = nume;
      peticion = this.adm011S.getAdm011(
        "90",
        this.numeroPag.toString(),
        this.idModulo,
        this.idNroRegistro,
        this.start.Texto
      );
    } else {
      if (numero === "000") {
        if (this.numeroPag === 1) {
          return;
        }
        if (this.numeroPag === 1) {
          this.numeroPag = 1;
        } else {
          this.numeroPag--;
        }
        peticion = this.adm011S.getAdm011(
          "90",
          this.numeroPag.toString(),
          this.idModulo,
          this.idNroRegistro,
          this.start.Texto
        );
      } else if (numero === "999") {
        if (this.numeroPag === total) {
          return;
        }
        if (this.numeroPag === total) {
          this.numeroPag = total;
        } else {
          this.numeroPag++;
        }
        peticion = this.adm011S.getAdm011(
          "90",
          this.numeroPag.toString(),
          this.idModulo,
          this.idNroRegistro,
          this.start.Texto
        );
      }
    }
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        this.auxma = resp.data[0].clase_documentos;
        this.pagi = resp["cant"];
        // this.auxma = resp.data[0].clase_documentos[0];
      } else {
        this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }

  nuevoAdm011() {
    this.boolBtnGrupo(false, true);
    this.btnGrupo.BtnCance = false;
    this.boolDisabled(false);
    this.forma.reset({
      id_modulo: this.idModulo,
      nombre_modulo: this.ObtenerNombreModulo(this.idModulo),
      id_documento: "auto",
      estado: false,
      checkauto: true,
    });
    //console.log("agregando nuevo: ", this.forma.value);
    this.start.CtrAc = "nuevo";
    this.ocultarSelect = false;
    this.mostrarCheck = true;
    this.forma.get("id_documento").setValue("auto");
    this.forma.get("id_documento").disable();
    this.initG.uniform();
    this.initG.labels();
    this.initG.select();
  }
  ObtenerNombreModulo(id: number) {
    let name: string = "";
    this.selecDivModal.forEach((element) => {
      if (element.id_modulo == id) {
        name = element.modulo;
      }
    });
    return name;
  }

  OpcionesTable(adm_011: Adm011, tipo: string) {
    this.auxmaModal = adm_011;
    this.forma.reset(this.auxmaModal);
    this.start.IdCod = adm_011.id_documento;
    switch (tipo) {
      case "visualizar":
        this.btnGrupo.BtnEdita = true;
        this.btnGrupo.BtnNuevo = true;
        this.btnGrupo.BtnElimi = true;
        console.log("visualisando y activando eliminar");
        this.boolDisabled(true);
        break;
      case "editar":
        this.btnGrupo.BtnCance = true;
        this.btnGrupo.BtnGuard = true;
        this.boolDisabled(false);
        this.forma.get("nombre_modulo").disable();
        this.forma.get("checkauto").disable();
        this.forma.get("id_documento").disable();
        break;
      // case "eliminar":
      //   return;
      default:
        this.notyG.noty("error", "Operacion incorrecta", 5000);
        break;
    }
    this.start.CtrAc = tipo;
  }

  OpcionesModal(tipo: string) {
    this.mostrarCheck = false;
    switch (tipo) {
      case "nuevo":
        if (this.insertar === "exito") {
          this.boolDisabled(true);
          this.boolBtnGrupo(true, false);
          return;
        }
        this.start.CtrAc = tipo;
        this.boolBtnGrupo(false, true);
        this.btnGrupo.BtnElimi = false;
        console.log("modal nuevo off delete");
        this.btnGrupo.BtnCance = true;

        this.forma.reset({
          id_modulo: this.idModulo,
          nombre_modulo: this.ObtenerNombreModulo(this.idModulo),
          estado: false,
          id_documento: "auto",
          checkauto: true,
        }); // resetea todo a null y estado a false
        // console.log("reseteando form opciones Modal: ", this.forma.value);
        this.boolDisabled(false);
        this.mostrarCheck = true;
        this.forma.get("id_documento").setValue("auto");
        this.forma.get("id_documento").disable();
        this.initG.uniform();
        this.initG.labels();
        return;
      case "editar":
        console.log("editando");
        this.start.CtrAc = tipo;
        this.boolDisabled(false);
        this.boolBtnGrupo(false, true);
        this.btnGrupo.BtnElimi = false;

        this.forma.get("id_documento").disable();
        this.forma.get("checkauto").disable();
        return;
      case "eliminar":
        break;
      case "salir":
        this.insertar = "fall";
        this.placeholdeAuto = "automatico";
        this.resetDatos();
        this.boolDisabled(true);
        this.btnGrupo.BtnElimi = false;
        break;
      case "cancelar":
        console.log(this.start.CtrAc);
        if (this.insertar === "exito") {
          this.boolDisabled(true);
          this.boolBtnGrupo(true, false);
          return;
        }
        this.placeholdeAuto = "automatico";
        this.resetDatos();
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        this.btnGrupo.BtnElimi = true;
        return;
      case "guardar":
        this.boolDisabled(false);
        console.log("Formulario Invalido?", this.forma);
        if (this.forma.invalid) {
          this.mostrarCheck = true;
          return;
        }
        this.btnGrupo.BtnLoadi = true;
        this.btnGrupo.BtnCance = false;
        console.log("Formulario values", this.forma.value);
        this.guardarDatos(this.forma.value, this.start.CtrAc);
        return;
    }
    // this.boolBtnGrupo(true, true);
    this.boolBtnGrupo(false, false);
    // this.btnGrupo.BtnElimi = true;
  }

  boolDisabled(bool: boolean) {
    if (bool) {
      this.forma.get("nombre_modulo").disable();
      this.forma.get("checkauto").disable();
      this.forma.get("estado").disable();
      this.forma.get("id_documento").disable();
      this.forma.get("descripcion").disable();
      this.forma.get("sigla").disable();
      this.forma.get("componente").disable();
    } else {
      this.forma.get("checkauto").enable();
      this.forma.get("id_modulo").enable();
      this.forma.get("estado").enable();
      this.forma.get("id_documento").enable();
      this.forma.get("descripcion").enable();
      this.forma.get("sigla").enable();
      this.forma.get("componente").enable();
    }
    this.initG.labels();
    this.initG.select();
  }

  // 11
  boolBtnGrupo(editNuevo: boolean, cancelGuardar: boolean) {
    this.btnGrupo.BtnCance = cancelGuardar;
    this.btnGrupo.BtnEdita = editNuevo;
    // this.btnGrupo.BtnElimi = true;
    this.btnGrupo.BtnGuard = cancelGuardar;
    this.btnGrupo.BtnNuevo = editNuevo;
  }

  resetDatos() {
    // console.log("auxmodal valores: ", this.auxmaModal);
    this.forma.reset(this.auxmaModal);
    this.initG.labels();
    this.initG.select();
  }

  habilitarAuto() {
    if (this.forma.get("checkauto").value) {
      this.forma.get("id_documento").enable();
      this.forma.get("id_documento").setValue("");
      this.placeholdeAuto = "introducir codigo";
      // console.log("id_documento value: ", this.forma.get("id_documento"));
    } else {
      this.forma.get("id_documento").setValue("auto");
      this.forma.get("id_documento").disable();
      this.placeholdeAuto = "automatico";
      // console.log("id_documento auto: ", this.forma.get("id_documento"));
    }
    this.initG.labels();
  }

  adm011Selectgest(gestion: string) {
    console.log("gestion change: ", gestion);
    this.idModulo = Number(gestion);
    this.getAdm011("all_data", "1");
  }

  adm011SelectRegistro(idRegistro: string) {
    console.log("Registro change: ", idRegistro);
    this.idNroRegistro = idRegistro;
    this.getAdm011("all_data", "1");
  }

  guardarDatos(adm_011: Adm011, contorlAccion: string) {
    let peticion: Observable<any>;
    if (contorlAccion === "nuevo") {
      peticion = this.adm011S.inAdm011(adm_011);
      this.cerrarModal();
    } else if (contorlAccion === "editar") {
      peticion = this.adm011S.upAdm011(
        adm_011,
        this.idModulo,
        adm_011.id_documento
      );
    } else {
      this.notyG.noty("error", "control Accion Invalido", 2000);
    }
    this.sus = peticion.subscribe((resp) => {
      this.btnGrupo.BtnLoadi = false;
      this.boolDisabled(true);
      this.boolBtnGrupo(true, false);
      if (resp["ok"]) {
        if (contorlAccion === "nuevo") {
          this.start.IdCod = resp["id_registro"];
          this.insertar = "exito";
          // para que, cuando le de x, resetee el valor que
          // se ha insertado recientemente entonces vamos a opcionModal en editar
        }
        this.getAdm011(this.start.Texto, this.start.NumPa.toString());
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.boolBtnGrupo(false, true);
        this.boolDisabled(false);
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  eliminarAdm011(adm011: Adm011) {
    let peticion: Observable<any>;
    peticion = this.adm011S.delAdm011(adm011.id_modulo, adm011.id_documento);
    let numPag = this.start.NumPa;
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        if (this.auxma.length === 1) {
          numPag--;
        }
        this.paginacion(numPag.toString(), false);
        this.start.IdCod = "";
        this.notyG.noty("success", resp["mensaje"], 3000);
        this.cerrarModal();
      } else {
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }
  cerrarModal() {
    console.log("intentando cerrar modal");
    $("#modal_adm_011").modal("hide");
    // $("#modal_adm_011_eliminar").modal("hide");
  }

  GetAdm011Pdf() {
    console.log("exportar a pdf");
    this.adm011S.getAdm011Pdf("90", this.idModulo).subscribe((resp) => {
      if (resp["ok"]) {
        console.log("download pdf: ");
      } else {
        console.log("error: ", resp["mensaje"]);
      }
    });
  }

  printDoc() {
    const htmlStart: string =
      "<html><head><title>Ormate</title><link href='assets/assets/css/bootstrap.css' rel='stylesheet' type='text/css'/><link href='assets/assets/css/print.css' rel='stylesheet' type='text/css'/></head><body> <table class='report-container w-100'>";
    const header: string =
      "<thead class='report-header'><tr><th class='report-header-cell'><div class='header-info'><div  class= 'm-auto' style='padding: 5px 0; margin: auto;'><div  class='d-flex m-auto' style='display: flex; font-size: 10px; margin: auto;'><div class='w-50 d-flex' style='width: 50%; display: flex;'><div><img src='https://pbs.twimg.com/profile_images/522791992762187776/CwgQU9cn_400x400.png'style='width: 100px; height: 100px;'/></div><div style='padding-left:25;'><p class='size-nombre'>ORMATE</p><p>Direccion : Av. Monseñor Salvatierra # 150</p><p>Telf: 33-339868</p><p>Santa Cruz - Bolivia</p></div></div><div class='col-md-6 text-right' ><p>Fecha: 18-may-2020</p><p>Impresión: 15:15:30</p></div></div><div class='d-flex' style='display: flex;'><div class='w-25' style='width: 25%;'></div><div class='w-50 text-center' style='width: 50%; text-align: center; justify-self: center;'><p style='font-size: 20px;'>COMPONENTE DE FACTURACION</p><p style='font-size: 14px;'>Administracion</p></div><div class='w-25' style='width: 25%;'></div></div></div></div></th></tr></thead>";
    const tableStart: string =
      "<tbody class='report-content'><tr><td class='report-content-cell'><div class='main'> <table class='table'>";
    const tableHead: string =
      "<thead class='text-center'><tr class='bg-blue'><th>Codigo</th><th>Descripcion</th><th>Sigla</th><th>Componente</th><th>Estado</th></tr></thead>";
    let tableData: string = "<tbody>";
    const long = this.auxma.length - 1;
    let cant = 50;
    for (let i = long; i >= 0; i--) {
      tableData =
        `<tr><td class='text-center'>${this.auxma[i].id_documento} </td><td>${
          this.auxma[i].descripcion
        } </td><td>${this.auxma[i].sigla} </td><td>${
          this.auxma[i].componente
        } </td><td class='text-center'>
        
        ${this.auxma[i].estado === true ? "activo" : "inactivo"} </td></tr>` +
        tableData;
      if (i < cant) {
        cant--;
        i++;
      }
    }
    tableData = tableData + "</tbody>";
    const tableEnd: string = "</table> </div></td></tr></tbody>";

    const tableFooter: string =
      "<tfoot class='report-footer'><tr> <td class='report-footer-cell'><footer class='footer-print'><div class='footer-info'><div class='footer-div'><div class='footer-empr'>Aplic: Ormate</div><div class='footer-user'>Usuario: Admin</div></div></div></footer></td></tr></tfoot> ";

    const htmlEnd: string = "</table></body></html>";
    const mandarImprimir: string =
      htmlStart +
      header +
      tableStart +
      tableHead +
      tableData +
      tableEnd +
      tableFooter +
      htmlEnd;
    const w = window.open();
    w.document.write(mandarImprimir);
    w.document.close();
    setTimeout(() => {
      w.print();
      // w.close();
    }, 100);
    console.log("printDoc");
  }

  // printDoc2() {
  //   const htmlStart: string =
  //     "<html><head><title>Ormate</title><link href='assets/assets/css/bootstrap.css' rel='stylesheet' type='text/css'/><link href='assets/assets/css/print.css' rel='stylesheet' type='text/css'/></head><body>";
  //   const header: string =
  //     "<header><div style='padding: 5px 0; margin: auto;'><div style='display: flex; font-size: 10px; margin: auto;'><div style='width: 50%; display: flex;'><div><img src='https://pbs.twimg.com/profile_images/522791992762187776/CwgQU9cn_400x400.png' style='width: 100px; height: 100px;'/></div><div style='padding-left: 25;'><p>ORMATE</p><p>Direccion : Av. Monseñor Salvatierra # 150</p><p>Telf: 33-339868</p><p>Santa Cruz - Bolivia</p></div></div><div style='padding-left: 30%;'><p>Fecha: 18/05/2020</p><p>Impresión: 15:15:30</p></div></div><div style='display: flex;'><div style='width: 25%;'></div><div style='width: 50%; text-align: center; justify-self: center;'><p style='font-size: 20px;'>COMPONENTE DE FACTURACION</p><p style='font-size: 14px;'>administracion</p></div><div style='width: 25%;'></div></div></div></header>";
  //   const tableStart: string = "<table class='table'>";
  //   const tableHead: string =
  //     "<thead class='text-center'><tr class='bg-blue'><th>Codigo</th><th>Descripcion</th><th>Sigla</th><th>Componente</th><th>Estado</th></tr></thead>";
  //   let tableData: string = "<tbody>";
  //   const long = this.auxma.length - 1;
  //   for (let i = long; i >= 0; i--) {
  //     tableData =
  //       `<tr><td>${this.auxma[i].id_documento} </td><td>${this.auxma[i].descripcion} </td><td>${this.auxma[i].sigla} </td><td>${this.auxma[i].componente} </td><td>${this.auxma[i].estado} </td></tr>` +
  //       tableData;
  //   }
  //   tableData = tableData + "</tbody>";
  //   const tableEnd: string = "</table>";
  //   const htmlEnd: string = "</body></html>";
  //   const mandarImprimir: string =
  //     htmlStart +
  //     header +
  //     tableStart +
  //     tableHead +
  //     tableData +
  //     tableEnd +
  //     htmlEnd;
  //   const w = window.open();
  //   w.document.write(mandarImprimir);
  //   w.document.close();
  //   setTimeout(() => {
  //     w.print();
  //     w.close();
  //   }, 100);
  //   console.log("printDoc");
  // }
  IrDashboard() {
    window.location.href = url.principal;
  }
  downloadPdfExel(tipo: string) {
    let peticion: Observable<any>;
    const rutaPdf: string = "adm_000/adm_011/get-pdf/90/0";
    const rutaExel: string = "adm_000/adm_011/get-excel/90/0";
    let tipoFile: string = "";
    const fileName: string = "adm011";
    switch (tipo) {
      case "pdf":
        tipoFile = "application/pdf";
        peticion = this.fileS.downloadFile({ fileName }, rutaPdf);
        break;
      case "exel":
        tipoFile = "application/vnd.ms-excel";
        peticion = this.fileS.downloadFile({ fileName }, rutaExel);
        break;
      default:
        break;
    }
    this.sus = peticion.subscribe((resp) => {
      const archivo = new Blob([resp], { type: tipoFile });
      saveAs(archivo, fileName);
    });
  }
}
