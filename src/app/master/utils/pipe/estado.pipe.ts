import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "estado"
})
export class Estado implements PipeTransform {

     /*
    Pipe para cambiar texto numero a nombre segun parametros estado
  */

  transform(estado: number): string {
    switch(estado){
        case 0: 
          return 'Elige Estado';
        case 1: 
          return 'Desbloqueado';
        case 2: 
          return 'Bloqueado';
        default:
          return 'S/E';
      }
    }
}