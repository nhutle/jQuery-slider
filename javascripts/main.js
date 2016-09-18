!function($) {
  'use strict';

  // waiting for document ready
  $(function() {
    $.ajax({
      url: 'data/photo.json',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(data);
      }
    })
  });

}(jQuery);
