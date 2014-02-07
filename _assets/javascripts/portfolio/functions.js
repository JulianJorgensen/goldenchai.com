function currentContentSlider()
{
  return $("#portfolio-thumbs-slider > .rsOverflow > .rsContainer > .rsSlide:eq(" + portfolioThumbsSlider.currSlide.id + ") .royalSlider");
}

function matrixToArray(matrix) {
    return matrix.substr(7, matrix.length - 8).split(', ');
}

function hideLastArrowNav(){
  var lastSlider = $("#portfolio-thumbs-slider > .rsOverflow > .rsContainer > .rsSlide:last-child .royalSlider").data('royalSlider');

  if ((portfolioThumbsSlider.currSlideId+1) == portfolioThumbsSlider.numSlides) // it's the last slide item in the thumbs slider
  {
    if ((lastSlider.currSlideId+1) == lastSlider.numSlides)
    {
      $(".rsArrowRight").addClass("rsHide");
    }else{
      $(".rsArrowRight").removeClass("rsHide");
    }
  }
}

function slideDragCheck()
{
  var currSlider = currentContentSlider().data('royalSlider');
  currSlider.updateSliderSize(true);
  currSlider.updateSliderSize();

  // slide drag release trigger
  currSlider.ev.on('rsBeforeAnimStart', function(event) {
    hideLastArrowNav();
  });

  // slide drag release trigger
  currSlider.ev.on('rsDragRelease', function(event) {

    slideDragPosArray = matrixToArray(currentContentSlider().find(".rsContainer").css("-webkit-transform"));
    slideDragPos = parseInt(slideDragPosArray[4]);
    currentSlidePos = parseInt(currSlider.currSlide.holder.css("left").replace("px", ""));
    posDiff = (slideDragPos + currentSlidePos);

    if (!$("body").hasClass("royalslider-is-sliding"))
    {
      $("body").addClass("royalslider-is-sliding");

      // console.log("slidedragpos: " + slideDragPos + " and currentSlidePos: " + currentSlidePos);
      if (posDiff < 0) // it's a next drag
      {
        if (((currSlider.currSlideId+1) == currSlider.numSlides) && (portfolioThumbsSlider.currSlideId+1 != portfolioThumbsSlider.numSlides))
        {
          portfolioThumbsSlider.next();
        }
      }else{ // it's a prev drag
        if ((currSlider.currSlideId == 0) && (portfolioThumbsSlider.currSlideId != 0))
        {
          portfolioThumbsSlider.prev();
        }
      }

      setTimeout(function(){
        $("body").removeClass("royalslider-is-sliding");
      }, 500);
    }
  });
}