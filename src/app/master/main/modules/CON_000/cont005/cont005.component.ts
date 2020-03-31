import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";
import glb002 from "src/app/master/config/glb000/glb002_start";
import { Cont005Service } from "src/app/master/utils/service/main/modules/cont_000/index.shared.service";
import * as glb from "src/app/master/utils/global/index.global";
import { debounceTime } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { Paginacion } from "src/app/master/utils/models/main/global/index.models";
import {
  Cont005,
  Cont005Sel
} from "src/app/master/utils/models/main/cont_000/index.models";

@Component({
  selector: "app-cont005",
  templateUrl: "./cont005.component.html",
  styleUrls: ["./cont005.component.css"]
})
export class Cont005Component implements OnInit {
  textBuscarCont005 = new FormControl("", []);
  start = glb002;
  table = false;
  sus: Subscription;
  auxma: Cont005[];
  pagi: Paginacion[];
  /* con005 */
  selectMod: Cont005Sel[];

  constructor(
    private cont005S: Cont005Service,
    private fb: FormBuilder,
    private notyG: glb.NotyGlobal,
    private initG: glb.InitGlobal
  ) {
    this.getCont005(this.start.Texto);
    this.textBuscarCont005.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.getCont005(value, "1");
        } else {
          this.start.Texto = "all_data";
          this.getCont005(this.start.Texto, "1");
        }
      });
  }

  ngOnInit() {}

  getCont005(texto: string, numePag = "1", mod = "0") {
    this.start.Busca = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.Texto = "all_data";
      peticion = this.cont005S.geCont005("10", numePag, mod, this.start.Texto);
    } else {
      this.start.Texto = texto;
      peticion = this.cont005S.geCont005("10", numePag, mod, this.start.Texto);
    }
    this.sus = peticion.subscribe(resp => {
      console.log(resp);
      if (!this.start.Conte) {
        this.start.Conte = true;
      }
      this.start.NumPa = Number(numePag);
      if (resp["ok"]) {
        this.auxma = resp.data[0].tipos_comprobantes;
        this.selectMod = resp.data[0].modulos;
        this.pagi = resp["cant"];
        this.table = false;
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
        this.auxma = [];
        this.pagi = [];
        this.table = true;
      }
      this.start.Busca = false;
      this.start.Loadi = false;
      this.start.Table = true;
      this.initG.select();
    });
  }
}
