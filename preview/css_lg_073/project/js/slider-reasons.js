(function($){
  const $sliderReasons = $('#rm-rslider');
  if($sliderReasons.length) {
    $sliderReasons.greatSlider({
      type: 'swipe',
      nav: false,
      bullets: true,
      autoHeight: true,
      layout: {
        bulletDefaultStyles: false
      },
      breakPoints: {
        1280: {
          destroy: true
        }
      }
    });
  }
})(jQuery);