import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from "@angular/forms";
import { Cont004Service } from "src/app/master/utils/service/main/modules/cont_000/index.shared.service";
import glb001 from "src/app/master/config/glb000/glb001_btn";
import glb002 from "src/app/master/config/glb000/glb002_start";
import glb003 from "src/app/master/config/glb000/glb003_btn";
import * as glb from "src/app/master/utils/global/index.global";
import { Paginacion } from "src/app/master/utils/models/main/global/index.models";
import {
  Cont004,
  Cont004Del,
} from "src/app/master/utils/models/main/cont_000/index.models";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-cont004",
  templateUrl: "./cont004.component.html",
  styleUrls: ["./cont004.component.css"],
})
export class Cont004Component {
  btnGrupo = glb001;
  btnGrupoSub = glb003;
  start = glb002;
  pagi: Paginacion[];
  sus: Subscription;
  auxma: Cont004[];
  auxmaModal: Cont004;
  textBuscarCont004 = new FormControl("", []);
  table = false;
  forma: FormGroup;
  eliminarSub = false;
  nuevoAutoma = false;
  oculto: string = "";
  eliminar: Cont004Del[] = [];
  eliminarIdCta: number[] = [];

  constructor(
    private cont004S: Cont004Service,
    private fb: FormBuilder,
    private notyG: glb.NotyGlobal,
    private initG: glb.InitGlobal
  ) {
    this.getCont004(this.start.Texto);
    this.crearFormulario();
    this.delSubforma(0);
    this.textBuscarCont004.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (value.length > 1) {
          this.getCont004(value, "1");
        } else {
          this.start.Texto = "all_data";
          this.getCont004(this.start.Texto, "1");
        }
      });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nuevo: [false, []],
      id_cuenta: ["", [Validators.pattern("^([0-9]{3})$")]],
      descripcion: ["", [Validators.required]],
      sigla: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cuentas_adicionales: this.fb.array([
        this.fb.group({
          nuevo: ["false"],
          eliminar: ["false"],
          id_cuenta: ["", [Validators.required]],
          descripcion: ["", [Validators.required]],
          sigla: ["", [Validators.required]],
          estado: ["", [Validators.required]],
        }),
      ]),
    });
  }

  get cuentas_adicionales() {
    return this.forma.get("cuentas_adicionales") as FormArray;
  }

  addSubforma() {
    this.cuentas_adicionales.push(
      this.fb.group({
        eliminar: [false, []],
        id_cuenta: ["", [Validators.required]],
        descripcion: ["", [Validators.required]],
        sigla: ["", [Validators.required]],
        estado: [false, [Validators.required]],
      })
    );
  }

  delSubforma(index: number) {
    this.cuentas_adicionales.removeAt(index);
  }

  getCont004(texto: string, numePag = "1") {
    this.start.Busca = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.Texto = "all_data";
      peticion = this.cont004S.geCont004Ctas("10", numePag, this.start.Texto);
    } else {
      this.start.Texto = texto;
      peticion = this.cont004S.geCont004Ctas("10", numePag, this.start.Texto);
    }
    this.sus = peticion.subscribe((resp) => {
      if (!this.start.Conte) {
        this.start.Conte = true;
      }
      this.start.NumPa = Number(numePag);
      if (resp["ok"]) {
        this.auxma = resp.data[0].cuentas_adicionales;
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
      this.initG.labels();
      this.initG.uniform();
    });
  }

  getCont004Moda(cont_004: Cont004, tipo: string) {
    this.oculto = "";
    this.start.ConMo = false;
    let peticion: Observable<any>;
    const idCta: number = cont_004.id_cuenta_adicional;
    peticion = this.cont004S.geCont004Cta("10", idCta);
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        this.auxmaModal = resp.ctas[0].cuenta_adicional;
        this.resetDatos();
        this.OpcionesTable(cont_004, tipo);
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
        this.forma.reset();
      }
      this.start.ConMo = true;
    });
  }

  habilitarAuto() {
    const nvo: boolean = this.forma.get("nuevo").value;
    if (!nvo || nvo === null) {
      console.log("auto");
    } else {
      console.log("manual");
    }
  }

  nuevoCont004() {
    this.initG.uniform();
    this.initG.labels();
    this.initG.select();
  }

  OpcionesTable(cont_004: Cont004, tipo: string) {
    this.start.IdCod = cont_004.id_cuenta_adicional.toString();
    switch (tipo) {
      case "visualizar":
        this.eliminarSub = false;
        this.nuevoAutoma = false;
        this.btnSinCtaAdic();
        this.boolDisabled(true, true);
        this.boolDisabled(true, false);
        break;
      case "editar":
        this.eliminarSub = false;
        this.nuevoAutoma = false;
        if (this.cuentas_adicionales.length > 0) {
          this.boolBtnGrupo(false, true, false);
        } else {
          this.btnGrupoSub.BtnNuevo = true;
        }
        this.boolDisabled(true, true);
        this.boolDisabled(false, false);
        break;
      case "eliminar":
        this.start.CtrAc = "eliminar";
        this.nuevoAutoma = false;
        if (this.cuentas_adicionales.length > 0) {
          this.eliminarSub = true;
          this.boolBtnGrupo(false, true, false);
        } else {
          this.eliminarSub = false;
          this.btnGrupo.BtnElimi = true;
          this.btnGrupo.BtnCance = true;
        }
        this.boolDisabled(true, true);
        this.boolDisabled(true, false);
        return;
      default:
        this.oculto = "modal";
        this.notyG.noty("error", "Operacion incorrecta", 5000);
        break;
    }
    this.start.CtrAc = tipo;
  }

  OpcionesModal(tipo: string, tipoPadreHijo = true) {
    switch (tipo) {
      case "nuevo":
        this.nuevoModal(tipo, tipoPadreHijo);
        return;
      case "editar":
        this.editarModal(tipo, tipoPadreHijo);
        return;
      case "salir":
        this.salirModal();
        return;
      case "cancelar":
        this.cancelarModal(tipoPadreHijo);
        return;
      case "eliminar":
        this.eliminarModal(tipo, tipoPadreHijo);
        return;
      case "guardar":
        this.guardarModal(tipoPadreHijo);
        return;
    }
  }

  nuevoModal(tipo: string, tipoPadreHijo: boolean) {
    this.start.CtrAc = tipo;
    if (tipoPadreHijo) {
      const elim = confirm("esta seguro de crear,");
      if (elim) {
        this.boolDisabled(false, true);
        this.boolBtnGrupo(false, true, true);
        this.boolBtnGrupo(false, false, false);
        this.eliminarCtaAdic();
        this.forma.reset();
        this.nuevoAutoma = true;
        this.forma.get("nuevo").enable();
        return;
      }
    } else {
      this.addSubforma();
      this.boolBtnGrupo(false, false, true);
      this.boolBtnGrupo(false, false, false);
      this.eliminarSub = true;
      this.btnGrupoSub.BtnNuevo = true;
      this.btnGrupoSub.BtnGuard = true;
      this.btnGrupoSub.BtnCance = true;
    }
  }

  editarModal(tipo: string, tipoPadreHijo: boolean): void {
    this.eliminarSub = false;
    this.nuevoAutoma = false;
    this.start.CtrAc = tipo;
    if (tipoPadreHijo) {
      this.boolDisabled(false, true);
      this.boolBtnGrupo(false, true, true);
      this.boolBtnGrupo(false, false, false);
    } else {
      this.boolDisabled(false, false);
      this.boolBtnGrupo(false, false, true);
      this.boolBtnGrupo(false, true, false);
    }
  }

  salirModal(): void {
    if (this.forma.dirty) {
      const resp = confirm("Desea Descartar Cambios");
      if (!resp) {
        this.oculto = "";
        return;
      }
    }
    this.eliminar = [];
    this.eliminarIdCta = [];
    this.oculto = "modal";
    this.eliminarSub = false;
    this.nuevoAutoma = false;
    this.forma.reset();
    this.boolBtnGrupo(false, false, true);
    this.boolBtnGrupo(false, false, false);
  }

  cancelarModal(tipoPadreHijo: boolean): void {
    this.eliminar = [];
    this.eliminarIdCta = [];
    this.eliminarSub = false;
    this.nuevoAutoma = false;
    this.resetDatos();
    if (tipoPadreHijo) {
      this.boolDisabled(true, true);
    } else {
      this.boolDisabled(true, false);
    }
    this.btnSinCtaAdic();
  }

  eliminarModal(tipo: string, tipoPadreHijo: boolean): void {
    this.start.CtrAc = tipo;
    if (tipoPadreHijo) {
      if (this.cuentas_adicionales.length > 0) {
        this.notyG.noty(
          "error",
          "Primero Elimina Todas las Cuentas Adicionales",
          3000
        );
        return;
      } else {
        const elim = confirm("esta seguro de eliminar");
        if (elim) {
          this.eliminarPadre();
          return;
        }
      }
    } else {
      this.eliminarSub = true;
      this.nuevoAutoma = false;
      this.boolBtnGrupo(false, false, true);
      this.boolBtnGrupo(false, true, false);
      this.initG.uniform();
    }
    this.boolDisabled(true, true);
    this.boolDisabled(true, false);
    this.habilitarCheck();
  }

  guardarModal(tipoPadreHijo: boolean): void {
    const cantCtaAd = this.cuentas_adicionales.length;
    console.log(this.start.CtrAc);

    if (this.start.CtrAc === "nuevo") {
      console.log(this.forma.valid);
      return;
    }
    if (this.start.CtrAc === "eliminar") {
      if (this.forma.dirty) {
        this.boolDisabled(true, false);
        for (let i = 0; i < cantCtaAd; i++) {
          const element = this.cuentas_adicionales.value[i];
          if (element.eliminar) {
            this.eliminarIdCta.push(element.id_cuenta);
            this.eliminar.push({
              id_tipocuenta: this.start.IdCod,
              id_cuenta: element.id_cuenta.toString(),
            });
          }
        }
        if (this.eliminarIdCta.length === 0) {
          this.habilitarCheck();
          this.notyG.noty("info", "No ha seleccionado ningun elemento", 2000);
        } else {
          this.boolDisabled(true, false);
          this.btnGrupoSub.BtnLoadi = true;
          this.btnGrupoSub.BtnCance = false;
          this.guardarDatos(this.eliminar, this.start.CtrAc);
        }
      } else {
        this.habilitarCheck();
        this.notyG.noty("info", "No ha seleccionado ningun elemento", 2000);
      }
    }
    if (this.start.CtrAc === "editar") {
      if (this.forma.dirty) {
        if (tipoPadreHijo) {
          if (this.forma.invalid) {
            return;
          }
          this.boolDisabled(true, true);
          this.btnGrupo.BtnLoadi = true;
          this.btnGrupo.BtnCance = false;
        } else {
          if (this.cuentas_adicionales.invalid) {
            return;
          }
          this.boolDisabled(true, false);
          this.btnGrupoSub.BtnLoadi = true;
          this.btnGrupoSub.BtnCance = false;
        }
        this.guardarDatos(this.forma.value, this.start.CtrAc);
      } else {
        this.editarModal(this.start.CtrAc, tipoPadreHijo);
        this.notyG.noty("info", "No ha modificado datos", 2000);
      }
    }
  }

  habilitarCheck() {
    const lengCtaAdic: number = this.cuentas_adicionales.length;
    for (let i = 0; i < lengCtaAdic; i++) {
      this.cuentas_adicionales.controls[i].get("eliminar").enable();
    }
  }

  boolDisabled(bool: boolean, tipoPadreHijo: boolean) {
    if (bool) {
      if (tipoPadreHijo) {
        this.forma.disable();
      } else {
        const leng = this.cuentas_adicionales.length;
        for (let index = 0; index < leng; index++) {
          this.cuentas_adicionales.controls[index].disable();
        }
      }
    } else {
      if (tipoPadreHijo) {
        this.forma.get("id_cuenta").disable();
        this.forma.get("descripcion").enable();
        this.forma.get("sigla").enable();
        this.forma.get("estado").enable();
      } else {
        const leng = this.cuentas_adicionales.length;
        for (let index = 0; index < leng; index++) {
          this.cuentas_adicionales.controls[index].get("id_cuenta").disable();
          this.cuentas_adicionales.controls[index].get("descripcion").enable();
          this.cuentas_adicionales.controls[index].get("sigla").enable();
          this.cuentas_adicionales.controls[index].get("estado").enable();
        }
      }
    }
    this.initG.labels();
  }

  boolBtnGrupo(
    upNewDel: boolean,
    cancelGuardar: boolean,
    tipoPadreHijo: boolean
  ) {
    if (tipoPadreHijo) {
      this.btnGrupo.BtnCance = cancelGuardar;
      this.btnGrupo.BtnEdita = upNewDel;
      this.btnGrupo.BtnElimi = upNewDel;
      this.btnGrupo.BtnGuard = cancelGuardar;
      this.btnGrupo.BtnNuevo = upNewDel;
    } else {
      this.btnGrupoSub.BtnCance = cancelGuardar;
      this.btnGrupoSub.BtnEdita = upNewDel;
      this.btnGrupoSub.BtnElimi = upNewDel;
      this.btnGrupoSub.BtnGuard = cancelGuardar;
      this.btnGrupoSub.BtnNuevo = upNewDel;
    }
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
      peticion = this.cont004S.geCont004Ctas(
        "10",
        this.start.NumPa.toString(),
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
        peticion = this.cont004S.geCont004Ctas(
          "10",
          this.start.NumPa.toString(),
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
        peticion = this.cont004S.geCont004Ctas(
          "10",
          this.start.NumPa.toString(),
          this.start.Texto
        );
      }
    }
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        this.auxma = resp.data[0].cuentas_adicionales;
        this.pagi = resp["cant"];
      } else {
        this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }

  resetDatos() {
    if (this.auxmaModal[0].cuentas_adicionales === null) {
      const leng = this.cuentas_adicionales.length;
      for (let index = leng; index > 0; index--) {
        this.delSubforma(index - 1);
      }
    } else {
      const lengData: number = this.auxmaModal[0].cuentas_adicionales.length;
      const lengForm: number = this.cuentas_adicionales.length;
      // console.log(lengData, ">", lengForm);
      if (lengData > lengForm) {
        for (let index = lengForm; index < lengData; index++) {
          this.addSubforma();
        }
      } else if (lengForm > lengData) {
        for (let index = lengForm; index > lengData; index--) {
          this.delSubforma(index - 1);
        }
      }
    }
    this.forma.reset(this.auxmaModal[0]);
    this.initG.labels();
  }

  btnSinCtaAdic() {
    if (this.cuentas_adicionales.length > 0) {
      this.boolBtnGrupo(true, false, true);
      this.boolBtnGrupo(true, false, false);
    } else {
      this.boolBtnGrupo(true, false, true);
      this.boolBtnGrupo(false, false, false);
      this.btnGrupoSub.BtnNuevo = true;
    }
  }

  eliminarIndex(index: number[]) {
    const long: number = index.length;
    for (let i = 0; i < long; i++) {
      const el: any[] = this.cuentas_adicionales.value;
      const lg = el.length;
      for (let j = 0; j < lg; j++) {
        if (el[j].id_cuenta === index[i]) {
          this.delSubforma(j);
          j = lg;
        }
      }
    }
  }

  eliminarCtaAdic() {
    const ctaAd: any[] = this.cuentas_adicionales.value;
    for (const iterator of ctaAd) {
      this.delSubforma(0);
    }
  }

  guardarDatos(cont_004: any, controlAccion: string) {
    let peticion: Observable<any>;
    if (controlAccion === "nuevo") {
      peticion = this.cont004S.inCont004(cont_004);
    } else if (controlAccion === "editar") {
      const cont004: Cont004 = cont_004;
      peticion = this.cont004S.upCont004(cont004, this.start.IdCod);
    } else if (controlAccion === "eliminar") {
      const cont004: Cont004Del = cont_004;
      peticion = this.cont004S.deCont004(cont004);
    } else {
      this.notyG.noty("error", "control Accion Invalido", 2000);
      return;
    }
    this.sus = peticion.subscribe((resp) => {
      this.eliminarSub = false;
      this.nuevoAutoma = false;
      this.btnGrupo.BtnLoadi = false;
      this.btnGrupoSub.BtnLoadi = false;
      if (resp["ok"]) {
        if (controlAccion === "nuevo") {
          console.log("guardado con exito y reset datos(nuevo)");
        } else if (controlAccion === "editar") {
          this.auxmaModal[0] = cont_004;
        } else if (controlAccion === "eliminar") {
          this.eliminarIndex(this.eliminarIdCta);
          this.auxmaModal[0] = this.forma.value;
          this.eliminar = [];
          this.eliminarIdCta = [];
        }
        this.resetDatos();
        this.btnSinCtaAdic();
        this.getCont004(this.start.Texto, this.start.NumPa.toString());
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  eliminarPadre() {
    this.eliminar = [];
    this.eliminar.push({
      id_tipocuenta: this.start.IdCod,
      id_cuenta: "0",
    });
    const cont_004: any = this.eliminar;
    let peticion: Observable<any>;
    peticion = this.cont004S.deCont004(cont_004);
    let numPag = this.start.NumPa;
    this.sus = peticion.subscribe((resp) => {
      if (resp["ok"]) {
        if (this.auxma.length === 1) {
          numPag--;
        }
        this.paginacion(numPag.toString(), false);
        this.boolBtnGrupo(false, false, true);
        this.boolBtnGrupo(false, false, false);
        this.btnGrupo.BtnNuevo = true;
        this.forma.reset();
        this.initG.labels();
      } else {
        this.notyG.noty("success", resp["mensaje"], 1000);
      }
    });
  }

  imprimir() {
    // let peticion: Observable<any>;
    // peticion = this.cont004S.geCont004Ctas("10", "2", "all_data");
    // this.sus = peticion.subscribe((resp) => {
    //   console.log(resp);
    //   const data2 = (this.auxma = resp.data[0].cuentas_adicionales);
    //   console.log(data2);
    // });
    const htmlStart: string =
      "<html><head><title>Imprimir</title><link href='https://sage-bo.herokuapp.com/assets/assets/css/bootstrap.css'  rel='stylesheet' type='text/css'/> </head><body>";
    const header: string =
      "<header><div style='padding: 5px 0; margin: auto;'><div style='display: flex; font-size: 10px; margin: auto;'><div style='width: 50%; display: flex;'><div><img src='https://pbs.twimg.com/profile_images/522791992762187776/CwgQU9cn_400x400.png' style='width: 100px; height: 100px;'/></div><div style='padding-left: 25;'><p>ORMATE</p><p>Direccion : Av. Monseñor Salvatierra # 150</p><p>Telf: 33-339868</p><p>Santa Cruz - Bolivia</p></div></div><div style='padding-left: 30%;'><p>Fecha: 18/05/2020</p><p>Impresión: 15:15:30</p></div></div><div style='display: flex;'><div style='width: 25%;'></div><div style='width: 50%; text-align: center; justify-self: center;'><p style='font-size: 20px;'>COMPONENTE DE FACTURACION</p><p style='font-size: 14px;'>administracion</p></div><div style='width: 25%;'></div></div></div></header>";
    const tableStart: string = "<table class='table'>";
    const tableHead: string =
      "<thead class='text-center'><tr class='bg-blue'><th>Codigo</th><th>Descripcion</th><th>Estado</th></tr></thead>";
    let tableData: string = "<tbody>";
    const long = this.auxma.length - 1;
    for (let i = long; i >= 0; i--) {
      tableData =
        `<tr><td>${this.auxma[i].id_cuenta_adicional} </td><td>${this.auxma[i].descripcion} </td><td>${this.auxma[i].estado} </td></tr>` +
        tableData;
    }
    tableData = tableData + "</tbody>";
    const tableEnd: string = "</table>";
    const htmlEnd: string = "</body></html>";
    const mandarImprimir: string =
      htmlStart +
      header +
      tableStart +
      tableHead +
      tableData +
      tableEnd +
      htmlEnd;
    const w = window.open();
    w.document.write(mandarImprimir);
    w.document.close();
    setTimeout(() => {
      w.print();
      w.close();
    }, 100);
  }
}
