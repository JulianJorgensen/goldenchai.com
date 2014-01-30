// SCROLLING VARIABLES
var disableScrollLength = 2000;
var scrollSpeed = 600;

// MARQUEE VARIABLES
var marqueeTransitionSpeed = 300;

$(document).ready(function() {

  // ACTIVATE TOOLTIPS
  // ***********************************
  $("[data-toggle='tooltip']").tooltip();


  // LOAD SITE DEPENDING ON URL
  // ***************************************************************
  var pathname = window.location.pathname;
  var hashname = window.location.hash;

  if (pathname !== "/"){
    $("body").addClass("subpage");
  }else{
    if ((pathname == "/#manifestos") || (pathname == "/"))
    {
      setTimeout(function(){
        $(".window.lazy-load").removeClass("lazy-load");
      }, 200);
    }else{
      $(".window.lazy-load").removeClass("lazy-load");
    }
  }


  // BEHAVIOUR WHEN USING THE MAIN TABS
  // ***********************************
  $("#marquee .nav a").click(function(){
    navName = $(this).attr("href").replace('#','');

    if (!$(this).parent("li").hasClass("active"))
    {
      $("#marquee .nav li").removeClass("active");
      collapseMarquee(navName);

      setTimeout(function(){
        $("body").removeClass("manifesto-durability manifesto-usability manifesto-art");
        $("body").addClass("manifesto-" + navName);
        $("#marquee .nav li a.nav-" + navName).parent("li").addClass("active");
      }, marqueeTransitionSpeed);
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


  // goldenCHAI LOGO CLICK (HOME)
  // **************************
  $(".goldenchai-logo").click(function(){
    $('html, body').animate({
      scrollTop: 0
      }, scrollSpeed);
    $('.nav-tabs li:eq(0)').find('a').trigger('click');
  });


  // BACK TO TOP
  // **************************
  $(".back-to-top").click(function(){
    $('html, body').animate({
      scrollTop: 0
      }, scrollSpeed, function(){
        $(".window").removeClass("current");
        $(".window#manifestos").addClass("current");
      });
  });


  // FORWARD ARROW (FOR MANIFESTOS)
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

  // MOBILE NAV
  // ************************************
  $("#mobile-nav-icon").click(function(){

    var windowHeight = $(window).height();
    collapseFooter();
    $("html, body").animate({
      scrollTop: windowHeight
    }, 10);

  });


  // DIRECT LINKS TO EITHER SINGLE PAGE OR MULTI PAGE
  // ***********************************************
  $("a").click(function(e){
    if ($("body").hasClass("site-multiple-pages"))
    {
      if ($(this).attr("href").indexOf("/#/") != -1)
      {
        window.location.href = $(this).attr("href").replace("/#", "");
      }

      e.preventDefault();
    }
  });


  // STUPID FIREFOX SPECIFIC CLASS
  // ****************************
  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
  {
    $("body").addClass("browser-firefox");
  }
});