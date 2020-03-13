import { Component } from "@angular/core";
import { Adm009 } from "src/app/master/utils/models/main/adm_000/index.models";
import { Adm009Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import {
  NotyGlobal,
  InitGlobal
} from "src/app/master/utils/global/index.global";
import glb001 from "src/app/master/config/glb000/glb001_btn";
import { FormControl, NgForm } from "@angular/forms";
import { Paginacion } from "src/app/master/utils/models/main/global/pagin.models";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-adm009",
  templateUrl: "./adm009.component.html",
  styleUrls: ["./adm009.component.css"]
})
export class Adm009Component {
  textBuscarAdm009 = new FormControl("", []);
  buscar = true;
  texto = "all_paise";
  sus: Subscription;
  numeroPag = 1;
  auxma: Adm009[];
  auxmaModal: Adm009[];
  nuevoAuxmaModal: Adm009;
  pagi: Paginacion[];
  loading = true;
  btnGrupo = glb001;
  disabled = {
    division: true,
    dependencia: true,
    codigo: true,
    descripci: true,
    sigla: true,
    estado: true
  };
  id_adm009 = "";
  contorlAccion: string = "";
  loadingSub = false;
  controlLoginModal = "";
  dependenciaAdm009: any[] = [];
  id_cod = "";
  ocultarSelect = true;

  constructor(
    private adm009S: Adm009Service,
    private notyG: NotyGlobal,
    private initG: InitGlobal
  ) {
    this.getAdm009(this.texto);
    this.textBuscarAdm009.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.getAdm009(value);
        } else {
          this.texto = "all_paise";
          this.getAdm009(this.texto);
        }
      });
  }

  getAdm009(texto: string, numePag = "1") {
    this.buscar = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_auxma") {
      this.texto = "all_paise";
      peticion = this.adm009S.geAdm009("90", numePag, this.texto);
    } else {
      this.texto = texto;
      peticion = this.adm009S.geAdm009("90", numePag, this.texto);
    }
    this.sus = peticion.subscribe(resp => {
      this.numeroPag = Number(numePag);
      this.nuevoAuxmaModal = resp.usr[0];
      if (resp["ok"]) {
        this.auxma = resp.usr[0].paises;
        this.pagi = resp["cant"];
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
      }
      this.buscar = false;
      this.loading = false;
    });
  }

  nuevoAdm009() {
    this.boolBtnGrupo(false, true);
    this.btnGrupo.BtnCance = false;
    this.boolDisabled(false);
    this.auxmaModal = [this.nuevoAuxmaModal];
    this.contorlAccion = "nuevo";
    this.initG.labels();
    this.initG.select();
  }

  OpcionesTable(adm_009: Adm009, tipo: string) {
    this.auxmaModal = [adm_009];
    this.id_cod = adm_009.codigo;
    this.cargarDependencia(adm_009.codigo);
    this.id_adm009 = adm_009.codigo;
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
        this.disabled.codigo = true;
        this.initG.select();
        break;
      case "eliminar":
        return;
      default:
        this.notyG.noty("error", "Operacion incorrecta", 5000);
        break;
    }
    this.contorlAccion = tipo;
    if (this.controlLoginModal === adm_009.codigo) {
      return;
    }
    this.controlLoginModal = adm_009.codigo;
  }

  OpcionesModal(forma: NgForm, tipo: string) {
    switch (tipo) {
      case "nuevo":
        this.contorlAccion = tipo;
        this.boolBtnGrupo(false, true);
        this.btnGrupo.BtnCance = true;
        this.dependenciaAdm009 = [];
        this.boolDisabled(false);
        forma.reset();
        this.initG.labels();
        return;
      case "editar":
        this.contorlAccion = tipo;
        this.boolDisabled(false);
        this.boolBtnGrupo(false, true);
        this.disabled.codigo = true;
        return;
      case "salir":
        this.resetDatos(forma);
        this.boolDisabled(true);
        this.dependenciaAdm009 = [];
        break;
      case "cancelar":
        this.resetDatos(forma);
        this.dependenciaAdm009 = [];
        this.cargarDependencia(this.auxmaModal[0].codigo);
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        return;
      case "guardar":
        if (forma.invalid) {
          return;
        }
        this.btnGrupo.BtnLoadi = true;
        this.btnGrupo.BtnCance = false;
        this.guardarDatos(forma.value, this.contorlAccion);
        this.initG.select();
        return;
    }
    this.boolBtnGrupo(true, true);
    this.boolBtnGrupo(false, false);
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

  paginacion(numero: string, eliminar = true) {
    const nume = Number(numero);
    if (this.numeroPag === nume && eliminar) {
      return;
    }
    const total = this.pagi.length;
    let peticion: Observable<any>;
    if (nume > 0 && nume <= total) {
      this.numeroPag = nume;
      peticion = this.adm009S.geAdm009(
        "90",
        this.numeroPag.toString(),
        this.texto
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
        peticion = this.adm009S.geAdm009(
          "90",
          this.numeroPag.toString(),
          this.texto
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
        peticion = this.adm009S.geAdm009(
          "90",
          this.numeroPag.toString(),
          this.texto
        );
      }
    }
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        this.auxma = resp.usr[0].paises;
        this.pagi = resp["cant"];
        this.nuevoAuxmaModal = resp.usr[0];
      } else {
        this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }

  resetDatos(forma: NgForm) {
    if (this.auxmaModal[0].tipo_territorio === undefined) {
      return;
    }
    forma.controls.codigo.setValue(this.auxmaModal[0].codigo);
    forma.controls.descripcion.setValue(this.auxmaModal[0].descripcion);
    forma.controls.sigla.setValue(this.auxmaModal[0].sigla);
    forma.controls.estado.setValue(this.auxmaModal[0].estado);
    this.initG.labels();
  }

  cargarDependencia(codigo: string) {
    const long = codigo.length;
    if (long === 3) {
      const dato = {
        dependencia: null,
        descripcion: "."
      };
      //  this.ocultarSelect = false;
      this.dependenciaAdm009.push(dato);
      this.initG.select();
      return;
    } else if (long === 5) {
      for (let index = 0; index < this.auxma.length; index++) {
        if (3 === this.auxma[index].codigo.length) {
          const dato = {
            dependencia: this.auxma[index].codigo,
            descripcion: this.auxma[index].descripcion
          };
          this.dependenciaAdm009.push(dato);
        }
      }
    } else if (long === 7) {
      for (let index = 0; index < this.auxma.length; index++) {
        if (5 === this.auxma[index].codigo.length) {
          const dato = {
            dependencia: this.auxma[index].codigo,
            descripcion: this.auxma[index].descripcion
          };
          this.dependenciaAdm009.push(dato);
        }
      }
    }
    //   this.ocultarSelect = true;
    this.initG.select();
  }

  cargarDependencia2(id: string, forma: NgForm) {
    this.dependenciaAdm009 = [];
    const id_terr = Number(id);
    if (id_terr === 1) {
      const dato = {
        dependencia: null,
        descripcion: "."
      };
      // this.ocultarSelect = false;
      this.dependenciaAdm009.push(dato);
      forma.controls.dependencia.setValue(
        this.dependenciaAdm009[0].dependencia
      );
      this.initG.select();
      return;
    }
    for (let index = 0; index < this.auxma.length; index++) {
      if (id_terr - 1 === this.auxma[index].tipo_territorio) {
        const dato = {
          dependencia: this.auxma[index].codigo,
          descripcion: this.auxma[index].descripcion
        };
        this.dependenciaAdm009.push(dato);
      }
    }
    forma.controls.dependencia.setValue(this.dependenciaAdm009[0].dependencia);
    // this.ocultarSelect = true;
    this.initG.select();
  }

  guardarDatos(auxModal: Adm009, contorlAccion: string) {
    let peticion: Observable<any>;
    if (contorlAccion === "nuevo") {
      peticion = this.adm009S.inAdm009(auxModal);
    } else if (contorlAccion === "editar") {
      peticion = this.adm009S.upAdm009(auxModal, this.id_cod);
    } else {
      this.notyG.noty("error", "control Accion Invalido", 2000);
    }
    this.sus = peticion.subscribe(resp => {
      this.btnGrupo.BtnLoadi = false;
      this.boolDisabled(true);
      this.boolBtnGrupo(true, false);
      if (resp["ok"]) {
        if (contorlAccion === "nuevo") {
          this.id_cod = resp["id_registro"];
        }
        this.getAdm009(this.texto, this.numeroPag.toString());
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.boolBtnGrupo(false, true);
        this.boolDisabled(false);
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  eliminarAdm006(id_cod: string) {
    let peticion: Observable<any>;
    peticion = this.adm009S.deAdm009(id_cod);
    let numPag = this.numeroPag;
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        if (this.auxma.length === 1) {
          numPag--;
        }
        this.paginacion(numPag.toString(), false);
        this.id_cod = "";
        this.notyG.noty("success", resp["mensaje"], 3000);
      } else {
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }
}
