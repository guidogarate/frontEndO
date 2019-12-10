import * as Noty from "src/assets/global_assets/js/plugins/notifications/noty.min.js";
import { Injectable } from "@angular/core";

@Injectable()
export class NotyGlobal {
  noty(tipo: string, mensaje: string, time: number) {
    new Noty({
      text: mensaje,
      theme: "limitless",
      progressBar: true,
      timeout: time,
      type: tipo,
      layout: "bottomRight",
      closeWith: ["button"]
    }).show();
    return true;
  }
}
