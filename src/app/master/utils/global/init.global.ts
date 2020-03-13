import { Injectable } from "@angular/core";
declare function init_select();
declare function initLabels();
declare function init_uniform();

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
  uniform() {
    setTimeout(() => {
      init_uniform();
    }, 5);
  }
}
