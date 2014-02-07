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
  $("#marquee .nav a").click(function(e){
    navName = $(this).attr("href").replace('#/','');

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


  // FORWARD ARROW (FOR MANIFESTOS)
  // ************************************
  $("[data-goto-next-manifesto]").click(function(){
    $('#marquee .nav > .active').next('li').find('a').trigger('click');
  });


  // BACKWARDS ARROW
  // ******************************************
  $("[data-backwards]").click(function(){
    var tabPane = $("#" + $(this).parent().parent().attr("id") + ".tab-pane");
    var summaryEl = tabPane.find(".content-summary");
    var backArrow = tabPane.find(".arrow-backward");

    if (summaryEl.hasClass("active"))
    {
      toggleSummary(tabPane);
    }else{
      $('#marquee .nav > .active').prev('li').find('a').trigger('click');
    }
  });


  // CONTENT CTA
  // ******************************************
  $("[data-toggle-summary]").click(function(){
    var tabPane = $("#" + $(this).parents(".tab-pane").attr("id") + ".tab-pane");
    toggleSummary(tabPane);
  });

  $(".content-cta.vitruvian").hover(function(){
    $(this).toggleClass("pulse");
  });

  $(".content-cta.zen-symbol").hover(function(){
    $(this).toggleClass("tossing");
  });


  // GoldenChai LOGO CLICK (HOME)
  // **************************
  $(".goldenchai-logo").click(function(){
    $('html, body').animate({
      scrollTop: 0
      }, scrollSpeed);
    $('#marquee .nav li:eq(0)').find('a').trigger('click');
  });


  // DIRECT LINKS TO EITHER SINGLE PAGE OR MULTI PAGE
  // ***********************************************
  $("a").click(function(e){
    if ($("body").hasClass("site-multiple-pages"))
    {
      if ($(this).attr("href").indexOf("#/") != -1)
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