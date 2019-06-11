(function($){
  const $home = $('.home');
  if($home.length) {
    $(window).on('scroll', function(){
      if($(this).scrollTop() >= 126){
        if (!$('body').hasClass('header-fixed')) $('body').addClass('header-fixed');
      } else {
       if ($('body').hasClass('header-fixed')) $('body').removeClass('header-fixed');
      }
    });
  }
})(jQuery);