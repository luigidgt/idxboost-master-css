<?php
/**
 * Template Name: I want to Rent Page
 */
global $dgtForms;
//echo $dgtForms->loadGF(41, ['header' => false, 'title'=>false]); die;
get_header(); ?>
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/homeWorth.css">

<!-- <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/autocomplete-google-address.js"></script> -->

<div class="full-form form-whats-my-property-work looking-to-buy want-to-rent">
  <?php  echo $dgtForms->loadGF(3, ['header' => false, 'title'=>false]); ?>
</div>

<script type="text/javascript">
jQuery(function() {
    var $ = jQuery;
    // Script for Form Steps
    $(".step1 .next").click(function() {
        $(".step-one").slideToggle("slow");
        $(".step-second").slideToggle("slow");
        $(".full-form").addClass("step2-fb");
    });
    $(".step2 .back").click(function() {
        $(".step-one").slideToggle("slow"); 
        $(".step-second").slideToggle("slow");
        $(".full-form").removeClass("step2-fb step3-fb step4-fb step5-fb step6-fb small-wrap whereshouldBg");
    });
    $(".step2 .next").click(function() { 
        $(".step-second").slideToggle("slow");
        $(".step-third").slideToggle("slow");  
        $(".full-form").addClass("step3-fb"); 
    });
    $(".step3 .back").click(function() { 
        $(".step-second").slideToggle("slow"); 
        $(".step-third").slideToggle("slow");
        $(".full-form").removeClass("step2-fb step3-fb step4-fb step5-fb step6-fb small-wrap whereshouldBg");
    });
    $(".step3 .next").click(function() { 
        $(".step-third").slideToggle("slow");
        $(".step-four").slideToggle("slow");  
        $(".full-form").addClass("step4-fb"); 
    });
    $(".step4 .back").click(function() { 
        $(".step-third").slideToggle("slow"); 
        $(".step-four").slideToggle("slow");
        $(".full-form").removeClass("step2-fb step3-fb step4-fb step5-fb step6-fb small-wrap whereshouldBg");
    });
    $(".step4 .next").click(function() { 
        $(".step-four").slideToggle("slow");
        $(".step-five").slideToggle("slow");  
        $(".full-form").addClass("step5-fb"); 
    });
    $(".step5 .back").click(function() { 
        $(".step-four").slideToggle("slow"); 
        $(".step-five").slideToggle("slow");
        $(".full-form").removeClass("step2-fb step3-fb step4-fb step5-fb step6-fb small-wrap whereshouldBg");
    });
    $(".step5 .next").click(function() { 
        $(".step-five").slideToggle("slow");
        $(".step-six").slideToggle("slow");  
        $(".full-form").addClass("step6-fb"); 
    });
    $(".step6 .back").click(function() { 
        $(".step-five").slideToggle("slow"); 
        $(".step-six").slideToggle("slow");
        $(".full-form").removeClass("step2-fb step3-fb step4-fb step5-fb step6-fb small-wrap whereshouldBg");
    });
    $(".step6 .next").click(function() { 
        $(".step-five").slideToggle("slow");
        $(".step-six").slideToggle("slow"); 
        $(".full-form").addClass("small-wrap whereshouldBg");
        $(".gform_footer").fadeToggle("slow");
    });
});


</script>
<?php get_footer(); ?>