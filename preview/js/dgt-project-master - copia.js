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
          var $bltsSliderMain = $sliderMain.find('.bullets');
          var $bulletsSliderMain = $bltsSliderMain.find('button');
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
      var $theBullets = contentBullets.find('> *');
      if ($theBullets.length) {
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
      // Verificando para aparecer las flechas de NEXT y PREV
      setTimeout(function(){
        var $nextPrevArrows = contentBullets.parent().find('.next-prev');
        if ($nextPrevArrows.length) {
          var $widthContentBullets = contentBullets.width();
          if ((contentBullets.find('> *:eq(0)').width() * numeroLis) > $widthContentBullets) { // si los bullets son muchos
            contentBullets.addClass('hide');
            $nextPrevArrows.addClass('show');
          } else { 
            contentBullets.removeClass('hide')
            $nextPrevArrows.removeClass('show');
          }
        }
      }, 500)
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

  /*** FUNCÍON PARA AGREGAR COMPORTAMIENTO DE SISTEMA SEGUN LA RESULUCIÓN DE SU CONTENEDOR GENERAL ****/
  function hackResize(wrapContentPage){
    /*Nota: lo primero que hay que hacer es obtener el ancho del dispositivo, de esa forma 
    podemos hacer una comparación con el ancho del contenedor del plugin y colocar el hack*/
    var $widthPage = $('body').width(); //Obtenemos el ancho del dispositivo 
    var $widthWrapContent = wrapContentPage.width(); //Obtenemos el ancho del contenedor

    //if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    if(! /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setTimeout(function(){

        if($widthWrapContent < $widthPage){
          $('body').addClass('hack');

          console.log($widthWrapContent);

          if($widthWrapContent > 900 && $widthWrapContent < 1300){
            $('body').removeClass('w-768 w-640 w-480').addClass('w-1024');
          }else if($widthWrapContent > 700 && $widthWrapContent < 899){
            $('body').removeClass('w-1024 w-640 w-480').addClass('w-768');
          }else if($widthWrapContent > 500 && $widthWrapContent < 699){
            $('body').removeClass('w-1024 w-768 w-480').addClass('w-640');
          }else if($widthWrapContent < 500){
            $('body').removeClass('w-1024 w-768 w-640').addClass('w-480');
          }

        }else{
          $('body').removeClass('hack w-1024 w-768 w-640 w-480');
        }
      }, 300);
    }
  }

  var $wrapContentPage = $(".wrap-page-idx");
  if ($wrapContentPage.length) {
    hackResize($wrapContentPage);
    $(window).resize(function() {
      hackResize($wrapContentPage);
    });
  }

  /**************/
  $(document).on('click', '#available-languages', function() {
    $(this).toggleClass("list-show");
  });

  var $iconSelect = $('#filter-views');
  if ($iconSelect.length) {
    console.log('maaaaaaaaaaay');
    var $widthVentana = $ventana.width();
    var $selectItem = $iconSelect.find('option:selected').val();
    if ($widthVentana >= 768) {
      $iconSelect.removeClass($selectItem);
    } else if ($widthVentana < 768) {
      $iconSelect.addClass($selectItem);
    }
  }
  

}(jQuery));