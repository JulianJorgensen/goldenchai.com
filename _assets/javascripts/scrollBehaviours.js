$(document).ready(function() {


  updateSite();

  // INITIALIZE SKROLLR. (IT"LL BE DESTROYED AND RE-INITIALIZED ON WINDOW RESIZE.)
  skrollrStylesheets.refresh();
  var s = skrollr.init();


  // ON WINDOW RESIZE: APPLY MOBILE CLASS FOR SMALL SCREENS, AND DESKTOP FOR LARGER
  $( window ).resize(function() {
    updateSite(true);
  });


  // ALSO UPDATE SKROLLR AND BODY CLASSES ON ORIENTATION CHANGE
  window.addEventListener("orientationchange", (function() {
    updateSite(true);
  }), false);


  var refresh;

  function updateSite(refresh){

    // window variables
    windowHeight = $(window).height();
    windowWidth = $(window).width();

    if ((windowHeight < 665) || (windowWidth < 800))
    {
      if ($("body").hasClass("mobile")){return "";}

      // IT'S A MOBILE SITE!
      $("body").removeClass("desktop site-single-page");
      $("body").addClass("mobile site-multiple-pages");

      if (refresh){
        updateSkrollr();
      }

    }else{

      if ($("body").hasClass("desktop")){return "";}

      // IT'S A DESKTOP SITE!
      $("header").removeClass("mobile-nav-active"); // hide mobile nav just in case it's active
      $("body").removeClass("mobile site-multiple-pages");
      $("body").addClass("desktop site-single-page");

      if (refresh){
        updateSkrollr();
      }
    }
  }


  function updateSkrollr(){

    s.destroy();

    skrollrStylesheets.refresh();
    console.log("skrollr stylesheets re-initialized.");

    s = skrollr.init();
    console.log("skrollr re-initialized.");

  }



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