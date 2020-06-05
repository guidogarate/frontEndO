import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComunicacionService } from "src/app/master/utils/service/main/global/comunicacion.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-mod",
  templateUrl: "./mod.component.html",
  styleUrls: ["./mod.component.css"],
})
export class ModComponent implements OnInit, OnDestroy {
  data: any[] = JSON.parse(sessionStorage.getItem("menu"));
  modulos: any[] = [];
  modulos2: any[] = [];
  numeroMod: number = -1;
  animacionFade = true;
  animacionUp = false;
  sus: Subscription;

  constructor(
    route: ActivatedRoute,
    public router: Router,
    public comunicacionService: ComunicacionService
  ) {
    this.filtrar(route.snapshot.params.nivel);
    console.log(this.data);
  }

  ngOnInit() {
    this.sus = this.comunicacionService.cambiarNivelObservable.subscribe(
      (ruta) => {
        this.modulos = [];
        this.modulos2 = [];
        this.filtrar(ruta);
        this.numeroMod = -1;
      }
    );
  }

  ngOnDestroy() {
    this.modulos = null;
    this.modulos2 = null;
    this.numeroMod = null;
    this.animacionFade = null;
    this.animacionUp = null;
    this.sus.unsubscribe();
  }

  filtrar(modulo: string) {
    this.animacionFade = false;
    const len: number = this.data.length || 0;
    for (let i = 0; i < len; i++) {
      const mod = this.data[i].id_primernivel.toString();
      if (mod === modulo) {
        this.modulos = this.data[i].modulo;
        setTimeout(() => {
          this.animacionFade = true;
        }, 20);
        this.modulos2 = this.data[i].modulo;
        if (this.modulos2 === undefined) {
          return;
        }
        for (let i = 0; i < this.modulos2.length; i++) {
          this.modulos2[i].animacion = false;
        }
        let time: number = 20;
        for (let i = 0; i < this.modulos2.length; i++) {
          setTimeout(() => {
            this.modulos2[i].animacion = true;
          }, (time += 100));
        }
        return;
      }
    }
    this.router.navigate(["/bienvenido"]);
  }

  clickmodulo(id_segundonivel: number) {
    this.animacionFade = false;
    const len: number = this.modulos2.length || 0;
    for (let i = 0; i < len; i++) {
      if (this.modulos2[i].id_segundonivel === id_segundonivel) {
        this.modulos = [];
        this.numeroMod = i;
        this.modulos.push(this.modulos2[i]);
        setTimeout(() => {
          this.animacionFade = true;
        }, 20);
      }
    }
  }

  component(submodulo: number, componente: string) {
    const segNivel = submodulo.toString();

    this.router.navigate(["/mod", segNivel, componente]);
    // console.log("mod", segNivel, componente);
  }
}
