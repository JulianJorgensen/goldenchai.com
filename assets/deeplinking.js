---
---

$(document).ready(function() {

  var scrollSpeed;

  // DEEP LINK STUFF (HASH CHANGE)
  $.history.on('load change push pushed', function(event, url, type) {

    if (event.type === "load"){
      scrollSpeed = 0;
    }else{
      scrollSpeed = {{ site.default_scroll_speed }};
    }

    var scrollPos = $(window).scrollTop();

    switch(url){
      case "info":
        activateFooter($(".footer-nav-ctas li.footer-nav-info a"));
        break;

      case "contact":
        activateFooter($(".footer-nav-ctas li.footer-nav-contact a"));
        break;

      case "get-a-quote":
        activateFooter($(".footer-nav-ctas li.footer-nav-getquote a"));
        break;

      case "manifestos":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if (scrollPos > {{ site.manifestos_start }})
        {
          smoothPageScroll({{ site.manifestos_start }}, scrollSpeed);
        }

        updatePageMeta("manifestos");          
        break;

      case "portfolio":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if (scrollPos !== {{ site.portfolio_start }})
        {
          smoothPageScroll({{ site.portfolio_start }}, scrollSpeed);
        }

        updatePageMeta("portfolio");
        break;


      case "services":
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        if (scrollPos !== {{ site.services_start }})
        {
          smoothPageScroll({{ site.services_start }}, scrollSpeed);
        }

        updatePageMeta("services");
        break;

      default:
        if ($("body").hasClass("footer-active")){
          collapseFooter();
        }
        break;
    }

    // alert(event.type + ': ' + url);
  }).listen('hash');



  // CONTROL OF WHAT NEEDS TO GET ACTIVATED AT WHICH SCROLL POSITIONS.
  $(window).scroll(function() {
    if (!$("body").hasClass("transitioning"))
    {
      scrollPos = $(window).scrollTop();

      if (scrollPos === {{ site.manifestos_start }}){
        if (!$("body").hasClass("page-manifestos")){
          $.history.push("#manifestos");
        }
      }else if (scrollPos === {{ site.portfolio_start }}){
        if (!$("body").hasClass("page-portfolio")){
          $.history.push("#portfolio");
        }
      }else if (scrollPos === {{ site.services_start }}){
        if (!$("body").hasClass("page-services")){
          $.history.push("#services");
        }
      }
    }
  });


  // SCROLL TO THE NEW PAGE
  function smoothPageScroll(scrollTo, scrollSpeed){
    $("body").addClass("transitioning");
    $("html, body").animate({
      scrollTop: scrollTo
    }, scrollSpeed, function(){
      $("body").removeClass("transitioning");
    });
  }


  // Update the URL and body class names
  function updatePageMeta(activePage){
    clearBodyPageClasses();
    console.log(activePage);
    $("body").addClass("page-" + activePage);
  }

  // FUNCTION TO CLEAR ALL BODY CLASSES START WITH "page-"
  function clearBodyPageClasses(){
    var element = $("body");
    var classes = element.attr('class').split(/\s+/);

    var pattern = /^page-/;

    for(var i = 0; i < classes.length; i++){
      var className = classes[i];

      if(className.match(pattern)){
        element.removeClass(className);
      }
    }
  }

});