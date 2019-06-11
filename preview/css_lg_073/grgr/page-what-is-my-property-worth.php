<?php
/**
 * Template Name: What Is My Property Worth Form
 */
global $dgtForms;
//echo $dgtForms->loadGF(41, ['header' => false, 'title'=>false]); die;
get_header(); ?>
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/homeWorth.css">

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrT7NKZWbvDEchgw-bzA92KDMEsFHHnnU&libraries=places"></script> 
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/autocomplete-google-address.js"></script>
<script>
    var $ = jQuery;
    $('body').addClass('homeWorthPage');
</script>
<div class="full-form form-whats-my-property-work whomeworth">
  <?php  echo $dgtForms->loadGF(4, ['header' => false, 'title'=>false]); ?>
</div>

<script type="text/javascript">
jQuery(function () {
  // Script for Form Steps
  $(".home-address .ginput_description").click(function() {
      $(".step-one").slideToggle("slow");
      $(".step-second").slideToggle("slow");
      $(".full-form").addClass("bedroomsBg");
  });
  $(".bedrooms .ginput_description .back").click(function() { 
      $(".step-one").slideToggle("slow"); 
      $(".step-second").slideToggle("slow");
      $(".full-form").removeClass("bedroomsBg");
  });
  $(".bedrooms .ginput_description .next").click(function() { 
      $(".step-second").slideToggle("slow");
      $(".step-third").slideToggle("slow");  
      $(".full-form").addClass("bathroomsBg"); 
  });
  $(".bathrooms .ginput_description .back").click(function() { 
      $(".step-second").slideToggle("slow"); 
      $(".step-third").slideToggle("slow");
      $(".full-form").removeClass("bathroomsBg"); 
  });
  $(".bathrooms .ginput_description .next").click(function() { 
      $(".step-third").slideToggle("slow");
      $(".step-four").slideToggle("slow");  
      $(".full-form").addClass("howsoonBg"); 
  });
  $(".howsoon .ginput_description .back").click(function() { 
      $(".step-third").slideToggle("slow"); 
      $(".step-four").slideToggle("slow");
      $(".full-form").removeClass("showsoonBg");
  });
  $(".howsoon .ginput_description .next").click(function() { 
      $(".step-four").slideToggle("slow");
      $(".step-five").slideToggle("slow"); 
      $(".full-form").addClass("small-wrap whereshouldBg");
      $(".gform_footer").fadeToggle("slow"); 
  });
});
</script>

<?php get_footer(); ?>