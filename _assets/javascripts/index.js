$(document).ready(function() {

  // THIS IS SORT OF PLACEHOLDER CODE
  $("#marquee .nav li:first-child").addClass("active");
  $("body").addClass("durability");

  // UPDATE CLASSES WHEN USING THE MAIN TABS
  $("#marquee .nav a").click(function(){
    $("body").removeClass("durability usability art");
    $("body").addClass($(this).attr("href").replace('#',''));
  });


  // SMART SCROLL TO NEXT WINDOW WHEN USING WHEEL OR TRACKPAD SCROLL
  $(window).bind('mousewheel', function(event) {
      if (event.originalEvent.wheelDelta >= 0) {
        smartScroll("up");
      }
      else
      {
        smartScroll("down");
      }
  });

  // AUTO STICK TO NEAREST WINDOW
  $('body').mouseenter(function() {
    autoScrollToNearestWindow();
  });

  // LAZY LOAD CONTENT WHEN SCROLLING (EITHER SCROLLBAR OR WHEEL)
  $(window).scroll(function () {
    if (!$("body").hasClass('lazy-loading-content'))
    {
      lazyloadContent();      
    }
  });

});
