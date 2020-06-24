import { Component, OnInit } from "@angular/core";
import {
  Adm012,
  Adm012SelectRegistros,
  Adm012SelectModulos,
  Adm012SelectMonedas,
  Adm012SelectTamImp,
  Adm012SelectCodigoCuentas,
} from "src/app/master/utils/models/main/adm_000/index.models";
import { Adm012Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import url from "src/app/master/config/url.config";
import { FileService } from "src/app/master/utils/service/main/global/file.service";
import { saveAs } from "file-saver";
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

@Component({
  selector: "app-formt-imp",
  templateUrl: "./formt-imp.component.html",
  styleUrls: ["./formt-imp.component.css"],
})
export class FormtImpComponent implements OnInit {
  textBuscarAdm012 = new FormControl("", []);
  sus: Subscription;
  numeroPag = 1;
  loading = true;
  btnGrupo = glb001;
  start = glb002;
  pagi: Paginacion[];
  auxma: Adm012[];
  auxmaModal: Adm012;
  selecModulos: Adm012SelectModulos[];
  selectCantReg: Adm012SelectRegistros[];
  selecModalCodCuenta: Adm012SelectCodigoCuentas[];
  selecModalMoneda: Adm012SelectMonedas[];
  selecModalTamImpr: Adm012SelectTamImp[];
  disabled = {
    division: true,
    dependencia: true,
    codigo: true,
    descripci: true,
    sigla: true,
    estado: true,
  };
  id_adm012 = "";
  contorlAccion: string = "";
  loadingSub = false;
  controlLoginModal = "";

  // TODO: new variables
  id_cod = "";
  idModulo = 10;

  // new variables
  forma: FormGroup;
  table = false;

  ocultarSelect = true;
  mostrarCheck = false;
  placeholdeAuto = "automatico";
  insertar = "fall";
  nroRegistros: string = "10";
  id_tamano: number = 1;
  id_moneda: number = 1;
  id_codigo: number = 1;

  constructor(
    private adm012S: Adm012Service,
    private fb: FormBuilder,
    private notyG: NotyGlobal,
    private initG: InitGlobal,
    private fileS: FileService
  ) {
    this.getAdm012(this.start.Texto);
    this.crearFormulario();
    this.cargarSelecRegistros();
    this.textBuscarAdm012.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (value.length > 1) {
          this.getAdm012(value, "1");
        } else {
          this.start.Texto = "all_data";
          this.getAdm012(this.start.Texto);
        }
      });
  }

  ngOnInit(): void {}

  getAdm012(texto: string, numePag = "1") {
    this.start.Busca = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.Texto = "all_data";
      peticion = this.adm012S.getAdm012(
        "90",
        numePag,
        this.idModulo,
        this.nroRegistros,
        this.start.Texto
      );
    } else {
      this.start.Texto = texto;
      peticion = this.adm012S.getAdm012(
        "90",
        numePag,
        this.idModulo,
        this.nroRegistros,
        this.start.Texto
      );
    }
    this.sus = peticion.subscribe((resp) => {
      if (!this.start.Conte) {
        this.start.Conte = true;
      }
      this.start.NumPa = Number(numePag);
      if (resp["ok"]) {
        this.auxma = resp.data[0].formatos_impresion;
        if (this.selecModulos === undefined) {
          this.selecModulos = resp.data[0].modulos;
        }
        if (this.selecModalMoneda === undefined) {
          this.selecModalMoneda = resp.data[0].tipo_moneda;
        }
        if (this.selecModalCodCuenta === undefined) {
          this.selecModalCodCuenta = resp.data[0].codigo_cuenta;
        }
        if (this.selecModalTamImpr === undefined) {
          this.selecModalTamImpr = resp.data[0].tamano_impresion;
        }
        this.initG.labels();
        this.initG.select();
        this.pagi = resp["cant"];
        this.table = false;
      } else {
        if (resp["messagge"] === "No se encontraron registros") {
          if (this.selecModulos === undefined) {
            this.selecModulos = resp.data[0].modulos;
          }
          this.auxma = [];
          this.initG.labels();
          this.initG.select();
          this.pagi = resp["cant"];
          this.table = false;
        } else {
          this.notyG.noty("error", resp["messagge"], 5000);
          this.selecModulos = [];

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
    this.selectCantReg = [
      { id_registro: 10, cantidad: "10" },
      { id_registro: 25, cantidad: "25" },
      { id_registro: 50, cantidad: "50" },
      { id_registro: 100, cantidad: "100" },
    ];
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id_modulo: ["0", [Validators.required]],
      id_formato: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      sigla: ["", [Validators.required]],
      tamano_impresion: ["", [Validators.required]],
      moneda: ["", [Validators.required]],
      codigo_cuenta: ["", [Validators.required]],
      numero_copias: ["", [Validators.required]],
      codigo_qr: ["", [Validators.required]],
      logo_empresa: ["", [Validators.required]],
      checkauto: [""],
      estado: ["", [Validators.required]],
      nombre_modulo: [""],
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
      peticion = this.adm012S.getAdm012(
        "90",
        this.numeroPag.toString(),
        this.idModulo,
        this.nroRegistros,
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
        peticion = this.adm012S.getAdm012(
          "90",
          this.numeroPag.toString(),
          this.idModulo,
          this.nroRegistros,
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
        peticion = this.adm012S.getAdm012(
          "90",
          this.numeroPag.toString(),
          this.idModulo,
          this.nroRegistros,
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

  nuevoAdm012() {
    this.boolBtnGrupo(false, true);
    this.btnGrupo.BtnCance = false;
    this.boolDisabled(false);
    this.forma.reset({
      id_modulo: this.idModulo,
      nombre_modulo: this.ObtenerNombreModulo(this.idModulo),
      id_formato: "auto",
      tamano_impresion: this.id_tamano,
      moneda: this.id_moneda,
      codigo_cuenta: this.id_codigo,
      estado: false,
      checkauto: true,
    });

    this.start.CtrAc = "nuevo";
    this.ocultarSelect = false;
    this.mostrarCheck = true;
    this.forma.get("id_formato").setValue("auto");
    this.forma.get("id_formato").disable();
    this.initG.uniform();
    this.initG.labels();
    this.initG.select();
  }
  ObtenerNombreModulo(id: number) {
    let name: string = "";
    this.selecModulos.forEach((element) => {
      if (element.id_modulo === id) {
        name = element.modulo;
      }
    });
    return name;
  }

  obtenerData(adm012: Adm012) {
    let peticion: Observable<any>;
    peticion = this.adm012S.getAdm012Formato(
      "90",
      this.idModulo,
      adm012.id_formato
    );
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        this.auxmaModal = resp.data[0].formato_impresion;
      } else {
        if (resp["messagge"] === "No se encontraron registros") {
          this.notyG.noty("error", resp["messagge"], 5000);
        }
      }
    });
  }

  OpcionesTable(adm_012: Adm012, tipo: string) {
    this.obtenerData(adm_012);
    this.forma.reset(this.auxmaModal);
    this.start.IdCod = "" + adm_012.id_formato;
    switch (tipo) {
      case "visualizar":
        this.btnGrupo.BtnEdita = true;
        this.btnGrupo.BtnNuevo = true;
        this.boolDisabled(true);
        break;
      case "editar":
        this.btnGrupo.BtnCance = true;
        this.btnGrupo.BtnGuard = true;
        this.boolDisabled(false);
        this.forma.get("nombre_modulo").disable();
        this.forma.get("checkauto").disable();
        this.forma.get("id_formato").disable();
        break;
      case "eliminar":
        // this.eliminarAdm011(adm_011);
        return;
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
        this.btnGrupo.BtnCance = true;
        this.forma.reset({
          id_modulo: this.idModulo,
          nombre_modulo: this.ObtenerNombreModulo(this.idModulo),
          estado: false,
          id_formato: "auto",
          logo_empresa: true,
          codigo_qr: true,
          checkauto: true,
        }); // resetea todo a null y estado a false

        this.boolDisabled(false);
        this.mostrarCheck = true;
        this.forma.get("id_formato").setValue("auto");
        this.forma.get("id_formato").disable();
        this.initG.uniform();
        this.initG.labels();
        return;
      case "editar":
        this.start.CtrAc = tipo;
        this.boolDisabled(false);
        this.boolBtnGrupo(false, true);
        this.forma.get("id_formato").disable();
        this.forma.get("checkauto").disable();
        return;
      case "salir":
        this.insertar = "fall";
        this.placeholdeAuto = "automatico";
        this.resetDatos();
        this.boolDisabled(true);
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
    this.boolBtnGrupo(true, true);
    this.boolBtnGrupo(false, false);
  }

  boolDisabled(bool: boolean) {
    if (bool) {
      this.forma.get("nombre_modulo").disable();
      this.forma.get("checkauto").disable();
      this.forma.get("id_formato").disable();
      this.forma.get("descripcion").disable();
      this.forma.get("sigla").disable();
      // this.forma.get("tamano_impresion").disable();
      // this.forma.get("moneda").disable();
      // this.forma.get("codigo_cuenta").disable();
      // this.forma.get("numero_copias").disable();
      this.forma.get("codigo_qr").disable();
      this.forma.get("logo_empresa").disable();
      this.forma.get("estado").disable();
    } else {
      this.forma.get("id_modulo").enable();
      this.forma.get("id_formato").enable();
      this.forma.get("descripcion").enable();
      this.forma.get("sigla").enable();
      this.forma.get("tamano_impresion").enable();
      this.forma.get("moneda").enable();
      this.forma.get("checkauto").enable();
      this.forma.get("codigo_cuenta").enable();
      // this.forma.get("numero_cuenta").enable();
      this.forma.get("numero_copias").enable();
      this.forma.get("codigo_qr").enable();
      this.forma.get("logo_empresa").enable();
      this.forma.get("estado").enable();
    }
    this.initG.labels();
    this.initG.select();
  }

  // 11
  boolBtnGrupo(editNuevo: boolean, cancelGuardar: boolean) {
    this.btnGrupo.BtnCance = cancelGuardar;
    this.btnGrupo.BtnEdita = editNuevo;
    this.btnGrupo.BtnElimi = false;
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
      this.forma.get("id_formato").enable();
      this.forma.get("id_formato").setValue("");
      this.placeholdeAuto = "introducir codigo";
    } else {
      this.forma.get("id_formato").setValue("auto");
      this.forma.get("id_formato").disable();
      this.placeholdeAuto = "automatico";
    }
    this.initG.labels();
  }

  adm012Selectgest(gestion: string) {
    this.idModulo = Number(gestion);
    this.getAdm012("all_data", "1");
  }
  adm012SelectTamImpr(tamano: string) {
    this.id_tamano = Number(tamano);
  }
  adm012SelectMoneda(gestion: string) {
    // this.forma.get("id_formato").setValue("auto");
    this.id_moneda = Number(gestion);
  }
  adm012SelectCodigo(gestion: string) {
    // this.forma.get("id_formato").setValue("auto");
    this.id_codigo = Number(gestion);
  }

  guardarDatos(adm_012: Adm012, contorlAccion: string) {
    let peticion: Observable<any>;
    if (contorlAccion === "nuevo") {
      peticion = this.adm012S.inAdm012(adm_012);
    } else if (contorlAccion === "editar") {
      peticion = this.adm012S.upAdm012(
        adm_012,
        this.idModulo,
        "" + adm_012.id_formato
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
        }
        this.getAdm012(this.start.Texto, this.start.NumPa.toString());
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.boolBtnGrupo(false, true);
        this.boolDisabled(false);
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  eliminarAdm011(adm012: Adm012) {
    let peticion: Observable<any>;
    peticion = this.adm012S.delAdm012(adm012.id_modulo, "" + adm012.id_formato);
    let numPag = this.start.NumPa;
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        if (this.auxma.length === 1) {
          numPag--;
        }
        this.paginacion(numPag.toString(), false);
        this.start.IdCod = "";
        this.notyG.noty("success", resp["mensaje"], 3000);
      } else {
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  // printDoc() {}
  // IrDashboard() {}
  // downloadPdfExel(tipo: string) {}

  /* Metodos para imprimir y exportar adm 012*/
  // printDoc() {
  //   const htmlStart: string =
  //     "<html><head><title>Imprimir</title><link href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'  rel='stylesheet' type='text/css'/> </head><body>";
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
  // }
  IrDashboard() {
    window.location.href = url.principal;
  }

  downloadPdfExel(tipo: string) {
    let peticion: Observable<any>;
    const rutaPdf: string = "adm_000/adm_012/get-pdf/90/0/all_data";
    const rutaExel: string = "adm_000/adm_012/get-excel/90/0/all_data";
    let tipoFile: string = "";
    const fileName: string = "adm012";
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
