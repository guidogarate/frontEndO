import { Component, Input } from "@angular/core";
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
import { FileService } from "src/app/master/utils/service/main/global/file.service";
declare var $: any;
import { saveAs } from "file-saver";
@Component({
  selector: "app-clase-doc",
  templateUrl: "./clase-doc.component.html",
  styleUrls: ["./clase-doc.component.css"],
})
export class ClaseDocComponent {
  @Input() idenMod: string;
  @Input() nombMod: string;

  textBuscarAdm011 = new FormControl("", []);
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
  id_cod = "";
  idModulo = 10;
  ListDocumentos: any = [];
  forma: FormGroup;
  table = false;
  ocultarSelect = true;
  mostrarCheck = false;
  placeholdeAuto = "automatico";
  insertar = "fall";
  idNroRegistro: string = "10";

  constructor(
    private adm011S: Adm011Service,
    private fb: FormBuilder,
    private notyG: NotyGlobal,
    private initG: InitGlobal,
    private fileS: FileService
  ) {
    setTimeout(() => {
      this.getAdm011(this.start.Texto);
      // console.log(this.idenMod);
    }, 1500);

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
        this.idenMod,
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
      if (!this.start.Conte) {
        this.start.Conte = true;
      }
      this.start.NumPa = Number(numePag);
      if (resp["ok"]) {
        this.auxma = resp.data[0].clase_documentos;
        if (this.selecDivModal === undefined) {
          this.selecDivModal = resp.data[0].modulos;
        }
        this.initG.labels();
        this.initG.select();
        this.pagi = resp["cant"];
        this.table = false;
      } else {
        if (resp["messagge"] === "No se encontraron registros") {
          if (this.selecDivModal === undefined) {
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
      if (element.id_modulo === id) {
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
        this.btnGrupo.BtnCance = true;

        this.forma.reset({
          id_modulo: this.idModulo,
          nombre_modulo: this.ObtenerNombreModulo(this.idModulo),
          estado: false,
          id_documento: "auto",
          checkauto: true,
        }); // resetea todo a null y estado a false
        this.boolDisabled(false);
        this.mostrarCheck = true;
        this.forma.get("id_documento").setValue("auto");
        this.forma.get("id_documento").disable();
        this.initG.uniform();
        this.initG.labels();
        return;
      case "editar":
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
        if (this.forma.invalid) {
          this.mostrarCheck = true;
          return;
        }
        this.btnGrupo.BtnLoadi = true;
        this.btnGrupo.BtnCance = false;
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
    this.forma.reset(this.auxmaModal);
    this.initG.labels();
    this.initG.select();
  }

  habilitarAuto() {
    if (this.forma.get("checkauto").value) {
      this.forma.get("id_documento").enable();
      this.forma.get("id_documento").setValue("");
      this.placeholdeAuto = "introducir codigo";
    } else {
      this.forma.get("id_documento").setValue("auto");
      this.forma.get("id_documento").disable();
      this.placeholdeAuto = "automatico";
    }
    this.initG.labels();
  }

  adm011Selectgest(gestion: string) {
    this.idModulo = Number(gestion);
    this.getAdm011("all_data", "1");
  }

  adm011SelectRegistro(idRegistro: string) {
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
    $("#modal_adm_011").modal("hide");
    // $("#modal_adm_011_eliminar").modal("hide");
  }

  GetAdm011Pdf() {
    this.adm011S.getAdm011Pdf("90", this.idModulo).subscribe((resp) => {
      if (resp["ok"]) {
      } else {
        // console.log("error: ", resp["mensaje"]);
      }
    });
  }

  printDoc() {
    let peticion: Observable<any>;
    peticion = this.adm011S.getAdm011Impr("90", "0", this.start.Texto);
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        const feImpr: string = resp["fecha"];
        const hrImpr: string = resp["horaImpresion"];
        const logoEmpr: string = resp.data[0].datos_empresa[0].logo_empresa;
        const sglEmpre: string = resp.data[0].datos_empresa[0].sigla;
        const htmlStart: string =
          "<html> <head> <title>Ormate</title></head> <style type = 'text/css' > .footer-print { position: fixed; left: 0; bottom: 0; width: 100%; text-align: center;} .footer-div { display: flex; width: 100%; font-size: 15px; margin: auto; border-bottom: 0.3px solid black;} .footer-empr { width: 50%; text-align: left; padding-top: 0.5rem; } .footer-user { width: 50%; text-align: right; padding-top: 0.5rem; } @media print { @page { margin: 1.5cm; margin-bottom: 2cm; } } table.report-container { page-break-after: always; } thead.report-header { display: table-header-group; } tfoot.report-footer { display: table-footer-group; } .table th, .table td { padding: 0.55rem 1.25rem; vertical-align: top; border-top: 1px solid #ddd; } .centrado { text-align: center; } .font-size-title-comp { font-size: 20px;} .font-size-title-name { font-size: 14px; } body { margin: 0; } .margin-top-bottom { margin : 0 0 0.5rem 0; } </style> <body style= 'margin : 0'> <table class = 'report-container' style='width: 100%;'> ";
        const header: string = `<thead class='report-header'>
        <tr>
            <th class='report-header-cell'>
              <div class='header-info'>
                <div  style='margin: auto;'>
                  <div
                    style='display: flex; font-size: 10px; margin: auto;'
                  >
                    <div  style='width: 50%; display: flex;'>
                      <div>
                        <img
                          src=${logoEmpr} style='width: 100px; height: 100px;'
                          />
                        </div>
                        <div style='padding-left: 25; text-align: left;'>
                          <p class='font-weight-bold ' style='font-size: 16px; margin : 0 0 0.5rem 0; ' >${sglEmpre}</p>
                          <p>Direccion : Av. Monseñor Salvatierra # 150</p>
                          <p>Telf: 33-339868</p>
                          <p>Santa Cruz - Bolivia</p>
                        </div>
                      </div>
                      <div style='width: 50%; text-align: right;'>
                        <p class = 'margin-top-bottom'>Fecha: ${feImpr}</p><p class = 'margin-top-bottom'>Impresión: ${hrImpr}</p> </div> </div> <div style='display: flex;'><div style='width: 25%;'></div><div style='width: 50%; text-align: center; justify-self: center;'><p class = 'margin-top-bottom' style='font-size: 20px; margin : 0 0 0.5rem 0;'>COMPONENTE DE FACTURACION</p><p class = 'margin-top-bottom' style='font-size: 14px; margin : 0 0 0.5rem 0;'>Administracion</p></div><div style='width: 25%;'></div></div></div></div></th></tr></thead>`;
        const tableStart: string =
          "<tbody class='report-content'><tr><td class='report-content-cell'><div class='main' style='margin-botton:0.5rem'> <table class='table' style='width: 100%;' >";
        const tableHead: string =
          "<thead class='centrado'><tr class='bg-blue'><th style = ' width: 10%;'>Codigo</th><th style=' width : 30%;'>Descripcion</th><th style=' width : 30%;'>Sigla</th><th style=' width : 20%; '>Componente</th><th style=' width : 10% ;'>Estado</th></tr></thead>";
        let tableData: string = "<tbody>";
        const data: Adm011[] = resp.data[0].clase_documentos;
        const long = data.length - 1;
        for (let i = long; i >= 0; i--) {
          tableData =
            `<tr><td style = 'padding: 0.55rem 1.25rem; vertical-align: top; border-top: 1px solid #ddd; text-align : center ; width : 20%;' >${
              data[i].id_documento
            } </td><td style = 'padding: 0.55rem 1.25rem; vertical-align: top; border-top: 1px solid #ddd; white-space: nowrap; ' >${
              data[i].descripcion
            } </td><td style = 'padding: 0.55rem 1.25rem; vertical-align: top; border-top: 1px solid #ddd; white-space: nowrap; ' >${
              data[i].sigla
            } </td><td style = 'padding: 0.55rem 1.00rem; vertical-align: top; border-top: 1px solid #ddd; white-space: nowrap; ' >${
              data[i].componente
            } </td><td class='centrado' style = 'padding: 0.55rem 1.25rem; vertical-align: top; border-top: 1px solid #ddd; text-align : center; ' >
        ${data[i].estado === true ? "activo" : "inactivo"} </td></tr>` +
            tableData;
        }
        tableData = tableData + "</tbody>";
        const tableEnd: string = "</table> </div></td></tr></tbody>";
        const tableFooter: string =
          "<tfoot class='report-footer'> <tr> <td class='report-footer-cell'> <footer class='footer-print'> <div class='footer-info'> <div class='footer-div'> <div class='footer-empr'>Aplic: Ormate</div> <div class='footer-user'>Usuario: Admin</div> </div> </div> </footer> </td> </tr> </tfoot>";
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
          w.close();
        }, 100);
      } else {
        this.notyG.noty("error", "Error al mandar a imprimir", 3000);
      }
    });
  }

  IrDashboard() {
    window.location.href = url.principal;
  }
  downloadPdfExel(tipo: string) {
    let peticion: Observable<any>;
    const rutaPdf: string = "adm_000/adm_011/get-pdf/90/0/all_data";
    const rutaExel: string = "adm_000/adm_011/get-excel/90/0/all_data";
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
