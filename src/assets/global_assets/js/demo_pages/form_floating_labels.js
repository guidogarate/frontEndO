function initLabels() {
  //
  // Setup module components
  //

  // Floating labels config

  // Variables
  var showClass = "is-visible",
    animateClass = "animate",
    labelWrapperClass = "form-group-float",
    labelClass = "form-group-float-label";

  // Setup
  $(
    "input:not(.token-input):not(.bootstrap-tagsinput > input), textarea, select"
  )
    .on("checkval change", function() {
      // Define label
      var label = $(this)
        .parents("." + labelWrapperClass)
        .children("." + labelClass);

      // Toggle label
      if (this.value !== "") {
        label.addClass(showClass);
      } else {
        label.removeClass(showClass).addClass(animateClass);
      }
    })
    .on("keyup", function() {
      $(this).trigger("checkval");
    })
    .trigger("checkval")
    .trigger("change");

  // Remove animation on page load
  $(window).on("load", function() {
    $("." + labelWrapperClass)
      .find("." + showClass)
      .removeClass(animateClass);
  });
}
