import { Component, OnInit, OnDestroy } from "@angular/core";
import { NotyGlobal } from "src/app/master/utils/global/index.global";
import { Adm003Service } from "src/app/master/utils/service/main/modules/adm_000/index.shared.service";
import { Observable, Subscription } from "rxjs";

declare function init_table();
declare function init_check();

@Component({
  selector: "app-adm003",
  templateUrl: "./adm003.component.html",
  styleUrls: ["./adm003.component.css"]
})
export class Adm003Component implements OnInit, OnDestroy {
  buscar = true;
  loading = true;
  auxma: any[];
  sus: Subscription;
  pagi = [{ num: 1 }, { num: 2 }, { num: 3 }];
  constructor(private adm003S: Adm003Service, private notyG: NotyGlobal) {
    this.buscarAdm003("all_auxma");
    console.log(this.pagi);
  }

  ngOnInit() {}

  buscarAdm003(texto: string) {
    this.buscar = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_auxma") {
      peticion = this.adm003S.buscarAdm003("all_auxma");
    } else {
      peticion = this.adm003S.buscarAdm003(texto);
    }
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        this.auxma = resp["auxma"];
      } else {
        // this.notyG.noty("error", resp["messagge"], 5000);
      }
      this.buscar = false;
      this.loading = false;
      setTimeout(() => {
        init_check();
        init_table();
      }, 3);
    });
  }

  ngOnDestroy() {
    this.sus.unsubscribe();
  }

  siguiente() {
    console.log("siguiente");
  }
}
