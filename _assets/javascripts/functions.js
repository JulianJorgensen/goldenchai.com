function lazyloadContent()
{
  $("body").addClass("lazy-loading-content");

    // GET THE NEXT WINDOW BASED ON LAST ACTIVE WINDOW INSTANCE
  lastActivatedWindow = $("section.window.loaded").last();
  nextWindow = lastActivatedWindow.next();

  console.log(lastActivatedWindow);
  console.log(nextWindow);

  if (nextWindow.html() == ""){
    // LAZY LOAD CONTENT FROM HTML FILE
    console.log('lazyload!');

    jQuery.ajax({
      url: nextWindow.attr('id') + ".html",
      type: "GET",
      dataType: "html",
      onLoading: nextWindow.html('<div class="preloader-' + nextWindow.attr('id') + ' preloader"></div>')
    }).done(function(data) {
      $("section.window#" + nextWindow.attr('id')).html(data);
      $("section.window#" + nextWindow.attr('id')).addClass('loaded');

      setTimeout(function(){
        $("body").removeClass("lazy-loading-content");
      }, 1000);
    });
  }
}


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





// DETECT WHICH WINDOW IS CURRENTLY IN VIEW
function currentWindow()
{
  if ($("#primary-story").visible())
  {
    return "primary-story";
  }
  else if ($("#portfolio").visible())
  {
    return "portfolio";
  }
  else
  {
    return "services";
  }
}


function calculateNearestWindow()
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

  return closestWindow+1;
}


function autoScrollToNearestWindow(){
  console.log('autoScrollToNearestWindow');
  if (!$("body").hasClass("scrolling-being-executed"))
  {
    //AUTO SCROLL TO NEXT WINDOW
    $('html, body').animate({
      scrollTop: $("section.window:nth-child(" + calculateNearestWindow() + ")").offset().top
      }, 300);

    setTimeout(function(){
      $("body").removeClass("scrolling-being-executed");
    }, 5000);
  }
}


function smartScroll(direction){

  //TEMPORARILY ADD CLASS TO BODY WHILE ITS EXECUTING
  if ($("body").hasClass("scrolling-being-executed")) return;
  $("body").addClass("scrolling-being-executed");

  var nextWindow;

  if (direction == "down")
  {
    nextWindow = $("section.window#" + currentWindow()).next("section.window");
  }else{
    nextWindow = $("section.window#" + currentWindow()).prev("section.window");      
  }

  if (nextWindow.length)
  {

    disable_scroll();    

    //AUTO SCROLL TO NEXT WINDOW
    $('html, body').animate({
      scrollTop: nextWindow.offset().top
      }, 800);

  }

  setTimeout(function(){
    $("body").removeClass("scrolling-being-executed");
    enable_scroll();
  }, 2000);

}
