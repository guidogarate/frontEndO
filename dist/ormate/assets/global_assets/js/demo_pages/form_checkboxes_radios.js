/* ------------------------------------------------------------------------------
 *
 *  # Checkboxes and radios
 *
 *  Demo JS code for form_checkboxes_radios.html page
 *
 * ---------------------------------------------------------------------------- */

// Setup module
// ------------------------------

//
// Setup components
//
function init_check() {
  // Switchery
  if (typeof Switchery == "undefined") {
    console.warn("Warning - switchery.min.js is not loaded.");
    return;
  }
  // // Initialize multiple switches
  var elems = Array.prototype.slice.call(
    document.querySelectorAll(".form-check-input-switchery")
  );
  elems.forEach(function(html) {
    var switchery = new Switchery(html);
  });
  // Colored switches
  var primary = document.querySelector(".form-check-input-switchery-primary");
  if (primary != null) {
    var switchery = new Switchery(primary, { color: "#2196F3" });
  }
  var danger = document.querySelector(".form-check-input-switchery-danger");
  if (danger != null) {
    var switchery = new Switchery(danger, { color: "#EF5350" });
  }
  var warning = document.querySelector(".form-check-input-switchery-warning");
  if (warning != null) {
    var switchery = new Switchery(warning, { color: "#FF7043" });
  }
  var info = document.querySelector(".form-check-input-switchery-info");
  if (info != null) {
    var switchery = new Switchery(info, { color: "#00BCD4" });
  }
}
