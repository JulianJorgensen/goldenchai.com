$(document).ready(function() {

  // variables
  var windowHeight;
  var windowWidth;
  var documentHeight = $(document).height();
  var refreshSkrollr = true;



  // INITIALIZE THE SKROLLR. ALSO DEFINE CONSTANTS FOR ANIMATION MANUSCRIPT
  var s = skrollr.init();



  // setTimeout(function(){
  //   $("body").addClass("desktop");
  //   $("body").removeClass("mobile");
  // }, 1000);

  // setTimeout(function(){
  //   skrollrStylesheets.refresh();
  //   s.refresh();
  // }, 2000);


  // ON WINDOW RESIZE: APPLY MOBILE CLASS FOR SMALL SCREENS, AND DESKTOP FOR LARGER
  $( window ).resize(function() {
    updateSite(refreshSkrollr);
  });



  // $("body").addClass('mobile');
  // skrollrStylesheets.refresh();
  // s.refresh();


  // CONTROL OF WHAT NEEDS TO GET ACTIVATED AT WHICH SCROLL POSITIONS.
  // $(window).scroll(function() {
  //   scrollPos = $(window).scrollTop();
  //   scrollPosWindowPercentage = (scrollPos/windowHeight)*100;

  //   switch(true)
  //   {
  //     // SCROLL POSITION IS LESS THAN 33% OF WINDOW HEIGHT
  //     case (scrollPosWindowPercentage < 33):
  //       break;

  //     // SCROLL POSITION IS LESS THAN 66% OF WINDOW HEIGHT
  //     case (scrollPosWindowPercentage < 66):
  //       break;

  //     // SCROLL POSITION IS LESS THAN 100% OF WINDOW HEIGHT
  //     case ((scrollPosWindowPercentage >= 66) && (scrollPosWindowPercentage < 130)):
  //       break;

  //     // SCROLL POSITION IS MORE THAN 160% OF WINDOW HEIGHT
  //     case (scrollPosWindowPercentage >= 130):
  //       break;
  //   }

  // });

});