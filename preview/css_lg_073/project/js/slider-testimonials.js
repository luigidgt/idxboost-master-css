(function($){
  const $sliderTestimonials = $('#rm-tsslider');
  if($sliderTestimonials.length) {
    $sliderTestimonials.greatSlider({
      type: 'swipe',
      nav: false,
      bullets: true,
      autoHeight: true,
      layout: {
      	itemTag: 'article',
        wrapperItemsTag: 'div',
        bulletDefaultStyles: false
      }
    });
  }
})(jQuery);