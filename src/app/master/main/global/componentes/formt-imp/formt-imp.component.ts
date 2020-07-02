import { Component, OnInit } from "@angular/core";
import { Router, UrlTree, UrlSegmentGroup, UrlSegment } from "@angular/router";
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
  PrintGlobal,
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
  idenMod: string = "90";
  nombMod: string = "";

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
    private prinG: PrintGlobal,
    private fileS: FileService,
    public router: Router
  ) {
    const tree: UrlTree = router.parseUrl(router.url);
    const g: UrlSegmentGroup = tree.root.children["primary"];
    const s: UrlSegment[] = g.segments;
    const enviarData = this.validarMod(s[1].path, s[2].path);
    if (enviarData) {
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
    } else {
      this.router.navigate(["/bienvenido"]);
      return;
    }
  }

  validarMod(idRutaMod: string, component: string): boolean {
    const modulo = JSON.parse(sessionStorage.getItem("modulo")) || [];
    for (let i = 0; i < modulo.length; i++) {
      if (modulo[i].componente === idRutaMod) {
        const compo = modulo[i].compArray;
        for (let j = 0; j < compo.length; j++) {
          if (compo[j].componente === component) {
            this.nombMod = modulo[i].descripcion;
            this.idModulo = modulo[i].idModulo.toString();
            return true;
          }
        }
      }
    }
    return false;
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
          console.log(this.selecModalMoneda);
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
      checkauto: ["true"],
      id_formato: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      sigla: ["", [Validators.required]],
      tamano_impresion: ["", [Validators.required]],
      moneda_imprimir: ["", [Validators.required]],
      codigo_cuenta: ["", [Validators.required]],
      numero_copias: ["", [Validators.required]],
      codigo_qr: ["", [Validators.required]],
      logo_empresa: ["", [Validators.required]],
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
      id_formato: "auto",
      tamano_impresion: this.id_tamano,
      moneda_imprimir: this.id_moneda,
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

  OpcionesTable(adm012: Adm012) {
    let peticion: Observable<any>;
    peticion = this.adm012S.getAdm012Formato(
      "90",
      this.idModulo,
      adm012.id_formato
    );
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        this.auxmaModal = resp.data[0].formato_impresion[0];
        this.forma.reset(this.auxmaModal);
        console.log(this.forma.value);
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        this.btnGrupo.BtnElimi = true;
      } else {
        if (resp["messagge"] === "No se encontraron registros") {
          this.notyG.noty("error", resp["messagge"], 5000);
        }
      }
    });
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
        this.forma.reset(this.auxmaModal);
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
      this.forma.get("checkauto").disable();
      this.forma.get("id_formato").disable();
      this.forma.get("descripcion").disable();
      this.forma.get("sigla").disable();
      this.forma.get("tamano_impresion").disable();
      this.forma.get("moneda_imprimir").disable();
      this.forma.get("codigo_cuenta").disable();
      this.forma.get("numero_copias").disable();
      this.forma.get("codigo_qr").disable();
      this.forma.get("logo_empresa").disable();
      this.forma.get("estado").disable();
    } else {
      this.forma.get("checkauto").enable();
      this.forma.get("id_formato").enable();
      this.forma.get("descripcion").enable();
      this.forma.get("sigla").enable();
      this.forma.get("tamano_impresion").enable();
      this.forma.get("moneda_imprimir").enable();
      this.forma.get("codigo_cuenta").enable();
      this.forma.get("numero_copias").enable();
      this.forma.get("codigo_qr").enable();
      this.forma.get("logo_empresa").enable();
      this.forma.get("estado").enable();
    }
    this.initG.labels();
    this.initG.select();
  }

  boolBtnGrupo(editNuevo: boolean, cancelGuardar: boolean) {
    this.btnGrupo.BtnCance = cancelGuardar;
    this.btnGrupo.BtnEdita = editNuevo;
    this.btnGrupo.BtnElimi = false;
    this.btnGrupo.BtnGuard = cancelGuardar;
    this.btnGrupo.BtnNuevo = editNuevo;
  }

  resetDatos() {
    this.forma.reset();
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

  printDoc() {
    let peticion: Observable<any>;
    peticion = this.adm012S.getAdm012Impr(
      "90",
      this.idModulo,
      this.start.Texto
    );
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        const feImpr: string = resp["fecha"];
        const hrImpr: string = resp["horaImpresion"];
        const logoEmpr: string = resp.data[0].datos_empresa[0].logo_empresa;
        const sglEmpre: string = resp.data[0].datos_empresa[0].sigla;
        const htmlStart: string = this.prinG.htmlStart();
        const header: string = this.prinG.header(
          logoEmpr,
          sglEmpre,
          feImpr,
          hrImpr,
          this.nombMod
        );
        const tableStart: string = this.prinG.tableStart();
        const tableHead: string = this.prinG.tableHead2();
        let tableData: string = "<tbody>";
        const data: any[] = resp.data[0].formatos_impresion;
        const long = data.length - 1;
        for (let i = long; i >= 0; i--) {
          tableData =
            `<tr class="centrado">
            <td>
              ${data[i].id_formato}
            </td>
            <td style="white-space: nowrap;">
            ${data[i].descripcion}
            </td>
            <td>
              <p style="white-space: nowrap;">${data[i].sigla}</p>
              <p>${data[i].moneda_imprimir}</p>
            </td>
            <td>
              <p style="white-space: nowrap;">${data[i].tamaño_impresion}</p>
              <p style="white-space: nowrap;">${data[i].codigo_cuenta}</p>
            </td>
            <td>
              <p>${data[i].logo_empresa === true ? "Si" : "No"}</p>
              <p>${data[i].numero_copias}</p>
            </td>
            <td>
              <p>${data[i].estado === true ? "Activo" : "Inactivo"}</p>
              <p>${data[i].codigo_qr === true ? "Si" : "No"}</p>
            </td>
          </tr>` + tableData;
        }
        tableData = tableData + "</tbody>";
        const tableEnd: string = "</table> </div></td></tr></tbody>";
        const user = JSON.parse(sessionStorage.getItem("datos_user"));
        const tableFooter: string = this.prinG.tableFooter(user.aduscodu);
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
    const rutaPdf: string = `adm_000/adm_012/get-pdf/${this.idenMod}/${this.idModulo}/all_data`;
    const rutaExel: string = `adm_000/adm_012/get-excel/${this.idenMod}/${this.idModulo}/all_data`;
    let tipoFile: string = "";
    const fileName: string = "Formato Impresion - " + this.nombMod;
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
