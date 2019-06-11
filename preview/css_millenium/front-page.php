<?php
  get_header();?>

<div class="wrap-preloader">
  <div class="item-wrap-preloader">
    <?php idx_the_custom_logo_header(); ?>
    <span class="preloader-icon"></span>
  </div>
</div>

<main id="flex-home-theme">

    <div class="clidxboost-content-slider">
      <div class="gs-container-slider clidxboost-main-slider">
        <?php
        if (false === get_theme_mod('idx_image_slider')) {
          $idx_image_slider = [];
        } else {
          $idx_image_slider = get_theme_mod('idx_image_slider');
        }
        $aum=0;
        ksort($idx_image_slider);
        foreach ($idx_image_slider as $key_slider => $value_slider) {
          if (!empty($value_slider['thumb'])) { ?>
          <div class="idx_image_slider_<?php echo $aum;?>_thumb clidxboost-ms-item">
            <img class="img-slider gs-lazy" data-lazy="<?php echo $value_slider['thumb']; ?>">
            <?php if (!empty($value_slider['headline'])){  ?>
            <a href="<?php echo $value_slider['link'];?>" class="clidxboost-wrap-information" title="<?php echo get_the_title();?>" target="_blank">
              <h2><?php echo $value_slider['headline'];?></h2>
              <ul>
                <?php if ($value_slider['detail']) {
                  $detailslider=explode('|', $value_slider['detail']);
                  foreach ($detailslider as $variable) { ?>
                  <?php echo '<li>'.$variable.'</li>'; ?>
                <?php }} ?>
              </ul>
            </a>
            <?php } ?>
          </div>
        <?php } ?>
        <?php  $aum=$aum+1; }  ?>
      </div>
      <?php echo do_shortcode('[flex_autocomplete]'); ?>
      <button id="next-step" class="floating"></button>
    </div>
    
    <?php
      $filter_featured_page_token = flex_filter_has_featured_page();
      
      if (null !== $filter_featured_page_token) {
        echo do_shortcode(sprintf('[flex_idx_filter id="%s" type="2" mode="thumbs"]', $filter_featured_page_token));
      }
      ?>
      
    <div id="profile-section">
      <?php if (empty( get_theme_mod( 'idx_txt_text_welcome_front' ) ))  $idx_txt_text_welcome_front  = ''; else  $idx_txt_text_welcome_front  = get_theme_mod( 'idx_txt_text_welcome_front' ); ?>
      <?php if (empty( get_theme_mod( 'idx_txt_description_front' ) ))  $idx_txt_description_front  = ''; else  $idx_txt_description_front  = get_theme_mod( 'idx_txt_description_front' ); ?>
      <?php if (empty( get_theme_mod( 'idx_txt_link_welcome_front' ) ))  $idx_txt_link_welcome_front  = ''; else  $idx_txt_link_welcome_front  = get_theme_mod( 'idx_txt_link_welcome_front' ); ?>
      <?php if (empty( get_theme_mod( 'idx_txt_logo_front_meet' ) ))  $idx_txt_logo_front_meet  = ''; else  $idx_txt_logo_front_meet  = get_theme_mod( 'idx_txt_logo_front_meet' ); ?>
      <article>
        <h2 class="idx_txt_text_welcome_front"><?php echo $idx_txt_text_welcome_front; ?></h2>
        <p class="idx_txt_description_front"><?php echo $idx_txt_description_front; ?></p>
        <a href="<?php echo $idx_txt_link_welcome_front; ?>" title="Learn more" class="clidxboost-btn-link"><span>Learn more</span></a>
      </article>
      <div class="content-flex-img idx_txt_logo_front_meet"><img src="<?php echo $idx_txt_logo_front_meet; ?>"></div>
    </div>
    
    <section id="blog-collection" class="flex-block-description">
      <h2 class="title-block single">Latest News</h2>
      <?php $args = array( 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 3, 'numberposts'=> 3 , 'order' => 'DESC');  $loop = new WP_Query($args);  ?>
      <ul id="articles-blog">
        <?php while ( $loop->have_posts()):$loop->the_post(); $post_thumbnail_id = get_post_thumbnail_id(get_the_id()); $post_thumbnail_url = wp_get_attachment_url($post_thumbnail_id); ?>
        <li>
          <div class="content-item">
            <a href="<?php echo get_the_permalink(); ?>" class="img-content">
            <img src="<?php echo $post_thumbnail_url; ?>" title="<?php echo get_the_title(); ?>" alt="<?php echo get_the_title(); ?>" class="blazy">
            </a>
            <div class="content-article">
              <h3> <a href="<?php echo get_the_permalink(); ?>"><?php echo get_the_title(); ?></a></h3>
              <p><?php echo the_excerpt_max_charlength(100); ?></p>
            </div>
            <a href="<?php echo get_the_permalink(); ?>" title="Read More" class="readmore icon-arrowb">Read more</a>
          </div>
        </li>
        <?php endwhile;  ?>
      </ul>
      <a href="<?php echo home_url( '/' ); ?>/blog" title="View more news" class="clidxboost-btn-link"> <span>View more news</span></a>
    </section>

</main>
<?php get_footer();?>