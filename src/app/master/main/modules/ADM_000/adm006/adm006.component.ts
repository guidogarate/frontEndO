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
    BtnGuard: false,
    BtnCance: false,
    BtnEdita: false,
    BtnElimi: false
  };
  auxmaModal: Adm006[];

  constructor(private adm006S: Adm006Service, private notyG: NotyGlobal) {
    this.texto = "TEST2";
    this.getAdm006(this.texto);
    this.textBuscarAdm006.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.getAdm006(value);
        } else {
          // this.texto = "all_auxma";
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
        this.auxma = resp["usr"];
        this.pagi = resp["cant"];
        console.log(this.auxma);
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
        this.auxma = resp["auxma"];
        this.pagi = resp["cant"];
      } else {
        // this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }

  Opciones(adm_006: Adm006, tipo: string) {
    setTimeout(() => {
      init_select();
    }, 10);
    this.auxmaModal = this.auxma;
    console.log(adm_006);
    console.log(this.auxmaModal);
    console.log(tipo);
  }
}
