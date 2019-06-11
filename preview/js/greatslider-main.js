(function($) {

	/*----------------------------------------------------------------------------------*/
	/* COLECCION DE NEIGHBORHOODS
	/*----------------------------------------------------------------------------------*/
	function sliderNeighborhoods($slider){
		if ($(window).width() < 768) {
			if(!$slider.hasClass('gs-builded')) {
				console.log('lo construyo');
				theSlider = $slider.greatSlider({
					type: 'swipe',
					nav: true,
					bullets: false,
					layout: {
						arrowDefaultStyles: false
					}
				});
			} else {
				console.log('no construyo , ya ta construido');
			}
		} else {
			if ($slider.hasClass('gs-builded')) {
				theSlider.destroy();
			}
		}
	}

	let $sliderNeighborhoods = $('#lgr-neighborhoods-slider');
	if($sliderNeighborhoods.length) {
		sliderNeighborhoods($sliderNeighborhoods);
		$(window).resize(()=>{
			sliderNeighborhoods($sliderNeighborhoods);
		});
	}

	/*----------------------------------------------------------------------------------*/
	/* SLIDER PRINCIPAL
	/*----------------------------------------------------------------------------------*/
	var $mainSlider = $(".clidxboost-main-slider");
	if($mainSlider.length) {
		$mainSlider.greatSlider({
			type: 'fade',
			nav: false,
			lazyLoad: true,
			bullets: true,
			autoHeight: false,
			/*autoplay: true,
			autoplaySpeed: 5000,*/
			layout: {
				bulletDefaultStyles: false,
				wrapperBulletsClass: 'clidxboost-gs-wrapper-bullets'
			}
		});
	}

	/*----------------------------------------------------------------------------------*/
	/* COLECCION DE PROPIEDADES
	/*----------------------------------------------------------------------------------*/
	var $propertiesSlider = $(".clidxboost-properties-slider");
	if($propertiesSlider.length) {
		$propertiesSlider.greatSlider({
			type: 'swipe',
			nav: true,
			navSpeed: 500,
			lazyLoad: true,
			bullets: false,
			items: 1,
			autoDestroy: true,
			layout: {
				bulletDefaultStyles: false,
				wrapperBulletsClass: 'clidxboost-gs-wrapper-bullets',
				arrowPrevContent: 'Prev',
				arrowNextContent: 'Next',
				arrowDefaultStyles: false
			},
			breakPoints: {
	      640: {
	        items: 2,
	        slideBy: 2,
	        nav: false,
	        bullets: true
	      },
	      991: {
	        items: 3,
	        slideBy: 3
	      },
	      1360: {
	        items: 4,
	        slideBy: 4,
	      }
	    },
	    onStepStart: function(){
	      $(".clidxboost-properties-slider").find(".flex-slider-current img").each(function() {
	      	if(!$(this).hasClass(".loaded")){
	      		var dataImage = $(this).attr('data-original');
	      		$(this).attr("data-was-processed","true").attr("src",dataImage).addClass("initial loaded");
	      	}
	      });
	    }
		});
	}

	/*----------------------------------------------------------------------------------*/
	/* TESTIMONIALES
	/*----------------------------------------------------------------------------------*/
	var $testimonialSlider = $(".clidxboost-testimonial-slider");
	if($testimonialSlider.length) {
		$testimonialSlider.greatSlider({
			type: 'swipe',
			nav: false,
			bullets: true,
			autoHeight: true,
			autoDestroy: true,
			layout: {
				bulletDefaultStyles: false,
				wrapperBulletsClass: 'clidxboost-gs-wrapper-bullets'
			}
		});
	}

	/*----------------------------------------------------------------------------------*/
	/* FULL MAP DETALLE DE PROPIEDAD
	/*----------------------------------------------------------------------------------*/
	var $fullSlider = $(".clidxboost-full-slider");
	if($fullSlider.length) {
		$fullSlider.greatSlider({
			type: 'swipe',
			nav: true,
			navSpeed: 500,
			lazyLoad: true,
			bullets: false,
			items: 1,
			fullscreen: true,
			autoHeight: false,
			layout: {
				arrowDefaultStyles: false
			},
			breakPoints: {
	      640: {
	        items: 2
	      },
	      1360: {
	        items: 3
	      }
	    },
	    onInited: function(){
	    	var $showSlider = $fullSlider.parents('#full-slider');
	    	if($showSlider.length){
	    		$showSlider.addClass('show-slider-psl');
	    	}
	    }
		});
	}

	/*----------------------------------------------------------------------------------*/
	/* DEVELOPMENT SLIDER
	/*----------------------------------------------------------------------------------*/
	var $developmentSlider = $(".clidxboost-development");
	if($developmentSlider.length) {
		$developmentSlider.greatSlider({
			type: 'swipe',
			nav: false,
			bullets: true,
			lazyLoad: true,
			layout: {
				bulletDefaultStyles: false
			},
			breakPoints: {
	      640: {
	        items: 2,
	      },
	      991: {
	        items: 3,
	      }
	    }
		});
	}

	//loadFullSlider("#modal_property_detail .clidxboost-full-slider");


	/*----------------------------------------------------------------------------------*/
	/* DEVELOPMENT SLIDER
	/*----------------------------------------------------------------------------------*/
	var $neighborhoodSlider = $("#neighborhood-shortcode");
	if($neighborhoodSlider.length) {
		$neighborhoodSlider.greatSlider({
			type: 'swipe',
			nav: true,
			bullets: false,
			lazyLoad: true,
			autoDestroy: true,
			layout: {
				//resizeClass: 'gs-nresize'
				//bulletDefaultStyles: false
			},
			breakPoints: {
	      768: {
	        items: 8,
	      }
	    }
		});
	}

})(jQuery);

function loadFullSlider(elemento){
	var $fullSliderModal = $(elemento);
	if($fullSliderModal.length) {
		$fullSliderModal.greatSlider({
			type: 'swipe',
			nav: true,
			navSpeed: 500,
			lazyLoad: true,
			bullets: false,
			items: 1,
			fullscreen: true,
			autoHeight: false,
			layout: {
				arrowDefaultStyles: false
			},
			breakPoints: {
	      640: {
	      	//itemsInFs: 1,
	        items: 2
	      },
	      1024: {
	      	//itemsInFs: 1,
	        items: 3
	      }
	    },
	    onInited: function(){
	    	var $showSlider = $fullSliderModal.parents('#full-slider');
	    	if($showSlider.length){
	    		$showSlider.addClass('show-slider-psl');
	    	}
	    }
		});
	}
}