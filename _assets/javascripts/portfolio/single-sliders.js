// PORTFOLIO CONTENT SLIDERS (HORIZONTAL)
$('.portfolio-content-slider').royalSlider({
  controlNavigation: 'none',
  controlsInside: false,
  navigateByClick: false,
  globalCaption: true,
  arrowsNavAutoHide: false,
  numImagesToPreload: 10
});

// UPDATE ANIMATED IMAGES AFTER CONTENT SLIDE CHANGE
$(".portfolio-content-slider").each(function(n){
  var contentSlider = "portfolioContentSlider" + n;
  contentSlider = $(this).data('royalSlider');

  contentSlider.ev.on('rsAfterSlideChange', function(event) {
    activateAnimationOnCurrentSlide();
  });

});


function activateAnimationOnCurrentSlide()
{
  var currSlider;
  var slider;

  if ($("#portfolio-thumbs-slider").length > 0)
  {
    currSlider = currentContentSlider().data('royalSlider');
    slider = currentContentSlider().find(".rsContainer .rsSlide:eq(" + currSlider.currSlideId + ")");
  }else{
    slider = $(".portfolio-content-slider");
  }

  if (slider.find(".delay-1").length > 0)
  {
    setTimeout(function(){
      slider.find(".delay-1").addClass("active");
    }, 1000);
  }

  if (slider.find(".delay-2").length > 0)
  {
    setTimeout(function(){
      slider.find(".delay-2").addClass("active");
    }, 3000);
  }

  if (slider.find(".delay-3").length > 0)
  {
    setTimeout(function(){
      slider.find(".delay-3").addClass("active");
    }, 4500);
  }

  if (slider.find(".delay-4").length > 0)
  {
    setTimeout(function(){
      slider.find(".delay-4").addClass("active");
    }, 6000);
  }
}