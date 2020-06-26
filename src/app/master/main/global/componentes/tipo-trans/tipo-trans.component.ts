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
  textBuscarAdm012 = new FormControl("", []);
  sus: Subscription;
  numeroPag = 1;
  loading = true;
  btnGrupo = glb001;
  start = glb002;
  pagi: Paginacion[];
  auxma: Adm013[];
  auxmaModal: Adm013;
  selecModulos: Adm013SelectModulos[];
  selecModalMoneda: Adm013SelectMonedas[];
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
        if (this.selecModulos === undefined) {
          this.selecModulos = resp.data[0].modulos;
        }
        if (this.selecModalMoneda === undefined) {
          this.selecModalMoneda = resp.data[0].tipo_moneda;
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
}
