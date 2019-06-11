(function($) {
  var $prefijo = "";

  /*------------------------------------------------------------------------------------------*/
  /* Asignando valor del select seleccionado en el item "Filtrar por" en la seccion de filtros
  /*------------------------------------------------------------------------------------------*/
  var $filterBy = $("#filter-by").find('select');
  var $textoFilterBy = $(".filter-text");
  $filterBy.change(function(){
    $textoFilterBy.text($(this).find('option:selected').text());
  });

	/*----------------------------------------------------------------------------------*/
	/* Show Password
	/*----------------------------------------------------------------------------------*/
	$('.showpassord').on('click', function(e) {
		e.preventDefault();
		var current = $(this).attr('action');

		if (current == 'hide') {
			$(this).prev().attr('type','text');
			$(this).addClass('blocked').attr('action','show');
		}

		if (current == 'show') {
			$(this).prev().attr('type','password');
			$(this).removeClass('blocked').attr('action','hide');
		}
	});

	/*----------------------------------------------------------------------------------*/
	/* Print
	/*----------------------------------------------------------------------------------*/
	$(document).on('click', '#print-btn', function(e) {
    e.preventDefault();
		var imgPrint = $('#full-slider .wrap-slider li:first-child').html();
		$("#imagen-print").html(imgPrint);

    $('#printMessageBox').fadeIn();
    $('#full-main').printArea({
      onClose: function () {
        $('#printMessageBox').fadeOut('fast');
      }
    });
  });


  /*$(window).load(function() {
    var $preloaderItem = $('.wrap-preloader');
    if ($preloaderItem.length) {
			$preloaderItem.addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$preloaderItem.removeClass('fadeOut').remove();
			});
    }
  });*/

  /*----------------------------------------------------------------------------------*/
  /* Modal Filters /  Active autocomplete
  /*----------------------------------------------------------------------------------*/
  $(document).on('click', '#active-autocomplete', function() {
    $(".modal-filters-mobile").addClass("active-auto-complete");
    $("#autocomplete-input").focus();
  });
  $(document).on('click', '#close-search-modal', function() {
    $(".modal-filters-mobile").removeClass("active-auto-complete");
  });

  /*----------------------------------------------------------------------------------*/
  /* Activar Boton
  /*----------------------------------------------------------------------------------*/
  /*$(document).on('click', '#btn-parking button, #btn-bathrooms button, #btn-bedrooms button', function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    }else{
      $(this).parents(".wrap-fm").find("button").removeClass("active");
      $(this).addClass("active");
    }
  });*/

}(jQuery));