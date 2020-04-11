import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import glb002 from "src/app/master/config/glb000/glb002_start";
import { Cont005Service } from "src/app/master/utils/service/main/modules/cont_000/index.shared.service";
import * as glb from "src/app/master/utils/global/index.global";
import { debounceTime } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { Paginacion } from "src/app/master/utils/models/main/global/index.models";
import {
  Cont005,
  Cont005Mod,
  Cont005Sel,
  Cont005Trans,
  Cont005Impre,
} from "src/app/master/utils/models/main/cont_000/index.models";
import glb001 from "src/app/master/config/glb000/glb001_btn";

@Component({
  selector: "app-cont005",
  templateUrl: "./cont005.component.html",
  styleUrls: ["./cont005.component.css"],
})
export class Cont005Component implements OnInit {
  textBuscarCont005 = new FormControl("", []);
  btnGrupo = glb001;
  start = glb002;
  table = false;
  sus: Subscription;
  auxma: Cont005[];
  auxmaModal: Cont005Mod;
  pagi: Paginacion[];
  forma: FormGroup;
  oculto = "modal";

  selectData = [10, 25, 50, 100];
  cantData = "10";
  /* con005 */
  modulo: string = "0";
  selectMod: Cont005Sel[];
  selecTipTrans: Cont005Trans[];
  selecFormImpr: Cont005Impre[];
  selecTipTransCopy: Cont005Trans[];
  selecFormImprCopy: Cont005Impre[];

  constructor(
    private cont005S: Cont005Service,
    private fb: FormBuilder,
    private notyG: glb.NotyGlobal,
    private initG: glb.InitGlobal
  ) {
    this.getCont005(this.start.Texto);
    this.crearFormulario();
    this.textBuscarCont005.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (value.length > 1) {
          this.getCont005(value, "1", this.cantData);
        } else {
          this.start.Texto = "all_data";
          this.getCont005(this.start.Texto, "1", this.cantData);
        }
      });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id_tipocomprobante: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      sigla: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      tipo_transaccion: ["", [Validators.required]],
      formato_impresion: ["", [Validators.required]],
    });
  }
  cargarData(data: string) {
    console.log(data);
    this.cantData = data;
    this.getCont005(this.start.Texto, this.start.NumPa.toString(), data);
  }
  ngOnInit() {}

  getCont005(texto: string, numePag = "1", cant = "10") {
    this.start.Busca = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.Texto = "all_data";
      peticion = this.cont005S.geCont005("10", numePag, cant, this.start.Texto);
    } else {
      this.start.Texto = texto;
      peticion = this.cont005S.geCont005("10", numePag, cant, this.start.Texto);
    }
    this.sus = peticion.subscribe((resp) => {
      if (!this.start.Conte) {
        this.start.Conte = true;
      }
      this.selecTipTransCopy = resp.data[0].tipos_transacion;
      this.selecFormImprCopy = resp.data[0].formatos_impresion;
      this.modulo = resp.data[0].modulos[0].id_modulo.toString();
      this.start.NumPa = Number(numePag);
      if (resp["ok"]) {
        this.auxma = resp.data[0].tipos_comprobantes;
        this.selectMod = resp.data[0].modulos;
        this.pagi = resp["cant"];
        this.table = false;
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
        this.auxma = [];
        this.pagi = [];
        this.table = true;
      }
      this.start.Busca = false;
      this.start.Loadi = false;
      this.start.Table = true;
      this.initG.select();
    });
  }

  getCont005Moda(cont_005: Cont005, tipo: string) {
    let peticion: Observable<any>;
    this.start.ConMo = false;
    peticion = this.cont005S.geCont005Mod(
      "10",
      cont_005.id_modulo,
      cont_005.id_tipocomprobante
    );
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        this.selecTipTrans = resp.data[0].tipos_transacion;
        this.selecFormImpr = resp.data[0].formatos_impresion;
        this.auxmaModal = resp.data[0].tipo_comprobante[0];
        this.resetDatos();
        this.OpcionesTable(cont_005, tipo);
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
      }
      this.start.ConMo = true;
    });
  }

  nuevoCont005() {
    this.selecTipTrans = this.selecTipTransCopy;
    this.selecFormImpr = this.selecFormImprCopy;
    this.start.ConMo = true;
    this.boolDisabled(false);
    this.boolBtnGrupo(false, true);
    this.btnGrupo.BtnCance = false;
    this.forma.reset();
    this.forma.get("id_tipocomprobante").setValue("automatico");
    this.forma.get("estado").setValue(false);
    this.forma.get("id_tipocomprobante").disable();
    this.start.CtrAc = "nuevo";
  }

  OpcionesTable(cont_005: Cont005, tipo: string) {
    this.start.IdCod = cont_005.id_tipocomprobante.toString();
    this.modulo = cont_005.id_modulo.toString();
    this.start.CtrAc = tipo;
    switch (tipo) {
      case "visualizar":
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        break;
      case "editar":
        this.boolDisabled(false);
        this.forma.get("id_tipocomprobante").disable();
        this.boolBtnGrupo(false, true);
        break;
      default:
        this.oculto = "modal";
        this.notyG.noty("error", "Operacion incorrecta", 5000);
        break;
    }
  }

  resetDatos() {
    this.forma.reset(this.auxmaModal);
    this.initG.labels();
    this.initG.select();
  }

  boolDisabled(bool: boolean) {
    if (bool) {
      this.forma.get("id_tipocomprobante").disable();
      this.forma.get("descripcion").disable();
      this.forma.get("sigla").disable();
      this.forma.get("estado").disable();
      this.forma.get("tipo_transaccion").disable();
      this.forma.get("formato_impresion").disable();
    } else {
      this.forma.get("id_tipocomprobante").enable();
      this.forma.get("descripcion").enable();
      this.forma.get("sigla").enable();
      this.forma.get("estado").enable();
      this.forma.get("tipo_transaccion").enable();
      this.forma.get("formato_impresion").enable();
    }
    this.initG.labels();
    this.initG.select();
  }

  boolBtnGrupo(editNuevo: boolean, cancelGuardar: boolean) {
    this.btnGrupo.BtnCance = cancelGuardar;
    this.btnGrupo.BtnEdita = editNuevo;
    this.btnGrupo.BtnElimi = editNuevo;
    this.btnGrupo.BtnGuard = cancelGuardar;
    this.btnGrupo.BtnNuevo = editNuevo;
  }

  OpcionesModal(tipo: string) {
    switch (tipo) {
      case "nuevo":
        this.nuevoModal(tipo);
        return;
      case "editar":
        this.editarModal(tipo);
        return;
      case "salir":
        this.salirModal();
        return;
      case "cancelar":
        this.cancelarModal();
        return;
      case "eliminar":
        this.eliminarModal();
        return;
      case "guardar":
        this.guardarModal();
        return;
    }
  }

  nuevoModal(tipo: string): void {
    this.start.CtrAc = tipo;
    const nuevo = confirm("esta seguro de crear,");
    if (nuevo) {
      this.boolDisabled(false);
      this.boolBtnGrupo(false, true);
      this.forma.reset();
      this.forma.get("id_tipocomprobante").setValue("automatico");
      this.forma.get("estado").setValue(false);
      this.forma.get("id_tipocomprobante").disable();
      return;
    }
  }

  editarModal(tipo: string): void {
    this.start.CtrAc = tipo;
    this.boolDisabled(false);
    this.boolBtnGrupo(false, true);
    this.forma.get("id_tipocomprobante").disable();
  }

  salirModal(): void {
    if (this.forma.dirty) {
      const resp = confirm("Desea Descartar Cambios");
      if (!resp) {
        this.oculto = "";
        this.auxmaModal = null;
        return;
      }
    }
    this.oculto = "modal";
    this.forma.reset();
    this.auxmaModal = null;
    this.start.CtrAc = "";
    this.boolBtnGrupo(false, false);
  }

  cancelarModal(): void {
    if (this.forma.dirty) {
      const resp = confirm("Desea Descartar Cambios");
      if (resp) {
        this.resetDatos();
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        this.start.CtrAc = "";
        return;
      }
    } else {
      this.resetDatos();
      this.boolDisabled(true);
      this.boolBtnGrupo(true, false);
      this.start.CtrAc = "";
    }
  }

  eliminarTable(cont_005: Cont005) {
    this.start.IdCod = cont_005.id_tipocomprobante.toString();
    this.modulo = cont_005.id_modulo.toString();
    const resp = confirm("Esta segruo de eliminar");
    if (resp) {
      this.eliminar();
      return;
    }
  }

  eliminarModal(): void {
    const resp = confirm("Esta segruo de eliminar");
    this.start.CtrAc = "";
    if (resp) {
      this.oculto = "";
      this.forma.reset();
      this.boolBtnGrupo(false, false);
      this.eliminar();
      return;
    }
  }

  guardarModal(): void {
    if (this.forma.valid) {
      if (this.start.CtrAc === "nuevo") {
        this.boolDisabled(true);
        this.guardarDatos(this.forma.value, this.start.CtrAc);
        return;
      } else if (this.start.CtrAc === "editar") {
        this.boolDisabled(true);
        this.guardarDatos(this.forma.value, this.start.CtrAc);
        return;
      }
    } else {
      return;
    }
  }

  guardarDatos(cont_005: any, controlAccion: string) {
    this.btnGrupo.BtnLoadi = true;
    this.btnGrupo.BtnCance = false;
    let peticion: Observable<any>;
    if (controlAccion === "nuevo") {
      const cont005: Cont005Mod = cont_005;
      peticion = this.cont005S.inCont005(cont005, this.modulo);
    } else if (controlAccion === "editar") {
      const cont005: Cont005Mod = cont_005;
      peticion = this.cont005S.upCont005(
        cont005,
        this.modulo,
        this.start.IdCod
      );
    } else {
      this.notyG.noty("error", "control Accion Invalido", 2000);
      return;
    }
    this.sus = peticion.subscribe((resp) => {
      this.btnGrupo.BtnLoadi = false;
      if (resp["ok"]) {
        if (controlAccion === "nuevo") {
          this.start.IdCod = resp["id_tipocomprobante"].toString();
          this.forma.get("id_tipocomprobante").setValue(this.start.IdCod);
          this.auxmaModal = this.forma.value;
        } else if (controlAccion === "editar") {
          this.auxmaModal = cont_005;
        }
        this.resetDatos();
        this.boolBtnGrupo(true, false);
        this.getCont005(this.start.Texto, this.start.NumPa.toString());
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  eliminar() {
    this.btnGrupo.BtnLoadi = true;
    let peticion: Observable<any>;
    peticion = this.cont005S.deCont005(this.modulo, this.start.IdCod);
    let numPag = this.start.NumPa;
    this.sus = peticion.subscribe((resp) => {
      this.btnGrupo.BtnLoadi = false;
      if (resp["ok"]) {
        if (this.auxma.length === 1) {
          numPag--;
        }
        this.paginacion(numPag.toString(), false);
        this.boolBtnGrupo(false, false);
        this.boolDisabled(true);
        this.btnGrupo.BtnNuevo = true;
        this.auxmaModal = undefined;
        this.resetDatos();
        this.initG.labels();
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.notyG.noty("success", resp["mensaje"], 1000);
      }
    });
  }

  paginacion(numero: string, eliminar = true) {
    const nume = Number(numero);
    if (this.start.NumPa === nume && eliminar) {
      return;
    }
    const total = this.pagi.length;
    let peticion: Observable<any>;
    if (nume > 0 && nume <= total) {
      this.start.NumPa = nume;
      peticion = this.cont005S.geCont005(
        "10",
        this.start.NumPa.toString(),
        this.cantData,
        this.start.Texto
      );
    } else {
      if (numero === "000") {
        if (this.start.NumPa === 1) {
          return;
        }
        if (this.start.NumPa === 1) {
          this.start.NumPa = 1;
        } else {
          this.start.NumPa--;
        }
        peticion = this.cont005S.geCont005(
          "10",
          this.start.NumPa.toString(),
          this.cantData,
          this.start.Texto
        );
      } else if (numero === "999") {
        if (this.start.NumPa === total) {
          return;
        }
        if (this.start.NumPa === total) {
          this.start.NumPa = total;
        } else {
          this.start.NumPa++;
        }
        peticion = this.cont005S.geCont005(
          "10",
          this.start.NumPa.toString(),
          this.cantData,
          this.start.Texto
        );
      }
      if (numero === "0") {
        peticion = this.cont005S.geCont005(
          "10",
          this.start.NumPa.toString(),
          this.cantData,
          this.start.Texto
        );
      }
    }
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        this.auxma = resp.data[0].tipos_comprobantes;
        this.pagi = resp["cant"];
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
        this.auxma = [];
        this.pagi = [];
        this.table = true;
      }
    });
  }
}
