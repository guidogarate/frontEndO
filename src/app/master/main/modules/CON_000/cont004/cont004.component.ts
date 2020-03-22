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
import glb003 from "src/app/master/config/glb000/glb003_btn";
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
  oculto: string = "";
  cantCtasAdic = 0;

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
    this.oculto = "";
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
    this.cantCtasAdic = this.cuentas_adicionales.length;
    switch (tipo) {
      case "visualizar":
        this.eliminarSub = false;
        this.btnSinCtaAdic();
        this.boolDisabled(true, true);
        this.boolDisabled(true, false);
        break;
      case "editar":
        this.eliminarSub = false;
        if (this.cuentas_adicionales.length > 0) {
          this.boolBtnGrupo(false, true, false);
        } else {
          this.btnGrupoSub.BtnNuevo = true;
        }
        this.boolDisabled(true, true);
        this.boolDisabled(false, false);
        break;
      case "eliminar":
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
        console.log("nuevo");
        return;
      case "editar":
        this.eliminarSub = false;
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
        return;
      case "salir":
        const salirS = this.cuentas_adicionales.length;
        if (this.forma.dirty || salirS !== this.cantCtasAdic) {
          const resp = confirm("Desea Descartar Cambios");
          if (!resp) {
            this.oculto = "";
            return;
          }
        }
        this.oculto = "modal";
        this.eliminarSub = false;
        this.forma.reset();
        break;
      case "cancelar":
        this.eliminarSub = false;
        this.resetDatos();
        if (tipoPadreHijo) {
          this.boolDisabled(true, true);
        } else {
          this.boolDisabled(true, false);
        }
        this.btnSinCtaAdic();
        return;
      case "eliminar":
        if (tipoPadreHijo) {
          if (this.cuentas_adicionales.length > 0) {
            this.notyG.noty(
              "error",
              "Primero Elimina Todas las Cuentas Adicionales",
              3000
            );
          } else {
            this.boolBtnGrupo(false, true, true);
            this.boolBtnGrupo(false, false, false);
          }
        } else {
          this.eliminarSub = true;
          this.boolBtnGrupo(false, false, true);
          this.boolBtnGrupo(false, true, false);
        }
        this.boolDisabled(true, true);
        this.boolDisabled(true, false);
        return;
      case "guardar":
        const salirG = this.cuentas_adicionales.length;
        if (this.forma.dirty || salirG !== this.cantCtasAdic) {
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
          this.notyG.noty("info", "Datos no han sido modificados", 2000);
        }
        return;
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

  guardarDatos(cont_004: Cont004, contorlAccion: string) {
    console.log(cont_004);
    console.log(contorlAccion);
    console.log(this.start.IdCod);
    this.btnGrupo.BtnLoadi = false;
    this.btnGrupoSub.BtnLoadi = false;
    return;
    // let peticion: Observable<any>;
    // if (contorlAccion === "nuevo") {
    //   peticion = this.cont004S.inCont004(cont_004);
    // } else if (contorlAccion === "editar") {
    //   peticion = this.cont004S.upCont004(cont_004, this.start.IdCod);
    // } else {
    //   this.notyG.noty("error", "control Accion Invalido", 2000);
    //   return;
    // }
    // this.sus = peticion.subscribe(resp => {
    //   this.btnGrupo.BtnLoadi = false;
    //   this.btnGrupoSub.BtnLoadi = false;
    //   if (resp["ok"]) {
    //     if (contorlAccion === "nuevo") {
    //       console.log("guardado con exito y reset datos(nuevo)");
    //     } else {
    //       this.auxmaModal[0] = cont_004;
    //     }
    //     this.resetDatos();
    //     this.btnSinCtaAdic();
    //     this.getCont004(this.start.Texto, this.start.NumPa.toString());
    //     this.notyG.noty("success", resp["mensaje"], 1000);
    //   } else {
    //     this.notyG.noty("error", resp["mensaje"], 3000);
    //   }
    // });
  }
}
