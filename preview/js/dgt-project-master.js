(function($) {

  $(document).on('click', '.idx-wrap-grid .idx-btn-map', function() {

    var imgMap = $(this).parents('.idx-item-grid').find('.idx-item-grid-map').attr('data-blazy');
    $(this).parents('.idx-item-grid').find('.idx-item-grid-map').attr('src',imgMap).removeAttr('data-blazy');
    $(this).parents('.idx-wrap-item-grid').toggleClass("active-map");

  });

}(jQuery));