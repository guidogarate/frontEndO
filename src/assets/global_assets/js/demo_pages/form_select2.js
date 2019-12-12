/* ------------------------------------------------------------------------------
 *
 *  # Select2 selects
 *
 *  Specific JS code additions for form_select2.html page
 *
 * ---------------------------------------------------------------------------- */

// Setup module
// ------------------------------
function init_select() {
  //
  // Setup module components
  //

  // // Select2 examples
  // if (!$().select2) {
  //   console.warn("Warning - select2.min.js is not loaded.");
  //   return;
  // }

  // //
  // // Basic examples selectpicker()
  // //
  // $(".select").select2({
  //   minimumResultsForSearch: Infinity,
  //   allowClear: false
  // });
  // // Format icon
  // function iconFormat(icon) {
  //   var originalOption = icon.element;
  //   if (!icon.id) {
  //     return icon.text;
  //   }
  //   var $icon =
  //     '<i class="icon-' + $(icon.element).data("icon") + '"></i>' + icon.text;

  //   return $icon;
  // }

  // // // Initialize with options
  // $(".select-icons").select2({
  //   templateResult: iconFormat,
  //   allowClear: false,
  //   minimumResultsForSearch: Infinity,
  //   templateSelection: iconFormat,
  //   escapeMarkup: function(m) {
  //     return m;
  //   }
  // });

  /***select boostrap */
  // Uniform
  if (!$().selectpicker) {
    console.warn("Warning - selectpicker.min.js is not loaded.");
    return;
  }

  // // Default initialization
  // $(".selectpicker").selectpicker("setStyle", "btn-danger");
  $(".selectpicker").selectpicker("refresh");
  $(".selectpicker").selectpicker();
}
