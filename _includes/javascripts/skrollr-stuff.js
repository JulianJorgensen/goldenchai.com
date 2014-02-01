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




  var scrollSpeed;

  // DEEP LINK STUFF (HASH CHANGE)
  $.history.on('load change push pushed', function(event, url, type) {

    if (event.type === "load"){
      scrollSpeed = 0;
    }else{
      scrollSpeed = {{ site.default_scroll_speed }};
    }

    var scrollPos = $(window).scrollTop();

    switch(url){
      case "/info":
        activateFooter($(".footer-nav-cta.footer-nav-info"));
        break;

      case "/contact":
        activateFooter($(".footer-nav-cta.footer-nav-contact"));
        break;

      case "/manifestos":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos > {{ site.manifestos_start }}))
        {
          smoothPageScroll({{ site.manifestos_start }}, scrollSpeed);
        }

        updatePageMeta("manifestos");          
        break;

      case "/durability":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos > {{ site.manifestos_start }}))
        {
          smoothPageScroll({{ site.manifestos_start }}, scrollSpeed);
        }

        updatePageMeta("manifestos");
        $('#marquee .nav .nav-durability').trigger('click');
        break;

      case "/usability":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos > {{ site.manifestos_start }}))
        {
          smoothPageScroll({{ site.manifestos_start }}, scrollSpeed);
        }

        updatePageMeta("manifestos");
        $('#marquee .nav .nav-usability').trigger('click');
        break;

      case "/art":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos > {{ site.manifestos_start }}))
        {
          smoothPageScroll({{ site.manifestos_start }}, scrollSpeed);
        }

        updatePageMeta("manifestos");
        $('#marquee .nav .nav-art').trigger('click');
        break;

      case "/portfolio":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos !== {{ site.portfolio_start }}))
        {
          smoothPageScroll({{ site.portfolio_start }}, scrollSpeed);
        }

        updatePageMeta("portfolio");
        break;


      case "/services":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if ((event.type != "push") && (event.type != "pushed") && (scrollPos !== {{ site.services_start }}))
        {
          smoothPageScroll({{ site.services_end }}, scrollSpeed);
        }

        updatePageMeta("services");
        break;

      default:
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        break;
    }

    // alert(event.type + ': ' + url);
  }).listen('hash');



  // CONTROL OF WHAT NEEDS TO GET ACTIVATED AT WHICH SCROLL POSITIONS.
  $(window).scroll(function() {
    if (!$("body").hasClass("transitioning") && !$("body").hasClass("site-multiple-pages"))
    {
      scrollPos = $(window).scrollTop();

      if (scrollPos < {{ site.portfolio_pre_start }}){
        if (!$("body").hasClass("page-manifestos")){
          $.history.push("/manifestos");
        }
      }else if ((scrollPos > {{ site.portfolio_pre_start }}) && (scrollPos < {{ site.services_pre_start }})){
        console.log('portfolio start');
        if (!$("body").hasClass("page-portfolio")){
          $.history.push("/portfolio");
        }
      }else if ((scrollPos > {{ site.services_pre_start }}) && (scrollPos <= {{ site.services_start }})){
        console.log('services start');
        if (!$("body").hasClass("page-services")){
          $.history.push("/services");
        }
      }
    }
  });


  // SCROLL TO THE NEW PAGE
  function smoothPageScroll(scrollTo, scrollSpeed){
    $("body").addClass("transitioning");
    $("html, body").animate({
      scrollTop: scrollTo
    }, scrollSpeed, function(){
      $("body").removeClass("transitioning");
    });
  }


  // Update the URL and body class names
  function updatePageMeta(activePage){
    clearBodyPageClasses();

    $("body").addClass("page-" + activePage);
  }

  // FUNCTION TO CLEAR ALL BODY CLASSES START WITH "page-"
  function clearBodyPageClasses(){
    var element = $("body");
    var classes = element.attr('class').split(/\s+/);

    var pattern = /^page-/;

    for(var i = 0; i < classes.length; i++){
      var className = classes[i];

      if(className.match(pattern)){
        element.removeClass(className);
      }
    }
  }

});