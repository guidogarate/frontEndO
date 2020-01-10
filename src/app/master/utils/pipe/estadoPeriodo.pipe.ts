import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "estadoperiodo"
})
export class EstadoPeriodo implements PipeTransform {

     /*
    Pipe para cambiar texto numero a nombre segun parametros estado
  */

  transform(estado: number): string {
    switch(estado){
        case 0: 
          return 'Desbloqueado';
        case 1: 
          return 'Bloqueado';
        case 2: 
          return 'S/E';
        default:
          return ' Elige Estado';
      }
    }
}