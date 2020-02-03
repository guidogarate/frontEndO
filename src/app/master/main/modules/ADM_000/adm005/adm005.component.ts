import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { Adm005Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/noty.global";
import { Adm005 } from "src/app/master/utils/models/main/adm_000/index.models";
import { Paginacion } from "src/app/master/utils/models/main/global/pagin.models";

@Component({
  selector: "app-adm005",
  templateUrl: "./adm005.component.html",
  styleUrls: ["./adm005.component.css"]
})
export class Adm005Component implements OnInit, OnDestroy {
  textBuscarAdm005 = new FormControl("", []);
  texto = "all_auxma";
  sus: Subscription;
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

  constructor(private adm005S: Adm005Service, private notyG: NotyGlobal) {
    this.buscarAdm005(this.texto);
    this.textBuscarAdm005.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.buscarAdm005(value);
        } else {
          this.texto = "all_auxma";
          this.buscarAdm005(this.texto);
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.textBuscarAdm005 = null;
  }
  buscarAdm005(texto: string) {
    this.buscar = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_auxma") {
      this.texto = "all_auxma";
      peticion = this.adm005S.buscarAdm005("90", "1", this.texto);
    } else {
      this.texto = texto;
      peticion = this.adm005S.buscarAdm005("90", "1", this.texto);
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
      peticion = this.adm005S.buscarAdm005(
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
        peticion = this.adm005S.buscarAdm005(
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
        peticion = this.adm005S.buscarAdm005(
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
      if (str.activo) {
        this.notyG.noty("error", "Usuario debe estar fuera de sesion", 5000);
        return;
      } else {
        this.adm005S.editaAdm005(str.login, str.estado).subscribe(resp => {
          str.estado = false;
          if (resp["ok"]) {
            this.buscarAdm005(this.texto);
            this.notyG.noty("info", resp["mensaje"], 5000);
          } else {
            //  console.log(resp["mensaje"]);
          }
        });
      }
    } else {
      str.estado = false;
      return;
    }
  }
}
