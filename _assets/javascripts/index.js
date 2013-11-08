// SCROLLING VARIABLES
var disableScrollLength = 2000;
var scrollSpeed = 600;

// MARQUEE VARIABLES
var marqueeTransitionSpeed = 300;


$(document).ready(function() {

  // MAKE EACH SECTION FILL THE SCREEN
  // *********************************
  $("section.window").each(function(){
    var headerHeight = 0;
    
    if ($(this).is("#primary-story-wrapper"))
    {
      headerHeight = $("header").height() + $("header").offset().top;
    }

    if ($(this).attr("data-extra-height"))
    {
      $(this).height($(window).height() + parseInt($(this).attr("data-extra-height")) - headerHeight);
    }else{
      $(this).height($(window).height() -  headerHeight);
    }
  });


  // ACTIVATE TOOLTIPS
  // ***********************************
  $("[data-toggle='tooltip']").tooltip();


  // LOAD SITE DEPENDING ON HASH TAG OR IF ALREADY VISITED (COOKIES)
  // ***************************************************************
  var pathname = window.location.pathname;
  var hashname = window.location.hash;

  if (pathname === "/" && hashname && ($("section.window" + hashname + "-wrapper").length > 0))
  {
    $("body").addClass("one-page-site initial-load one-half-second-load four-half-seconds-load activated-primary durability");
    $('.nav-tabs li:eq(0)').find('a').trigger('click');

    $("section.window#portfolio-wrapper").addClass("current");

    setTimeout(function(){
      $('html, body').animate({
        scrollTop: $("#portfolio-wrapper .page-meta").offset().top
        }, 0);
    }, 10);

  }else if (pathname !== "/"){
    $("body").addClass("subpage");
  }else{
    $("body").addClass("one-page-site initial-load");

    setTimeout(function(){
      $("body").addClass("one-half-second-load");
    }, 1500);

    setTimeout(function(){
      $("body").addClass("four-half-seconds-load");
    }, 4500);
  }


  // BEHAVIOUR WHEN USING THE MAIN TABS
  // ***********************************
  $("#marquee .nav a").click(function(){
    navName = $(this).attr("href").replace('#','');

    if (!$(this).parent("li").hasClass("active"))
    {
      collapseMarquee(navName);

      setTimeout(function(){
        $("body").removeClass("durability usability art");
        $("body").addClass(navName);
      }, marqueeTransitionSpeed);
    }

    if (!$("body").hasClass("activated-primary"))
    {
      $("body").addClass("activated-primary");
      $(".window#primary-story-wrapper").addClass("current");
    }
  });


  // CONTENT CTA
  // ******************************************
  $(".content-cta").click(function(){
    $("#" + $(this).parent().parent().attr("id") + ".tab-pane .content-front").toggleClass("active");
    $("#" + $(this).parent().parent().attr("id") + ".tab-pane .content-front").toggle("slow");

    $("#" + $(this).parent().parent().attr("id") + ".tab-pane .content-summary").toggleClass("active");
    $("#" + $(this).parent().parent().attr("id") + ".tab-pane .content-summary").toggle("slow");
  });

  $(".content-cta.vitruvian").hover(function(){
    $(this).toggleClass("pulse");
  });

  $(".content-cta.zen-symbol").hover(function(){
    $(this).toggleClass("tossing");
  });


  // SAMUCHAI LOGO CLICK (HOME)
  // **************************
  $(".samuchai-logo").click(function(){
    if ($("body").hasClass("fly-state"))
    {
      $('body').removeClass("fly-state");
    }else{
      if ($("#primary-story-wrapper").hasClass("current"))
      {
        $("body").removeClass("activated-primary");
        $("#primary-story-wrapper #marquee-wrapper #marquee .nav-tabs li").removeClass("active");
        $("#primary-story-wrapper .content-wrapper .tab-content .tab-pane").removeClass("active");
        $("#primary-story-wrapper").removeClass("current");

        setTimeout(function(){
          $("body").removeClass("durability usability art");
        }, marqueeTransitionSpeed);

        collapseMarquee();

      }else{
        $('html, body').animate({
          scrollTop: 0
          }, scrollSpeed);
        $('.nav-tabs li:eq(0)').find('a').trigger('click');
      }

    }
  });


  // BACK TO TOP
  // **************************
  $(".back-to-top").click(function(){
    $('html, body').animate({
      scrollTop: 0
      }, scrollSpeed, function(){
        $(".window").removeClass("current");
        $(".window#primary-story-wrapper").addClass("current");
      });
  });


  // FORWARD ARROW (FOR PRIMARY STORIES)
  // ************************************
  $(".arrow-forward").click(function(){

    if ($("body").hasClass("art"))
    {
      $("body").addClass("fly-state");
    }else{
      $('.nav-tabs > .active').next('li').find('a').trigger('click');
      collapseMarquee();
    }
  });


  // STICKY NAV
  // ******************************************
  $(window).bind("touchmove scroll", function(e) {
    var headerHeight;
    headerHeight = $("header").height();

    if ($(this).scrollTop() > (headerHeight)) {
      $("header").addClass("position-fixed");
      $(".spacing-fix").css({
        height: 80,
        display: "block"
      });
    } else {
      $("header").removeClass("position-fixed");
      $(".spacing-fix").css({
        display: "none"
      });
    }

    if (($(this).scrollTop() >= $("#portfolio").offset().top) && ($(this).scrollTop() < $("#services").offset().top))
    {

      // we're on portfolio page
      $("body").addClass("visited-portfolio");
    
    }else if ($(this).scrollTop() >= $("#services").offset().top){

      // we're on portfolio page
      $("body").addClass("visited-services");
    
    }


  });

  // SMART SCROLL TO NEXT WINDOW WHEN USING WHEEL OR TRACKPAD SCROLL
  // ******************************************
  $(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
      smartScroll("up");
    }
    else
    {
      smartScroll("down");
    }
  });


  // SMOOTH SCROLL ON INTERNAL LINKS
  // ********************************
  $('a.smooth').on('click',function (e) {
      e.preventDefault();

      var target = this.hash,
      $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, scrollSpeed, function () {
          window.location.hash = target;
          $(".window").removeClass("current");
          if ($(target).hasClass("window"))
          {
            $(target).addClass("current");
          }else{
            $(target).parent(".window").addClass("current");
          }
      });
  });


  // AUTO STICK TO NEAREST WINDOW
  // ******************************************
  $('body').mouseenter(function() {
    // autoScrollToNearestWindow();
  });


  // PARALLAX STUFF
  // ******************************************

  // document.createElement("article");
  // document.createElement("section");

  // $("section[data-type=\"parallax\"]").each(function() {
  //   var $this;
  //   $this = $(this);
  //   return $(window).on("scroll", function(e) {
  //     return parallaxEffect($this);
  //   }).on("resize", function(e) {
  //     return parallaxEffect($this);
  //   });
  // });


});