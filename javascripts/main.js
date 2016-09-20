! function($) {
  'use strict';

  // waiting for document ready
  $(function() {
    var $gallery = $('#gallery').gallery({
      type: 'scrolling'
    });

    $('#gallery2').gallery({
      type: 'fading'
    });
  });
}(jQuery);
