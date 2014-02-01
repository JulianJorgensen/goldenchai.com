$(document).ready(function() {
  // FOOTER CONTENT SLIDER: INFO, CONTACT, AND GET A QUOTE
  $('#footer-content-slider').royalSlider({
    controlNavigation: 'none',
    autoScaleSliderHeight: 1200,
    controlsInside: false,
    navigateByClick: false,
    sliderDrag: false,
    arrowsNavAutoHide: false,
    numImagesToPreload: 3
  });

  var footerContentSlider = $("#footer-content-slider").data('royalSlider');


  // CONTACT FORM SEND SCRIPT
  // *****************

    [].slice.call( document.querySelectorAll( 'button.progress-button' ) ).forEach( function( bttn ) {
      new ProgressButton( bttn, {
        callback : function( instance ) {
          var progress = 0,
            interval = setInterval( function() {
              progress = Math.min( progress + Math.random() * 0.1, 1 );
              instance._setProgress( progress );

              if( progress === 1 ) {
                instance._stop(1);
                clearInterval( interval );
              }
            }, 200 );
        }
      } );
    } );

    $('.progress-button').click(function() {
      var name = $("#name").val();
      var email = $("#email").val();
      var message = $("#message").val();
      var dataString = 'name=' + name + '&from=' + email + '&subject=GoldenChai inquiry&to=chai@goldenchai.com&message=' + message;
      $.ajax({
        type : "POST",
        url : "/lib/scripts/mailer.php",
        data : dataString,
        cache : false,
        success : function() {

        }
      });
      return false;
    });


  // ACCORDION
  // *****************
  $(".accordion .accordion-item .accordion-title").click(function(){
    var accordionItem = $(this).parent();

    // remove active classes on siblings
    accordionItem.siblings(".accordion-item").removeClass("active");

    if (accordionItem.hasClass("active")){
      // remove active class
      accordionItem.removeClass("active");

      if ($("body").hasClass("screen-mobile"))
      {
        accordionItem.siblings(".accordion-item").removeClass("hidden");
      }

    }else{
      // add active class
      accordionItem.addClass("active");

      if ($("body").hasClass("screen-mobile"))
      {
        accordionItem.siblings(".accordion-item").addClass("hidden");
        accordionItem.removeClass("hidden");
      }
    }
  });

  // SHOW PROFILE IMAGE OF JULIAN
  // ****************************
  $("[data-show-profile]").mouseover(function(){
    $(".accordion-item-about").addClass("show-profile");
  });

  $("[data-show-profile]").mouseout(function(){
    $(".accordion-item-about").removeClass("show-profile");
  });


  // TOGGLE ACCORDION
  // *****************
  $("a[data-accordion]").on("click", function(event){
    $("footer #footer-content .accordion .accordion-item").removeClass("active");
    $("footer #footer-content .accordion .accordion-item.accordion-item-" + $(this).attr("data-accordion")).addClass("active");
  });


  // FOOTER NAV LINKS
  // *****************
  $(".footer-nav-cta").on("click", function(event){
    if ($(this).hasClass("active")){
      event.preventDefault();
      collapseFooter();
      return false;
    }else{
      activateFooter($(this));
    }
  });


  // FOOTER CHAI INVERT STYLES
  // *************************
  $("[data-toggle-invert]").on("click", function(event){
    if ((!$("body").hasClass("inverted-mode-1")) && (!$("body").hasClass("inverted-mode-2")))
    {
      $("body").addClass("inverted-mode-1");

      $(".footer-chai p.invert-mode-1").addClass("active");
      $(".footer-chai p.invert-mode-2").removeClass("active");
      $(".footer-chai p.copyright").removeClass("active");
    }
    else if ($("body").hasClass("inverted-mode-1"))
    {
      $("body").removeClass("inverted-mode-1");
      $("body").addClass("inverted-mode-2");

      $(".footer-chai p.invert-mode-1").removeClass("active");
      $(".footer-chai p.invert-mode-2").addClass("active");
      $(".footer-chai p.copyright").removeClass("active");
    }
    else
    {
      $("body").removeClass("inverted-mode-1 inverted-mode-2");

      $(".footer-chai p.invert-mode-1, .footer-chai p.invert-mode-2").removeClass("active");
      $(".footer-chai p.copyright").addClass("active");
    }
  });


  // LINK TO COLLAPSE FOOTER
  $(".collapseFooter").click(function(e){
    e.preventDefault();
    collapseFooter();
    return false;
  });


  // FOOTER CTA ITEM CLICK
  $(".footer-cta-button").click(function(){
    var targetSlide = $(this).attr("data-slide");

    // first remove all the active classes on the primary footer nav
    $(".footer-nav-cta").removeClass("active");

    // then add active class to the active one
    $(".footer-nav-cta").addClass("active");

    // go to the slide
    footerContentSlider.goTo(targetSlide);
  });

});


function activateFooter(navItem){
  var footerContentSlider = $("#footer-content-slider").data('royalSlider');

  navItem.siblings(".footer-nav-cta").removeClass("active");
  navItem.addClass("active");

  // if the footer was not active before, do this..
  if (!$("body").hasClass("footer-active")){
    if ($("body").hasClass("screen-mobile"))
    {
      $("#footer-content .accordion-item").removeClass("active");
    }

    $("body").addClass("footer-active");

    // the slider should go to slide instantly
    footerContentSlider.st.transitionSpeed = 0;
    footerContentSlider.goTo(navItem.index());
    footerContentSlider.st.transitionSpeed = 600;

    // collapse footer when clicking on header area
    if (!$("body").hasClass("mobile"))
    {
      setTimeout(function(){
        $("header, .window").one("click", function(event) {
          $("body").removeClass("footer-active");
          collapseFooter();
        });
      }, 300);
    }
  }else{
    footerContentSlider.goTo(navItem.index());
  }
}

function collapseFooter(){
  // remove footer active classes
  $(".footer-nav-cta").removeClass("active");
  $("body").removeClass("footer-active");
  $("body").addClass("footer-post-active");

  $('.footer-nav-cta').tooltip('destroy');

  if ($("body").hasClass("index"))
  {
    if ($("body").hasClass("page-manifestos")){
      $.history.push("/manifestos");
    }else if ($("body").hasClass("page-portfolio")){    
      $.history.push("/portfolio");
    }else if ($("body").hasClass("page-services")){    
      $.history.push("/services");
    }
  }
}