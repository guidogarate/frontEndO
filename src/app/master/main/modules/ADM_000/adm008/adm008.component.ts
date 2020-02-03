import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { Adm008Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { Adm005 } from "src/app/master/utils/models/main/adm_000/index.models";
import { Paginacion } from "src/app/master/utils/models/main/global/pagin.models";
import { NotyGlobal } from "src/app/master/utils/global/noty.global";

@Component({
  selector: "app-adm008",
  templateUrl: "./adm008.component.html",
  styleUrls: ["./adm008.component.css"]
})
export class Adm008Component implements OnInit, OnDestroy {
  textBuscar = new FormControl("", []);
  sus: Subscription;
  texto = "all_auxma";
  numeroPag = 1;
  auxma: Adm005[];
  pagi: Paginacion[];
  loading = true;
  buscar = true;
  habiCampo = {
    editar: true,
    deshab: true,
    atras: false
  };

  constructor(private adm008S: Adm008Service, private notyG: NotyGlobal) {
    this.buscarAdm008(this.texto);
    this.textBuscar.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      if (value.length > 1) {
        this.buscarAdm008(value);
      } else {
        this.texto = "all_auxma";
        this.buscarAdm008(this.texto);
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.textBuscar = null;
  }

  buscarAdm008(texto: string) {
    this.buscar = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_auxma") {
      this.texto = "all_auxma";
      peticion = this.adm008S.buscarAdm008("90", "1", this.texto);
    } else {
      this.texto = texto;
      peticion = this.adm008S.buscarAdm008("90", "1", this.texto);
    }
    this.sus = peticion.subscribe(resp => {
      this.numeroPag = 1;
      if (resp["ok"]) {
        this.auxma = resp["usr"];
        this.pagi = resp["cant"];
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
      peticion = this.adm008S.buscarAdm008(
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
        peticion = this.adm008S.buscarAdm008(
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
        peticion = this.adm008S.buscarAdm008(
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
        // this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }

  habilitar(tipo: string) {
    if (tipo === "editar") {
      this.habiCampo.atras = true;
      this.habiCampo.editar = false;
      this.habiCampo.deshab = false;
    } else if (tipo === "atras") {
      this.habiCampo.atras = false;
      this.habiCampo.editar = true;
      this.habiCampo.deshab = true;
      for (let index = 0; index < this.auxma.length; index++) {
        this.auxma[index].estado = false;
      }
    } else {
      return;
    }
  }

  reset(str: Adm005) {
    if (str.estado) {
      this.adm008S.editaAdm008(str.login).subscribe(resp => {
        console.log(resp);
        str.estado = false;
        if (resp["ok"]) {
          this.notyG.noty("info", resp["mensaje"], 5000);
        } else {
          this.notyG.noty("error", resp["mensaje"], 5000);
          //  console.log(resp["mensaje"]);
        }
      });
    } else {
      str.estado = false;
      return;
    }
  }
}
