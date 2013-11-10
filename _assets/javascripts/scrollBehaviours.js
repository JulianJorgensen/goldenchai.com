$(document).ready(function() {

  // ALL THE VARIABLES
  var documentHeight = $(document).height();
  var windowHeight = $(window).height();
  var scrollPos;
  var scrollPosWindowPercentage;

  var scrollPercentage0_toPixels = 0;
  var scrollPercentage30_toPixels = windowHeight * 0.3;
  var scrollPercentage40_toPixels = windowHeight * 0.4;
  var scrollPercentage60_toPixels = windowHeight * 0.6;
  var scrollPercentage80_toPixels = windowHeight * 0.8;
  var scrollPercentage100_toPixels = windowHeight;
  var scrollPercentage120_toPixels = windowHeight * 1.2;
  var scrollPercentage160_toPixels = windowHeight * 1.6;
  var scrollPercentage200_toPixels = windowHeight * 2;


  var marqueeNavOne = $("#marquee .nav li:eq(0)");
  var marqueeNavTwo = $("#marquee .nav li:eq(1)");
  var marqueeNavThree = $("#marquee .nav li:eq(2)");


  // INITIALIZE THE SKROLLR. ALSO DEFINE CONSTANTS FOR ANIMATION MANUSCRIPT
  var s = skrollr.init({
    constants: {
      manifestos_start: scrollPercentage0_toPixels,
      manifestos_pre_end_start: scrollPercentage30_toPixels,
      manifestos_pre_end: scrollPercentage60_toPixels,
      manifestos_end: scrollPercentage80_toPixels,

      portfolio_pre_start: scrollPercentage80_toPixels,
      portfolio_start: scrollPercentage120_toPixels
    }
  });



  // CONTROL OF WHAT NEEDS TO GET ACTIVATED AT WHICH SCROLL POSITIONS. THIS IS THE MANUSCRIPT
  $(window).scroll(function() {
    scrollPos = $(window).scrollTop();
    scrollPosWindowPercentage = (scrollPos/windowHeight)*100;

    switch(true)
    {
      // SCROLL POSITION IS LESS THAN 33% OF WINDOW HEIGHT
      case (scrollPosWindowPercentage < 33):
        break;

      // SCROLL POSITION IS LESS THAN 66% OF WINDOW HEIGHT
      case (scrollPosWindowPercentage < 66):
        break;

      // SCROLL POSITION IS LESS THAN 100% OF WINDOW HEIGHT
      case ((scrollPosWindowPercentage >= 66) && (scrollPosWindowPercentage < 130)):
        break;

      // SCROLL POSITION IS MORE THAN 160% OF WINDOW HEIGHT
      case (scrollPosWindowPercentage >= 130):
        break;
    }

  });

});