var fullSlider = (function(){
  return {
    framesPorSwipe: function(){
      var $widthVentana = $(window).width();
      switch(true) {
        case ($widthVentana < 768):
          return 1;
          break;
        case ($widthVentana >= 768 && $widthVentana < 1024):
          return 2;
          break;
        case ($widthVentana >= 1024):
          return 3;
          break;
      }
    },
    anchoRelativoSlider: function($wrapper, $frames) {
      if (!$wrapper.hasClass('generanding')) {
        $wrapper.addClass('generanding');
        var nframes = $frames.length;
        var $fps = fullSlider.framesPorSwipe(); // sabiendo cuantos items irán
        $wrapper.css('width', ((nframes / $fps) * 100) + '%'); // dando ancho al wrapper
        $frames.css('width', (100 / nframes) + '%'); // dando ancho a los Items
        // reacomodando por redimención
        var $liActive = $wrapper.find('.active');
        if($liActive.length) {
          var $activeIndex = $liActive.index();
          switch($fps) {
            case 1:
              $wrapper.css('margin-left', '-' + ($activeIndex * 100) + '%');
              $wrapper.parent().data('frame', ($activeIndex * 100) + 1);
              break;
            case 2:
              $wrapper.css('margin-left', '-' + (($activeIndex - 1) * 50) + '%');
              $wrapper.parent().data('frame', (($activeIndex - 1) * 50));
              // carga la imagen q se agrego al viewport
              if ($activeIndex == 0) fullSlider.loadNextImage($frames.eq(1));
              break;
            case 3:
              $wrapper.css('margin-left', '-' + (($activeIndex - 2) * 33.33) + '%');
              $wrapper.parent().data('frame', (($activeIndex - 2) * 33.33) + 1);
              // carga las imagenes q se agregaron al viewport
              if ($activeIndex == 0) fullSlider.cargarImgLi($frames, 1, 3);
              if ($activeIndex == 1) fullSlider.loadNextImage($frames.eq(2));
              break;
          }
        } else {
          $wrapper.parent().data('frame', 1);
        }
        // quitando el pause de transición
        setTimeout(function(){
          $wrapper.removeClass('generanding');
        }, 1500);
      }
    },
    loadNextImage: function($theLi){
      var $imagenACargar = $theLi.find('img');
      var $dataBlazy = $imagenACargar.attr('data-blazy');
      if ($dataBlazy !== undefined) {
        $imagenACargar.attr('src', $dataBlazy).removeAttr('data-blazy');
        $theLi.addClass('loading');
        $imagenACargar.one('load', function(){
          $theLi.removeClass('loading');
        }).one('error', function(){
          $imagenACargar.attr('src', dgtCredential.imgComingSoon);
          $theLi.removeClass('loading');
        });
      }
      // marcando la imagen guía para redirecciòn
      $theLi.addClass('active').siblings().removeClass('active');
    },
    cargarImgLi: function($frames, indexLi, totalLis){
      if (indexLi !== totalLis) {
        var $liImagen = $frames.eq(indexLi);
        $liImagen.addClass('active').siblings().removeClass('active');// marcando la imagen guía para redirecciòn
        var $imagenACargar = $liImagen.find('img');
        var $dataBlazy = $imagenACargar.attr('data-blazy');
        if ($dataBlazy !== undefined) {
          $imagenACargar.attr('src', $dataBlazy).removeAttr('data-blazy');
          $liImagen.addClass('loading');
          $imagenACargar.one('load', function(){
            $liImagen.removeClass('loading');
            fullSlider.cargarImgLi($frames, indexLi + 1, totalLis)
          }).one('error', function(){
            $imagenACargar.attr('src', dgtCredential.imgComingSoon);
            $liImagen.removeClass('loading');
          });
        } else {
          fullSlider.cargarImgLi($frames, indexLi + 1, totalLis)
        }
      }
    },
    showMap: function($fsContainer){
      $fsContainer.find(".map-view").addClass('active');
      $fsContainer.find(".option-switch").removeClass("active");
      var $showMap = $fsContainer.find(".show-map");
      if (!$showMap.hasClass("active")) {
        $showMap.addClass("active");
        $fsContainer.addClass('active');
      }

      //mini map
      var $mapFS = $fsContainer.find(".map-result");
      if(!$mapFS.hasClass('built')) {
        var myLatLng2 = {
          lat: parseFloat($mapFS.data('lat')),
          lng: parseFloat($mapFS.data('lng'))
        };
        var $idResultMap = $mapFS.attr('id');
        var miniMap = new google.maps.Map(document.getElementById($idResultMap), {
          zoom: 16,
          center: myLatLng2,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
          },
        });
        var marker = new google.maps.Marker({
          position: myLatLng2,
          map: miniMap
        });
        $mapFS.addClass('built').removeAttr('data-lat data-lng');
      }
    },
    withoutLis: function($fsContainer){
      var $wrapperSlider = $fsContainer.find('.wrap-slider');
      var $lisSlider = $wrapperSlider.find('li');
      if(!$lisSlider.length){ // si no hay LIS, nos vamos a la vista mapa.
        return true;
      } else { // Si tenemos LI (imágenes)
        // Verificando si la primera imagen es 'comming soon' para pasar a la 'vista mapa'
        var $firstLiImg = $lisSlider.eq(0).find('img');
        var $theDataBlazy = $firstLiImg.attr('data-blazy'); 
        var $theSrcImg = $firstLiImg.attr('src');
        if($theSrcImg == undefined) { // existe el SRC, veamos si es una
          if($theDataBlazy != undefined) {
            if ($theDataBlazy == dgtCredential.imgComingSoon) {
              return true;
            } else {
              return false;
            }
          } else {
            console.log('Existe una imagen sin SRC y sin data blazy, no se puede definir si es coming soon');
            return false;
          } 
        } else {
          if ($theSrcImg == dgtCredential.imgComingSoon) {
            return true;
          } else {
            return false;
          }
          return true;
        }
      }
    },
    init: function($fsContainer){
      if($fsContainer.length && !$fsContainer.hasClass('built')){
        if(!fullSlider.withoutLis($fsContainer)) { // si hay imagenes que no son 'coming soon' en el slider.
          var $wrapperSlider = $fsContainer.find('.wrap-slider');
          var $frames = $wrapperSlider.find('li');
          if ($frames.length > 1) {
            fullSlider.anchoRelativoSlider($wrapperSlider.find('ul'), $frames);
            // Cargando por demanda las imagenes correspondientes:
            fullSlider.cargarImgLi($frames, 0, fullSlider.framesPorSwipe());
            // Marcando el contenedor indicando q yà se construyò el slider
            setTimeout(function(){
              $fsContainer.addClass('built'); 
            }, 1500);
            // Redimencionado el wrapper de los frames
            $(window).on('resize', function(){
              var $theUlwrap = $wrapperSlider.find('ul');
              setTimeout(function(){
                fullSlider.anchoRelativoSlider($theUlwrap, $frames);
                //fullSlider.cargarImgLi($frames, 0, fullSlider.framesPorSwipe());
              }, ((Number($theUlwrap.css('transition-duration').replace('s' ,'')) * 1000) * 2));
            });
            //
          } else {
            $wrapperSlider.find('.next, .prev').remove();
            fullSlider.cargarImgLi($frames, 0, fullSlider.framesPorSwipe());
          }
          $fsContainer.removeClass('wo-images');
        } else {
          $fsContainer.addClass('wo-images');
          setTimeout(function(){
            $fsContainer.find('.option-switch[data-view="map"]').trigger('click');
            $('#imagen-print').remove();
          }, 1000);
        }
      }
    }
  }
})();

fullSlider.init($('.full-slider'));

// Anida globalmente la activacion del modal de 'full screen'
$(document).on('click', '.full-screen', function() {
  var $wrapperSlider = $(this).parents('.full-slider').find('.wrap-slider');
  var $dataFrame = Number($wrapperSlider.data('frame'));
  var $frames = $wrapperSlider.find('ul > li');
  var liToClick;
  switch(fullSlider.framesPorSwipe()) {
    case 1:
      liToClick = ($dataFrame - 1) / 100;
      break;
    case 2:
      ($dataFrame == 1) ? liToClick = 1 : liToClick = ($dataFrame / 50) + 1;
      break;
    case 3:
      ($dataFrame == 1) ? liToClick = 2 : liToClick = Math.floor(($dataFrame / 33.33) + 2)
      break;
  }

  $frames.eq(liToClick).trigger("click");
});

var $modalImageProperty = $('#modal_img_propertie');
if ($modalImageProperty.length) {
  // Bindeando globalmente a los Li de cualquier Full slider
  $('body').on('click', '.full-slider .wrap-slider li, #list-floorplan li, .generic-list li', function(){
    var $itemIndex = $(this).index(); //Elemento de la lista al que se hizo clic
    var $itemAll = $(this).parent().find('li')
    var $itemLength = $itemAll.length;
    var $ptBuilding = $('#pt-building');
    // Creando el array de imagenes que creará el slider modal.
      var $theImgs = [];
      // Cuando es un lista de 'Floor Plans'
      var $dataImg = $(this).attr('data-img');
      if ($dataImg !== undefined) {
        $modalImageProperty.addClass("cr-floorplan");
        var $theImgs = [];
        $itemAll.each(function(){
          $theImgs.push($(this).attr('data-img'));
          //$(this).removeAttr('data-img'); q se quede para ser identificable luego.
        });
      // Cuando es una lista del 'Full Slide'
      } else { 
        $modalImageProperty.removeClass("cr-floorplan pt-building");
        // creando el array de imagenes, las yá cargadas y las por cargar (las que tienen carga por demanda).
        $itemAll.each(function(){
          var $img = $(this).find('img');
          var $imgDB = $img.attr('data-blazy');
          ($imgDB == undefined) ? $theImgs.push($img.attr('src')) : $theImgs.push($imgDB);
        });
        // identificando un slider de 'building detail'
        if($ptBuilding.length) $modalImageProperty.addClass('pt-building');
      }
    //
    $modalImageProperty.data('imagenes', $theImgs.join());
    $modalImageProperty.data('indeximg', $itemIndex + 1);
    // Insertando los datos de la propiedad en el modal
    var $modalTitle = $modalImageProperty.find('.title');
    $modalTitle.attr('data-titlebk', $modalTitle.html().trim()); // haciendo BK del texto del título para luego restaurarlo.
    var $titleModalPD = $modalTitle.find('span').text();
    var $fullMain = $(this).parents('.full-main');
    if($fullMain.length) {
      var titleObj = {};
      var $dataInf = $fullMain.find('.property-information').attr('data-inf');
      if($dataInf !== undefined) {
        $dataInf = $dataInf.split('|');
        $.each($dataInf, function(i, v){
          var key = v.split(':')[0];
          var val = v.split(':')[1]
          if(key == 'price') {
            val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          $titleModalPD = $titleModalPD.replace('%' + key + '%', val);
        });
        $modalImageProperty.find('.title span').text($titleModalPD);
      } else {
        if(!$ptBuilding.length) console.error('* Missing data-inf attribute, with data needed to show modal_img');
      }
    }
    // Insertando numeración e imagen clickeada
    var $wrapperImg = $modalImageProperty.find('.wrapper-img');
    // Poniendo la numeración
    var $numeration = $wrapperImg.find('.numeration');
    $numeration.find('span').eq(0).text($itemIndex + 1);
    $numeration.find('span').eq(1).text($itemLength);
    // Insertando url de imagen
    $wrapperImg.find('.img').attr('src', $theImgs[$itemIndex]);
    // Quitando o poniendo el opacity dependiendo del index del LI al que se hizo click
    var $buttonPrevMDP = $modalImageProperty.find('.prev');
    ($itemIndex) ? $buttonPrevMDP.removeClass('opacity') : $buttonPrevMDP.addClass('opacity');
    // Mostrando modal
    //$modalImageProperty.addClass('active_modal');
    modal.show('', 'modal_img_propertie');
  });

  // Navegación 'Next y Prev'
  $('body').on('click', '#modal_img_propertie .nav', function(){
    // armando el objeto
    var $imgList = $modalImageProperty.data('imagenes');
    if($imgList == undefined) {
      alert('Missing the "data:imagenes" attribute HTML5, in the element "#modal_img_propertie"');
      return false;
    } 
    var $imgArray = $imgList.split(','); // objeto de imagenes
    var $imgWrapper = $modalImageProperty.find('.wrapper-img');

    var $imgCurrent = $imgWrapper.find('.img'); // contenedor de la imagen actual
    var $imgCurrentIndex = Number($modalImageProperty.data('indeximg'));
    var $numeration = $imgWrapper.find('.numeration');
    var $buttonPrev = $(this).parent().find('.prev');

    // Detectando si es siguiente o anterior
    if ($(this).hasClass('next')) { // Click en NEXT
      if($imgCurrentIndex !== $imgArray.length) {
        $modalImageProperty.data('indeximg', $imgCurrentIndex + 1); // Aumentando el data ancla
        $numeration.find('span').eq(0).text($imgCurrentIndex + 1); // aumentando la numeraciòn en el bloque negro (Ejm: 3 - 55)
        $imgCurrent.attr('src', $imgArray[($imgCurrentIndex)])
        $imgWrapper.addClass('loading')
        $imgCurrent.on('load', function(){
          $imgWrapper.removeClass('loading');
        }).on('error', function(){
          $imgWrapper.removeClass('loading');
          $imgCurrent.attr('src', dgtCredential.imgComingSoon);
        });
        // Desopacitando el boton prev
        if ($buttonPrev.hasClass('opacity')) $buttonPrev.removeClass('opacity');
      } else {
        $imgCurrent.attr('src', $imgArray[0]);
        $numeration.find('span').eq(0).text('1');
        $buttonPrev.addClass('opacity');
        $modalImageProperty.data('indeximg', 1);
      }
    } else { // Click en PREV
      if ($imgCurrentIndex !== 1) {
        $numeration.find('span').eq(0).text($imgCurrentIndex - 1);
        $imgCurrent.attr('src', $imgArray[$imgCurrentIndex - 2]);
        $modalImageProperty.data('indeximg', $imgCurrentIndex - 1);
      }

      if ($imgCurrentIndex == 2) $buttonPrev.addClass('opacity');
    }
  });
  
  // Bindeando al touch en mobile del modal img propertie, anidado al FS
  var xDownb = null, yDownb = null;
  $('body').on('touchstart', '#modal_img_propertie', function(evt){
    xDownb = evt.touches[0].clientX;
    yDownb = evt.touches[0].clientY;
  });
  $('body').on('touchmove', '#modal_img_propertie', function(evt) {
    if ( ! xDownb || ! yDownb ) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDownb - xUp;
    var yDiff = yDownb - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { // si se mueve derecha o izquierda
      if ( xDiff > 0 ) { // izquierda
        $(this).find('.next').trigger('click');
      } else { // derecha
        $(this).find('.prev').trigger('click');
      }
    }
    xDownb = null;
    yDownb = null;
  });

  //Cierra modal de imagen de detalle de propiedad
  $('body').on('click', '#modal_img_propertie .close-slider-modal', function(){
    var $modalTitle = $modalImageProperty.find('.title');
    var $titlebk = $modalTitle.attr('data-titlebk');
    if($titlebk !== undefined) {
      $modalTitle.html($titlebk);
      $modalTitle.removeAttr('data-titlebk');
    }
    $modalImageProperty.find('.overlay_modal_closer').trigger('click');
  });

  // Binbeando teclas de navegación y de cierre
  $('body').on('keyup', function(e) {
    // Flechas,
    if($modalImageProperty.hasClass('active_modal')) {
      if (e.keyCode === 39) { // NEXT
        $modalImageProperty.find('.nav.next').trigger('click');
      }
      if (e.keyCode === 37) { // PREV
        $modalImageProperty.find('.nav.prev').trigger('click');
      }
    }
  });
  // Bindeando el cierre con 'Esc'
  $('body').on('keyup', function(e) {
    if($modalImageProperty.hasClass('active_modal')) {
      // Tecla Escape
      if (e.keyCode === 27){
        $modalImageProperty.find('.overlay_modal_closer').trigger('click');   // cierro la galería
      }
    }
  });
}

// Dando funcionalidad global a los botones de next y prev
$('body').on('click', '.full-slider .wrap-slider button', function(){ // BOTON NEXT
  var $wrapperSlider = $(this).parent();
  var $dataFrame = Number($wrapperSlider.data('frame'));
  var $wrapperFrames = $wrapperSlider.find('ul');
  var $frames = $wrapperSlider.find('li');
  var nframes = $frames.length;
  var $lisATomar = fullSlider.framesPorSwipe();
  if ($(this).hasClass('next')) { // CLICK EN NEXT
    switch($lisATomar) {
      case 1:
        if (($dataFrame - 1) !== ((nframes - 1) * 100)) {
          $wrapperFrames.css('margin-left', '-' + (($dataFrame - 1) + 100) + '%');
          $wrapperSlider.data('frame', ($dataFrame + 100));
          // Carga por demanda
          ($dataFrame == 1) ? fullSlider.loadNextImage($frames.eq($dataFrame)) : fullSlider.loadNextImage($frames.eq((($dataFrame - 1) / 100) + 1));
        } else {
          $wrapperFrames.css('margin-left', '0');
          $wrapperSlider.data('frame', 1);
          fullSlider.loadNextImage($frames.eq(0)); // para darme el active class
        }
        break;
      case 2:
        if ($dataFrame !== ((nframes * 50) - 100)) {
          if ($dataFrame == 1) {
            $wrapperFrames.css('margin-left', '-50%');
            $wrapperSlider.data('frame', 50);
            fullSlider.loadNextImage($frames.eq(2));
          } else {
            $wrapperFrames.css('margin-left', '-' + ($dataFrame + 50) + '%');
            $wrapperSlider.data('frame', $dataFrame + 50);
            fullSlider.loadNextImage($frames.eq(($dataFrame / 50) + 2));
          }
        } else {
          $wrapperFrames.css('margin-left', '0');
          $wrapperSlider.data('frame', 1);
          fullSlider.loadNextImage($frames.eq(1)); // para darme el active class
        }
        break;
      case 3:
        if ($dataFrame <= ((nframes * 33.33) - 100)) {
          $wrapperFrames.css('margin-left', '-' + (($dataFrame - 1) + 33.33) + '%');
          $wrapperSlider.data('frame', $dataFrame + 33.33);
          // Carga por demanda
          ($dataFrame == 1) ? fullSlider.loadNextImage($frames.eq(3)) : fullSlider.loadNextImage($frames.eq(Math.floor(($dataFrame / 33.33) + 3)));
        } else {
          $wrapperFrames.css('margin-left', '0');
          $wrapperSlider.data('frame', 1);
          fullSlider.loadNextImage($frames.eq(2)); // para darme el active class
        }
        break;
    }
  } else if ($(this).hasClass('prev')) { // elseif xq pueda q exista otro button XD;
    if ($dataFrame !== 1 && $dataFrame !== 0) {
      switch($lisATomar) {
        case 1:
          $wrapperFrames.css('margin-left', '-' + (($dataFrame - 1) - 100) +'%');
          $wrapperSlider.data('frame', '' + ($dataFrame - 100) + '');
          break;
        case 2:
          $wrapperFrames.css('margin-left', '-' + ($dataFrame - 50) + '%');
          $wrapperSlider.data('frame', $dataFrame - 50);
          break;
        case 3:
          $wrapperFrames.css('margin-left', '-' + (($dataFrame - 1) - 33.33) + '%');
          $wrapperSlider.data('frame', $dataFrame - 33.33);
          break;
      }
      fullSlider.loadNextImage($frames.eq($wrapperSlider.find('.active').index() - 1)); // para darme el active class
    }
  }
});

// Touch para FULL SLIDER
var xDown = null, yDown = null;
$('body').on('touchstart', '.full-slider .wrap-slider', function(evt){
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
});

$('body').on('touchmove', '.full-slider .wrap-slider', function(evt) {
  if ( ! xDown || ! yDown ) {
    return;
  }
  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;
  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;
  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { // si se mueve derecha o izquierda
    if ( xDiff > 0 ) { // izquierda
      $(this).find('.next').trigger('click');
    } else { // derecha
      $(this).find('.prev').trigger('click');
    }
  }
  xDown = null;
  yDown = null;
});