import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nombremes"
})
export class NombreMes implements PipeTransform {

     /*
    Pipe para cambiar texto numero a nombre segun paramtros mes
  */

  transform(numeromes: number): string {
    
    switch(numeromes){
        case 0: 
          return 'Periodo Inicial';
        case 1: 
          return 'Enero';
        case 2: 
          return 'Febrero';
        case 3: 
          return 'Marzo';
        case 4: 
          return 'Abril';
        case 5: 
          return 'Mayo';
        case 6: 
          return 'Junio';
        case 7: 
          return 'Julio';
        case 8: 
          return 'Agosto';
        case 9: 
          return 'Septiembre';
        case 10: 
          return 'Octubre';
        case 11: 
          return 'Noviembre';
        case 12: 
          return 'Diciembre';
        case 13: 
          return 'Cierre';
        default:
          return 'S/M';
      }
    }
}