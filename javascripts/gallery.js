/**
 * init plugin
 * @author: Nhut Le
 */
var Gallery = (function() {
  function Gallery($gallery, $window, options) {
    var $photoList = $gallery.find('ul'),
      $indicator = $gallery.find('ol'),
      $nextNav = $gallery.find('a.next-nav'),
      $previousNav = $gallery.find('a.previous-nav'),
      self = this;

    this.totalSlides = $photoList.find('li').length;
    this.curSlide = 0;
    this.options = options;

    $indicator.find('li:eq(0)').addClass('active');

    if (this.options.type === 'scrolling') {
      var setGallerySize = function() {
        self.galleryWidth = $gallery.width();

        $photoList.find('li').each(function(index, element) {
          $(element).width(self.galleryWidth);
        });

        $photoList.width(self.galleryWidth * self.totalSlides);
      };

      setGallerySize();

      $window.resize(function() {
        setGallerySize();
      });
    }

    this.intervalSession = setInterval(function() {
      self.runSlider(null, 'next', $indicator, $photoList);
    }, 5000);

    $nextNav.on('click', function() {
      self.updateSlider(null, 'next', $indicator, $photoList);
    });

    $previousNav.on('click', function() {
      self.updateSlider(null, 'previous', $indicator, $photoList);
    });

    $indicator.find('li').on('click', function() {
      self.updateSlider($(this), 'indicator', $indicator, $photoList);
    });
  }

  Gallery.prototype.updateSlider = function($element, type, $indicator, $photoList) {
    var self = this;

    // clear interval session
    clearInterval(this.intervalSession);

    if (this.options.type === 'fading') {
      $photoList.find('li:eq(' + this.curSlide + ')').fadeOut();
    }

    $indicator.find('li:eq(' + this.curSlide + ')').removeClass('active');

    if (type === 'next') {
      this.curSlide++;

      if (this.curSlide === this.totalSlides) {
        this.curSlide = 0;
      }
    } else if (type === 'previous') {
      this.curSlide--;

      if (this.curSlide < 0) {
        this.curSlide = this.totalSlides - 1;
      }
    } else {
      this.curSlide = $element.index();
    }

    if (this.options.type === 'scrolling') {
      $photoList.animate({
        'left': (this.curSlide * -this.galleryWidth)
      });
    }

    if (this.options.type === 'fading') {
      $photoList.find('li:eq(' + this.curSlide + ')').fadeIn();
    }

    $indicator.find('li:eq(' + this.curSlide + ')').addClass('active');

    // start interval session again
    this.intervalSession = setInterval(function() {
      self.runSlider(null, 'next', $indicator, $photoList);
    }, 5000);
  };

  Gallery.prototype.runSlider = function($element, type, $indicator, $photoList) {
    this.updateSlider(null, 'next', $indicator, $photoList);
  };

  return Gallery;
})();


/**
 * attach plugin to jQuery
 * @author: Nhut Le
 */
! function($, w) {
  'use strict';

  $.fn.gallery = function(options) {
    new Gallery($(this), $(w), options);

    return this;
  };
}(jQuery, window);
