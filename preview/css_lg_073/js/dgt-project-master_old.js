(function(){
  var $ventana = $(window);
  var $cuerpo = $('body');
  var $htmlcuerpo = $('html, body');

  // Slider del main (Home)
  var $sliderMain = $('#slider-main');
  if ($sliderMain.length) {
    var $ulSlider = $sliderMain.find('> ul')
    var $lisSlider = $ulSlider.find('> li');
    var nLis = $lisSlider.length;
    if (nLis > 1) {
      // Dandole ancho relativo al Ul y a los Li.
      $ulSlider.css('width', (nLis * 100) + '%');
      $lisSlider.css('width', (100 / nLis) + '%');
      // creando Bullets y activando el active al primer boton, la activacion viene en la funcion de creaciÃ³n.
      var $bltsSliderMain = $sliderMain.find('.bullets');
      creaBullets(nLis, $bltsSliderMain);
      var $bulletsSliderMain = $bltsSliderMain.find('button');
      // Boton next y prev
      var $btnNext = $sliderMain.find('.next');
      $btnNext.on('click', function(){
        if (!$ulSlider.hasClass('swiping')) {
          var $elLiActivo = $bltsSliderMain.find('.active').index();
          if (($elLiActivo + 1) !== $bulletsSliderMain.length) {
            $bulletsSliderMain.eq($elLiActivo + 1).trigger('click');
          } else {
            $bulletsSliderMain.eq(0).trigger('click');
          }
        }
      });
      var $btnPrev = $sliderMain.find('.prev');
      $btnPrev.on('click', function(){
        if (!$ulSlider.hasClass('swiping')) {
          var $elLiActivo = $bltsSliderMain.find('.active').index();
          if ($elLiActivo !== 0) {
            $bulletsSliderMain.eq($elLiActivo - 1).trigger('click');
          }
        }
      });
      // Agregando funciÃ³n Click a los bullets
      $bulletsSliderMain.on('click', function(){
        if (!$ulSlider.hasClass('swiping')) {
          //console.log('hice click, Hora: ' + getDateTime());
          $ulSlider.addClass('swiping');
          var $indexButton = $(this).index();
          $ulSlider.css('margin-left', '-' + ($indexButton * 100) +'%');
          apareceImagen($lisSlider.eq($indexButton));
          $lisSlider.eq($indexButton).addClass('active').removeClass('active');
          $bulletsSliderMain.eq($indexButton).addClass('active').siblings().removeClass('active');
          $ulSlider.removeClass('swiping'); 
        }
      });
      // Hover en barra ploma y en el nav de bullets
      $sliderMain.find('.gray-bar, .nav, .next-prev').mouseenter(function() {
          if ($ulSlider.hasClass('interval')) {
            $ulSlider.removeClass('interval').addClass('hover');
          }
      }).mouseleave(function(){
          if (!$ulSlider.hasClass('interval') || !$ulSlider.hasClass('modal-video')) {
            $ulSlider.removeClass('hover').addClass('interval');
          }
      });
      // Dandole el desplazamiento al slide, a traves de touch
      touchSlider($ulSlider, $bulletsSliderMain);
      // Empezando el slider;
      apareceImagen($lisSlider.eq(0));
      setInterval(autoPlayM, 5000);
    } else {
      $sliderMain.find('.nav').css('display', 'none');
    }
  };
  
  // AutoPlay.
  function autoPlayM() {
    if ($ulSlider.hasClass('interval') || !$ulSlider.hasClass('hover')) {
      if (!$ulSlider.hasClass('modal-video')) {
        var $elLiActivo = $bltsSliderMain.find('.active').index();
        if (($elLiActivo + 1) !== $bulletsSliderMain.length) {
          $bulletsSliderMain.eq($elLiActivo + 1).trigger('click');
        } else {
          $bulletsSliderMain.eq(0).trigger('click');
        }
      }
    }
  };

  function apareceImagen(li){
    var $elLi = li.find('> img');
    var $srcOriginal = $elLi.attr('data-blazy');
    if ($srcOriginal !== undefined) {
      $ulSlider.removeClass('interval');
      $elLi.attr('src', $srcOriginal).removeAttr('data-blazy');
      li.addClass('loading');
      $elLi.on('load', function(){
        li.removeClass('loading');
        if ($elLi.hasClass('blazy')) {
          $elLi.removeClass('blazy');
        }
        if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
          $ulSlider.addClass('interval');
          if (!$ulSlider.hasClass('built')) {
            //setInterval(autoPlayM, 5000);
            $ulSlider.addClass('built');
          }
        }
      });
    } else {
      if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
        $ulSlider.addClass('interval');
      }
    }
  }

  /**************************************************************/

  // Slider de Exclusive Listing (Home)
  var $sliderExclusive = $('#slider-properties');
  if ($sliderExclusive.length) {
    var $ulSliderEx = $sliderExclusive.find('> ul');
    var $lisSliderEx = $ulSliderEx.find('> li');
    var nLisEx = $lisSliderEx.length;
    if (nLisEx > 1) {
      var $contentBulletsEx = $sliderExclusive.find('.bullets');
      // Dando ancho relativo al slider maestro, ahora compatible con 768px de ancho

      if ($ventana.width() > 1024) { // Se muestran 4 items

        $ulSliderEx.css('width', ((nLisEx / 4) * 100) + '%');
        $lisSliderEx.css('width', ((100 / nLisEx) - 0.4) + '%');
        // Creando bullets
        creaBullets((nLisEx / 4), $contentBulletsEx);

      } else if (($ventana.width() > 768) && ($ventana.width() <= 1024)) { // Se muestran 3 Items

        $ulSliderEx.css('width', ((nLisEx / 3) * 100) + '%');
        $lisSliderEx.css('width', ((100 / nLisEx) - 0.4) + '%');
        // Creando bullets y activando el primer bullet
        creaBullets((nLisEx / 3), $contentBulletsEx);

      } else if (($ventana.width() >= 640) && ($ventana.width() <= 768)) { // Se muestran 2 Items

        $ulSliderEx.css('width', ((nLisEx / 2) * 100) + '%');
        $lisSliderEx.css('width', ((100 / nLisEx) - 0.4) + '%');
        // Creando bullets y activando el primer bullet
        creaBullets((nLisEx / 2), $contentBulletsEx);

      } else if ($ventana.width() < 640) { // Se muestra 1 item

        $ulSliderEx.css('width', (nLisEx * 100) + '%');
        $lisSliderEx.css('width', (100 / nLisEx) + '%');
        // Creando bullets y activando el primer bullet
        creaBullets(nLisEx, $contentBulletsEx);
      
      }

      $( window ).resize(function() {

        if ($ventana.width() > 1024) { // Se muestran 4 items
          $ulSliderEx.css('width', ((nLisEx / 4) * 100) + '%');
          $lisSliderEx.css('width', ((100 / nLisEx) - 0.4) + '%');
          // Creando bullets
          creaBullets((nLisEx / 4), $contentBulletsEx);
        } else if (($ventana.width() > 768) && ($ventana.width() <= 1024)) { // Se muestran 3 Items
          $ulSliderEx.css('width', ((nLisEx / 3) * 100) + '%');
          $lisSliderEx.css('width', ((100 / nLisEx) - 0.4) + '%');
          // Creando bullets y activando el primer bullet
          creaBullets((nLisEx / 3), $contentBulletsEx);
        } else if (($ventana.width() >= 640) && ($ventana.width() <= 768)) { // Se muestran 2 Items
          $ulSliderEx.css('width', ((nLisEx / 2) * 100) + '%');
          $lisSliderEx.css('width', ((100 / nLisEx) - 0.4) + '%');
          // Creando bullets y activando el primer bullet
          creaBullets((nLisEx / 2), $contentBulletsEx);
        } else if ($ventana.width() < 640) { // Se muestra 1 item
          $ulSliderEx.css('width', (nLisEx * 100) + '%');
          $lisSliderEx.css('width', (100 / nLisEx) + '%');
          // Creando bullets y activando el primer bullet
          creaBullets(nLisEx, $contentBulletsEx);
        }

      });

      var $botonesNavEx = $contentBulletsEx.find('button');
      // Hover en el nav y en el ul mastero
      $sliderExclusive.find('.nav, > ul').mouseenter(function() {
          $ulSliderEx.removeClass('interval').addClass('hover');
      }).mouseleave(function(){
          $ulSliderEx.removeClass('hover').addClass('interval');
      });

      // Agregando funcion Click a los bullets
      $botonesNavEx.on('click', function(){
        if (!$ulSliderEx.hasClass('swiping')) {
          $ulSliderEx.addClass('swiping');
          var $indexButton = $(this).index();
          $ulSliderEx.css('margin-left', '-' + ($indexButton * 100) +'%');
          if ($ventana.width() >= 768) {
            apareceImagenB($lisSliderEx.eq($indexButton * 2)); // por EQ de Jquery se trata menos 1
            apareceImagenB($lisSliderEx.eq(($indexButton * 2) + 1));
          } else {
            apareceImagenB($lisSliderEx.eq($indexButton));
            $lisSliderEx.eq($indexButton).addClass('active').siblings().removeClass('active');
          }
          $botonesNavEx.eq($indexButton).addClass('active').siblings().removeClass('active');
          $ulSliderEx.removeClass('swiping');      
        }
      });


      // Boton next y prev
      var $btnNextProv = $sliderMain.find('.next');
      $btnNext.on('click', function(){
        if (!$ulSlider.hasClass('swiping')) {
          var $elLiActivo = $bltsSliderMain.find('.active').index();
          if (($elLiActivo + 1) !== $bulletsSliderMain.length) {
            $bulletsSliderMain.eq($elLiActivo + 1).trigger('click');
          } else {
            $bulletsSliderMain.eq(0).trigger('click');
          }
        }
      });

      var $btnPrev = $sliderMain.find('.prev');
      $btnPrev.on('click', function(){
        if (!$ulSlider.hasClass('swiping')) {
          var $elLiActivo = $bltsSliderMain.find('.active').index();
          if ($elLiActivo !== 0) {
            $bulletsSliderMain.eq($elLiActivo - 1).trigger('click');
          }
        }
      });

      // Touch para mobviles
      touchSlider($ulSliderEx, $botonesNavEx);
      // Aparacer la imagen del slider maestro
      var autoPlaySliderEx;
    } else {
      $sliderExclusive.find('.nav').css('display', 'none');
    }
  };

  // AutoPlay.
  function autoPlayEx() {
    if ($ulSliderEx.hasClass('interval') || !$ulSliderEx.hasClass('hover')) {
      var $elLiActivo = $contentBulletsEx.find('.active').index();
      if (($elLiActivo + 1) !== $botonesNavEx.length) {
        $botonesNavEx.eq($elLiActivo + 1).trigger('click');
      } else {
        $botonesNavEx.eq(0).trigger('click');
      }
    }
  };

  // Slider del main (Home)
  var $sliderTest = $('#slider-testimonial');
  if ($sliderTest.length) {
    var $ulSliderTest = $sliderTest.find('> ul')
    var $lisSliderTest = $ulSliderTest.find('> li');
    var nLisTest = $lisSliderTest.length;
    if (nLisTest > 1) {
      // Dandole ancho relativo al Ul y a los Li.
      $ulSliderTest.css('width', (nLisTest * 100) + '%');
      $lisSliderTest.css('width', (100 / nLisTest) + '%');
      // creando Bullets y activando el active al primer boton, la activacion viene en la funcion de creaciÃ³n.
      var $bltssliderTest = $sliderTest.find('.bullets');
      creaBullets(nLisTest, $bltssliderTest);
      var $bulletssliderTest = $bltssliderTest.find('button');
      // Boton next y prev
      var $btnNextTest = $sliderTest.find('.next');
      $btnNextTest.on('click', function(){
        if (!$ulSliderTest.hasClass('swiping')) {
          var $elLiActivoTest = $bltssliderTest.find('.active').index();
          if (($elLiActivoTest + 1) !== $bulletssliderTest.length) {
            $bulletssliderTest.eq($elLiActivoTest + 1).trigger('click');
          } else {
            $bulletssliderTest.eq(0).trigger('click');
          }
        }
      });
      var $btnPrevTest = $sliderTest.find('.prev');
      $btnPrevTest.on('click', function(){
        if (!$ulSliderTest.hasClass('swiping')) {
          var $elLiActivoTest = $bltssliderTest.find('.active').index();
          if ($elLiActivoTest !== 0) {
            $bulletssliderTest.eq($elLiActivoTest - 1).trigger('click');
          }
        }
      });
      // Agregando funciÃ³n Click a los bullets
      $bulletssliderTest.on('click', function(){
        if (!$ulSliderTest.hasClass('swiping')) {
          //console.log('hice click, Hora: ' + getDateTime());
          $ulSliderTest.addClass('swiping');
          var $indexButtonTest = $(this).index();
          $ulSliderTest.css('margin-left', '-' + ($indexButtonTest * 100) +'%');
          //apareceImagen($lisSliderTest.eq($indexButtonTest));
          $lisSliderTest.eq($indexButtonTest).addClass('active').removeClass('active');
          $bulletssliderTest.eq($indexButtonTest).addClass('active').siblings().removeClass('active');
          $ulSliderTest.removeClass('swiping'); 
        }
      });
      // Hover en barra ploma y en el nav de bullets
      $sliderTest.find('.gray-bar, .nav, .next-prev').mouseenter(function() {
          if ($ulSliderTest.hasClass('interval')) {
            $ulSliderTest.removeClass('interval').addClass('hover');
          }
      }).mouseleave(function(){
          if (!$ulSliderTest.hasClass('interval') || !$ulSliderTest.hasClass('modal-video')) {
            $ulSliderTest.removeClass('hover').addClass('interval');
          }
      });
      // Dandole el desplazamiento al slide, a traves de touch
      touchSlider($ulSliderTest, $bulletssliderTest);
      // Empezando el slider;
      //apareceImagen($lisSliderTest.eq(0));
      setInterval(autoPlayTest, 5000);
    } else {
      $sliderTest.find('.nav').css('display', 'none');
    }
  };
  
  // funciones Ãºtiles
  // AutoPlay.
  function autoPlayTest() {
    if ($ulSliderTest.hasClass('interval') || !$ulSliderTest.hasClass('hover')) {
      if (!$ulSliderTest.hasClass('modal-video')) {
        var $elLiActivoTest = $bltssliderTest.find('.active').index();
        if (($elLiActivoTest + 1) !== $bulletssliderTest.length) {
          $bulletssliderTest.eq($elLiActivoTest + 1).trigger('click');
        } else {
          $bulletssliderTest.eq(0).trigger('click');
        }
      }
    }
  };

  function touchSlider(ulSlider, botonesNav) {
    var xDown = null;                                                 
    var yDown = null;   
    ulSlider.on('touchstart', function(evt){
      xDown = evt.touches[0].clientX;                               
      yDown = evt.touches[0].clientY;
    });
    ulSlider.on('touchmove', function(evt) {
      if ( ! xDown || ! yDown ) {
        return;
      }
      var xUp = evt.touches[0].clientX;                      
      var yUp = evt.touches[0].clientY;
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { // si se mueve derecha o izquierda
        evt.preventDefault();
        ulSlider.trigger('mouseenter');
        var nLis = botonesNav.length;
        var $elLiActivo = itemActivo(botonesNav);
        if ( xDiff > 0 ) { // izquierda
          if (($elLiActivo + 1) !== nLis) {
            botonesNav.eq($elLiActivo + 1).trigger('click');
            ulSlider.trigger('mouseleave');
          } else {
            botonesNav.eq(0).trigger('click');
            ulSlider.trigger('mouseleave');
          }
        } else { // derecha
          if ($elLiActivo !== 0) {
            botonesNav.eq($elLiActivo - 1).trigger('click');
            ulSlider.trigger('mouseleave');
          }
        }                       
      }
      xDown = null;
      yDown = null;
    });
  }

  function itemActivo(losLi){ // refactorizar esto (nueva idea para la funciÃ³n).
    var nLis = losLi.length;
    for(var s = 0; s < nLis; s++) {
      if (losLi.eq(s).hasClass('active')) {
        return s;
      }
    }
  }

  function creaBullets(numeroLis, contentBullets){
    if (contentBullets.length) {
      // borro los botones previos que existan.
      if (contentBullets.find('> *').length) {
        contentBullets.empty();
      } 
      // Creo los botones
      var b = 0;
      while(b < numeroLis){
        if (b == 0) {
          contentBullets.append('<button class="active"></button>');
        } else {
          contentBullets.append('<button></button>');        
        }
        b++
      }
    } else {
      console.log('El contenedor .NAV no existe, no puedo crear los botones de navegaciÃ³n.');
    }
  }

  function bottomRelativePresident(){
    if ($ventana.width() >= 768) {
      var $president = $('#president');
      if ($president.length) {
        $president.find('.jo-ann-forster').css('bottom', '-' + ((($president.outerHeight() - $president.find('.bg-white').height()) / 2) + (Number($president.css('padding-bottom').replace('px', '')) / 2)) + 'px');
        /* OperaciÃ³n matemÃ¡tica
          1.- Tomamos al alto de la secciÃ³n
          2.- le restamos a ese alto el alto del contenedor .bg-white
          3.- al resultado de esa resta lo dividimos entre 2
          4.- y luego le sumamos la mitad del relleno inferior de la secciÃ³n
          ::: ese serÃ¡ el 'bottom' (propiedad css) negativo de la imagen
          ::: ((530 - 344) / 2) + 20
        */
      }
    }
  }

  function creaIframeVideo(elBoton){
    var $urlVideo = elBoton.attr('data-video');
    if ($urlVideo !== undefined) {
      var $urlVideo = $urlVideo.toString();
      if ($urlVideo.indexOf('youtube') !== -1) { // es un video de Youtube, EJM: https://www.youtube.com/watch?v=9RBSH7Xvn3Q
        var srcVideo = 'https://www.youtube.com/embed/' + $urlVideo.substring($urlVideo.length - 11, $urlVideo.length) + '?autoplay=1';
      } else if ($urlVideo.indexOf('vimeo') !== -1) { // es un video de Vimeo, EJM: https://vimeo.com/206418873
        var srcVideo = 'https://player.vimeo.com/video/' + $urlVideo.substring(($urlVideo.indexOf('.com') + 5), $urlVideo.length).replace('/', '');
      } else {
        alert('El video asignado no es de Youtuve ni de Vimeo, recuerda ingresar el enlace completo del video en el formato correcto.\n - Youtube: https://www.youtube.com/watch?v=9RBSH7Xvn3Q\n - Vimeo: https://vimeo.com/206418873');
        return false;
      }
      return '<iframe src="' + srcVideo + '" frameborder="0" allowfullscreen></iframe>';
    } else {
      alert('No se tiene un video asignado.');
      return false;
    }
  }

  function apareciendoBlazys(laSeccion) {
    var $losBlazy = laSeccion.find('.blazy'); 
    var nBLazys = $losBlazy.length;
    if (nBLazys) {
      for(var b = 0; b < nBLazys; b++) {
        var $elBlazy = $losBlazy.eq(b);
        var $originalSrc = $elBlazy.attr('data-blazy');
        if ($originalSrc !== undefined) {
          $elBlazy.attr('src', $originalSrc);
          /*
           ////////// AGREGAR UNA MEJOR CONDICIONAL PARA RESPONSIVE (data-responsive)
          var $nresponsive = $elBlazy.attr('data-responsive');
          if ($nresponsive !== undefined) {
            if ($ventana.width() >= Number($nresponsive)) {
              $elBlazy.attr('src', $originalSrc);
            }
          } else {
            $elBlazy.attr('src', $originalSrc);
          }
          */
          $elBlazy.removeAttr('data-blazy').removeClass('blazy');
        } else {
          console.log('Aviso: En la secciÃ³n con ID: "' + laSeccion.attr('ID') + '" existe un elemento que tiene la clase "Blazy", pero no tiene el "data-blazy", por lo tanto no se trabajarÃ¡ con Ã©l.');
        }
      }
    }
  }

  function apareceImagenB(li){
    if (li.length) {
      var $imgLi = li.find('.slider-img').find('> ul > li:eq(0) img');
      var $srcOriginal = $imgLi.attr('data-blazy');
      if ($srcOriginal !== undefined) {
        if ($ventana.width() < 1024) {
          $ulSliderEx.removeClass('interval');
        }
        $imgLi.attr('src', $srcOriginal).removeAttr('data-blazy');
        li.addClass('loading');
        $imgLi.on('load', function(){
          $(this).css('opacity', '1');
          li.removeClass('loading');
          if ($ventana.width() < 1024) {
            if (!$ulSliderEx.hasClass('built')) {
              setInterval(autoPlayEx, 5000);
              $ulSliderEx.addClass('built');
            }
            if (!$ulSliderEx.hasClass('interval') && !$ulSliderEx.hasClass('hover')) {
              $ulSliderEx.addClass('interval');
            }
          }
          if ($imgLi.hasClass('blazy')) {
            $imgLi.removeClass('blazy');
          }
        });
      } else {
        if ($ventana.width() < 1024) {
          if (!$ulSliderEx.hasClass('interval') && !$ulSliderEx.hasClass('hover')) {
            $ulSliderEx.addClass('interval');
          }
        }
      }
    }
  }

  function apareceImagenC(li){
    var $imgLi = li.find('> img');
    var $srcOriginal = $imgLi.attr('data-blazy');
    if ($srcOriginal !== undefined) {
      $imgLi.attr('src', $srcOriginal).removeAttr('data-blazy');
      li.addClass('loading');
      $imgLi.on('load', function(){
        $(this).css('opacity', '1');
        li.removeClass('loading');
        // Quito clase blazy
        if ($imgLi.hasClass('blazy')) {
          $imgLi.removeClass('blazy');
        }
      });
    }
  }

  function apareceImagenD(li){
    if (li.length) {
      var $imgLi = li.find('> img');
      var $srcOriginal = $imgLi.attr('data-blazy');
      if ($srcOriginal !== undefined) {
        if ($ventana.width() < 1024) {
          $ulSliderNbh.removeClass('interval');
        }
        $imgLi.attr('src', $srcOriginal).removeAttr('data-blazy');
        li.addClass('loading');
        $imgLi.on('load', function(){
          $(this).css('opacity', '1');
          li.removeClass('loading');
          if ($ventana.width() < 1024) {
            if (!$ulSliderNbh.hasClass('built')){
              setInterval(autoPlayNbh, 5000);
              $ulSliderNbh.addClass('built');
            }
            if (!$ulSliderNbh.hasClass('interval') && !$ulSliderNbh.hasClass('hover')) {
              $ulSliderNbh.addClass('interval');
            }
          }
          if ($imgLi.hasClass('blazy')) {
            $imgLi.removeClass('blazy');
          }
        });
      } else {
        if ($ventana.width() < 1024) {
          if (!$ulSliderNbh.hasClass('interval') && !$ulSliderNbh.hasClass('hover')) {
            $ulSliderNbh.addClass('interval');
          }
        }
      }
    }
  }

  function apareceImagenE(li){ // falta mejorar esta funcion , por el interval doble
    if (li.length) {
      var $imgLi = li.find('> img');
      var $srcOriginal = $imgLi.attr('data-blazy');
      if ($srcOriginal !== undefined) {
        if ($ventana.width() < 1024) {
          $ulSliderOt.removeClass('interval');
        }
        $imgLi.attr('src', $srcOriginal).removeAttr('data-blazy');
        li.addClass('loading');
        $imgLi.on('load', function(){
          $(this).css('opacity', '1');
          li.removeClass('loading');
          if ($ventana.width() < 1024) {
            if(!$ulSliderOt.hasClass('built')) {
              setInterval(autoPlayOt, 5000);
              $ulSliderOt.addClass('built');
            }
            if (!$ulSliderOt.hasClass('interval') && !$ulSliderOt.hasClass('hover')) {
              $ulSliderOt.addClass('interval');
            }
          }
          if ($imgLi.hasClass('blazy')) {
            $imgLi.removeClass('blazy');
          }
        });
      } else {
        if ($ventana.width() < 1024) {
          if (!$ulSliderOt.hasClass('interval') && !$ulSliderOt.hasClass('hover')) {
            $ulSliderOt.addClass('interval');
          }
        }
      }
    }
  }

  function apareceImagenF(li){
    var $elLi = li.find('> img');
    var $srcOriginal = $elLi.attr('data-blazy');
    if ($srcOriginal !== undefined) {
      $ulSliderTes.removeClass('interval');
      $elLi.attr('src', $srcOriginal).removeAttr('data-blazy');
      li.addClass('loading');
      $elLi.on('load', function(){
        if($ulSliderTes.hasClass('built')) {
          setInterval(autoPlayTes, 5000);
          $ulSliderTes.addClass('built');
        }
        $(this).css('opacity', '1');
        if (li.hasClass('loading')) {
          li.removeClass('loading');
        }
        if ($elLi.hasClass('blazy')) {
          $elLi.removeClass('blazy');
        }
        if (!$ulSliderTes.hasClass('interval') && !$ulSliderTes.hasClass('hover')) {
          $ulSliderTes.addClass('interval');
        }
      });
    } else {
      if (!$ulSliderTes.hasClass('interval') && !$ulSliderTes.hasClass('hover')) {
        $ulSliderTes.addClass('interval');
      }
    }
  }

  var flex_map_mini_view = $("#map");
  if (flex_map_mini_view.length) {
    var myLatLng2 = {
      lat: parseFloat(flex_map_mini_view.data('lat')),
      lng: parseFloat(flex_map_mini_view.data('lng'))
    };
    var miniMap = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: myLatLng2,
      styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    });
    var marker = new google.maps.Marker({
      position: myLatLng2,
      map: miniMap,
      icon:'images/marker.png'
    });
    $("#map").removeAttr("data-lat").removeAttr("data-lng");

  }

}());