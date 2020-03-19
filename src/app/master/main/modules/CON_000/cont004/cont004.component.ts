import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";
import { Cont004Service } from "src/app/master/utils/service/main/modules/cont_000/index.shared.service";
import glb001 from "src/app/master/config/glb000/glb001_btn";
import glb002 from "src/app/master/config/glb000/glb002_start";
import * as glb from "src/app/master/utils/global/index.global";
import { Paginacion } from "src/app/master/utils/models/main/global/index.models";
import { Cont004 } from "src/app/master/utils/models/main/cont_000/index.models";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-cont004",
  templateUrl: "./cont004.component.html",
  styleUrls: ["./cont004.component.css"]
})
export class Cont004Component {
  btnGrupo = glb001;
  btnGrupoSub = glb001;
  start = glb002;
  pagi: Paginacion[];
  sus: Subscription;
  auxma: Cont004[];
  auxmaModal: Cont004;
  textBuscarCont004 = new FormControl("", []);
  table = false;
  forma: FormGroup;

  constructor(
    private cont004S: Cont004Service,
    private fb: FormBuilder,
    private notyG: glb.NotyGlobal,
    private initG: glb.InitGlobal
  ) {
    this.getCont004(this.start.Texto);
    this.crearFormulario();
    this.textBuscarCont004.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
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
      id_cuenta: ["", [Validators.pattern("^([0-9]{3})$")]],
      descripcion: ["", [Validators.required]],
      sigla: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cuentas_adicionales: this.fb.array([
        this.fb.group({
          id_cuenta: ["", [Validators.required]],
          descripcion: ["", [Validators.required]],
          sigla: ["", [Validators.required]],
          estado: ["", [Validators.required]]
        })
      ])
    });
  }

  get cuentas_adicionales() {
    return this.forma.get("cuentas_adicionales") as FormArray;
  }

  addSubforma() {
    this.cuentas_adicionales.push(
      this.fb.group({
        id_cuenta: ["", [Validators.required]],
        descripcion: ["", [Validators.required]],
        sigla: ["", [Validators.required]],
        estado: [false, [Validators.required]]
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
    this.sus = peticion.subscribe(resp => {
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
    this.start.ConMo = false;
    let peticion: Observable<any>;
    const idCta: number = cont_004.id_cuenta_adicional;
    peticion = this.cont004S.geCont004Cta("10", idCta);
    this.sus = peticion.subscribe(resp => {
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

  nuevoCont004() {
    this.initG.uniform();
    this.initG.labels();
    this.initG.select();
  }

  OpcionesTable(cont_004: Cont004, tipo: string) {
    this.start.IdCod = cont_004.id_cuenta_adicional.toString();
    switch (tipo) {
      case "visualizar":
        this.btnGrupo.BtnEdita = true;
        this.btnGrupoSub.BtnEdita = true;
        this.boolDisabled(true, true);
        this.boolDisabled(true, false);
        break;
      case "editar":
        if (this.cuentas_adicionales.length > 0) {
          this.btnGrupoSub.BtnEdita = true;
        } else {
          this.btnGrupoSub.BtnNuevo = true;
        }
        this.boolDisabled(true, true);
        this.boolDisabled(false, false);
        break;
      case "eliminar":
        return;
      default:
        this.notyG.noty("error", "Operacion incorrecta", 5000);
        break;
    }
    this.start.CtrAc = tipo;
  }

  OpcionesModal(tipo: string) {
    switch (tipo) {
      case "salir":
        this.forma.reset();
        const leng = this.cuentas_adicionales.length;
        for (let index = 0; index < leng; index++) {
          this.delSubforma(index);
        }
        break;
    }
    this.boolBtnGrupo(false, false, true);
    this.boolBtnGrupo(false, false, false);
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
    editNuevo: boolean,
    cancelGuardar: boolean,
    tipoPadreHijo: boolean
  ) {
    if (tipoPadreHijo) {
      this.btnGrupo.BtnCance = cancelGuardar;
      this.btnGrupo.BtnEdita = editNuevo;
      this.btnGrupo.BtnElimi = false;
      this.btnGrupo.BtnGuard = cancelGuardar;
      this.btnGrupo.BtnNuevo = editNuevo;
    } else {
      this.btnGrupoSub.BtnCance = cancelGuardar;
      this.btnGrupoSub.BtnEdita = editNuevo;
      this.btnGrupoSub.BtnElimi = false;
      this.btnGrupoSub.BtnGuard = cancelGuardar;
      this.btnGrupoSub.BtnNuevo = editNuevo;
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
    this.sus = peticion.subscribe(resp => {
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
      for (let index = 0; index < leng; index++) {
        this.delSubforma(index);
      }
    } else {
      const lengData: number = this.auxmaModal[0].cuentas_adicionales.length;
      const lengForm: number = this.cuentas_adicionales.length;
      if (lengData > lengForm) {
        for (let index = 0; index < lengData - 1; index++) {
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
}
