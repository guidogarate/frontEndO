import { Injectable } from "@angular/core";
declare function init_select();
declare function initLabels();

@Injectable()
export class InitGlobal {
  labels() {
    setTimeout(() => {
      initLabels();
    }, 5);
  }
  select() {
    setTimeout(() => {
      init_select();
    }, 5);
  }
}
