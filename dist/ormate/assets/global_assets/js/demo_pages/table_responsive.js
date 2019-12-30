function init_table() {
  if (!$().footable) {
    console.warn("Warning - footable.min.js is not loaded.");
    return;
  }

  // Initialize responsive functionality
  $(".table-togglable").footable();
}
