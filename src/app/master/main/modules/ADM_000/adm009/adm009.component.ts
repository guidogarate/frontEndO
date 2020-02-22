import { Component, OnInit } from "@angular/core";
import { Adm009 } from "src/app/master/utils/models/main/adm_000/index.models";
import { Adm009Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/noty.global";
import glb001 from "src/app/master/config/glb000/glb001_btn";
import { FormControl } from "@angular/forms";
import { Paginacion } from "src/app/master/utils/models/main/global/pagin.models";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

declare function init_select();
declare function initLabels();

@Component({
  selector: "app-adm009",
  templateUrl: "./adm009.component.html",
  styleUrls: ["./adm009.component.css"]
})
export class Adm009Component implements OnInit {
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
    sigla: true
  };
  id_adm009 = "";
  contorlAccion: string = "";
  loadingSub = false;
  controlLoginModal = "";

  initSelect() {
    setTimeout(() => {
      init_select();
    }, 5);
  }

  initLabels() {
    setTimeout(() => {
      initLabels();
    }, 5);
  }

  constructor(private adm009S: Adm009Service, private notyG: NotyGlobal) {
    this.getAdm006(this.texto);
    this.textBuscarAdm009.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.getAdm006(value);
        } else {
          this.texto = "all_paise";
          this.getAdm006(this.texto);
        }
      });
  }

  ngOnInit() {}

  getAdm006(texto: string) {
    this.buscar = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_auxma") {
      this.texto = "all_paise";
      peticion = this.adm009S.geAdm009("90", "1", this.texto);
    } else {
      this.texto = texto;
      peticion = this.adm009S.geAdm009("90", "1", this.texto);
    }
    this.sus = peticion.subscribe(resp => {
      console.log(resp);
      this.numeroPag = 1;
      if (resp["ok"]) {
        this.auxma = resp.usr[0].paises;
        this.pagi = resp["cant"];
        this.nuevoAuxmaModal = resp.usr[0];
        console.log(this.nuevoAuxmaModal);
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

    // this.nuevoAuxmaModal.login = "";
    // this.nuevoAuxmaModal.descripcion = "";
    this.auxmaModal = [this.nuevoAuxmaModal];
    this.contorlAccion = "nuevo";
    setTimeout(() => {
      initLabels();
    }, 5);
    this.initSelect();
  }

  OpcionesTable(adm_009: Adm009, tipo: string) {
    this.auxmaModal = [adm_009];
    console.log(this.auxmaModal);
    this.id_adm009 = adm_009.codigo;
    switch (tipo) {
      case "visualizar":
        this.btnGrupo.BtnEdita = true;
        this.btnGrupo.BtnNuevo = true;
        this.initSelect();
        this.initLabels();
        break;
      case "editar":
        this.btnGrupo.BtnCance = true;
        this.btnGrupo.BtnGuard = true;

        this.boolDisabled(false);
        this.initSelect();
        break;
      case "eliminar":
        //    this.eliminAdm_006 = adm_006.login;
        return;
        break;
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

  OpcionesModal(tipo: string) {
    switch (tipo) {
      case "nuevo":
        this.contorlAccion = tipo;
        this.boolBtnGrupo(false, true);
        this.btnGrupo.BtnCance = false;
        this.boolDisabled(false);

        // poner campos vacios
        // this.auxmaModal[0].login = "";
        // this.auxmaModal[0].descripcion = "";
        // this.auxmaModal[0].grupos_acceso = this.nuevoAuxmaModal.grupos_acceso;
        // this.auxmaModal[0].grupos_perfil = this.nuevoAuxmaModal.grupos_perfil;
        // this.auxmaModal[0].tipos_usuario = this.nuevoAuxmaModal.tipos_usuario;
        // this.auxmaModal[0].personas = this.nuevoAuxmaModal.personas;

        this.initSelect();
        return;
      case "editar":
        this.contorlAccion = tipo;
        this.boolDisabled(false);
        this.boolBtnGrupo(false, true);
        this.initSelect();
        return;
      case "cancelar":
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        this.initSelect();
        return;
      case "salir":
        break;
      case "guardar":
        //  const b: boolean = this.validandoDatos(this.auxmaModal, this.file);
        //  if (b) {
        //   this.guardarDatos(this.auxmaModal, this.file, this.contorlAccion);
        //  }
        this.initSelect();
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
  }

  boolBtnGrupo(editNuevo: boolean, cancelGuardar: boolean) {
    this.btnGrupo.BtnCance = cancelGuardar;
    this.btnGrupo.BtnEdita = editNuevo;
    this.btnGrupo.BtnElimi = false;
    this.btnGrupo.BtnGuard = cancelGuardar;
    this.btnGrupo.BtnNuevo = editNuevo;
  }

  paginacion(numero: string) {
    const nume = Number(numero);
    if (this.numeroPag === nume) {
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
        this.auxma = resp.usr[0].registros;
        this.pagi = resp["cant"];
        this.nuevoAuxmaModal = resp.usr[0];
      } else {
        // this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }
}
