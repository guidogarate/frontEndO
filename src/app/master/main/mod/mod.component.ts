import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComunicacionService } from "src/app/master/utils/service/comunicacion/comunicacion.service";

@Component({
  selector: "app-mod",
  templateUrl: "./mod.component.html",
  styleUrls: ["./mod.component.css"],
})
export class ModComponent implements OnInit, OnDestroy {
  data: any[] = JSON.parse(sessionStorage.getItem("menu"));
  datas: any[] = [];
  titulo: string = "";
  constructor(
    route: ActivatedRoute,
    public router: Router,
    public comunicacionService: ComunicacionService
  ) {
    this.filtrar(route.snapshot.params.nivel);
  }

  ngOnInit() {
    this.comunicacionService.cambiarNivelObservable.subscribe((ruta) => {
      this.datas = [];
      this.filtrar(ruta);
    });
  }
  ngOnDestroy() {
    this.datas = null;
    console.log(this.datas);
  }

  filtrar(modulo: string) {
    const len: number = this.data.length;
    for (let i = 0; i < len; i++) {
      const mod = this.data[i].id_primernivel.toString();
      if (mod === modulo) {
        this.titulo = this.data[i].descripcion;
        this.datas.push(this.data[i].modulo);
        return;
      }
    }
    this.router.navigate(["/bienvenido"]);
  }

  component(submodulo: number, componente: string) {
    const segNivel = submodulo.toString();
    this.router.navigate(["/mod", segNivel, componente]);
    console.log("mod", segNivel, componente);
  }
}
