(function($){
  if($('body').hasClass('usp')) {
    $('.rm-bcwrapper, .lgl-btn-cta, .rm-btn-contact').click(function(e){
      e.preventDefault();
      $('body').addClass('rm-modal-form');
    });

    $('.rm-close-modal').click(function(e){
      $('body').removeClass('rm-modal-form');
    });
  };
})(jQuery);