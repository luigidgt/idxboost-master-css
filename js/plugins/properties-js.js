(function () {

  jQuery(window).on('load', function () {
    var avatarImg = jQuery(".content-avatar-image .lazy-img").attr("data-src");
    if (typeof (avatarImg) != 'undefined') {
      jQuery(".content-avatar-image .lazy-img").attr("src", avatarImg).removeAttr("data-src").addClass("active");
    }
    var mapImg = jQuery("#min-map").attr("data-map-img");
    if (typeof (mapImg) != 'undefined') {
      jQuery("#min-map").css("background-image", "url('" + mapImg + "')").removeAttr("data-map-img");
    }
    jQuery(window).scroll(function () {
      window_y = jQuery(window).scrollTop();
      var mapLat = jQuery("#content-map #map").attr("data-lat");
      var mapLng = jQuery("#content-map #map").attr("data-lng");
      if (window_y >= 300) {
        jQuery(".similar-properties .lazy-img").each(function () {
          var imagen = jQuery(this).attr("data-src");
          if (typeof (imagen) != 'undefined') {
            jQuery(this).attr("src", imagen).removeAttr("data-src").addClass("active");
          }
        });
        if ((typeof (mapLat) != 'undefined') && (typeof (mapLng) != 'undefined')) {
          showFullMap();
        }
      } else { }
    });
  });

  temporalHeight();
  jQuery(window).resize(function () {
    temporalHeight();
  });

  function showFullMap() {
    var flex_map_mini_view = jQuery("#map");
    var myLatLng2 = {
      lat: parseFloat(flex_map_mini_view.data('lat')),
      lng: parseFloat(flex_map_mini_view.data('lng'))
    };
    var miniMap = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: myLatLng2
    });
    var marker = new google.maps.Marker({
      position: myLatLng2,
      map: miniMap
    });

    jQuery("#map").removeAttr("data-lat");
    jQuery("#map").removeAttr("data-lng");
  }

  function temporalHeight() {
    var finalTop = (jQuery(".property-information").height()) + (jQuery(".panel-options").innerHeight()) + 30;
    var heightContent = jQuery("#property-description").height();
    var finalHeight = heightContent + 60;
    jQuery(".temporal-content").height(finalHeight).css({ 'top': finalTop + 'px' });
  }

  // FULL SLIDER
  var $ventana = jQuery(window);
  var $widthVentana = $ventana.width();
  function anchoRelativoSlider(wrapper, frames) {
    var nframes = frames.length;
    wrapper.css('width', ((nframes / lisATomar) * 100) + '%');
    frames.css('width', (100 / nframes) + '%');
  }

  function framesPorSwipe() {
    switch (true) {
      case ($widthVentana < 768):
        lisATomar = 1;
        break
      case ($widthVentana >= 768 && $widthVentana < 1024):
        lisATomar = 2;
        break
      case ($widthVentana >= 1024):
        lisATomar = 3;
        break
    }
  }

  $ventana.on('resize', function () {
    $widthVentana = $ventana.width();
    setTimeout(function () {
      framesPorSwipe();
      anchoRelativoSlider($wrapperSlide, $frames);
    }, 100)
  });

  // Saber cuantos LI tomar
  var lisATomar = 0;
  framesPorSwipe(); // averiguo cuantos LI debo tomar, dependiendo la resolución de la pantalla
  var $fullMain = jQuery('#full-main');
  var $fullSlider = jQuery('#full-slider .wrap-slider');

  if ($fullSlider.length) {
    var $wrapperSlide = $fullSlider.find('ul');
    var $frames = $wrapperSlide.find('li');
    var nframes = $frames.length;

    if (nframes > 1) {
      anchoRelativoSlider($wrapperSlide, $frames);
      $wrapperSlide.data('frame', '1');

    } else {
      $fullSlider.find('.next, .prev').css('display', 'none');
      console.log('No hay frames para crear el slider');
    }

  } else {
    console.log('No existe el full slider');
  }

}());