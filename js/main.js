$(document).ready(function () {
  var scroll = new SmoothScroll('[data-scroll]', {});

  new WOW().init();
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

  $("[data-filter-category]").removeClass("bold");
  $(this).addClass("bold");

  if (category == "all") {
    $(".business-card").removeClass("hidden");
  } else {
    $(".business-card").addClass("hidden");
    $(`[data-category='${category}']`).removeClass("hidden");
  }
})
