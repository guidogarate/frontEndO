function init_perfect_scrollbar() {
  if (typeof PerfectScrollbar == "undefined") {
    console.warn("Warning - perfect_scrollbar.min.js is not loaded.");
    return;
  }

  // Initialize
  var ps = new PerfectScrollbar(".sidebar-fixed .sidebar-content", {
    wheelSpeed: 2,
    wheelPropagation: true
  });
}
