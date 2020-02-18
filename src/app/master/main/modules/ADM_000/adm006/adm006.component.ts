import { Component, OnInit } from "@angular/core";
import { Paginacion } from "src/app/master/utils/models/main/global/pagin.models";
import { Adm006 } from "src/app/master/utils/models/main/adm_000/index.models";
import { NotyGlobal } from "src/app/master/utils/global/noty.global";
import { Adm006Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import url from "src/app/master/config/url.config";
declare function init_select();
declare function initLabels();

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: "app-adm006",
  templateUrl: "./adm006.component.html",
  styleUrls: ["./adm006.component.css"]
})
export class Adm006Component implements OnInit {
  bienvenido: string = url.bienvenido;
  textBuscarAdm006 = new FormControl("", []);
  buscar = true;
  texto = "all_auxma";
  sus: Subscription;
  numeroPag = 1;
  auxma: Adm006[];
  pagi: Paginacion[];
  loading = true;
  btnGrupo = {
    BtnCance: false,
    BtnEdita: false,
    BtnElimi: false,
    BtnGuard: false,
    BtnNuevo: false
  };
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
  estadoUs = [
    { id: "activo", valor: 1 },
    { id: "inactivo", valor: 0 }
  ];
  contorlAccion: string = "";
  id_login = "";
  photoSelected: string | ArrayBuffer;
  file: File;
  eliminAdm_006: string = "";

  constructor(private adm006S: Adm006Service, private notyG: NotyGlobal) {
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

  ngOnInit() {}

  getAdm006(texto: string) {
    this.buscar = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_auxma") {
      this.texto = "all_auxma";
      peticion = this.adm006S.geAdm006("90", "1", this.texto);
    } else {
      this.texto = texto;
      peticion = this.adm006S.geAdm006("90", "1", this.texto);
    }
    this.sus = peticion.subscribe(resp => {
      this.numeroPag = 1;
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

  paginacion(numero: string) {
    const nume = Number(numero);
    if (this.numeroPag === nume) {
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

  OpcionesTable(adm_006: Adm006, tipo: string) {
    this.id_login = adm_006.login;
    switch (tipo) {
      case "visualizar":
        this.btnGrupo.BtnEdita = true;
        this.btnGrupo.BtnNuevo = true;
        this.initSelect();
        break;
      case "editar":
        this.btnGrupo.BtnCance = true;
        this.btnGrupo.BtnGuard = true;

        this.boolDisabled(false);
        this.initSelect();
        break;
      case "eliminar":
        this.eliminAdm_006 = adm_006.login;
        return;
        break;
      default:
        this.notyG.noty("error", "Operacion incorrecta", 5000);
        break;
    }
    this.contorlAccion = tipo;
    if (this.controlLoginModal === adm_006.login) {
      return;
    }
    this.controlLoginModal = adm_006.login;

    this.auxmaModal = null;
    this.loadingSub = true;
    let peticion: Observable<any>;
    peticion = this.adm006S.geAdm006getUser("90", adm_006.login);
    this.sus = peticion.subscribe(resp => {
      this.loadingSub = false;
      if (resp["ok"]) {
        setTimeout(() => {
          initLabels();
          init_select();
        }, 10);
        this.auxmaModal = resp["usr"];
      } else {
        // this.notyG.noty("error", resp["messagge"], 5000);
      }
    });
  }

  nuevoAdm006() {
    this.boolBtnGrupo(false, true);
    this.btnGrupo.BtnCance = false;
    this.boolDisabled(false);

    this.nuevoAuxmaModal.login = "";
    this.nuevoAuxmaModal.descripcion = "";
    this.auxmaModal = [this.nuevoAuxmaModal];
    this.contorlAccion = "nuevo";
    setTimeout(() => {
      initLabels();
    }, 5);
    this.initSelect();
  }

  eliminarAdm006(login: string) {
    let peticion: Observable<any>;
    peticion = this.adm006S.deAdm006(login);
    this.sus = peticion.subscribe(resp => {
      console.log("eliminar", resp);
      if (resp["ok"]) {
        this.getAdm006(this.texto);
        this.eliminAdm_006 = "";
        this.notyG.noty("success", resp[" mensaje"], 3000);
      } else {
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  OpcionesModal(tipo: string) {
    switch (tipo) {
      case "nuevo":
        this.contorlAccion = tipo;
        this.boolBtnGrupo(false, true);
        this.btnGrupo.BtnCance = false;
        this.boolDisabled(false);

        this.auxmaModal[0].login = "";
        this.auxmaModal[0].descripcion = "";
        this.auxmaModal[0].grupos_acceso = this.nuevoAuxmaModal.grupos_acceso;
        this.auxmaModal[0].grupos_perfil = this.nuevoAuxmaModal.grupos_perfil;
        this.auxmaModal[0].tipos_usuario = this.nuevoAuxmaModal.tipos_usuario;
        this.auxmaModal[0].personas = this.nuevoAuxmaModal.personas;

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
        this.photoSelected = undefined;
        this.file = null;
        break;
      case "guardar":
        const b: boolean = this.validandoDatos(this.auxmaModal, this.file);
        if (b) {
          this.guardarDatos(this.auxmaModal, this.file, this.contorlAccion);
        }
        this.initSelect();
        return;
    }

    this.boolBtnGrupo(true, true);
    this.boolBtnGrupo(false, false);
  }

  initSelect() {
    setTimeout(() => {
      init_select();
    }, 5);
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

  validandoDatos(auxModal: Adm006[], img: File): boolean {
    if (
      auxModal[0].id_estado !== undefined &&
      auxModal[0].id_grupo_acceso !== undefined &&
      auxModal[0].id_grupo_acceso !== undefined &&
      auxModal[0].id_tipo_usuario !== undefined &&
      auxModal[0].codigo_persona !== undefined
    ) {
      //  if (img !== undefined) {
      if (auxModal[0].login && auxModal[0].descripcion) {
        this.boolDisabled(true);
        this.boolBtnGrupo(true, false);
        return true;
      } else {
        this.notyG.noty("error", "conplete los campos de input", 3000);
        return false;
      }
      // } else {
      //   console.log("seleccione una imagen");
      //   return;
      // }
    } else {
      this.notyG.noty("error", "conplete los campos de selecccion", 3000);
      return false;
    }
  }

  guardarDatos(auxModal: Adm006[], img: File, contorlAccion: string) {
    let peticion: Observable<any>;
    if (contorlAccion === "nuevo") {
      peticion = this.adm006S.inAdm006(auxModal, img);
    } else if (contorlAccion === "editar") {
      peticion = this.adm006S.upAdm005(auxModal, this.id_login, img);
    } else {
      this.notyG.noty("error", "control Accion Invalido", 2000);
    }
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        this.getAdm006(this.texto);
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }
}
