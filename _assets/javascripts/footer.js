$(document).ready(function() {
  // FOOTER CONTENT SLIDER: INFO, CONTACT, AND GET A QUOTE
  $('#footer-content-slider').royalSlider({
    controlNavigation: 'none',
    autoScaleSlider: true,
    autoScaleSliderHeight: 600,
    controlsInside: false,
    navigateByClick: false,
    sliderDrag: false,
    arrowsNavAutoHide: false,
    numImagesToPreload: 10
  });

  var footerContentSlider = $("#footer-content-slider").data('royalSlider');



  // ACCORDION
  // *****************
  $(".accordion .accordion-item .accordion-title").click(function(){
    var accordionItem = $(this).parent();

    // remove active classes on siblings
    accordionItem.siblings(".accordion-item").removeClass("active");

    if (accordionItem.hasClass("active")){
      // remove active class
      accordionItem.removeClass("active");
    }else{
      // add active class
      accordionItem.addClass("active");
    }
  });



  // FOOTER NAV LINKS
  // *****************
  $(".footer-nav-ctas li a").on("click", function(event){

    if ($(this).parent().hasClass("active")){
      event.preventDefault();
      collapseFooter();
      return false;
    }else{
      activateFooter($(this));
    }
  });


  // LINK TO COLLAPSE FOOTER
  $(".collapseFooter").click(function(e){
    e.preventDefault();
    collapseFooter();
    return false;
  });


  // FOOTER CTA ITEM CLICK
  $(".footer-cta-item").click(function(){
    var targetSlide = $(this).attr("data-slide");

    // first remove all the active classes on the primary footer nav
    $(".footer-nav-ctas li").removeClass("active");

    // then add active class to the active one
    $(".footer-nav-ctas li:eq(" + targetSlide + ")").addClass("active");

    // go to the slide
    footerContentSlider.goTo(targetSlide);
  });

});


function activateFooter(navItem){
  var footerContentSlider = $("#footer-content-slider").data('royalSlider');

  navItem.parent().siblings("li").removeClass("active");
  navItem.parent().addClass("active");

  // if the footer was not active before, do this..
  if (!$("body").hasClass("footer-active")){
    $("body").addClass("footer-active");

    // the slider should go to slide instantly
    footerContentSlider.st.transitionSpeed = 0;
    footerContentSlider.goTo(navItem.parent().index());
    footerContentSlider.st.transitionSpeed = 600;

    // collapse footer when clicking on header area
    setTimeout(function(){
      $("header, .window").one("click", function(event) {
        $("body").removeClass("footer-active");
        collapseFooter();
      });
    }, 300);

  }else{
    footerContentSlider.goTo(navItem.parent().index());
  }
}

function collapseFooter(){
  // remove footer active classes
  $(".footer-nav-ctas li").removeClass("active");
  $("body").removeClass("footer-active");    

  $('.footer-nav-ctas li').tooltip('destroy');

  if ($("body").hasClass("page-manifestos")){
    $.history.push("#manifestos");
  }else if ($("body").hasClass("page-portfolio")){    
    $.history.push("#portfolio");
  }else if ($("body").hasClass("page-services")){    
    $.history.push("#services");
  }
}