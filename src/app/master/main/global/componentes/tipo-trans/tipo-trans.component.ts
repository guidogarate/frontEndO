import { Component, OnInit } from "@angular/core";
import {
  Adm013,
  Adm013SelectModulos,
  Adm013SelectMonedas,
  Adm013SelectClaseDoc,
  Adm013SelectCodTran,
  Adm013SelectDocPreliminar,
  Adm013SelectDocStandar,
  Adm013SelectDependencia,
  Adm013SelectFormatoImpr,
} from "src/app/master/utils/models/main/adm_000/index.models";
import { Adm013Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
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
  selector: "app-tipo-trans",
  templateUrl: "./tipo-trans.component.html",
  styleUrls: ["./tipo-trans.component.css"],
})
export class TipoTransComponent implements OnInit {
  selectCantReg: any;
  textBuscarAdm013 = new FormControl("", []);
  sus: Subscription;
  numeroPag = 1;
  loading = true;
  btnGrupo = glb001;
  start = glb002;
  pagi: Paginacion[];
  auxma: Adm013[];
  auxmaModal: Adm013;
  selectModulos: Adm013SelectModulos[];
  selectMoneda: Adm013SelectMonedas[];
  selectClaseDoc: Adm013SelectClaseDoc[];
  selectCodTran: Adm013SelectCodTran[];
  selectDocPreliminar: Adm013SelectDocPreliminar[];
  selectDocStandar: Adm013SelectDocStandar[];
  selectDependencia: Adm013SelectDependencia[];
  selectFormatoImpr: Adm013SelectFormatoImpr[];
  disabled = {
    division: true,
    dependencia: true,
    codigo: true,
    descripci: true,
    sigla: true,
    estado: true,
  };
  id_adm013 = "";
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
    private adm013S: Adm013Service,
    private fb: FormBuilder,
    private notyG: NotyGlobal,
    private initG: InitGlobal,
    private fileS: FileService
  ) {
    this.cargarSelecRegistros();
    this.cargarSelects();
    this.getAdm013(this.start.Texto);
    this.crearFormulario();
    this.textBuscarAdm013.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (value.length > 1) {
          this.getAdm013(value, "1");
        } else {
          this.start.Texto = "all_data";
          this.getAdm013(this.start.Texto);
        }
      });
  }

  ngOnInit(): void {}

  /*TODO: Data de prueba para vistas*/
  cargarSelecRegistros() {
    this.selectCantReg = [
      { id_registro: 10, cantidad: "10" },
      { id_registro: 25, cantidad: "25" },
      { id_registro: 50, cantidad: "50" },
      { id_registro: 100, cantidad: "100" },
    ];
  }
  cargarSelects() {
    this.selectFormatoImpr = [
      { id_formato_impresion: 1, descripcion: "PRELIMINAR CONTABILIDAD" },
      { id_formato_impresion: 1, descripcion: "PRELIMINAR ADMINISTRACION" },
      { id_formato_impresion: 1, descripcion: "PRELIMINAR INVENTARIO" },
    ];
    this.selectDocPreliminar = [
      { documento_preliminar: 10, descripcion: "PRELIMINAR Inventario" },
      { documento_preliminar: 20, descripcion: "PRELIMINAR ADM" },
      { documento_preliminar: 30, descripcion: "PRELIMINAR CONTABILIDAD" },
    ];
    this.selectDocStandar = [
      { comprobante_estandar: 10, descripcion: "COMP-STANDAR1" },
      { comprobante_estandar: 10, descripcion: "COMP-STANDAR2" },
      { comprobante_estandar: 10, descripcion: "COMP-STANDAR3" },
    ];
    this.selectDependencia = [
      { id_codigo_Dep: 10, descripcion: "SOLICITUD-INV" },
      { id_codigo_Dep: 10, descripcion: "SOLICITUD-ADM" },
      { id_codigo_Dep: 10, descripcion: "SOLICITUD-CONT" },
    ];
  }

  getAdm013(texto: string, numePag = "1") {
    this.start.Busca = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.Texto = "all_data";
      peticion = this.adm013S.getAdm013(
        "90",
        numePag,
        this.idModulo,
        this.start.Texto
      );
    } else {
      this.start.Texto = texto;
      peticion = this.adm013S.getAdm013(
        "90",
        numePag,
        this.idModulo,
        this.start.Texto
      );
    }
    this.sus = peticion.subscribe((resp) => {
      if (!this.start.Conte) {
        this.start.Conte = true;
      }
      this.start.NumPa = Number(numePag);
      if (resp["ok"]) {
        this.auxma = resp.data[0].tipos_transaccion;
        if (this.selectModulos === undefined) {
          this.selectModulos = resp.data[0].modulos;
        }
        if (this.selectMoneda === undefined) {
          this.selectMoneda = resp.data[0].tipo_moneda;
        }
        if (this.selectClaseDoc === undefined) {
          this.selectClaseDoc = resp.data[0].clase_documento;
        }
        if (this.selectCodTran === undefined) {
          this.selectCodTran = resp.data[0].codigo_transaccion;
        }
        if (this.selectFormatoImpr === undefined) {
          this.selectFormatoImpr = resp.data[0].formato_impresion;
        }
        this.initG.labels();
        this.initG.select();
        this.pagi = resp["cant"];
        this.table = false;
      } else {
        if (resp["messagge"] === "No se encontraron registros") {
          if (this.selectModulos === undefined) {
            this.selectModulos = resp.data[0].modulos;
          }
          this.auxma = [];
          this.initG.labels();
          this.initG.select();
          this.pagi = resp["cant"];
          this.table = false;
        } else {
          this.notyG.noty("error", resp["messagge"], 5000);
          this.selectModulos = [];

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
  crearFormulario() {
    this.forma = this.fb.group({
      id_modulo: ["0", [Validators.required]],
      id_tipotran: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      sigla: ["", [Validators.required]],
      id_clase_documento: ["", [Validators.required]],
      id_codigo_transaccion: ["", [Validators.required]],
      id_moneda: ["", [Validators.required]],
      cantidad_lineas: ["", [Validators.required]],
      comprobante_estandar: ["", [Validators.required]],
      duplicado: ["", [Validators.required]],
      logo_empresa: ["", [Validators.required]],
      id_rol: ["", [Validators.required]],
      documento_preliminar: ["", [Validators.required]],
      id_formato_impresion: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      checkauto: [""],
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
      peticion = this.adm013S.getAdm013(
        "90",
        this.numeroPag.toString(),
        this.idModulo,
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
        peticion = this.adm013S.getAdm013(
          "90",
          this.numeroPag.toString(),
          this.idModulo,
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
        peticion = this.adm013S.getAdm013(
          "90",
          this.numeroPag.toString(),
          this.idModulo,
          this.start.Texto
        );
      }
    }
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        this.auxma = resp.data[0].tipos_transaccion;
        this.pagi = resp["cant"];
      } else {
        this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }
  boolBtnGrupo(editNuevo: boolean, cancelGuardar: boolean) {
    this.btnGrupo.BtnCance = cancelGuardar;
    this.btnGrupo.BtnEdita = editNuevo;
    this.btnGrupo.BtnElimi = false;
    this.btnGrupo.BtnGuard = cancelGuardar;
    this.btnGrupo.BtnNuevo = editNuevo;
  }
  boolDisabled(bool: boolean) {
    if (bool) {
      this.forma.get("id_modulo").disable();
      this.forma.get("id_tipotran").disable();
      this.forma.get("descripcion").disable();
      this.forma.get("sigla").disable();
      this.forma.get("id_clase_documento").disable();
      this.forma.get("id_codigo_transaccion").disable();
      this.forma.get("id_moneda").disable();
      this.forma.get("cantidad_lineas").disable();
      this.forma.get("comprobante_estandar").disable();
      this.forma.get("duplicado").disable();
      this.forma.get("id_rol").disable();
      this.forma.get("documento_preliminar").disable();
      this.forma.get("checkauto").disable();
      this.forma.get("id_formato_impresion").disable();
      this.forma.get("estado").disable();
      this.forma.get("nombre_modulo").disable();
    } else {
      this.forma.get("id_modulo").enable();
      this.forma.get("id_tipotran").enable();
      this.forma.get("descripcion").enable();
      this.forma.get("sigla").enable();
      this.forma.get("id_clase_documento").enable();
      this.forma.get("id_codigo_transaccion").enable();
      this.forma.get("id_moneda").enable();
      this.forma.get("cantidad_lineas").enable();
      this.forma.get("comprobante_estandar").enable();
      this.forma.get("duplicado").enable();
      this.forma.get("id_rol").enable();
      this.forma.get("documento_preliminar").enable();
      this.forma.get("checkauto").enable();
      this.forma.get("id_formato_impresion").enable();
      this.forma.get("estado").enable();
      this.forma.get("nombre_modulo").enable();
    }
    this.initG.labels();
    this.initG.select();
  }

  ObtenerNombreModulo(id: number) {
    let name: string = "";
    this.selectModulos.forEach((element) => {
      if (element.id_modulo === id) {
        name = element.modulo;
      }
    });
    return name;
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
  OpcionesTable(adm_013: Adm013, tipo: string) {
    // this.obtenerData(adm_013);
    this.forma.reset(this.auxmaModal);
    this.start.IdCod = "" + adm_013.id_tipotran;
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
          estado: true,
          id_formato: "auto",
          duplicados: true,
          codigo_qr: true,
          checkauto: true,
        }); // resetea todo a null y estado a false

        this.boolDisabled(false);
        this.mostrarCheck = true;
        this.forma.get("id_tipotran").setValue("auto");
        this.forma.get("id_tipotran").disable();
        this.initG.uniform();
        this.initG.labels();
        return;
      case "editar":
        this.start.CtrAc = tipo;
        this.boolDisabled(false);
        this.boolBtnGrupo(false, true);
        this.forma.get("id_tipotran").disable();
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

  resetDatos() {
    this.forma.reset(this.auxmaModal);
    this.initG.labels();
    this.initG.select();
  }
  guardarDatos(adm_013: Adm013, contorlAccion: string) {
    let peticion: Observable<any>;
    if (contorlAccion === "nuevo") {
      peticion = this.adm013S.inAdm013(adm_013);
    } else if (contorlAccion === "editar") {
      peticion = this.adm013S.upAdm012(
        adm_013,
        this.idModulo,
        "" + adm_013.id_tipotran
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
        this.getAdm013(this.start.Texto, this.start.NumPa.toString());
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.boolBtnGrupo(false, true);
        this.boolDisabled(false);
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }
  downloadPdfExel(tipo: string) {
    let peticion: Observable<any>;
    const rutaPdf: string = "adm_000/adm_013/get-pdf/90/0/all_data";
    const rutaExel: string = "adm_000/adm_013/get-excel/90/0/all_data";
    let tipoFile: string = "";
    const fileName: string = "adm013";
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
