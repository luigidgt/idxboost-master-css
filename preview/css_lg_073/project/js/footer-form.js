(function($){
  const $footerForm = $('.rm-cfwrapper');
  if($footerForm.length) {
    // insertando placeholder
    $footerForm.find('.form-item').each(function(){
      let $input = $(this).find('.medium');
      if($input.length) {
        $input.attr('placeholder', $(this).find('span').text());
      }
    });

    // cambiando el texto del submit
     $footerForm.find('.clidxboost-btn-link span').text('Conectar con roberto');
  }
})(jQuery);