(function($) {
  var $ventana = $(window);
  var $cuerpo = $('body');
  var $htmlcuerpo = $('html, body');

  var $transitionTime = 6500;

  $(document).on('click', '#hamburger', function() {
      $('body').addClass('opened-menu');
  });
  $(document).on('click', '#hamburger-r', function() {
      $('body').toggleClass('opened-menu');
  });
  $(document).on('click', '.r-overlay', function() {
      $('body').removeClass('opened-menu');
  });


  /** Generando el slider principal **/
  sliderStandar('#slider-main');
  sliderStandar('#slider-properties');
  sliderStandar('#slider-testimonial');

  /** Funcin que genera un slider standar **/
  function sliderStandar(slider){
    var $sliderMain = $(slider);
    if ($sliderMain.length) {

      var $ulSlider = $sliderMain.find('> ul')
      var $lisSlider = $ulSlider.find('> li');
      var nLis = $lisSlider.length;
      if (nLis > 1) {

        /**
          Se esta adecuando un slider que pueda funcionar con varias opciones, como en este caso
          hay 2 estados uno que contempla una animación tipo face (por medio de la clase: fade-slider) 
          al realizar la transición y el otro de forma nativa que realiza el desplazamiento standar
        **/

        if($sliderMain.hasClass('multi-items')){

          var $contentBullets = $sliderMain.find('.bullets');

          if ($ventana.width() > 1024) {
            $ulSlider.css('width', ((nLis / 4) * 100) + '%');
            $lisSlider.css('width', ((100 / nLis) - 0.4) + '%');
            creaBullets((nLis / 4), $contentBullets);
          } else if (($ventana.width() > 768) && ($ventana.width() <= 1024)) {
            $ulSlider.css('width', ((nLis / 3) * 100) + '%');
            $lisSlider.css('width', ((100 / nLis) - 0.4) + '%');
            creaBullets((nLis / 3), $contentBullets);
          } else if (($ventana.width() >= 640) && ($ventana.width() <= 768)) { 
            $ulSlider.css('width', ((nLis / 2) * 100) + '%');
            $lisSlider.css('width', ((100 / nLis) - 0.4) + '%');
            creaBullets((nLis / 2), $contentBullets);
          } else if ($ventana.width() < 640) {
            $ulSlider.css('width', (nLis * 100) + '%');
            $lisSlider.css('width', (100 / nLis) + '%');
            creaBullets(nLis, $contentBullets);
          }

          $( window ).resize(function() {
            if ($ventana.width() > 1024) {
              $ulSlider.css('width', ((nLis / 4) * 100) + '%');
              $lisSlider.css('width', ((100 / nLis) - 0.4) + '%');
              creaBullets((nLis / 4), $contentBullets);
            } else if (($ventana.width() > 768) && ($ventana.width() <= 1024)) {
              $ulSlider.css('width', ((nLis / 3) * 100) + '%');
              $lisSlider.css('width', ((100 / nLis) - 0.4) + '%');
              creaBullets((nLis / 3), $contentBullets);
            } else if (($ventana.width() >= 640) && ($ventana.width() <= 768)) { 
              $ulSlider.css('width', ((nLis / 2) * 100) + '%');
              $lisSlider.css('width', ((100 / nLis) - 0.4) + '%');
              creaBullets((nLis / 2), $contentBullets);
            } else if ($ventana.width() < 640) {
              $ulSlider.css('width', (nLis * 100) + '%');
              $lisSlider.css('width', (100 / nLis) + '%');
              creaBullets(nLis, $contentBullets);
            }
          });

          // Agregando funcion Click a los bullets
          $contentBullets.on('click', 'button', function(){
            if (!$ulSlider.hasClass('swiping')) {
              $ulSlider.addClass('swiping');
              var $indexButton = $(this).index();
              $ulSlider.css('margin-left', '-' + ($indexButton * 100) +'%');
              if ($ventana.width() >= 768) {
                apareceImagenB($lisSlider.eq($indexButton * 2)); // por EQ de Jquery se trata menos 1
                apareceImagenB($lisSlider.eq(($indexButton * 2) + 1));
              } else {
                apareceImagenB($lisSlider.eq($indexButton));
                $lisSlider.eq($indexButton).addClass('active').siblings().removeClass('active');
              }
              $(this).addClass('active').siblings().removeClass('active');
              $ulSlider.removeClass('swiping');      
            }

            myLazyLoad.update();
            
            setTimeout(function () {
                myLazyLoad.update();
            }, 750);
          });

          // Boton next y prev
          var $btnNext = $sliderMain.find('.nav .next');
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

          var $btnPrev = $sliderMain.find('.nav .prev');
          $btnPrev.on('click', function(){
            if (!$ulSlider.hasClass('swiping')) {
              var $elLiActivo = $bltsSliderMain.find('.active').index();
              if ($elLiActivo !== 0) {
                $bulletsSliderMain.eq($elLiActivo - 1).trigger('click');
              }
            }
          });

        }else{

          // Dandole ancho relativo al Ul y a los Li.
          if(!$sliderMain.hasClass('fade-slider')){
            $ulSlider.css('width', (nLis * 100) + '%');
            $lisSlider.css('width', (100 / nLis) + '%');
          }else{
            if($sliderMain.hasClass('swipe')){
              $ulSlider.css('width', (nLis * 100) + '%');
              $lisSlider.css('width', (100 / nLis) + '%');
            }else{
              if( !$sliderMain.hasClass('fade')){
                $sliderMain.addClass('fade');
              }
            }
          }
          
          $lisSlider.eq(0).addClass('active').siblings().removeClass('active');
          apareceImagen($lisSlider.eq(0));

          // creando Bullets
          var $bltsSliderMain = $sliderMain.find('.bullets');
          creaBullets(nLis, $bltsSliderMain);

          // Agregando .active al primer Bullet
          var $bulletsSliderMain = $bltsSliderMain.find('button');
          $bulletsSliderMain.eq(0).addClass('active');

          touchSlider($ulSlider, $bulletsSliderMain);

          // Boton next y prev
          if($sliderMain.hasClass('fade-slider')){
            var $btnNext = $sliderMain.find('.nav .next');
            $btnNext.on('click', function() {
              if (!$ulSlider.hasClass('swiping')) {
                var $elLiActivo = $sliderMain.find('.active').index();
                if (($elLiActivo + 1) !== $bulletsSliderMain.length) {
                  $bulletsSliderMain.eq($elLiActivo + 1).trigger('click');
                  $lisSlider.eq($elLiActivo);
                } else {
                  $bulletsSliderMain.eq(0).trigger('click');
                }
              }
            });

            var $btnPrev = $sliderMain.find('.nav .prev');
            $btnPrev.on('click', function() {
              if (!$ulSlider.hasClass('swiping')) {
                var $elLiActivo = $sliderMain.find('.active').index();
                if ($elLiActivo !== 0) {
                  $bulletsSliderMain.eq($elLiActivo - 1).trigger('click');
                }else{
                  $bulletsSliderMain.eq($elLiActivo - 1).trigger('click');
                }
              }
            });

            $bulletsSliderMain.on('click', function() {
              if (!$ulSlider.hasClass('swiping')) {
                $ulSlider.addClass('swiping');
                var $indexButton = $(this).index();
                if($sliderMain.hasClass('swipe')){
                    $ulSlider.css('margin-left', '-' + ($indexButton * 100) + '%');
                }

                apareceImagen($lisSlider.eq($indexButton));
                $lisSlider.eq($indexButton).addClass('active').siblings().removeClass('active');
                $bulletsSliderMain.eq($indexButton).addClass('active').siblings().removeClass('active');
                $ulSlider.removeClass('swiping');
              }
            });

          }else{

            var $btnNext = $sliderMain.find('.nav .next');
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

            var $btnPrev = $sliderMain.find('.nav .prev');
            $btnPrev.on('click', function(){
              if (!$ulSlider.hasClass('swiping')) {
                var $elLiActivo = $bltsSliderMain.find('.active').index();
                if ($elLiActivo !== 0) {
                  $bulletsSliderMain.eq($elLiActivo - 1).trigger('click');
                }
              }
            });

            $bulletsSliderMain.on('click', function(){
              if (!$ulSlider.hasClass('swiping')) {
                $ulSlider.addClass('swiping');
                var $indexButton = $(this).index();
                $ulSlider.css('margin-left', '-' + ($indexButton * 100) +'%');

                apareceImagen($lisSlider.eq($indexButton),$ulSlider);
                $lisSlider.eq($indexButton).addClass('active').removeClass('active');
                $bulletsSliderMain.eq($indexButton).addClass('active').siblings().removeClass('active');
                $ulSlider.removeClass('swiping'); 
              }
            });

          }

        }

        // AutoPlay.
        function autoPlayM() {
            //console.log('AutoPlay, Hora: ' + getDateTime());
            var $elLiActivo = itemActivo($bulletsSliderMain);

            var $elLiActivo = $sliderMain.find('.active').index();

            if (($elLiActivo + 1) !== $bulletsSliderMain.length) {
                $bulletsSliderMain.eq($elLiActivo + 1).trigger('click');
            } else {
                $bulletsSliderMain.eq(0).trigger('click');
            }
        };

        function autoPlayEx() {
          var $botonesNav = $contentBullets.find('button');
          if ($ulSlider.hasClass('interval') || !$ulSlider.hasClass('hover')) {
            var $elLiActivo = $contentBullets.find('.active').index();
            if (($elLiActivo + 1) !== $botonesNav.length) {
              $botonesNav.eq($elLiActivo + 1).trigger('click');
            } else {
              $botonesNav.eq(0).trigger('click');
            }
          }
        };

        var autoPlaySliderMain;
        // funciones útiles
        function apareceImagen(li) {
          var $elLi = li.find('> img');
          var $srcOriginal = $elLi.attr('data-src');
          if ($srcOriginal !== undefined) {
            clearInterval(autoPlaySliderMain);
            $ulSlider.removeClass('interval');
            $elLi.attr('src', $srcOriginal).removeAttr('data-src');
            li.addClass('loading');
            $elLi.on('load', function() {
              $(this).css('opacity', '1');
              if (li.hasClass('loading')) {
                li.removeClass('loading');
              }
              if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
                //console.log('puse interval primero')
                autoPlaySliderMain = setInterval(autoPlayM, $transitionTime);
                $ulSlider.addClass('interval');
              }
            });
          } else {

            if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
              //console.log('puse interval de nuevo')
              autoPlaySliderMain = setInterval(autoPlayM, $transitionTime);
              $ulSlider.addClass('interval');
            }
          }
        }

        function apareceImagenB(li){
          if (li.length) {
            var $imgLi = li.find('.slider-img').find('> ul > li:eq(0) img');
            var $srcOriginal = $imgLi.attr('data-blazy');
            if ($srcOriginal !== undefined) {
              if ($ventana.width() < 1024) {
                $ulSlider.removeClass('interval');
              }
              $imgLi.attr('src', $srcOriginal).removeAttr('data-blazy');
              li.addClass('loading');
              $imgLi.on('load', function(){
                $(this).css('opacity', '1');
                li.removeClass('loading');
                if ($ventana.width() < 1024) {
                  if (!$ulSlider.hasClass('built')) {
                    setInterval(autoPlayEx, 5000);
                    $ulSlider.addClass('built');
                  }
                  if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
                    $ulSlider.addClass('interval');
                  }
                }
                if ($imgLi.hasClass('blazy')) {
                  $imgLi.removeClass('blazy');
                }
              });
            } else {
              if ($ventana.width() < 1024) {
                if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
                  $ulSlider.addClass('interval');
                }
              }
            }
          }
        }

      } else {
        $sliderMain.find('.nav').css('display', 'none');
      }
    }
  }

  /** Función que no se que hace **/
  function itemActivo(losLi){
    var nLis = losLi.length;
    for(var s = 0; s < nLis; s++) {
      if (losLi.eq(s).hasClass('active')) {
        return s;
      }
    }
  }

  /** Función que permite el desplazamiento del slider con la mano en un dispositivo mobil **/
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
        var $elLiActivo = ulSlider.find('.active').index();
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

  /** Función para crear los bullets **/
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
          contentBullets.append('<button class="active"><span></span></button>');
        } else {
          contentBullets.append('<button><span></span></button>');        
        }
        b++
      }
    } else {
      console.log('El contenedor .NAV no existe, no puedo crear los botones de navegación.');
    }
  }

  /******/
  function creaIframeVideo(elBoton) {
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
    

/*    var $itemAcordeon = $(".list-details");
    if ($itemAcordeon.length) {
      $(".list-details:first").addClass('active');
    }

    $(document).on('click', '.list-details >h2', function() {
        $('.list-details').removeClass('active');
        $(this).parent().addClass('active');
        if ($(this).next().hasClass('show')) {
          $(this).next().removeClass('show');
          $(this).parent().removeClass('active');
        } else {
          $('.list-detail').removeClass('show');
          $('.list-amenities').removeClass('show');
          $(this).next().toggleClass('show');
        }
    });*/

    $(document).on('click', '.select-chk', function() {
        var $fullSelect = $(this).attr('data-parent');
        if (!$(this).find('span').hasClass('active')) {
            $(this).find('span').addClass('active');
            if (typeof($fullSelect) != 'undefined') {
                $("#" + $fullSelect).find('.select-chk').each(function() {
                    $(this).find('span').addClass('active');
                });
            }
        } else {
            $(this).find('span').removeClass('active');
            if (typeof($fullSelect) != 'undefined') {
                $("#" + $fullSelect).find('.select-chk').each(function() {
                    $(this).find('span').removeClass('active');
                });
            }
        }
    });


    /** MENÚ RESPONSIVE **/
    $(document).on('click', '#menu-main-resposnive .menu-item-has-children', function() {
      if($(this).hasClass('active')){
        $(this).removeClass('active');
      }else{
        $('.menu-item-has-children').removeClass('active');
        $(this).addClass('active');
      }
    });


  /** TOUCH PARA MINI SLIDERS **/
  /* var $resultSearch = $('.slider-generator');
  if ($resultSearch.length) {
    // Para mover los mini sliders con touch,
    var xDown = null;
    var yDown = null;
    $resultSearch.on('touchstart', '.propertie', function(evt){
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    });
    $resultSearch.on('touchmove', '.propertie', function(evt) {
      if ( ! xDown || ! yDown ) {
        return;
      }
      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { // si se mueve derecha o izquierda
        evt.preventDefault();
        if ( xDiff > 0 ) { // izquierda
          $(this).find('.next').click();
        } else { // derecha
          $(this).find('.prev').click();
        }
      }
      xDown = null;
      yDown = null;
    });
    
  }*/


}(jQuery));