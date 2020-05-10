import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComunicacionService } from "src/app/master/utils/service/comunicacion/comunicacion.service";

import {
  trigger,
  style,
  transition,
  animate,
  state,
} from "@angular/animations";

@Component({
  selector: "app-mod",
  templateUrl: "./mod.component.html",
  styleUrls: ["./mod.component.css"],
  animations: [
    trigger("contenidoModulo", [
      state(
        "void",
        style({
          transform: "scale(0.5)",
          opacity: 0,
        })
      ),
      transition(":enter", [
        animate(
          1000,
          style({
            transform: "scale(1)",
            opacity: 1,
          })
        ),
      ]),
    ]),
    trigger("enterState", [
      state(
        "void",
        style({
          transform: "translateX(-100%)",
          opacity: 0,
        })
      ),
      transition(":enter", [
        animate(
          300,
          style({
            transform: "translateX(0)",
            opacity: 1,
          })
        ),
      ]),
    ]),
    // trigger("contenidoModulo", [
    //   state("show", style({ transform: "scale(0.3)" })),
    //   state("hide", style({ transform: "scale(1)" })),
    //   transition("show => hide", animate("2000ms ease-out")),
    //   transition("* => *", animate("500ms ease-in")),
    // ]),
  ],
})
export class ModComponent implements OnInit, OnDestroy {
  data: any[] = JSON.parse(sessionStorage.getItem("menu"));
  modulos: any[] = [];
  modulos2: any[] = [];
  constructor(
    route: ActivatedRoute,
    public router: Router,
    public comunicacionService: ComunicacionService
  ) {
    this.filtrar(route.snapshot.params.nivel);
  }

  ngOnInit() {
    this.comunicacionService.cambiarNivelObservable.subscribe((ruta) => {
      this.modulos = [];
      this.modulos2 = [];
      this.filtrar(ruta);
    });
  }
  ngOnDestroy() {
    this.modulos = null;
    this.modulos2 = null;
  }

  filtrar(modulo: string) {
    const len: number = this.data.length;
    for (let i = 0; i < len; i++) {
      const mod = this.data[i].id_primernivel.toString();
      if (mod === modulo) {
        this.modulos = this.data[i].modulo;
        this.modulos2 = this.data[i].modulo;
        return;
      }
    }
    this.router.navigate(["/bienvenido"]);
  }

  clickmodulo(id_segundonivel: number) {
    const len: number = this.modulos2.length;
    for (let i = 0; i < len; i++) {
      if (this.modulos2[i].id_segundonivel === id_segundonivel) {
        this.modulos = [];
        this.modulos.push(this.modulos2[i]);
      }
    }
  }

  component(submodulo: number, componente: string) {
    const segNivel = submodulo.toString();
    this.router.navigate(["/mod", segNivel, componente]);
    console.log("mod", segNivel, componente);
  }
}
