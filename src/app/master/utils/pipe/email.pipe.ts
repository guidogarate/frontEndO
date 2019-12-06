import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "emailpipe"
})
export class EmailPipe implements PipeTransform {
  transform(email: string): any {
    if (!email) {
      return "Sin Email";
    } else {
      return email;
    }
  }
}
