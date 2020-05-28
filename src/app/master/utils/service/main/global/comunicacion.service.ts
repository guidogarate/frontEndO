import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ComunicacionService {
  ruta: string;
  private cambiarNivelSubject = new Subject<string>();
  cambiarNivelObservable = this.cambiarNivelSubject.asObservable();

  constructor() {}

  cambiarNivel(ruta: string) {
    this.ruta = ruta;
    this.cambiarNivelSubject.next(ruta);
  }
}
