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
  Validators,
  NgForm
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
  auxmaModal: Adm011[];
  nuevoAuxmaModal: Adm011;
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
  gestion = "0";
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
      this.nuevoAuxmaModal = this.auxma = resp.data[0].clase_documentos[0];
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

  // getAdm0111(texto: string, numePag = "1") {
  //   this.buscar = true;
  //   let peticion: Observable<any>;
  //   if (texto.length === 0 || texto === "all_data") {
  //     this.texto = "all_data";
  //     peticion = this.adm011S.getAdm011(
  //       "90",
  //       numePag,
  //       this.idModulo,
  //       this.texto
  //     );
  //     console.log(peticion);
  //   } else {
  //     this.texto = texto;
  //     peticion = this.adm011S.getAdm011(
  //       "90",
  //       numePag,
  //       this.idModulo,
  //       this.texto
  //     );
  //   }
  //   this.sus = peticion.subscribe(resp => {
  //     this.numeroPag = Number(numePag);
  //     this.nuevoAuxmaModal = this.auxma = resp.data[0].clase_documentos[0];
  //     console.log("nuevo aux modal : ", this.nuevoAuxmaModal);
  //     if (resp["ok"]) {
  //       this.auxma = resp.data[0].clase_documentos;
  //       this.ListModulos = resp.data[0].modulos;
  //       console.log(this.auxma);
  //       this.initG.labels();
  //       this.initG.select();
  //       this.pagi = resp["cant"];
  //     } else {
  //       this.notyG.noty("error", resp["messagge"], 5000);
  //     }
  //     this.buscar = false;
  //     this.loading = false;
  //   });
  // }

  crearFormulario() {
    this.forma = this.fb.group({
      idModulo: ["", [Validators.required]],
      nombre_modulo: ["", [Validators.required]],
      sigla: ["", [Validators.required]],
      checkauto: [""],
      descripcion: ["", [Validators.required]],
      id_documento: ["", [Validators.required]],
      component: [""],
      estado: ["", [Validators.required]]
    });
  }

  nuevoAdm011() {
    this.boolBtnGrupo(false, true);
    this.btnGrupo.BtnCance = false;
    this.boolDisabled(false);
    this.auxmaModal = [this.nuevoAuxmaModal];
    this.contorlAccion = "nuevo";
    this.initG.labels();
    this.initG.select();
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

  // añadir metodos

  OpcionesTable(adm_011: Adm011, tipo: string) {
    this.auxmaModal = [adm_011];
    // this.id_cod = adm_011.codigo;
    // this.cargarDependencia(adm_011.codigo);
    // this.id_adm011 = adm_011.codigo;
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
    if (this.controlLoginModal === "" + adm_011.id_Modulo) {
      return;
    }
    this.controlLoginModal = "" + adm_011.id_Modulo;
  }

  // OpcionesModal(forma: NgForm, tipo: string) {
  //   switch (tipo) {
  //     case "nuevo":
  //       this.contorlAccion = tipo;
  //       this.boolBtnGrupo(false, true);
  //       this.btnGrupo.BtnCance = true;
  //       this.boolDisabled(false);
  //       forma.reset();
  //       this.initG.labels();
  //       return;
  //     case "editar":
  //       this.contorlAccion = tipo;
  //       this.boolDisabled(false);
  //       this.boolBtnGrupo(false, true);
  //       this.disabled.codigo = true;
  //       return;
  //     case "salir":
  //       this.resetDatos(forma);
  //       this.boolDisabled(true);
  //       this.dependenciaAdm011 = [];
  //       break;
  //     case "cancelar":
  //       this.resetDatos(forma);
  //       this.boolDisabled(true);
  //       this.boolBtnGrupo(true, false);
  //       return;
  //     case "guardar":
  //       if (forma.invalid) {
  //         return;
  //       }
  //       this.btnGrupo.BtnLoadi = true;
  //       this.btnGrupo.BtnCance = false;
  //       this.guardarDatos(forma.value, this.contorlAccion);
  //       this.initG.select();
  //       return;
  //   }
  //   this.boolBtnGrupo(true, true);
  //   this.boolBtnGrupo(false, false);
  // }

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
        this.nuevoAuxmaModal = resp.data[0].clase_documentos[0];
      } else {
        this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }

  // resetDatos(forma: NgForm) {
  //   if (this.auxmaModal[0].id_documento === undefined) {
  //     return;
  //   }
  //   forma.controls.tipo_territorio.setValue(this.auxmaModal[0].tipo_territorio);
  //   forma.controls.dependencia.setValue(this.auxmaModal[0].dependencia);
  //   forma.controls.codigo.setValue(this.auxmaModal[0].codigo);
  //   forma.controls.descripcion.setValue(this.auxmaModal[0].descripcion);
  //   forma.controls.sigla.setValue(this.auxmaModal[0].sigla);
  //   forma.controls.estado.setValue(this.auxmaModal[0].estado);
  //   this.cargarDependencia2(
  //     this.auxmaModal[0].tipo_territorio.toString(),
  //     forma
  //   );
  //   this.initG.labels();
  // }

  // cargarDependencia(codigo: string) {
  //   const long = codigo.length;
  //   if (long === 3) {
  //     const dato = {
  //       dependencia: null,
  //       descripcion: "null"
  //     };
  //     this.dependenciaAdm011.push(dato);
  //     this.initG.select();
  //     return;
  //   } else if (long === 5) {
  //     for (let index = 0; index < this.auxma.length; index++) {
  //       if (3 === this.auxma[index].codigo.length) {
  //         const dato = {
  //           dependencia: this.auxma[index].codigo,
  //           descripcion: this.auxma[index].descripcion
  //         };
  //         this.dependenciaAdm011.push(dato);
  //       }
  //     }
  //   } else if (long === 7) {
  //     for (let index = 0; index < this.auxma.length; index++) {
  //       if (5 === this.auxma[index].codigo.length) {
  //         const dato = {
  //           dependencia: this.auxma[index].codigo,
  //           descripcion: this.auxma[index].descripcion
  //         };
  //         this.dependenciaAdm011.push(dato);
  //       }
  //     }
  //   }
  //   this.initG.select();
  // }

  // cargarDependencia2(id: string, forma: NgForm) {
  //   this.dependenciaAdm011 = [];
  //   const id_terr = Number(id);
  //   if (id_terr === 1) {
  //     const dato = {
  //       dependencia: null,
  //       descripcion: "null"
  //     };
  //     this.dependenciaAdm011.push(dato);
  //     forma.controls.dependencia.setValue(
  //       this.dependenciaAdm011[0].dependencia
  //     );
  //     this.initG.select();
  //     return;
  //   }
  //   for (let index = 0; index < this.auxma.length; index++) {
  //     if (id_terr - 1 === this.auxma[index].tipo_territorio) {
  //       const dato = {
  //         dependencia: this.auxma[index].codigo,
  //         descripcion: this.auxma[index].descripcion
  //       };
  //       this.dependenciaAdm011.push(dato);
  //     }
  //   }
  //   forma.controls.dependencia.setValue(this.dependenciaAdm011[0].dependencia);
  //   this.initG.select();
  // }

  // guardarDatos(auxModal: Adm011, contorlAccion: string) {
  //   let peticion: Observable<any>;
  //   if (contorlAccion === "nuevo") {
  //     peticion = this.adm011S.inAdm011(auxModal);
  //   } else if (contorlAccion === "editar") {
  //     peticion = this.adm011S.upAdm011(auxModal, this.id_cod);
  //   } else {
  //     this.notyG.noty("error", "control Accion Invalido", 2000);
  //   }
  //   this.sus = peticion.subscribe(resp => {
  //     this.btnGrupo.BtnLoadi = false;
  //     this.boolDisabled(true);
  //     this.boolBtnGrupo(true, false);
  //     if (resp["ok"]) {
  //       if (contorlAccion === "nuevo") {
  //         this.id_cod = resp["id_registro"];
  //       }
  //       this.getAdm011(this.texto, this.numeroPag.toString());
  //       this.notyG.noty("success", resp["mensaje"], 1000);
  //     } else {
  //       this.boolBtnGrupo(false, true);
  //       this.boolDisabled(false);
  //       this.notyG.noty("error", resp["mensaje"], 3000);
  //     }
  //   });
  // }

  // eliminarAdm006(id_cod: string) {
  //   let peticion: Observable<any>;
  //   peticion = this.adm011S.deAdm011(id_cod);
  //   let numPag = this.numeroPag;
  //   this.sus = peticion.subscribe(resp => {
  //     if (resp["ok"]) {
  //       if (this.auxma.length === 1) {
  //         numPag--;
  //       }
  //       this.paginacion(numPag.toString(), false);
  //       this.id_cod = "";
  //       this.notyG.noty("success", resp["mensaje"], 3000);
  //     } else {
  //       this.notyG.noty("error", resp["mensaje"], 3000);
  //     }
  //   });
  // }
}
