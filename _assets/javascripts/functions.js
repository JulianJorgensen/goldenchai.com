// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}







function getNearestWindow()
{
  var windowsArray = [];

  var windows = $("section.window");
  windows.each(function(){
    windowsArray.push($(this).offset().top);
  });

  var goal = $(window).scrollTop();
  var closest = null;
  var closestWindow = null;

  $.each(windowsArray, function(index){
    if (closest == null || Math.abs(this - goal) < Math.abs(closest - goal)) {
      closest = this;
      closestWindow = index;
    }
  });

  nearestWindow = $("section.window:eq(" + closestWindow + ")");
  return nearestWindow;
}


function autoScrollToNearestWindow(){
  if (!$("body").hasClass("scrolling-being-executed"))
  {
    if (getNearestWindow().find(".page-meta").length)
    {
      nearestWindowOffset = getNearestWindow().find(".page-meta").offset().top;
    }else{
      nearestWindowOffset = getNearestWindow().offset().top;
    }

    //AUTO SCROLL TO NEXT WINDOW
    $('html, body').animate({
      scrollTop: nearestWindowOffset
      }, scrollSpeed, function(){
        $(".window").removeClass("current");
        getNearestWindow().addClass("current");
      });

    setTimeout(function(){
      $("body").removeClass("scrolling-being-executed");
    }, disableScrollLength);
  }
}


function smartScroll(direction){

  //TEMPORARILY ADD CLASS TO BODY WHILE ITS EXECUTING
  if ($("body").hasClass("scrolling-being-executed")) return;

  var nextWindow;

  if (direction == "down")
  {
    nextWindow = $(".window.current").nextAll(".window");
  }else{
    nextWindow = $(".window.current").prevAll(".window");
  }

  if (nextWindow.length)
  {
    $("body").addClass("scrolling-being-executed");

    disable_scroll();

    if (nextWindow.find(".page-meta").length)
    {
      windowOffset = nextWindow.find(".page-meta").offset().top;
    }else{
      windowOffset = nextWindow.offset().top;
    }

    // smooth scroll
    $('html, body').animate({
      scrollTop: windowOffset
    }, scrollSpeed, function() {
      $(".window").removeClass("current");
      nextWindow.addClass("current");
    });

    setTimeout(function(){
      $("body").removeClass("scrolling-being-executed");
      enable_scroll();
    }, disableScrollLength);
  }
}

function parallaxEffect(el) {
  var coords, yPos;
  yPos = -($(window).scrollTop() / el.data("speed"));
  coords = "50% " + yPos + "px";
  
  el.css({
    top: el.css("max-height").replace("px", "") - Math.abs(yPos * el.data("speed"))
  });
}


function collapseMarquee(navName)
{
  $("#marquee-wrapper #marquee .headline").hide();

  if (navName)
  {
    $("body").addClass("visited-" + navName);
    $("#marquee-wrapper #marquee .headline-" + navName).show();
  }else{
    $("#marquee-wrapper #marquee .headline-default").show();
  }

  $("#primary-story-wrapper").addClass("transitioning collapsed");
  $("#primary-story-wrapper").removeClass("transitioned");

  setTimeout(function(){
    $("#primary-story-wrapper").removeClass("collapsed");
  }, marqueeTransitionSpeed);

  setTimeout(function(){
    $("#primary-story-wrapper").removeClass("transitioning");
  }, 700);
}