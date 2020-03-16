import { Component } from "@angular/core";
import {
  Adm011,
  Adm011Select
} from "src/app/master/utils/models/main/adm_000/index.models";
import { Adm011Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import {
  NotyGlobal,
  InitGlobal
} from "src/app/master/utils/global/index.global";
import glb001 from "src/app/master/config/glb000/glb001_btn";
import glb002 from "src/app/master/config/glb000/glb002_start";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Paginacion } from "src/app/master/utils/models/main/global/pagin.models";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
@Component({
  selector: "app-adm011",
  templateUrl: "./adm011.component.html",
  styleUrls: ["./adm011.component.css"]
})
export class Adm011Component {
  textBuscarAdm011 = new FormControl("", []);
  // buscar = true;
  // texto = "all_data";
  sus: Subscription;
  numeroPag = 1;
  auxma: Adm011[];
  auxmaModal: Adm011;
  // nuevoAuxmaModal: Adm011;
  pagi: Paginacion[];
  loading = true;
  btnGrupo = glb001;
  start = glb002;
  disabled = {
    division: true,
    dependencia: true,
    codigo: true,
    descripci: true,
    sigla: true,
    estado: true
  };
  id_adm011 = "";
  contorlAccion: string = "";
  loadingSub = false;
  controlLoginModal = "";
  dependenciaAdm011: any[] = [];
  // TODO: new variables
  id_cod = "";
  idModulo = 10;
  ListDocumentos: any = [];
  ListModulos: any = [];

  // new variables
  forma: FormGroup;
  table = false;
  // gestion = "0";
  ocultarSelect = true;
  mostrarCheck = false;
  placeholdeAuto = "auto";
  insertar = "fall";
  selectModulo: Adm011Select;

  constructor(
    private adm011S: Adm011Service,
    private fb: FormBuilder,
    private notyG: NotyGlobal,
    private initG: InitGlobal
  ) {
    this.getAdm011(this.start.Texto);
    this.crearFormulario();
    this.textBuscarAdm011.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.getAdm011(value, "1");
        } else {
          this.start.Texto = "all_data";
          this.getAdm011(this.start.Texto);
        }
      });
  }

  getAdm011(texto: string, numePag = "1") {
    this.start.Busca = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.Texto = "all_data";
      peticion = this.adm011S.getAdm011(
        "90",
        numePag,
        this.idModulo,
        this.start.Texto
      );
    } else {
      this.start.Texto = texto;
      peticion = this.adm011S.getAdm011(
        "90",
        numePag,
        this.idModulo,
        this.start.Texto
      );
    }
    this.sus = peticion.subscribe(resp => {
      // this.gestion = resp.usr[0].datos_empresa[0].gestiones[0].gestion;
      if (!this.start.Conte) {
        this.start.Conte = true;
      }
      this.start.NumPa = Number(numePag);
      this.auxma = resp.data[0].clase_documentos[0];
      if (resp["ok"]) {
        this.auxma = resp.data[0].clase_documentos;
        console.log("auxma: ", this.auxma);
        // this.nuevoAuxmaModal = this.auxma = resp.data[0].clase_documentos[0];
        this.ListModulos = resp.data[0].modulos;
        console.log(this.auxma);
        this.initG.labels();
        this.initG.select();
        this.pagi = resp["cant"];
        this.table = false;
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
        this.ListModulos = [];
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

  crearFormulario() {
    this.forma = this.fb.group({
      idModulo: ["", [Validators.required]],
      nombre_modulo: ["", [Validators.required]],
      sigla: ["", [Validators.required]],
      checkauto: [""],
      descripcion: ["", [Validators.required]],
      id_documento: ["", [Validators.required]],
      componente: [""],
      estado: ["", [Validators.required]]
    });
  }

  // nuevoAdm011() {
  //   this.boolBtnGrupo(false, true);
  //   this.btnGrupo.BtnCance = false;
  //   this.boolDisabled(false);
  //   this.auxmaModal = [this.nuevoAuxmaModal];
  //   this.contorlAccion = "nuevo";
  //   this.initG.labels();
  //   this.initG.select();
  // }

  // añadir metodos

  paginacion(numero: string, eliminar = true) {
    const nume = Number(numero);
    if (this.numeroPag === nume && eliminar) {
      return;
    }
    const total = this.pagi.length;
    let peticion: Observable<any>;
    if (nume > 0 && nume <= total) {
      this.numeroPag = nume;
      peticion = this.adm011S.getAdm011(
        "90",
        this.numeroPag.toString(),
        this.idModulo,
        this.start.Texto
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
        peticion = this.adm011S.getAdm011(
          "90",
          this.numeroPag.toString(),
          this.idModulo,
          this.start.Texto
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
        peticion = this.adm011S.getAdm011(
          "90",
          this.numeroPag.toString(),
          this.idModulo,
          this.start.Texto
        );
      }
    }
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        this.auxma = resp.data[0].clase_documentos;
        this.pagi = resp["cant"];
        // this.auxma = resp.data[0].clase_documentos[0];
      } else {
        this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }

  nuevoAdm011() {
    this.boolBtnGrupo(false, true);
    this.btnGrupo.BtnCance = false;
    this.boolDisabled(false);
    // this.dependenciaAdm011 = [];
    this.forma.reset({ estado: false, checkauto: true });
    this.start.CtrAc = "nuevo";
    this.ocultarSelect = false;
    this.mostrarCheck = true;
    this.forma.get("id_documento").setValue("auto");
    this.forma.get("id_documento").disable();
    this.initG.uniform();
    this.initG.labels();
    this.initG.select();
  }

  OpcionesTable(adm_011: Adm011, tipo: string) {
    this.auxmaModal = adm_011;
    this.forma.reset(this.auxmaModal);
    // this.cargarDependencia(adm_011.idunidaddivision);
    this.start.IdCod = adm_011.id_documento;
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

        // this.forma.get("estado").disable();
        // this.forma.get("descripcion").disable();
        // this.forma.get("sigla").disable();
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
        if (this.insertar === "exito") {
          this.boolDisabled(true);
          this.boolBtnGrupo(true, false);
          return;
        }
        this.start.CtrAc = tipo;
        this.boolBtnGrupo(false, true);
        this.btnGrupo.BtnCance = true;
        this.dependenciaAdm011 = [];
        this.forma.reset({ estado: false, checkauto: true }); // resetea todo a null y estado a false
        this.boolDisabled(false);
        // this.cargarDependencia2("1");
        this.mostrarCheck = true;
        this.forma.get("id_documento").setValue("auto");
        this.forma.get("id_documento").disable();
        this.initG.uniform();
        this.initG.labels();
        return;
      case "editar":
        this.start.CtrAc = tipo;
        this.boolDisabled(false);
        this.boolBtnGrupo(false, true);
        this.forma.get("id_documento").disable();
        this.forma.get("sigla").disable();
        this.forma.get("checkauto").disable();
        this.forma.get("descripcion").disable();
        this.forma.get("componente").disable();
        return;
      case "salir":
        this.insertar = "fall";
        this.placeholdeAuto = "auto";
        this.resetDatos();
        this.boolDisabled(true);
        // this.dependenciaAdm011 = [];
        break;
      case "cancelar":
        console.log(this.start.CtrAc);
        if (this.insertar === "exito") {
          this.boolDisabled(true);
          this.boolBtnGrupo(true, false);
          return;
        }
        this.placeholdeAuto = "auto";
        this.resetDatos();
        this.dependenciaAdm011 = [];
        // this.cargarDependencia(this.auxmaModal.idunidaddivision);
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
      this.forma.get("nombre_modulo").disable();
      this.forma.get("checkauto").disable();
      this.forma.get("estado").disable();
      this.forma.get("id_documento").disable();
      this.forma.get("descripcion").disable();
      this.forma.get("sigla").disable();
      this.forma.get("componente").disable();
    } else {
      this.forma.get("nombre_modulo").enable();
      this.forma.get("checkauto").enable();
      this.forma.get("estado").enable();
      this.forma.get("id_documento").enable();
      this.forma.get("descripcion").enable();
      this.forma.get("sigla").enable();
      this.forma.get("componente").enable();

      // this.forma.get("idunidaddivision").enable();
      // this.forma.get("descripcion").enable();
      // this.forma.get("sigla").enable();
      // this.forma.get("division").enable();
      // this.forma.get("dependencia").enable();
      // this.forma.get("estado").enable();
    }
    this.initG.labels();
    this.initG.select();
  }

  // 11
  boolBtnGrupo(editNuevo: boolean, cancelGuardar: boolean) {
    this.btnGrupo.BtnCance = cancelGuardar;
    this.btnGrupo.BtnEdita = editNuevo;
    this.btnGrupo.BtnElimi = false;
    this.btnGrupo.BtnGuard = cancelGuardar;
    this.btnGrupo.BtnNuevo = editNuevo;
  }

  resetDatos() {
    this.forma.reset(this.auxmaModal);
    this.initG.labels();
    this.initG.select();
  }

  habilitarAuto() {
    if (this.forma.get("checkauto").value) {
      this.forma.get("id_documento").enable();
      this.forma.get("id_documento").setValue("");
      this.placeholdeAuto = "introducir codigo";
    } else {
      this.forma.get("id_documento").setValue("auto");
      this.forma.get("id_documento").disable();
      this.placeholdeAuto = "auto";
    }
    this.initG.labels();
  }

  // Adm011Selectgest(gestion: string) {
  //   this.gestion = gestion;
  //   this.getAdm011("all_data", "1", gestion);
  // }

  guardarDatos(adm_011: Adm011, contorlAccion: string) {
    let peticion: Observable<any>;
    if (contorlAccion === "nuevo") {
      peticion = this.adm011S.inAdm011(adm_011);
    } else if (contorlAccion === "editar") {
      peticion = this.adm011S.upAdm011(
        adm_011,
        this.idModulo,
        adm_011.id_documento
      );
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
          this.insertar = "exito";
          // para que, cuando le de x, resetee el valor que
          // se ha insertado recientemente entonces vamos a opcionModal en editar
        }
        this.getAdm011(this.start.Texto, this.start.NumPa.toString());
        this.notyG.noty("success", resp["mensaje"], 1000);
      } else {
        this.boolBtnGrupo(false, true);
        this.boolDisabled(false);
        this.notyG.noty("error", resp["mensaje"], 3000);
      }
    });
  }

  eliminarCont003(adm011: Adm011) {
    let peticion: Observable<any>;
    peticion = this.adm011S.delAdm011(adm011.id_Modulo, adm011.id_documento);
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
