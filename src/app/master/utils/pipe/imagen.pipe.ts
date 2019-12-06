import { Pipe, PipeTransform } from "@angular/core";
import url from "src/app/master/config/url.config";

@Pipe({
  name: "imagenpipe"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = "usuario"): any {
    if (!img) {
      return url.fotoDefecto;
    }
    if (img.indexOf("https") >= 0) {
      return img;
    }
  }
}
