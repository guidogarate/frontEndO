import { Injectable } from "@angular/core";
// src="assets/global_assets/js/demo_pages/form_select2.js"
declare function init_select();
// src="assets/global_assets/js/demo_pages/form_floating_labels.js"
declare function initLabels();
// src="assets/global_assets/js/demo_pages/layout_fixed_sidebar_custom.js"
declare function init_perfect_scrollbar();
// src="assets/assets/js/app.js"
declare function init_app();
// src="assets/global_assets/js/demo_pages/uniform.js"
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

  app() {
    setTimeout(() => {
      init_app();
    }, 5);
  }

  scroll() {
    setTimeout(() => {
      init_perfect_scrollbar();
    }, 5);
  }

  uniform() {
    setTimeout(() => {
      init_uniform();
    }, 5);
  }
}
