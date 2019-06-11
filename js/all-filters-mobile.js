(function($) {

  /*----------------------------------------------------------------------------------*/
  /* Modal Filters /  Active autocomplete
  /*----------------------------------------------------------------------------------*/
  $(document).on('click', '#ib-active-autocomplete', function() {
    $(".ib-modal-filters-mobile").addClass("ib-active-auto-complete");
    $("#ib-autocomplete-input").focus();
  });

  $(document).on('click', '#ib-close-search-modal', function() {
    $(".ib-modal-filters-mobile").removeClass("ib-active-auto-complete");
  });

  /*----------------------------------------------------------------------------------*/
  /* Select Bedrooms
  /*----------------------------------------------------------------------------------*/
  $(document).on('change', '#ib-bedrooms-collapse select', function() {
    var $selectValue = $(this).val();
    if($selectValue !== ''){
      $('#ib-bedrooms-collapse').find('input:checked').prop('checked', false);
    }
  });

  /*----------------------------------------------------------------------------------*/
  /* Radio button Bedrooms
  /*----------------------------------------------------------------------------------*/
  $(document).on('click', '#ib-bedrooms-collapse input', function() {
    var $radioStatus = $(this);
    if ($radioStatus.is(':checked')) {
      $('#ib-bedrooms-collapse select').val('').change();
    }
  });

  /*----------------------------------------------------------------------------------*/
  /* Limpiando todo
  /*----------------------------------------------------------------------------------*/
  $(document).on('click', '#ib-apply-clear', function() {
    $('#ib-autocomplete-input').val('');
    $('#ib-min-price, #ib-min-living, #ib-min-land, #ib-min-year').val('0').change();
    $('#ib-max-price, #ib-max-living, #ib-max-land, #ib-max-year').val('any').change();
    $('#ib-bedrooms-from').val('').change();
    $('#ib-bedrooms-to').val('').change();
    $('.ib-body-modal-filters-mobile').find('input:checked').prop('checked', false);
    $('.ib-body-modal-filters-mobile').find('input:radio[value=0]').prop('checked', true);
  });

  /*----------------------------------------------------------------------------------*/
  /* Autocomplete Demo
  /*----------------------------------------------------------------------------------*/
  var demoList = [
      "Aventura",
      "Bal Harbour",
      "Bay Harbor Islands",
      "Biscayne Gardens",
      "Biscayne Park",
      "Brickell",
      "Brickell Key",
      "Coconut Grove",
      "Coral Gables",
      "Doral",
      "El Portal",
      "Fisher Island",
      "Golden Beach",
      "Hallandale",
      "Hialeah",
      "Hialeah Gardens",
      "Hollywood",
      "Homestead",
      "Indian Creek",
      "Kendall",
      "Key Biscayne",
      "Miami",
      "Miami Beach",
      "Miami Gardens",
      "Miami Lakes",
      "Miami Shores",
      "Miami Springs",
      "Miramar",
      "North Bay Village",
      "North Miami",
      "North Miami Beach",
      "Opa-Locka",
      "Pembroke Pines",
      "Pinecrest",
      "South Miami",
      "Sunny Isles Beach",
      "Surfside"
    ];
    $("#ib-autocomplete-input").autocomplete({
      source: demoList,
      minLength: 0,
      appendTo: ".ib-filter-content-autocomplete"
    }).focus(function () {
        $(this).autocomplete("search");
    });

}(jQuery));