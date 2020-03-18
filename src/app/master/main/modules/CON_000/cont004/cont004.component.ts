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

  getCont004Moda(idCta: number) {
    let peticion: Observable<any>;
    peticion = this.cont004S.geCont004Cta("10", idCta);
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        this.auxmaModal = resp.ctas[0].cuenta_adicional;
        this.resetDatos();
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
      }
      this.initG.select();
      this.initG.labels();
      this.initG.uniform();
    });
  }

  nuevoCont004() {
    console.log("nuevo");
    this.initG.uniform();
    this.initG.labels();
    this.initG.select();
  }

  OpcionesTable(cont_004: Cont004, tipo: string) {
    this.getCont004Moda(cont_004.id_cuenta_adicional);

    this.initG.labels();
  }

  OpcionesModal(tipo: string) {
    console.log(tipo);
    switch (tipo) {
      case "salir":
        this.resetDatos();
        break;
    }
  }

  boolDisabled(bool: boolean, tipoPadreHijo: boolean) {
    if (bool) {
      if (tipoPadreHijo) {
        this.forma.get("codigo").disable();
        this.forma.get("descripcion").disable();
        this.forma.get("sigla").disable();
        this.forma.get("estado").disable();
      } else {
      }
    } else {
      if (tipoPadreHijo) {
      } else {
        this.forma.get("codigo").enable();
        this.forma.get("descripcion").enable();
        this.forma.get("sigla").enable();
        this.forma.get("estado").enable();
      }
    }
    this.initG.labels();
    this.initG.select();
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
        this.auxma = resp.usr[0].unidades_division;
        this.pagi = resp["cant"];
      } else {
        this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }

  resetDatos() {
    const lengData: number = this.auxmaModal[0].cuentas_adicionales.length;
    const lengForm: number = this.cuentas_adicionales.length;
    console.log(lengData, lengForm);
    if (lengData > lengForm) {
      for (let index = 0; index < lengData - 1; index++) {
        this.addSubforma();
      }
    } else if (lengForm > lengData) {
      console.log("eliminar");
    }
    this.forma.reset(this.auxmaModal[0]);
    this.initG.labels();
    this.initG.select();
  }
}
