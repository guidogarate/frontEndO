import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Cont003Service } from "src/app/master/utils/service/main/modules/cont_000/index.shared.service";
import {
  NotyGlobal,
  InitGlobal
} from "src/app/master/utils/global/index.global";
import {
  Paginacion,
  DataEmpresa
} from "src/app/master/utils/models/main/global/index.models";
import glb001 from "src/app/master/config/glb000/glb001_btn";
import glb002 from "src/app/master/config/glb000/glb002_start";
import { Observable, Subscription } from "rxjs";
import { Cont003 } from "src/app/master/utils/models/main/cont_000/index.models";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-cont003",
  templateUrl: "./cont003.component.html",
  styleUrls: ["./cont003.component.css"]
})
export class Cont003Component implements OnInit {
  form: FormGroup;
  btnGrupo = glb001;
  start = glb002;
  pagi: Paginacion[];
  sus: Subscription;
  auxma: Cont003[];
  auxmaModal: Cont003[];
  dataEmpres: DataEmpresa[];
  textBuscarAdm009 = new FormControl("", []);

  constructor(
    private fb: FormBuilder,
    private cont003S: Cont003Service,
    private notyG: NotyGlobal,
    private initG: InitGlobal
  ) {
    this.getCont003(this.start.startText);
    this.textBuscarAdm009.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value.length > 1) {
          this.getCont003(value);
        } else {
          this.start.startText = "all_data";
          this.getCont003(this.start.startText);
        }
      });
  }

  crearForm() {
    this.form = this.fb.group({
      descripcion: ["", [Validators.minLength(3)]],
      sigla: ["", [Validators.required]],
      estado: [""]
    });
  }

  ngOnInit() {}

  getCont003(texto: string, gst = "0") {
    this.start.startBusc = true;
    let peticion: Observable<any>;
    if (texto.length === 0 || texto === "all_data") {
      this.start.startText = "all_data";
      peticion = this.cont003S.geCont003("10", "1", gst, this.start.startText);
    } else {
      this.start.startText = texto;
      peticion = this.cont003S.geCont003("10", "1", gst, this.start.startText);
    }
    this.sus = peticion.subscribe(resp => {
      if (!this.start.startCont) {
        this.start.startCont = true;
      }
      if (this.dataEmpres === undefined) {
        this.dataEmpres = resp.usr[0].datos_empresa;
      }
      this.start.startNumP = 1;
      if (resp["ok"]) {
        this.auxma = resp.usr[0].unidades_division;
        this.pagi = resp["cant"];
      } else {
        this.notyG.noty("error", resp["messagge"], 5000);
      }
      this.start.startBusc = false;
      this.start.startLoad = false;
      this.start.startTabl = true;
      this.initG.labels();
      this.initG.select();
    });
  }

  guardarDatos() {
    if (this.form.invalid) {
      return;
    }
  }

  paginacion(numero: string, eliminar = true) {
    const nume = Number(numero);
    if (this.start.startNumP === nume && eliminar) {
      return;
    }
    const total = this.pagi.length;
    let peticion: Observable<any>;
    if (nume > 0 && nume <= total) {
      this.start.startNumP = nume;
      peticion = this.cont003S.geCont003(
        "10",
        this.start.startNumP.toString(),
        "0",
        this.start.startText
      );
    } else {
      if (numero === "000") {
        if (this.start.startNumP === 1) {
          return;
        }
        if (this.start.startNumP === 1) {
          this.start.startNumP = 1;
        } else {
          this.start.startNumP--;
        }
        peticion = this.cont003S.geCont003(
          "10",
          this.start.startNumP.toString(),
          "0",
          this.start.startText
        );
      } else if (numero === "999") {
        if (this.start.startNumP === total) {
          return;
        }
        if (this.start.startNumP === total) {
          this.start.startNumP = total;
        } else {
          this.start.startNumP++;
        }
        peticion = this.cont003S.geCont003(
          "10",
          this.start.startNumP.toString(),
          "0",
          this.start.startText
        );
      }
    }
    this.sus = peticion.subscribe(resp => {
      if (resp["ok"]) {
        this.auxma = resp.usr[0].unidades_division;
        this.pagi = resp["cant"];
        // this.nuevoAuxmaModal = resp.usr[0];
      } else {
        this.notyG.noty("error", resp["mensaje"], 5000);
      }
    });
  }
}
