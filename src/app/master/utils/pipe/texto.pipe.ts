import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "datos"
})
export class DatosPipe implements PipeTransform {
  transform(datos: string): any {
    if (!datos) {
      return "Sin Datos";
    } else {
      return datos;
    }
  }
}
