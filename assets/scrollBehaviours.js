---
---

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
    windowWidth = $(window).width();


    // SCREEN WIDTH DETECTION (MOBILE, TABLET, DESKTOP)
    // ************************************************
    if ((windowWidth > {{ site.mobile_start_width }}) && (windowWidth <= {{ site.tablet_start_width }}))
    {
      // ITS A TABLET SIZED WINDOW!
      if ($("body").hasClass("screen-tablet")){return "";}
      $("body").removeClass("screen-desktop");
      $("body").removeClass("screen-mobile");
      $("body").addClass("screen-tablet");
    }
    else if (windowWidth < {{ site.tablet_start_width }})
    {
      // ITS A MOBILE SIZED WINDOW!
      if ($("body").hasClass("screen-mobile")){return "";}
      $("body").removeClass("screen-desktop");
      $("body").removeClass("screen-tablet");
      $("body").addClass("screen-mobile");
    }else{
      // ITS A DESKTOP SIZED WINDOW!
      if ($("body").hasClass("screen-desktop")){return "";}
      $("body").removeClass("screen-tablet");
      $("body").removeClass("screen-mobile");
      $("body").addClass("screen-desktop");
    }

    // DETERMINE WHETHER TO DISPLAY SITE AS SINGLE ONE-PAGE OR MULTIPLE PAGES
    // ***************************************
    if ($("body").hasClass("index"))
    {
      var isSubpage;

      if ((windowWidth <= {{ site.mobile_start_width }}))
      {
        if ($("body").hasClass("site-multiple-pages")){return "";}

        $("body").removeClass("site-single-page");
        $("body").addClass("site-multiple-pages");

        if (refresh){
          updateSkrollr();
        }

      }else{

        if ($("body").hasClass("site-single-page")){return "";}

        // $("header").removeClass("mobile-nav-active"); // hide mobile nav just in case it's active
        $("body").removeClass("site-multiple-pages");
        $("body").addClass("site-single-page");

        if (refresh){
          updateSkrollr();
        }
      }
    }else{
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


});