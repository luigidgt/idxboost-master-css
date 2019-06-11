<?php get_header(); ?>

<div class="wrap-preloader">
  <div class="item-wrap-preloader">
    <?php idx_the_custom_logo_header(); ?>
    <span class="preloader-icon"></span>
  </div>
</div>

<main class="lg-main">
  <?php if (empty( get_theme_mod( 'idx_image_slider' ) ))
  $idx_image_slider = []; else  $idx_image_slider  = get_theme_mod( 'idx_image_slider' );
  ksort($idx_image_slider);
  foreach ($idx_image_slider as $key_slider => $value_slider) {
  	if ($key_slider==0) {
        if(!empty($value_slider['thumb']))
        	echo '<img src="'.$value_slider['thumb'].'" class="lg-layer">';
  	} 
   }  ?>
  <?php echo do_shortcode('[flex_autocomplete]'); ?>
</main>

<section>
  <article class="flex-block-description">
    <h1 class="title-block">Test Quick Search</h1>
    <div class="ib-quick-search-mini">
      <a href="https://testlgv2.staging.wpengine.com/search#more-options" title="Sale" class="ib-btn-sm">Sale</a>
      <a href="https://testlgv2.staging.wpengine.com/search?for=rent#more-options" title="Rent" class="ib-btn-sm">Rent</a>
    </div>
    <div class="ib-quick-search-form">
      <form method="post" id="__ib_quick_search_form">
        <input type="hidden" id="ib-quick-search-sale-values" value=""> <input type="hidden" id="ib-quick-search-rent-values" value=""> <input type="hidden" id="ib-quick-search-type-values" value="">
        <div class="ib-quick-search-nav">
          <div class="ib-quick-search-nav-item">
            <div class="ib-arrow">
              <select id="ib-quick-search-rental-type" class="ib-quick-item">
                <option value="0" selected="selected">For Sale</option>
                <option value="1">For Rent</option>
              </select>
            </div>
          </div>
          <div class="ib-quick-search-nav-item">
            <div class="ib-arrow">
              <select id="ib-quick-search-city" class="ib-quick-item">
                <option value="--" selected="">Select a City</option>
                <option value="Aventura">Aventura</option>
                <option value="Bal Harbour">Bal Harbour</option>
                <option value="Bay Harbor Islands">Bay Harbor Islands</option>
                <option value="Biscayne Gardens">Biscayne Gardens</option>
                <option value="Biscayne Park">Biscayne Park</option>
                <option value="Brickell">Brickell</option>
                <option value="Brickell Key">Brickell Key</option>
                <option value="Coconut Grove">Coconut Grove</option>
                <option value="Coral Gables">Coral Gables</option>
                <option value="Doral">Doral</option>
                <option value="El Portal">El Portal</option>
                <option value="Fisher Island">Fisher Island</option>
                <option value="Golden Beach">Golden Beach</option>
                <option value="Hallandale">Hallandale</option>
                <option value="Hialeah">Hialeah</option>
                <option value="Hialeah Gardens">Hialeah Gardens</option>
                <option value="Hollywood">Hollywood</option>
                <option value="Homestead">Homestead</option>
                <option value="Indian Creek">Indian Creek</option>
                <option value="Kendall">Kendall</option>
                <option value="Key Biscayne">Key Biscayne</option>
                <option value="Miami">Miami</option>
                <option value="Miami Beach">Miami Beach</option>
                <option value="Miami Gardens">Miami Gardens</option>
                <option value="Miami Lakes">Miami Lakes</option>
                <option value="Miami Shores">Miami Shores</option>
                <option value="Miami Springs">Miami Springs</option>
                <option value="Miramar">Miramar</option>
                <option value="North Bay Village">North Bay Village</option>
                <option value="North Miami">North Miami</option>
                <option value="North Miami Beach">North Miami Beach</option>
                <option value="Opa-Locka">Opa-Locka</option>
                <option value="Pembroke Pines">Pembroke Pines</option>
                <option value="Pinecrest">Pinecrest</option>
                <option value="South Miami">South Miami</option>
                <option value="Sunny Isles Beach">Sunny Isles Beach</option>
                <option value="Surfside">Surfside</option>
              </select>
            </div>
          </div>
          <div class="ib-quick-search-nav-item ib-active">
            <div class="ib-arrow">
              <a href="javascript:void(0)" class="ib-quick-item" id="ib-quick-search-price-range-lbl">Any Price</a>
            </div>
            <div class="ib-sub-item">
              <div class="ib-ui-ranger">
                <div id="ib-quick-search-price-range-sale" class="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                  <div class="ui-slider-range ui-corner-all ui-widget-header" style="left: 0%; width: 100%;"></div>
                  <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 0%;"></span><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 100%;"></span>
                </div>
                <div id="ib-quick-search-price-range-rent" style="display: none;" class="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                  <div class="ui-slider-range ui-corner-all ui-widget-header" style="left: 0%; width: 100%;"></div>
                  <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 0%;"></span><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 100%;"></span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="ib-quick-search-nav-item">
            <div class="ib-arrow">
              <a href="javascript:void(0)" class="ib-quick-item">Type</a>
            </div>
            <div class="ib-sub-item">
              <div class="ib-group">
                <label class="ib-chk">
                  <input type="checkbox" class="ib-quick-search-types" value="2">
                  <span>Single Family Homes</span>
                </label>
                <label class="ib-chk">
                  <input type="checkbox" class="ib-quick-search-types" value="1">
                  <span>Condominiums</span>
                </label>
                <label class="ib-chk">
                  <input type="checkbox" class="ib-quick-search-types" value="tw">
                  <span>Townhouses</span>
                </label>
                <label class="ib-chk">
                  <input type="checkbox" class="ib-quick-search-types" value="mf">
                  <span>Multi-Family</span>
                </label>
              </div>
            </div>
          </div>

          <div class="ib-quick-search-nav-item">
            <button type="submit" class="ib-quick-btn"><span>View Properties</span></button>
          </div>
        </div>
      </form>
    </div>
  </article>
</section>

<?php get_footer();?>

<script type="text/javascript">
  jQuery(document).on("click",function(e) {
    var container = jQuery(".ib-quick-search-nav-item");
    if (!container.is(e.target) && container.has(e.target).length === 0) { 
      jQuery('.ib-quick-search-nav-item.ib-active').removeClass('ib-active');        
    }
  });

  jQuery(".ib-arrow").on("click", function(event) {
    if (jQuery(this).parents('.ib-quick-search-nav-item').hasClass('ib-active')) {
     jQuery('.ib-quick-search-nav-item.ib-active').removeClass('ib-active');
    }else{
      jQuery('.ib-quick-search-nav-item.ib-active').removeClass('ib-active');
      jQuery(this).parents('.ib-quick-search-nav-item').addClass('ib-active');
    }
  });
</script>