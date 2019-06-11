(function($) {

  $(document).on('click', '.idx-box-item .idx-active', function() {
    $(this).parent().find('.idx-table-body').toggleClass('active-list');
  });

}(jQuery));