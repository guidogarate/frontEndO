import { Component, OnInit } from "@angular/core";
import { Paginacion } from "src/app/master/utils/models/main/global/pagin.models";
import { Adm006 } from "src/app/master/utils/models/main/adm_000/index.models";
import { NotyGlobal } from "src/app/master/utils/global/noty.global";
import { Adm006Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-adm006",
  templateUrl: "./adm006.component.html",
  styleUrls: ["./adm006.component.css"]
})
export class Adm006Component implements OnInit {
  textBuscarAdm006 = new FormControl("", []);
  buscar = true;
  texto = "all_auxma";
  sus: Subscription;
  numeroPag = 1;
  auxma: Adm006[];
  pagi: Paginacion[];
  loading = true;

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
      console.log(resp);
      this.numeroPag = 1;
      if (resp["ok"]) {
        this.auxma = resp["auxma"];
        this.pagi = resp["cant"];
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
      }
      this.buscar = false;
      this.loading = false;
    });
  }
}
