// PORTFOLIO THUMBS SLIDER (VERTICAL)
$('#portfolio-thumbs-slider').royalSlider({
  controlNavigation: 'thumbnails',
  arrowsNav: false,
  slidesOrientation: 'horizontal',
  navigateByClick: false,
  sliderDrag: false,
  sliderTouch: false,
  numImagesToPreload: 10
});
var portfolioThumbsSlider = $(".royalSlider#portfolio-thumbs-slider").data('royalSlider');


// insert css active arrow to all thumb items
$("#portfolio-thumbs-slider .rsNavItem.rsThumb").prepend("<div class='arrow-up'><div class='arrow-up-inner'></div></div>");



// UPDATE ANIMATED IMAGES AFTER THUMBNAIL SLIDE CHANGE
portfolioThumbsSlider.ev.on('rsAfterSlideChange', function(event) {
  activateAnimationOnCurrentSlide();
});

// IF IT'S THE LAST SLIDE, GO TO NEXT THUMB ITEM
$('.rsArrowRight').off('click').on('click.custom',function(e) {
  e.preventDefault();

  if($(e.currentTarget).hasClass('rsArrowDisabled')) {
    portfolioThumbsSlider.next();
    return false; 
  } else { 
    currentContentSlider().royalSlider('next'); 
  } 
});

// GO TO PREVIOUS THUMB ITEM
$('.rsArrowLeft').off('click').on('click.custom',function(e) {
  e.preventDefault();

  if($(e.currentTarget).hasClass('rsArrowDisabled')) {
    portfolioThumbsSlider.prev();
    return false;
  } else { 
    currentContentSlider().royalSlider('prev'); 
  } 
});


// UPDATE THUMBS SLIDER (NEEDS TO BE AFTER THE CONTENT SLIDER INIT I BELIEVE)
portfolioThumbsSlider.updateSliderSize(true);

slideDragCheck();

portfolioThumbsSlider.ev.on('rsAfterSlideChange', function(event) {
  slideDragCheck();
});