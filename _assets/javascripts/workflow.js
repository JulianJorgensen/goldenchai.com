$(document).ready(function() {

  // PORTFOLIO CONTENT SLIDERS (HORIZONTAL)
  $('#workflow-slider').royalSlider({
    controlsInside: false,
    navigateByClick: false,
    globalCaption: true,
    arrowsNavAutoHide: false,
    numImagesToPreload: 10
  });

  setTimeout(function(){
    $("#workflow-slider .twentytwenty-container").twentytwenty({default_offset_pct: 0.7});
  }, 400);


  $("[data-activate-slide-popup]").click(function(e){
    var popup = $(this).attr("data-activate-slide-popup");
    $("#" + popup).addClass("active");

    e.preventDefault();
  });

  $("[data-close-popup]").click(function(e){
    $(".slide-popup").removeClass("active");

    e.preventDefault();
  });

});