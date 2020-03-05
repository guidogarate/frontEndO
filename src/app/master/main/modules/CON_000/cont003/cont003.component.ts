import { Component } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
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
import { Cont003 } from "src/app/master/utils/models/main/cont_000/index.models";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-cont003",
  templateUrl: "./cont003.component.html",
  styleUrls: ["./cont003.component.css"]
})
export class Cont003Component {
  btnGrupo = glb001;
  start = glb002;
  pagi: Paginacion[];
  sus: Subscription;
  auxma: Cont003[];
  auxmaModal: Cont003[];
  nuevoAuxmaModal: Cont003;
  dataEmpres: DataEmpresa[];
  textBuscarAdm009 = new FormControl("", []);
  dependenciaCont003: any[] = [];
  contorlAccion: string = "";
  disabled = {
    division: true,
    dependencia: true,
    codigo: true,
    descripci: true,
    sigla: true,
    estado: true
  };

  constructor(
    private cont003S: Cont003Service,
    private notyG: NotyGlobal,
    private initG: InitGlobal
  ) {
    this.getCont003(this.start.startText);
    this.textBuscarAdm009.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.getCont003(value);
        } else {
          this.start.startText = "all_data";
          this.getCont003(this.start.startText);
        }
      });
  }

  getCont003(texto: string, gst = "0") {
    this.start.startBusc = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.startText = "all_data";
      peticion = this.cont003S.geCont003("10", "1", gst, this.start.startText);
    } else {
      this.start.startText = texto;
      peticion = this.cont003S.geCont003("10", "1", gst, this.start.startText);
    }
    this.sus = peticion.subscribe(resp => {
      if (!this.start.startCont) {
        this.start.startCont = true;
      }
      if (this.dataEmpres === undefined) {
        this.dataEmpres = resp.usr[0].datos_empresa;
      }
      console.log(resp);
      this.nuevoAuxmaModal = resp.usr[0];
      this.start.startNumP = 1;
      if (resp["ok"]) {
        this.auxma = resp.usr[0].unidades_division;

        this.pagi = resp["cant"];
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
      }
      this.start.startBusc = false;
      this.start.startLoad = false;
      this.start.startTabl = true;
      this.initG.labels();
      this.initG.select();
    });
  }

  OpcionesTable(cont_003: Cont003, tipo: string) {
    this.auxmaModal = [cont_003];
    this.cargarDependencia(cont_003.idunidaddivision);
    switch (tipo) {
      case "visualizar":
        this.btnGrupo.BtnEdita = true;
        this.btnGrupo.BtnNuevo = true;
        this.initG.labels();
        this.initG.select();
        break;
      case "editar":
        this.btnGrupo.BtnCance = true;
        this.btnGrupo.BtnGuard = true;

        this.boolDisabled(false);
        this.initG.select();
        break;
      case "eliminar":
        return;
      default:
        this.notyG.noty("error", "Operacion incorrecta", 5000);
        break;
    }
  }

  OpcionesModal(forma: NgForm, tipo: string) {
    console.log(forma);
    console.log(this.auxmaModal);

    switch (tipo) {
      case "nuevo":
        this.contorlAccion = tipo;
        this.boolBtnGrupo(false, true);
        this.btnGrupo.BtnCance = true;
        this.boolDisabled(false);
        forma.reset();
        this.initG.labels();
        return;
      case "editar":
        this.contorlAccion = tipo;
        this.boolDisabled(false);
        this.boolBtnGrupo(false, true);
        return;
      case "salir":
        this.resetDatos(forma);
        this.boolDisabled(true);
        this.dependenciaCont003 = [];
        break;
      case "cancelar":
        this.resetDatos(forma);
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        return;
      case "guardar":
        if (forma.invalid) {
          return;
        }
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        this.guardarDatos(forma.value, this.contorlAccion);
        this.initG.select();
        return;
    }
    this.boolBtnGrupo(true, true);
    this.boolBtnGrupo(false, false);
  }
  guardarDatos(cont_003: Cont003, contorlAccion: string) {
    console.log(cont_003);
  }

  // inicia cuando se da click en la tabla
  cargarDependencia(codigo: string) {
    const long = codigo.length;
    if (long === 7) {
      const dato = {
        dependencia: null,
        descripcion: "null"
      };
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
    }
    this.initG.select();
  }
  // cuando se realiza una accion en division
  cargarDependencia2(id: string, forma: NgForm) {
    this.dependenciaCont003 = [];
    const id_terr = Number(id);
    if (id_terr === 1) {
      const dato = {
        dependencia: null,
        descripcion: "null"
      };
      this.dependenciaCont003.push(dato);
      forma.controls.dependencia.setValue(
        this.dependenciaCont003[0].dependencia
      );
      this.initG.select();
      return;
    }
    for (let index = 0; index < this.auxma.length; index++) {
      if (id_terr - 1 === this.auxma[index].division) {
        const dato = {
          dependencia: this.auxma[index].idunidaddivision,
          descripcion: this.auxma[index].descripcion
        };
        this.dependenciaCont003.push(dato);
      }
    }
    forma.controls.dependencia.setValue(this.dependenciaCont003[0].dependencia);
    this.initG.select();
  }

  cont003Selectgest(gestion: string) {
    this.getCont003("all_data", gestion);
  }

  paginacion(numero: string, eliminar = true) {
    const nume = Number(numero);
    if (this.start.startNumP === nume && eliminar) {
      return;
    }
    const total = this.pagi.length;
    let peticion: Observable<any>;
    if (nume > 0 && nume <= total) {
      this.start.startNumP = nume;
      peticion = this.cont003S.geCont003(
        "10",
        this.start.startNumP.toString(),
        "0",
        this.start.startText
      );
    } else {
      if (numero === "000") {
        if (this.start.startNumP === 1) {
          return;
        }
        if (this.start.startNumP === 1) {
          this.start.startNumP = 1;
        } else {
          this.start.startNumP--;
        }
        peticion = this.cont003S.geCont003(
          "10",
          this.start.startNumP.toString(),
          "0",
          this.start.startText
        );
      } else if (numero === "999") {
        if (this.start.startNumP === total) {
          return;
        }
        if (this.start.startNumP === total) {
          this.start.startNumP = total;
        } else {
          this.start.startNumP++;
        }
        peticion = this.cont003S.geCont003(
          "10",
          this.start.startNumP.toString(),
          "0",
          this.start.startText
        );
      }
    }
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        this.auxma = resp.usr[0].unidades_division;
        this.pagi = resp["cant"];
        // this.nuevoAuxmaModal = resp.usr[0];
      } else {
        this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }
  boolDisabled(bool: boolean) {
    this.disabled.division = bool;
    this.disabled.dependencia = bool;
    this.disabled.codigo = bool;
    this.disabled.descripci = bool;
    this.disabled.sigla = bool;
    this.disabled.estado = bool;
    this.initG.select();
  }

  boolBtnGrupo(editNuevo: boolean, cancelGuardar: boolean) {
    this.btnGrupo.BtnCance = cancelGuardar;
    this.btnGrupo.BtnEdita = editNuevo;
    this.btnGrupo.BtnElimi = false;
    this.btnGrupo.BtnGuard = cancelGuardar;
    this.btnGrupo.BtnNuevo = editNuevo;
  }

  resetDatos(forma: NgForm) {
    console.log(this.auxmaModal[0].idunidaddivision);
    console.log(this.auxmaModal);

    console.log(forma.value);

    if (this.auxmaModal[0].division === undefined) {
      return;
    }
    // forma.controls.idunidaddivision.setValue(
    //   this.auxmaModal[0].idunidaddivision
    // );
    forma.controls.division.setValue(this.auxmaModal[0].division);
    forma.controls.dependencia.setValue(this.auxmaModal[0].dependencia);
    forma.controls.descripcion.setValue(this.auxmaModal[0].descripcion);
    forma.controls.sigla.setValue(this.auxmaModal[0].sigla);
    forma.controls.estado.setValue(this.auxmaModal[0].estado);
    this.cargarDependencia2(this.auxmaModal[0].division.toString(), forma);
    this.initG.labels();
  }
}
