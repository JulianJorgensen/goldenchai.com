---
---


// JQUERY
{% asset lib/jquery-1.10.2.min.js %}
{% asset lib/jquery.custom-functions.js %}


// TYPEKIT
(function(d) {
  var config = {
    kitId: 'qxk0qin',
    scriptTimeout: 3000
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);


  $('.window#portfolio').load('lazy-pages/portfolio.html');


// BOOTSTRAP
{% asset lib/bootstrap-3.0.3.js %}


// ROYAL SLIDER
{% asset lib/jquery.royalslider.custom.min.js %}


// SKROLLR
{% asset lib/skrollr.stylesheets.js %}
{% asset lib/skrollr.js %}
{% asset lib/jquery.skrollr.refresh.js %}
{% asset lib/jquery.history.min.js %}
{% include javascripts/skrollr-stuff.js %}


// PROGRESS BUTTON
{% asset lib/progressButton/modernizr.custom.js %}
{% asset lib/progressButton/classie.js %}
{% asset lib/progressButton/progressButton.js %}


// MY OWN STUFF

{% asset portfolio/single-sliders.js %}
{% if page.subpage != "true" %}
  {% asset portfolio/multi-sliders.js %}
{% endif %}
{% asset portfolio/functions.js %}


{% asset functions.js %}
{% asset index.js %}
{% asset footer.js %}
