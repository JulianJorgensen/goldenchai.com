$(document).ready(function() {
  // APPLY APPROPRIATE BODY CLASS ON INITIAL LOAD: MOBILE OR DESKTOP
  updateSite();

  skrollrStylesheets.refresh();

  var s = skrollr.init();
  s.refresh();

});