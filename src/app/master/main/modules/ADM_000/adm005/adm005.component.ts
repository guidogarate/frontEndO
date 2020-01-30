import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Adm005Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { NotyGlobal } from "src/app/master/utils/global/noty.global";

@Component({
  selector: "app-adm005",
  templateUrl: "./adm005.component.html",
  styleUrls: ["./adm005.component.css"]
})
export class Adm005Component implements OnInit {
  texto = "all_auxma";
  sus: Subscription;
  numeroPag = 1;
  auxma: any[];
  pagi: any[];
  loading = true;

  constructor(private adm005S: Adm005Service, private notyG: NotyGlobal) {
    this.buscarAdm003(this.texto);
  }

  ngOnInit() {}

  buscarAdm003(texto: string) {
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_auxma") {
      this.texto = "all_auxma";
      peticion = this.adm005S.buscarAdm005("90", "1", this.texto);
    } else {
      this.texto = texto;
      peticion = this.adm005S.buscarAdm005("90", "1", this.texto);
    }
    this.sus = peticion.subscribe(resp => {
      console.log(resp);
      this.numeroPag = 1;
      if (resp["ok"]) {
        this.auxma = resp["usr"];
        this.pagi = resp["cant"];
      } else {
        // this.notyG.noty("error", resp["mensaje"], 5000);
      }
      // this.buscar = false;
      this.loading = false;
    });
  }
}
