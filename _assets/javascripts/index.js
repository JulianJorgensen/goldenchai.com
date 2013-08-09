$(document).ready(function() {

  $(window).bind('mousewheel', function(event) {
      if (event.originalEvent.wheelDelta >= 0) {
        smartScroll("up");
      }
      else
      {
        smartScroll("down");
      }
  });

  $('body').mouseenter(function() {
    autoScrollToNearestWindow();
  });


  $(window).scroll(function () {
    if (!$("body").hasClass('lazy-loading-content'))
    {
      lazyloadContent();      
    }
  });

});
