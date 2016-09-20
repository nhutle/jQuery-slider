! function($, w) {
  'use strict';

  $.fn.gallery = function(options) {
    var $window = $(w),
      $gallery = $(this),
      $photoList = $gallery.find('ul'),
      $indicator = $gallery.find('ol.indicator'),
      $nextNav = $gallery.find('a.next-nav'),
      $previousNav = $gallery.find('a.previous-nav'),
      totalSlides = $photoList.find('li').length,
      curSlide = 0,
      galleryWidth,
      intervalSession;

    $indicator.find('li:eq(0)').addClass('active');

    if (options.type === 'scrolling') {
      var setGallerySize = function() {
        galleryWidth = $gallery.width();

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
    }

    var updateSlider = function($element, type) {
      // clear interval session
      clearInterval(intervalSession);

      if (options.type === 'fading') {
        $photoList.find('li:eq(' + curSlide + ')').fadeOut();
      }

      $indicator.find('li:eq(' + curSlide + ')').removeClass('active');

      if (type === 'next') {
        curSlide++;

        if (curSlide === totalSlides) {
          curSlide = 0;
        }
      } else if (type === 'previous') {
        curSlide--;

        if (curSlide < 0) {
          curSlide = totalSlides - 1;
        }
      } else {
        curSlide = $element.index();
      }

      if (options.type === 'scrolling') {
        $photoList.animate({
          'left': (curSlide * -galleryWidth)
        });
      }

      if (options.type === 'fading') {
        $photoList.find('li:eq(' + curSlide + ')').fadeIn();
      }

      $indicator.find('li:eq(' + curSlide + ')').addClass('active');
      // start interval session again
      intervalSession = setInterval(runSlider, 5000);
    };

    var runSlider = function() {
      updateSlider(null, 'next');
    };

    if (totalSlides) {
      intervalSession = setInterval(runSlider, 5000);
    }

    $nextNav.on('click', function() {
      updateSlider(null, 'next');
    });

    $previousNav.on('click', function() {
      updateSlider(null, 'previous');
    });

    $indicator.find('li').on('click', function() {
      updateSlider($(this), 'indicator');
    });

    return this;
  };
}(jQuery, window);
