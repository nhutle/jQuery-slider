! function($) {
  'use strict';

  // waiting for document ready
  $(function() {
    var photos = [];
    var $galleryModal = $('#gallery_modal');

    $.ajax({
      url: 'data/photo.json',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        photos = data;
      }
    });
  });

  function generateGallery(photos) {
    for (var i = 0, j = photos.length; i < j; i++) {
      var photoWrap = document.createElement();
    }
  }

  $('#photo_list a').on('click', function() {
    console.log($(this).find('img').attr('src'));
  });


}(jQuery);
