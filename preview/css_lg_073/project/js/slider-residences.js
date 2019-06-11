(function($){
  const $sliderResidences = $('#rm-reslider');
  if($sliderResidences.length) {
    $sliderResidences.greatSlider({
      type: 'swipe',
      nav: false,
      bullets: true,
      layout: {
        bulletDefaultStyles: false
      },
      breakPoints: {
        768: {
          items: 2
        },
        1024: {
          items: 3
        },
        1366: {
          destroy: true
        }
      }
    });
  }
})(jQuery);