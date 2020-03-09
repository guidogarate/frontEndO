import { Component } from "@angular/core";
import { Paginacion } from "src/app/master/utils/models/main/global/pagin.models";
import { Adm006 } from "src/app/master/utils/models/main/adm_000/index.models";
import {
  NotyGlobal,
  InitGlobal
} from "src/app/master/utils/global/index.global";
import { Adm006Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormControl, NgForm } from "@angular/forms";
import glb001 from "src/app/master/config/glb000/glb001_btn";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: "app-adm006",
  templateUrl: "./adm006.component.html",
  styleUrls: ["./adm006.component.css"]
})
export class Adm006Component {
  textBuscarAdm006 = new FormControl("", []);
  buscar = true;
  texto = "all_auxma";
  sus: Subscription;
  numeroPag = 1;
  auxma: Adm006[];
  pagi: Paginacion[];
  loading = true;
  btnGrupo = glb001;
  disabled = {
    descripci: true,
    foto: true,
    GrupoAcce: true,
    GrupoPerf: true,
    login: true,
    TipoUsuar: true,
    TipoCodRe: true
  };
  auxmaModal: Adm006[];
  nuevoAuxmaModal: Adm006;
  loadingSub = false;
  controlLoginModal = "";
  contorlAccion: string = "";
  id_login = "";
  photoSelected: string | ArrayBuffer;
  file: File;
  eliminAdm_006: string = "";
  imgModal: string = "";

  constructor(
    private adm006S: Adm006Service,
    private notyG: NotyGlobal,
    private initG: InitGlobal
  ) {
    this.getAdm006(this.texto);
    this.textBuscarAdm006.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.getAdm006(value);
        } else {
          this.texto = "all_auxma";
          this.getAdm006(this.texto);
        }
      });
  }

  getAdm006(texto: string, numePag = "1") {
    this.buscar = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_auxma") {
      this.texto = "all_auxma";
      peticion = this.adm006S.geAdm006("90", numePag, this.texto);
    } else {
      this.texto = texto;
      peticion = this.adm006S.geAdm006("90", numePag, this.texto);
    }
    this.sus = peticion.subscribe(resp => {
      this.numeroPag = Number(numePag);
      if (resp["ok"]) {
        this.auxma = resp.usr[0].registros;
        this.pagi = resp["cant"];
        this.nuevoAuxmaModal = resp.usr[0];
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
      }
      this.buscar = false;
      this.loading = false;
    });
  }

  nuevoAdm006() {
    this.boolBtnGrupo(false, true);
    this.btnGrupo.BtnCance = false;
    this.boolDisabled(false);
    this.auxmaModal = [this.nuevoAuxmaModal];
    this.contorlAccion = "nuevo";
    this.initG.labels();
    this.initG.select();
  }

  OpcionesTable(adm_006: Adm006, tipo: string) {
    this.id_login = adm_006.login;
    switch (tipo) {
      case "visualizar":
        this.btnGrupo.BtnEdita = true;
        this.btnGrupo.BtnNuevo = true;
        this.initG.select();
        break;
      case "editar":
        this.btnGrupo.BtnCance = true;
        this.btnGrupo.BtnGuard = true;

        this.boolDisabled(false);
        this.initG.select();
        break;
      case "eliminar":
        this.eliminAdm_006 = adm_006.login;
        return;
      default:
        this.notyG.noty("error", "Operacion incorrecta", 5000);
        break;
    }
    this.contorlAccion = tipo;
    this.controlLoginModal = adm_006.login;

    this.auxmaModal = null;
    this.loadingSub = true;
    let peticion: Observable<any>;
    peticion = this.adm006S.geAdm006getUser("90", adm_006.login);
    this.sus = peticion.subscribe(resp => {
      this.loadingSub = false;
      if (resp["ok"]) {
        setTimeout(() => {
          this.initG.labels();
          this.initG.select();
        }, 10);
        this.auxmaModal = resp["usr"];
      } else {
        // this.notyG.noty("error", resp["messagge"], 5000);
      }
    });
  }

  OpcionesModal(forma: NgForm, tipo: string) {
    switch (tipo) {
      case "nuevo":
        this.contorlAccion = tipo;
        this.boolBtnGrupo(false, true);
        this.btnGrupo.BtnCance = true;
        this.boolDisabled(false);
        forma.reset();
        this.initG.labels();
        this.initG.select();
        return;
      case "editar":
        this.contorlAccion = tipo;
        this.boolDisabled(false);
        this.boolBtnGrupo(false, true);
        this.initG.select();
        return;
      case "salir":
        this.photoSelected = undefined;
        this.file = null;
        this.resetDatos(forma);
        this.boolDisabled(true);
        break;
      case "cancelar":
        this.resetDatos(forma);
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        this.initG.select();
        return;
      case "guardar":
        if (forma.invalid) {
          return;
        }
        this.btnGrupo.BtnLoadi = true;
        this.btnGrupo.BtnCance = false;
        const foto_url = this.auxmaModal[0].foto;
        this.guardarDatos(forma.value, this.file, foto_url, this.contorlAccion);
        this.initG.select();
        return;
    }
    this.boolBtnGrupo(true, true);
    this.boolBtnGrupo(false, false);
  }

  boolDisabled(bool: boolean) {
    this.disabled.descripci = bool;
    this.disabled.GrupoAcce = bool;
    this.disabled.GrupoPerf = bool;
    this.disabled.login = bool;
    this.disabled.TipoUsuar = bool;
    this.disabled.TipoCodRe = bool;
    this.disabled.foto = bool;
  }

  boolBtnGrupo(editNuevo: boolean, cancelGuardar: boolean) {
    this.btnGrupo.BtnCance = cancelGuardar;
    this.btnGrupo.BtnEdita = editNuevo;
    this.btnGrupo.BtnElimi = false;
    this.btnGrupo.BtnGuard = cancelGuardar;
    this.btnGrupo.BtnNuevo = editNuevo;
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    const extensionesValidas = ["image/png", "image/jpg", "image/jpeg"];
    const extensionArchivo = event.target.files[0].type;
    if (extensionesValidas.indexOf(extensionArchivo) === -1) {
      this.notyG.noty("error", "Formato novalido, Solo formato imagen", 5000);
      return;
    }
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    } else {
      return;
    }
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
      peticion = this.adm006S.geAdm006(
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
        peticion = this.adm006S.geAdm006(
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
        peticion = this.adm006S.geAdm006(
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

  resetDatos(forma: NgForm) {
    forma.controls.id_estado.setValue(this.auxmaModal[0].id_estado);
    forma.controls.login.setValue(this.auxmaModal[0].login);
    forma.controls.descripcion.setValue(this.auxmaModal[0].descripcion);
    forma.controls.id_grupo_acceso.setValue(this.auxmaModal[0].id_grupo_acceso);
    forma.controls.id_grupo_perfil.setValue(this.auxmaModal[0].id_grupo_perfil);
    forma.controls.id_tipo_usuario.setValue(this.auxmaModal[0].id_tipo_usuario);
    forma.controls.codigo_persona.setValue(this.auxmaModal[0].codigo_persona);

    this.photoSelected = undefined;

    this.initG.labels();
    this.initG.select();
  }

  guardarDatos(
    auxModal: Adm006,
    img: File,
    foto_url: string,
    contorlAccion: string
  ) {
    let peticion: Observable<any>;
    if (contorlAccion === "nuevo") {
      peticion = this.adm006S.inAdm006(auxModal, img);
    } else if (contorlAccion === "editar") {
      peticion = this.adm006S.upAdm006(auxModal, this.id_login, img, foto_url);
    } else {
      this.notyG.noty("error", "control Accion Invalido", 2000);
    }
    this.sus = peticion.subscribe(resp => {
      this.btnGrupo.BtnLoadi = false;
      this.boolDisabled(true);
      this.boolBtnGrupo(true, false);
      if (resp["ok"]) {
        this.getAdm006(this.texto, this.numeroPag.toString());
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.boolBtnGrupo(false, true);
        this.boolDisabled(false);
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  eliminarAdm006(login: string) {
    let peticion: Observable<any>;
    peticion = this.adm006S.deAdm006(login);
    let numPag = this.numeroPag;
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        if (this.auxma.length === 1) {
          numPag--;
        }
        this.paginacion(numPag.toString(), false);
        this.eliminAdm_006 = "";
        this.notyG.noty("success", resp["mensaje"], 3000);
      } else {
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }
}
