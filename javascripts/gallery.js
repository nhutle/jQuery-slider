var Gallery = function() {
  var $gallery = $('#gallery'),
    $photoList = $gallery.find('ul.photo-list'),
    $indicator = $gallery.find('ol.indicator'),
    $nextNav = $('#next_nav'),
    $previousNav = $('#previous_nav'),
    $window = $(window),
    totalSlides = $photoList.find('li').length,
    galleryWidth = $gallery.width(),
    curSlide = 0;

  var setGallerySize = function() {
    $photoList.find('li').each(function(index, element) {
      var $this = $(element);

      $this.width(galleryWidth);
    });

    $photoList.width(galleryWidth * totalSlides);
  };

  setGallerySize();

  $window.resize(function() {
    setGallerySize();
  });

  var runSlider = function() {
    $indicator.find('li[data-index=' + curSlide + ']').removeClass('active');

    curSlide++;

    if (curSlide === totalSlides) {
      curSlide = 0;
    }

    $photoList.animate({
      'left': (curSlide * -galleryWidth)
    });

    $indicator.find('li[data-index=' + curSlide + ']').addClass('active');
  }

  if (totalSlides) {
    setInterval(runSlider, 5000);
  }

  $nextNav.on('click', function() {
    curSlide++;

    if (curSlide === totalSlides) {
      curSlide = 0;
    }

    $photoList.animate({
      'left': (curSlide * -galleryWidth)
    });
  });

  $previousNav.on('click', function() {
    curSlide--;

    if (curSlide < 0) {
      curSlide = totalSlides - 1;
    }

    $photoList.animate({
      'left': (curSlide * -galleryWidth)
    });
  });

  $indicator.find('li').on('click', function() {
    var $this = $(this);

    $indicator.find('li[data-index=' + curSlide + ']').removeClass('active');
    curSlide = $this.attr('data-index');

    $photoList.animate({
      'left': (curSlide * -galleryWidth)
    });

    $indicator.find('li[data-index=' + curSlide + ']').addClass('active');
  });
};
