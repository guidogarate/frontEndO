import { Component, OnInit, OnDestroy } from "@angular/core";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
import { Adm003Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { Observable, Subscription } from "rxjs";
import { Adm003Models } from "src/app/master/utils/models/main/adm_000/adm_003.models";
import { Adm003SubModels } from "src/app/master/utils/models/main/adm_000/adm_003sub.models";
declare function initLabels();

@Component({
  selector: "app-adm003",
  templateUrl: "./adm003.component.html",
  styleUrls: ["./adm003.component.css"]
})
export class Adm003Component implements OnInit, OnDestroy {
  buscar = true;
  loading = true;
  loadingSub = false;
  auxma: any[];
  auxmaSub: any[];
  sus: Subscription;
  pagi: any[];
  numeroPag = 1;
  texto = "all_auxma";
  habiCampo = {
    GrupHab: false,
    SubGrupHab: false
  };
  btnGrupo = {
    BtnGuard: false,
    BtnEdita: true,
    BtnElimi: true,
    BtnAgreg: true
  };
  btnSubGrupo = {
    BtnSubGuard: false,
    BtnSubEdita: true,
    BtnSubElimi: true,
    BtnSubAgreg: true
  };
  amd003: Adm003Models = new Adm003Models("1", "1", true, "1");
  amd003Sub: Adm003SubModels = new Adm003SubModels(
    "1",
    "1",
    "1",
    "1",
    true,
    true
  );

  constructor(private adm003S: Adm003Service, private notyG: NotyGlobal) {
    this.buscarAdm003(this.texto);
  }

  ngOnInit() {
    setTimeout(() => {
      initLabels();
    }, 1000);
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

  ngOnDestroy() {
    this.sus.unsubscribe();
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
        console.log(this.auxmaSub.length);
      } else {
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

  edtGr() {
    this.habiCampo.GrupHab = true;

    this.btnGrupo.BtnGuard = true;
    this.btnGrupo.BtnEdita = false;
    this.btnGrupo.BtnElimi = false;
    this.btnGrupo.BtnAgreg = false;
    this.btnSubGrupo.BtnSubEdita = false;
    this.btnSubGrupo.BtnSubElimi = false;
    this.btnSubGrupo.BtnSubAgreg = false;
  }
  guardGr() {
    this.habiCampo.GrupHab = false;

    this.btnGrupo.BtnGuard = false;
    this.btnGrupo.BtnEdita = true;
    this.btnGrupo.BtnElimi = true;
    this.btnGrupo.BtnAgreg = true;
    this.btnSubGrupo.BtnSubEdita = true;
    this.btnSubGrupo.BtnSubElimi = true;
    this.btnSubGrupo.BtnSubAgreg = true;
    // console.log(this.amd003);
  }

  nuevoSubGr() {
    const data = {
      adamidea: "",
      adamdesc: "",
      adamsigl: "",
      adamsecu: "",
      adamesta: false,
      adampred: false
    };
    this.auxmaSub.push(data);
    this.habiCampo.SubGrupHab = true;
    setTimeout(() => {
      initLabels();
    }, 5);
    console.log(this.auxmaSub);
  }

  edtSubGr() {
    this.habiCampo.SubGrupHab = true;
    this.btnSubGrupo.BtnSubGuard = true;

    this.btnGrupo.BtnEdita = false;
    this.btnGrupo.BtnElimi = false;
    this.btnGrupo.BtnAgreg = false;
    this.btnSubGrupo.BtnSubEdita = false;
    this.btnSubGrupo.BtnSubElimi = false;
    this.btnSubGrupo.BtnSubAgreg = false;
  }

  guardSubGr() {
    this.habiCampo.SubGrupHab = false;
    this.btnSubGrupo.BtnSubGuard = false;

    this.btnGrupo.BtnEdita = true;
    this.btnGrupo.BtnElimi = true;
    this.btnGrupo.BtnAgreg = true;
    this.btnSubGrupo.BtnSubEdita = true;
    this.btnSubGrupo.BtnSubElimi = true;
    this.btnSubGrupo.BtnSubAgreg = true;
    console.log(this.auxmaSub);
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
