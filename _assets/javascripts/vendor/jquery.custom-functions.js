$.fn.removeAttrs = function(regex) {
    return this.each(function() {
        var $this = $(this),
            names = [];
        $.each(this.attributes, function(i, attr) {
          if (attr.specified && regex.test(attr.name)) {
            $this.attr(attr.name, "");
          }
        });
    });
};