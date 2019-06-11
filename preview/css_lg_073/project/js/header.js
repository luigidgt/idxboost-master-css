(function($){
  const $flagMx = $('.rm-mxflag');
  if($flagMx.length) {
    $flagMx.click(function(){
      $('body, html').animate({scrollTop: $('.rm-agents').offset().top + 'px'}, 800, function(){
        var $rmAgents = $('.rm-agents');
        if ($rmAgents.length) {
          if (!$rmAgents.hasClass('animated')) $rmAgents.addClass('animated');
        }
      });
    });
  }
})(jQuery);