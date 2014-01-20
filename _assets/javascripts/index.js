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
    $("body").addClass("durability");
    $("body").addClass("page-manifestos");
    $('.nav-tabs li:eq(0)').find('a').trigger('click');
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

});