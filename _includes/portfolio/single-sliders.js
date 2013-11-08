// PORTFOLIO CONTENT SLIDERS (HORIZONTAL)
$('.portfolio-content-slider').royalSlider({
  controlNavigation: 'none',
  autoScaleSlider: true,
  controlsInside: false,
  navigateByClick: false,
  arrowsNavAutoHide: false,
  autoHeight: true,
  numImagesToPreload: 10
});

// UPDATE ANIMATED IMAGES AFTER CONTENT SLIDE CHANGE
$(".portfolio-content-slider").each(function(n){
  var str = "portfolioContentSlider" + n;
  str = $(this).data('royalSlider');

  str.ev.on('rsAfterSlideChange', function(event) {
    activateAnimationOnCurrentSlide();
  });
});