function init_uniform() {
  if (!$().uniform) {
    console.warn("Warning - uniform.min.js is not loaded.");
    return;
  }
  $(".form-input-styled").uniform();
}
