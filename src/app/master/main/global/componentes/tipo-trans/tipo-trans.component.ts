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

  constructor() {
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
}
