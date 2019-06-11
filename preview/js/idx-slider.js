/*----------------------------------------------------------------------------------*/
/* Slider version 0.1
/*----------------------------------------------------------------------------------*/
(function($) {

  var $ventana = $(window);
  var $cuerpo = $('body');
  var $htmlcuerpo = $('html, body');
  var $transitionTime = 6500;

  /*----------------------------------------------------------------------------------*/
  /* Generando los slider
  /*----------------------------------------------------------------------------------*/
  clidxboostSlider('#slider-main');
  clidxboostSlider('#slider-properties');
  clidxboostSlider('#slider-testimonials');

  /*----------------------------------------------------------------------------------*/
  /* Función General del Slider
  /*----------------------------------------------------------------------------------*/
  function clidxboostSlider(slider){
    var $sliderMain = $(slider);
    if ($sliderMain.length) {

      /*Obtenemos los parametros que indican el comportamiento del slider*/
      var $showItemSlide = $sliderMain.attr('data-items'); //Cantidad de items a mostrar
      var $animationSlide = $sliderMain.attr('data-animate'); //Animacion de los items del slider (Fade)
      var $timeChangeSlide = $sliderMain.attr('data-transition'); //Tiempo que toma para cambiar de item
      var $responsiveSlider = $sliderMain.attr('data-responsive'); //Cantidad de items que mostrará el slider en una reslución en especifico (responsive)
      var $contentBullets = $sliderMain.find('.clidxboost-bullets'); //Contendor de los Bullets
      var $showNav = $sliderMain.attr('data-nav'); //Ocultar o mostrar los botones de prev y next
      var $positionBullets = $sliderMain.attr('data-bullets'); //Posición para los botones de bulltes (flotante o fijo)
      var $autoplaySlider =  $sliderMain.attr('data-autoplay'); //Autoplay del slider

      //Ocultamos el prev y next si es necesario
      if($showNav == 'false'){
        $sliderMain.find('.clidxboost-next-prev').addClass('clidxboost-next-prev-false');
      }

      //Asignamos la posición de los bulltes
      if($positionBullets == 'relative'){
        $sliderMain.find('.clidxboost-bullets').addClass('clidxboost-bullets-relative');
      }

      //Validamos que al menos siempre exista un item a mostrar
      if($showItemSlide == '' || $showItemSlide < 1){ $showItemSlide = 1 };

      var $ulSlider = $sliderMain.find('.clidxboost-wrap-slider > ul'); //Contendor general de los items del slider
      var $liSlider = $ulSlider.find('> li'); //Item del slider
      var $totalLis = $liSlider.length; //Total de items del slider
      var $bulletsShow = Math.ceil(($liSlider.length) / $showItemSlide); //Redondemos el resultado de la división para luego obtener la cantidad de bullets

      var $widthItem = 100 / $totalLis;
      $ulSlider.css('width', (($totalLis / $showItemSlide) * 100) + '%');
      $liSlider.css({'width': $widthItem + '%'});

      //Agregamos la clase clidxboost-transition al slider si cumple con las siguientes condiciones 
      if(($animationSlide == 'true') && ($showItemSlide == 1)){ //Si el slider tiene activa la opción de animación y a su vez cuenta con un solo item a mostrar
        $sliderMain.addClass('clidxboost-transition');
        $marginLeft = 0;
        for (b = 0; b < $totalLis; b++) {
          $liSlider.eq(b).css({'transform':'translateX(-'+$marginLeft+'%)'});
          $marginLeft = $marginLeft + 100;
        }
      }

      //Agregamos un padding a los items del slider si la cantidad de items a mostrar es mayor o igual a 2
      if($showItemSlide >= 2){ 
        $sliderMain.addClass('clidxboost-padding');
        for (a = 0; a < $showItemSlide; a++) {
          apareceImagen($liSlider.eq(a));
        }
      }else{ 
        $sliderMain.removeClass('clidxboost-padding');
        apareceImagen($liSlider.eq(0));
      }
      
      //Consultamos si se han configurado las vistas para el responsive
      if($responsiveSlider.length) {

        //obteniendo datos del arreglo
        var $itemResponsive = JSON.parse($responsiveSlider);
        var $jsonLength = $itemResponsive.length;

        //Ejecutamos la redimensión según los parametros obtenidos
        $(window).on("load resize",function(e){
          for (i = 0; i < $jsonLength; i++) { 
            if ($ventana.width() <= $itemResponsive[i].breakpoint) {

              var $bulletsShow = Math.ceil(($liSlider.length) / $itemResponsive[i].itemstoshow);
              creaBullets($bulletsShow, $contentBullets);
              var $widthItem = ((100 / $totalLis) - 1) + ((100/$itemResponsive[i].itemstoshow)/100);
              $ulSlider.css('width', (($totalLis / $itemResponsive[i].itemstoshow) * 100) + '%');
              $liSlider.css({'width': $widthItem + '%','margin-right':'1%'});
              
              if($itemResponsive[i].itemstoshow >= 2){ 
                $sliderMain.addClass('clidxboost-padding');
                for (a = 0; a < $itemResponsive[i].itemstoshow; a++) {
                  apareceImagen($liSlider.eq(a));
                }
              }else{ 
                $sliderMain.removeClass('clidxboost-padding');
                apareceImagen($liSlider.eq(0));
              }

            }else if($ventana.width() > $itemResponsive[0].breakpoint){

              var $bulletsShow = Math.ceil(($liSlider.length) / $showItemSlide);
              creaBullets($bulletsShow, $contentBullets);
              var $widthItem = ((100 / $totalLis) - 1) + ((100/$showItemSlide)/100);
              $ulSlider.css('width', (($totalLis / $showItemSlide) * 100) + '%');
              $liSlider.css({'width': $widthItem + '%','margin-right':'1%'});

              if($showItemSlide >= 2){ 
                $sliderMain.addClass('clidxboost-padding');
                for (a = 0; a < $showItemSlide; a++) {
                  apareceImagen($liSlider.eq(a));
                }
              }else{ 
                $sliderMain.removeClass('clidxboost-padding');
                apareceImagen($liSlider.eq(0));
              }
            }
          }
        });
      }

      //Algunas variables a usar
      /*var $bltsSliderMain = $sliderMain.find('.clidxboost-bullets');
      var $bulletsSliderMain = $bltsSliderMain.find('button');
      var autoPlaySliderMain;*/
      
      //Asignaciones iniciales
      $liSlider.eq(0).addClass('active').siblings().removeClass('active');
      creaBullets($bulletsShow, $contentBullets);

      /*----------------------------------------------------------------------------------*/
      /* Desplazamiento con bullets
      /*----------------------------------------------------------------------------------*/
      $contentBullets.on('click', 'button', function(){
        if (!$ulSlider.hasClass('swiping')) {
          $ulSlider.addClass('swiping');
          var $indexButton = $(this).index();

          if($animationSlide == 'true'){
            if($showItemSlide > 1){
              $ulSlider.css('margin-left', '-' + ($indexButton * 100) + '%');
            }
          }else{
            $ulSlider.css('margin-left', '-' + ($indexButton * 100) + '%');
          }
          $liSlider.removeClass('active').eq($indexButton).addClass('active');
          apareceImagen($liSlider.eq($indexButton));

          $contentBullets.find('button').removeClass('active');
          $(this).addClass('active');
          $ulSlider.removeClass('swiping');
        }

        myLazyLoad.update();
        setTimeout(function() {
            myLazyLoad.update();
        }, 750);
      });

      /*----------------------------------------------------------------------------------*/
      /* Desplazamiento Next y Prev
      /*----------------------------------------------------------------------------------*/
      var $bltsSliderMain = $sliderMain.find('.clidxboost-bullets');
      var $bulletsSliderMain = $bltsSliderMain.find('button');
      var $btnNext = $sliderMain.find('.clidxboost-nav .clidxboost-next');
      touchSlider($ulSlider, $bulletsSliderMain);
      
      $btnNext.on('click', function() {
        if (!$ulSlider.hasClass('swiping')) {
          var $elLiActivo = $bltsSliderMain.find('.active').index();
          if (($elLiActivo + 1) !== $bulletsSliderMain.length) {
            var $nexItem = ($elLiActivo << 0) + 2;
            $bltsSliderMain.find('button:nth-child('+$nexItem+')').trigger('click');
          } else {
            $bulletsSliderMain.eq(0).trigger('click');
          }
        }
      });

      var $btnPrev = $sliderMain.find('.clidxboost-nav .clidxboost-prev');
      $btnPrev.on('click', function() {
        if (!$ulSlider.hasClass('swiping')) {
          var $elLiActivo = $bltsSliderMain.find('.active').index();
          var $prevItem = $elLiActivo << 0;
          var $totalBullets = $bulletsSliderMain.length;
          if ($elLiActivo !== 0) {
            $bltsSliderMain.find('button:nth-child('+$prevItem+')').trigger('click');
          }else{
            $bltsSliderMain.find('button:nth-child('+$totalBullets+')').trigger('click');
          }
        }
      });

      /*----------------------------------------------------------------------------------*/
      /* Autoplay "M"
      /*----------------------------------------------------------------------------------*/
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

      /*----------------------------------------------------------------------------------*/
      /* Autoplay "Ex"
      /*----------------------------------------------------------------------------------*/
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

      /*----------------------------------------------------------------------------------*/
      /* Cargar imagen
      /*----------------------------------------------------------------------------------*/
      var autoPlaySliderMain;
      function apareceImagen(li) {

        var $elLi = li.find('img');
        var $srcOriginal = $elLi.attr('data-src');

        if ($srcOriginal !== undefined) {
          clearInterval(autoPlaySliderMain);
          $ulSlider.removeClass('interval');
          $elLi.attr('src', $srcOriginal).removeAttr('data-src');
          li.addClass('loading');
          $elLi.on('load', function () {
            $(this).css('opacity', '1');
            if (li.hasClass('loading')) {
              li.removeClass('loading');
            }
            if($autoplaySlider == 'true'){
              if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
                autoPlaySliderMain = setInterval(autoPlayM, $timeChangeSlide);
                $ulSlider.addClass('interval');
              }
            }
          });
        } else {
          if($autoplaySlider == 'true'){
            if (!$ulSlider.hasClass('interval') && !$ulSlider.hasClass('hover')) {
              autoPlaySliderMain = setInterval(autoPlayM, $timeChangeSlide);
              $ulSlider.addClass('interval');
            }
          }
        }
      }

      function apareceImagenB(li) {
        if (li.length) {
          var $imgLi = li.find('.slider-img').find('> ul > li:eq(0) img');
          var $srcOriginal = $imgLi.attr('data-blazy');
          if ($srcOriginal !== undefined) {
            if ($ventana.width() < 1024) {
              $ulSlider.removeClass('interval');
            }
            $imgLi.attr('src', $srcOriginal).removeAttr('data-blazy');
            li.addClass('loading');
            $imgLi.on('load', function () {
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
    }
  }

  /*----------------------------------------------------------------------------------*/
  /* Función que genera los bullets
  /*----------------------------------------------------------------------------------*/
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

      /*
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
      */

    } else {
      console.log('El contenedor .NAV no existe, no puedo crear los botones de navegación.');
    }
  }

  /*----------------------------------------------------------------------------------*/
  /* Función que consulta el item activo
  /*----------------------------------------------------------------------------------*/
  function itemActivo(losLi) {
    var nLis = losLi.length;
    for (var s = 0; s < nLis; s++) {
      if (losLi.eq(s).hasClass('active')) {
        return s;
      }
    }
  }

  /*-------------------------------------------------------------------------------------*/
  /* Función que permite el desplazamiento del slider con la mano en un dispositivo mobil
  /*-------------------------------------------------------------------------------------*/
  function touchSlider(ulSlider, botonesNav) {
    var xDown = null;
    var yDown = null;

    ulSlider.on('touchstart', function(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    });

    ulSlider.on('touchmove', function(evt) {
      if (!xDown || !yDown) {
        return;
      }
      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
      if (Math.abs(xDiff) > Math.abs(yDiff)) { // si se mueve derecha o izquierda
        evt.preventDefault();
        ulSlider.trigger('mouseenter');
        var nLis = botonesNav.length;
        var $elLiActivo = ulSlider.find('.active').index();
        if (xDiff > 0) { // izquierda
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

})(jQuery);