$(document).ready(function () {
  var scroll = new SmoothScroll('[data-scroll]', {});

  new WOW().init();
  
  $('[data-toggle="tooltip"]').tooltip()
});

$(document).on("click", ".sidebar-toggler, .sidebar-overlay", function () {
  if ($(".sidebar").hasClass("active")) {
    $(".sidebar").removeClass("active");
    $("body").removeClass("sidebar-active");
  } else {
    $(".sidebar").addClass("active");
    $("body").addClass("sidebar-active");
  }
})

$(document).on("click", "[data-filter-category]", function () {
  category = $(this).data("filter-category")

  $("[data-filter-category]").removeClass("active");
  $(this).addClass("active");

  if (category == "all") {
    $(".business-card").removeClass("hidden");
  } else {
    $(".business-card").addClass("hidden");
    $(`[data-category='${category}']`).removeClass("hidden");
  }
})
