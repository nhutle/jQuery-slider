! function($) {
  'use strict';

  // waiting for document ready
  $(function() {
    $('#gallery').gallery({
      type: 'scrolling'
    });

    $('#gallery2').gallery({
      type: 'fading'
    });
  });
}(jQuery);
