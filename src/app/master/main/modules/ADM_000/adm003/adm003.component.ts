import { Component, OnInit, OnDestroy } from "@angular/core";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
import { Adm003Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { Observable, Subscription } from "rxjs";
import { Adm003Models } from "src/app/master/utils/models/main/adm_000/adm_003.models";
declare function initLabels();

@Component({
  selector: "app-adm003",
  templateUrl: "./adm003.component.html",
  styleUrls: ["./adm003.component.css"]
})
export class Adm003Component implements OnInit, OnDestroy {
  // this.amd003 ==== Grupo
  // this.auxmaSub==== SubGrupo
  buscar = true;
  loading = true;
  loadingSub = false;
  auxma: any[];
  auxmaSub: any[];
  sus: Subscription;
  pagi: any[];
  numeroPag = 1;
  texto = "all_auxma";
  accionSubGrupo = "";
  accionGrupo = "";
  guardar = true;
  habiCampo = {
    GrupHab: false,
    SubGrupHab: false,
    ElimSubGru: false,
    codigo: false
  };
  btnGrupo = {
    BtnGuard: false,
    BtnCance: false,
    BtnEdita: true,
    BtnElimi: true,
    BtnAgreg: true
  };
  btnSubGrupo = {
    BtnSubGuard: false,
    BtnSubCance: false,
    BtnSubEdita: true,
    BtnSubElimi: true,
    BtnSubAgreg: true
  };
  amd003: Adm003Models = new Adm003Models("1", "1", true, "1");

  constructor(private adm003S: Adm003Service, private notyG: NotyGlobal) {
    this.buscarAdm003(this.texto);
  }

  ngOnInit() {
    setTimeout(() => {
      initLabels();
    }, 1000);
  }
  ngOnDestroy() {
    this.sus.unsubscribe();
  }

  buscarAdm003(texto: string) {
    this.buscar = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_auxma") {
      this.texto = "all_auxma";
      peticion = this.adm003S.buscarAdm003("90", "1", this.texto);
    } else {
      this.texto = texto;
      peticion = this.adm003S.buscarAdm003("90", "1", this.texto);
    }
    this.sus = peticion.subscribe(resp => {
      this.numeroPag = 1;
      if (resp["ok"]) {
        this.auxma = resp["auxma"];
        this.pagi = resp["cant"];
      } else {
        // this.notyG.noty("error", resp["messagge"], 5000);
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
      peticion = this.adm003S.buscarAdm003(
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
        peticion = this.adm003S.buscarAdm003(
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
        peticion = this.adm003S.buscarAdm003(
          "90",
          this.numeroPag.toString(),
          this.texto
        );
      }
    }
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        this.auxma = resp["auxma"];
        this.pagi = resp["cant"];
      } else {
        // this.notyG.noty("error", resp["messagge"], 5000);
      }
    });
  }

  // mostrar datos subGrupo
  actualizar(adm_003: Adm003Models) {
    this.amd003 = adm_003;
    let peticion: Observable<any>;
    if (this.auxmaSub === undefined) {
      this.loadingSub = true;
      peticion = this.adm003S.buscarAdm003Sub(adm_003.adamtipa);
    } else if (adm_003.adamtipa === this.auxmaSub[0].adamtipa) {
      return;
    } else {
      this.auxmaSub = [];
      this.loadingSub = true;
      peticion = this.adm003S.buscarAdm003Sub(adm_003.adamtipa);
    }
    peticion.subscribe(resp => {
      this.loadingSub = false;
      if (resp["ok"]) {
        this.auxmaSub = resp["auxma"];
      } else {
        this.auxmaSub = [];
        // this.notyG.noty("error", resp["messagge"], 5000);
      }
      setTimeout(() => {
        initLabels();
      }, 5);
    });
  }

  actualizarSubGrupo(adm_003: Adm003Models) {
    this.amd003 = adm_003;
    let peticion: Observable<any>;
    if (this.auxmaSub === undefined) {
      peticion = this.adm003S.buscarAdm003Sub(adm_003.adamtipa);
    } else if (adm_003.adamtipa === this.auxmaSub[0].adamtipa) {
      return;
    } else {
      // this.auxmaSub = [];
      peticion = this.adm003S.buscarAdm003Sub(adm_003.adamtipa);
    }
    peticion.subscribe(resp => {
      if (resp["ok"]) {
        this.auxmaSub = resp["auxma"];
      } else {
        this.auxmaSub = [];
        // this.notyG.noty("error", resp["messagge"], 5000);
      }
      setTimeout(() => {
        initLabels();
      }, 5);
    });
  }

  myFunction() {
    console.log("doble click");
  }

  Grup(accion: string) {
    switch (accion) {
      case "nuevo":
        this.accionGrupo = accion;
        console.log("nuevo");

        break;
      case "cancelar":
        this.habiCampo.ElimSubGru = false;
        this.habiCampo.codigo = false;

        this.habiCampo.SubGrupHab = false;
        this.btnSubGrupo.BtnSubGuard = false;

        this.btnGrupo.BtnEdita = true;
        this.btnGrupo.BtnElimi = true;
        this.btnGrupo.BtnAgreg = true;
        this.btnSubGrupo.BtnSubEdita = true;
        this.btnSubGrupo.BtnSubElimi = true;
        this.btnSubGrupo.BtnSubAgreg = true;
        this.btnSubGrupo.BtnSubCance = false;

        this.accionGrupo = "";
        break;
      case "guardar":
        this.habiCampo.GrupHab = false;

        this.btnGrupo.BtnGuard = false;
        this.btnGrupo.BtnEdita = true;
        this.btnGrupo.BtnElimi = true;
        this.btnGrupo.BtnAgreg = true;
        this.btnSubGrupo.BtnSubEdita = true;
        this.btnSubGrupo.BtnSubElimi = true;
        this.btnSubGrupo.BtnSubAgreg = true;

        this.AccionGrup(this.accionGrupo, this.amd003);
        // console.log(this.amd003);
        break;
      case "editar":
        this.habiCampo.GrupHab = true;

        this.btnGrupo.BtnGuard = true;
        this.btnGrupo.BtnEdita = false;
        this.btnGrupo.BtnElimi = false;
        this.btnGrupo.BtnAgreg = false;
        this.btnSubGrupo.BtnSubEdita = false;
        this.btnSubGrupo.BtnSubElimi = false;
        this.btnSubGrupo.BtnSubAgreg = false;

        this.accionGrupo = accion;
        break;
      case "eliminar":
        console.log("eliminar");
        this.accionGrupo = accion;
        break;
      default:
      // console.log("accion incorrecta");
    }
  }

  AccionGrup(accion: string, datos: any) {
    switch (accion) {
      case "editar":
        this.editElemGrup(datos);
        this.accionSubGrupo = "";
        break;
      default:
      // code block
    }
  }

  nuevElemGrup(datos: any) {
    console.log("nuevo");

    // this.adm003S
    //   .nuevoAdm003Sub("90", this.amd003.adamtipa, datos)
    //   .subscribe(resp => {
    //     this.actualizarSubGrupo(this.amd003);
    //     if (resp["ok"]) {
    //       this.notyG.noty("success", resp["mensaje"], 3000);
    //     } else {
    //       this.notyG.noty("info", resp["mensaje"], 5000);
    //     }
    //   });
  }

  editElemGrup(datos: any) {
    this.adm003S.editarAdm003("90", datos.adamtipa, datos).subscribe(resp => {
      console.log(resp);
      if (resp["ok"]) {
        this.notyG.noty("success", resp["mensaje"], 3000);
        this.actualizarSubGrupo(this.amd003);
      } else {
        // this.notyG.noty("info", resp["mensaje"], 3000);
      }
    });
  }

  // this.amd003 ==== Grupo
  // this.auxmaSub==== SubGrupo
  elimElemGrup() {
    if (this.auxmaSub.length > 0) {
      this.notyG.noty("info", "Primero debe eliminar SubGrupo", 3000);
      return;
    }
    const resp = confirm(
      "Desea eliminar elemento seleccionado? \n Codigo: " + this.amd003.adamtipa
    );
    if (resp) {
      this.adm003S
        .eliminarAdm003Ambos("90", this.amd003.adamtipa, "0")
        .subscribe(resp => {
          if (resp["ok"]) {
            this.notyG.noty("success", resp["mensaje"], 3000);
            this.amd003 = new Adm003Models("", "", true, "");
            this.buscarAdm003("all_auxma");
            // this.actualizarSubGrupo(this.amd003);
          } else {
            // this.notyG.noty("info", resp["mensaje"], 3000);
          }
        });
    } else {
      return;
    }
  }

  SubGrup(accion: string) {
    switch (accion) {
      case "nuevo":
        const data = {
          adamidea: "",
          adamdesc: "",
          adamsigl: "",
          adamsecu: "",
          adamesta: false,
          adampred: false
        };
        if (this.auxmaSub === undefined) {
          this.auxmaSub = [];
        }
        this.auxmaSub.push(data);
        this.habiCampo.SubGrupHab = true;
        setTimeout(() => {
          initLabels();
        }, 5);
        this.habiCampo.ElimSubGru = false;
        this.habiCampo.codigo = true;

        this.habiCampo.SubGrupHab = true;
        this.btnSubGrupo.BtnSubGuard = true;

        this.btnGrupo.BtnEdita = false;
        this.btnGrupo.BtnElimi = false;
        this.btnGrupo.BtnAgreg = false;
        this.btnSubGrupo.BtnSubEdita = false;
        this.btnSubGrupo.BtnSubElimi = false;
        this.btnSubGrupo.BtnSubAgreg = false;

        this.accionSubGrupo = accion;
        break;
      case "cancelar":
        this.habiCampo.ElimSubGru = false;
        this.habiCampo.codigo = false;

        this.habiCampo.SubGrupHab = false;
        this.btnSubGrupo.BtnSubGuard = false;

        this.btnGrupo.BtnEdita = true;
        this.btnGrupo.BtnElimi = true;
        this.btnGrupo.BtnAgreg = true;
        this.btnSubGrupo.BtnSubEdita = true;
        this.btnSubGrupo.BtnSubElimi = true;
        this.btnSubGrupo.BtnSubAgreg = true;
        this.btnSubGrupo.BtnSubCance = false;

        this.accionSubGrupo = "";

        break;
      case "guardar":
        this.AccionSubGrup(this.accionSubGrupo, this.auxmaSub);
        if (this.guardar) {
          this.habiCampo.ElimSubGru = false;
          this.habiCampo.codigo = false;

          this.habiCampo.SubGrupHab = false;
          this.btnSubGrupo.BtnSubGuard = false;

          this.btnGrupo.BtnEdita = true;
          this.btnGrupo.BtnElimi = true;
          this.btnGrupo.BtnAgreg = true;
          this.btnSubGrupo.BtnSubEdita = true;
          this.btnSubGrupo.BtnSubElimi = true;
          this.btnSubGrupo.BtnSubAgreg = true;
          this.btnSubGrupo.BtnSubCance = false;

          // console.log(this.auxmaSub);
        } else {
          return;
        }
        break;
      case "editar":
        this.habiCampo.SubGrupHab = true;
        this.btnSubGrupo.BtnSubGuard = true;

        this.btnGrupo.BtnEdita = false;
        this.btnGrupo.BtnElimi = false;
        this.btnGrupo.BtnAgreg = false;
        this.btnSubGrupo.BtnSubEdita = false;
        this.btnSubGrupo.BtnSubElimi = false;
        this.btnSubGrupo.BtnSubAgreg = false;
        this.btnSubGrupo.BtnSubCance = true;

        this.accionSubGrupo = accion;
        break;
      case "eliminar":
        this.btnSubGrupo.BtnSubGuard = true;

        this.habiCampo.ElimSubGru = true;
        this.btnGrupo.BtnEdita = false;
        this.btnGrupo.BtnElimi = false;
        this.btnGrupo.BtnAgreg = false;
        this.btnSubGrupo.BtnSubEdita = false;
        this.btnSubGrupo.BtnSubElimi = false;
        this.btnSubGrupo.BtnSubAgreg = false;

        this.accionSubGrupo = accion;
        break;
      default:
    }
  }

  AccionSubGrup(accion: string, datos: any) {
    switch (accion) {
      case "nuevo":
        this.nuevElemSub(datos);
        break;
      case "editar":
        this.editElemSub(datos);
        break;
      default:
    }
  }

  nuevElemSub(datos: any) {
    if (
      datos[datos.length - 1].adamidea === "" ||
      datos[datos.length - 1].adamdesc === "" ||
      datos[datos.length - 1].adamsigl === "" ||
      datos[datos.length - 1].adamsecu === ""
    ) {
      this.notyG.noty("info", "Complete datos correctamente", 3000);
      this.guardar = false;
      return;
    } else {
      this.adm003S
        .nuevoAdm003Sub("90", this.amd003.adamtipa, datos)
        .subscribe(resp => {
          this.actualizarSubGrupo(this.amd003);
          if (resp["ok"]) {
            this.notyG.noty("success", resp["mensaje"], 3000);
            this.guardar = true;
            this.accionSubGrupo = "";
          } else {
            this.notyG.noty("info", resp["mensaje"], 5000);
          }
        });
    }
  }

  editElemSub(datos: any) {
    this.adm003S
      .editarAdm003Sub("90", this.amd003.adamtipa, datos)
      .subscribe(resp => {
        this.accionSubGrupo = "";
        if (resp["ok"]) {
          this.notyG.noty("success", resp["mensaje"], 3000);
          this.actualizarSubGrupo(this.amd003);
        } else {
          // this.notyG.noty("info", resp["mensaje"], 3000);
        }
      });
  }

  elimElemSub(idelmen: string) {
    const resp = confirm(
      "Desea eliminar elemento seleccionado? \n codigo: " + idelmen
    );
    if (resp) {
      this.adm003S
        .eliminarAdm003Ambos("90", this.amd003.adamtipa, idelmen)
        .subscribe(resp => {
          if (resp["ok"]) {
            this.notyG.noty("success", resp["mensaje"], 3000);
            this.actualizarSubGrupo(this.amd003);
          } else {
            // this.notyG.noty("info", resp["mensaje"], 3000);
          }
        });
    } else {
      return;
    }
  }

  salir() {
    this.btnGrupo.BtnGuard = false;
    this.btnGrupo.BtnEdita = true;
    this.btnGrupo.BtnElimi = true;
    this.btnGrupo.BtnAgreg = true;
    this.btnSubGrupo.BtnSubGuard = false;
    this.btnSubGrupo.BtnSubEdita = true;
    this.btnSubGrupo.BtnSubElimi = true;
    this.btnSubGrupo.BtnSubAgreg = true;
    this.habiCampo.SubGrupHab = false;
    this.habiCampo.SubGrupHab = false;
  }
}
