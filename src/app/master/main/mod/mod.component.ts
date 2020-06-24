import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComunicacionService } from "src/app/master/utils/service/main/global/comunicacion.service";
import { Subscription } from "rxjs";

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

  filtrar(ruta: string) {
    const idMenu = this.findIdMenu(ruta);
    this.animacionFade = false;
    const len: number = this.data.length || 0;
    for (let i = 0; i < len; i++) {
      const mod = this.data[i].id_primernivel.toString();
      if (mod === idMenu) {
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

  findIdMenu(ruta: string): string {
    let idMod: string = "";
    const len: number = this.data.length || 0;
    for (let i = 0; i < len; i++) {
      const mod = this.data[i].componente.toString();
      if (mod === ruta) {
        idMod = this.data[i].id_primernivel.toString();
      }
    }
    return idMod;
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

  component(modulo: string, componente: string, glb: boolean) {
    console.log(glb);
    //  this.router.navigate(["/mod", modulo, componente]);
    if (glb) {
      this.router.navigate(["/glb", modulo, "clase"]);
    } else {
      this.router.navigate(["/mod", modulo, componente]);
    }
    this.moduCompUsuario(this.data);
  }

  moduCompUsuario(data: any) {
    console.log(JSON.parse(sessionStorage.getItem("modulo")));
  }
}
