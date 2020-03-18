import { Component, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Cont003Service } from "src/app/master/utils/service/main/modules/cont_000/index.shared.service";
import {
  NotyGlobal,
  InitGlobal
} from "src/app/master/utils/global/index.global";
import {
  Paginacion,
  DataEmpresa
} from "src/app/master/utils/models/main/global/index.models";
import glb001 from "src/app/master/config/glb000/glb001_btn";
import glb002 from "src/app/master/config/glb000/glb002_start";
import { Observable, Subscription } from "rxjs";
import {
  Cont003,
  Cont003Select
} from "src/app/master/utils/models/main/cont_000/index.models";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-cont003",
  templateUrl: "./cont003.component.html",
  styleUrls: ["./cont003.component.css"]
})
export class Cont003Component implements OnDestroy {
  btnGrupo = glb001;
  start = glb002;
  pagi: Paginacion[];
  sus: Subscription;
  auxma: Cont003[];
  auxmaModal: Cont003;
  selecDivModal: Cont003Select[];
  dataEmpres: DataEmpresa[];
  textBuscarAdm009 = new FormControl("", []);
  dependenciaCont003: any[] = [];
  forma: FormGroup;
  table = false;
  gestion = "0";
  ocultarSelect = true;
  mostrarCheck = false;
  placeholdeAuto = "auto";

  constructor(
    private cont003S: Cont003Service,
    private fb: FormBuilder,
    private notyG: NotyGlobal,
    private initG: InitGlobal
  ) {
    this.getCont003(this.start.Texto);
    this.crearFormulario();
    this.textBuscarAdm009.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.getCont003(value, "1", this.gestion);
        } else {
          this.start.Texto = "all_data";
          this.getCont003(this.start.Texto, "1", this.gestion);
        }
      });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      idunidaddivision: ["", [Validators.pattern("^([0-9]{3})$")]],
      descripcion: ["", [Validators.required]],
      sigla: ["", [Validators.required]],
      checkauto: [""],
      division: ["", [Validators.required]],
      dependencia: [""],
      estado: ["", [Validators.required]]
    });
  }

  getCont003(texto: string, numePag = "1", gst = "0") {
    this.start.Busca = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.Texto = "all_data";
      peticion = this.cont003S.geCont003("10", numePag, gst, this.start.Texto);
    } else {
      this.start.Texto = texto;
      peticion = this.cont003S.geCont003("10", numePag, gst, this.start.Texto);
    }
    this.sus = peticion.subscribe(resp => {
      this.gestion = resp.usr[0].datos_empresa[0].gestiones[0].gestion;
      if (!this.start.Conte) {
        this.start.Conte = true;
      }
      if (this.dataEmpres === undefined) {
        this.dataEmpres = resp.usr[0].datos_empresa;
      }
      this.start.NumPa = Number(numePag);
      this.selecDivModal = resp.usr[0].niveles_unidades_negocio;
      if (resp["ok"]) {
        this.auxma = resp.usr[0].unidades_division;
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

  ngOnDestroy() {}
  nuevoCont003() {
    this.boolBtnGrupo(false, true);
    this.btnGrupo.BtnCance = false;
    this.boolDisabled(false);
    this.dependenciaCont003 = [];
    this.forma.reset({ estado: false, checkauto: true });
    this.start.CtrAc = "nuevo";
    this.ocultarSelect = false;
    this.mostrarCheck = true;
    this.forma.get("idunidaddivision").setValue("auto");
    this.forma.get("idunidaddivision").disable();
    this.initG.uniform();
    this.initG.labels();
    this.initG.select();
  }

  OpcionesTable(cont_003: Cont003, tipo: string) {
    this.auxmaModal = cont_003;
    this.forma.reset(this.auxmaModal);
    this.cargarDependencia(cont_003.idunidaddivision);
    this.start.IdCod = cont_003.idunidaddivision;
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
        this.forma.get("idunidaddivision").disable();
        this.forma.get("division").disable();
        this.forma.get("dependencia").disable();
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
    this.mostrarCheck = false;
    switch (tipo) {
      case "nuevo":
        this.start.CtrAc = tipo;
        this.boolBtnGrupo(false, true);
        this.btnGrupo.BtnCance = true;
        this.dependenciaCont003 = [];
        this.forma.reset({ estado: false, checkauto: true }); // resetea todo a null y estado a false
        this.boolDisabled(false);
        this.cargarDependencia2("1");
        this.mostrarCheck = true;
        this.forma.get("idunidaddivision").setValue("auto");
        this.forma.get("idunidaddivision").disable();
        this.initG.uniform();
        this.initG.labels();
        return;
      case "editar":
        this.start.CtrAc = tipo;
        this.boolDisabled(false);
        this.boolBtnGrupo(false, true);
        this.forma.get("idunidaddivision").disable();
        this.forma.get("division").disable();
        this.forma.get("dependencia").disable();
        return;
      case "salir":
        this.placeholdeAuto = "auto";
        this.resetDatos();
        this.boolDisabled(true);
        this.dependenciaCont003 = [];
        break;
      case "cancelar":
        this.resetDatos();
        this.dependenciaCont003 = [];
        this.cargarDependencia(this.auxmaModal.idunidaddivision);
        this.placeholdeAuto = "auto";
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        return;
      case "guardar":
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
      this.forma.get("idunidaddivision").disable();
      this.forma.get("descripcion").disable();
      this.forma.get("sigla").disable();
      this.forma.get("division").disable();
      this.forma.get("dependencia").disable();
      this.forma.get("estado").disable();
    } else {
      this.forma.get("idunidaddivision").enable();
      this.forma.get("descripcion").enable();
      this.forma.get("sigla").enable();
      this.forma.get("division").enable();
      this.forma.get("dependencia").enable();
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

  paginacion(numero: string, eliminar = true, gest = "0") {
    const nume = Number(numero);
    if (this.start.NumPa === nume && eliminar) {
      return;
    }
    const total = this.pagi.length;
    let peticion: Observable<any>;
    if (nume > 0 && nume <= total) {
      this.start.NumPa = nume;
      peticion = this.cont003S.geCont003(
        "10",
        this.start.NumPa.toString(),
        gest,
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
        peticion = this.cont003S.geCont003(
          "10",
          this.start.NumPa.toString(),
          gest,
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
        peticion = this.cont003S.geCont003(
          "10",
          this.start.NumPa.toString(),
          gest,
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
    this.forma.reset(this.auxmaModal);
    this.initG.labels();
    this.initG.select();
  }

  // inicia cuando se da click en la tabla
  cargarDependencia(codigo: string) {
    const long = codigo.length;
    if (long === 7) {
      const dato = {
        dependencia: null,
        descripcion: "."
      };
      this.ocultarSelect = false;
      this.dependenciaCont003.push(dato);
      this.initG.select();
      return;
    } else if (long === 10) {
      for (let index = 0; index < this.auxma.length; index++) {
        if (7 === this.auxma[index].idunidaddivision.length) {
          const dato = {
            dependencia: this.auxma[index].idunidaddivision,
            descripcion: this.auxma[index].descripcion
          };
          this.dependenciaCont003.push(dato);
        }
      }
    } else if (long === 13) {
      for (let index = 0; index < this.auxma.length; index++) {
        if (10 === this.auxma[index].idunidaddivision.length) {
          const dato = {
            dependencia: this.auxma[index].idunidaddivision,
            descripcion: this.auxma[index].descripcion
          };
          this.dependenciaCont003.push(dato);
        }
      }
    } else if (long === 16) {
      for (let index = 0; index < this.auxma.length; index++) {
        if (13 === this.auxma[index].idunidaddivision.length) {
          const dato = {
            dependencia: this.auxma[index].idunidaddivision,
            descripcion: this.auxma[index].descripcion
          };
          this.dependenciaCont003.push(dato);
        }
      }
    } else if (long === 19) {
      for (let index = 0; index < this.auxma.length; index++) {
        if (16 === this.auxma[index].idunidaddivision.length) {
          const dato = {
            dependencia: this.auxma[index].idunidaddivision,
            descripcion: this.auxma[index].descripcion
          };
          this.dependenciaCont003.push(dato);
        }
      }
    } else if (long === 22) {
      for (let index = 0; index < this.auxma.length; index++) {
        if (19 === this.auxma[index].idunidaddivision.length) {
          const dato = {
            dependencia: this.auxma[index].idunidaddivision,
            descripcion: this.auxma[index].descripcion
          };
          this.dependenciaCont003.push(dato);
        }
      }
    }
    this.ocultarSelect = true;
    this.initG.select();
  }

  // cuando se realiza una accion en division
  cargarDependencia2(id: string) {
    this.dependenciaCont003 = [];
    const id_terr = Number(id);
    if (id_terr === 1) {
      const dato = {
        dependencia: null,
        descripcion: "."
      };
      this.ocultarSelect = false;
      this.dependenciaCont003.push(dato);
      this.forma
        .get("dependencia")
        .setValue(this.dependenciaCont003[0].dependencia);
      this.initG.select();
      return;
    }
    // OJO AQUI CUANDO NO EXISTEN DatosPipe, VALIDA Estado. GESTION 2019
    // if (this.dependenciaCont003 === undefined) {
    //   return;
    // }
    for (let index = 0; index < this.auxma.length; index++) {
      if (id_terr - 1 === this.auxma[index].division) {
        const dato = {
          dependencia: this.auxma[index].idunidaddivision,
          descripcion: this.auxma[index].descripcion
        };
        this.dependenciaCont003.push(dato);
      }
    }
    this.forma
      .get("dependencia")
      .setValue(this.dependenciaCont003[0].dependencia);
    this.ocultarSelect = true;
    this.initG.select();
  }

  habilitarAuto() {
    if (this.forma.get("checkauto").value) {
      this.forma.get("idunidaddivision").enable();
      this.forma.get("idunidaddivision").setValue("");
      this.placeholdeAuto = "introducir codigo";
    } else {
      this.forma.get("idunidaddivision").setValue("auto");
      this.forma.get("idunidaddivision").disable();
      this.placeholdeAuto = "auto";
    }
    this.initG.labels();
  }

  cont003Selectgest(gestion: string) {
    this.gestion = gestion;
    this.getCont003("all_data", "1", gestion);
  }

  guardarDatos(cont_003: Cont003, contorlAccion: string) {
    let peticion: Observable<any>;
    if (contorlAccion === "nuevo") {
      peticion = this.cont003S.inCont003(cont_003, this.gestion);
    } else if (contorlAccion === "editar") {
      peticion = this.cont003S.upCont003(cont_003, this.start.IdCod);
    } else {
      this.notyG.noty("error", "control Accion Invalido", 2000);
    }
    this.sus = peticion.subscribe(resp => {
      this.btnGrupo.BtnLoadi = false;
      this.boolDisabled(true);
      this.boolBtnGrupo(true, false);
      if (resp["ok"]) {
        if (contorlAccion === "nuevo") {
          this.start.IdCod = resp["id_registro"];
          this.forma.get("idunidaddivision").setValue(this.start.IdCod);
          this.auxmaModal.idunidaddivision = this.start.IdCod;
          this.auxmaModal.descripcion = this.forma.get("descripcion").value;
          this.auxmaModal.sigla = this.forma.get("sigla").value;
          this.auxmaModal.estado = this.forma.get("estado").value;
          this.auxmaModal.division = this.forma.get("division").value;
          this.auxmaModal.dependencia = this.forma.get("dependencia").value;
        } else {
          this.auxmaModal.descripcion = this.forma.get("descripcion").value;
          this.auxmaModal.sigla = this.forma.get("sigla").value;
          this.auxmaModal.estado = this.forma.get("estado").value;
        }
        this.resetDatos();
        this.getCont003(
          this.start.Texto,
          this.start.NumPa.toString(),
          this.gestion
        );
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.boolBtnGrupo(false, true);
        this.boolDisabled(false);
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  eliminarCont003(id_cod: string) {
    let peticion: Observable<any>;
    peticion = this.cont003S.deCont003(id_cod);
    let numPag = this.start.NumPa;
    this.sus = peticion.subscribe(resp => {
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
}
