<?php
  global $flex_idx_info;
  $templatePath = get_template_directory_uri() . '/project';
?>

<article class="rm-agents rm-mw">
  <h2 class="rm-gtitle">Nuestros representantes <br>en méxico</h2>
  <ul class="rm-glist">
    <li class="rm-glitem">
      <div class="rm-glititle">Guadalajara, Mexico</div>
      <ul class="rm-ginfo">
        <li class="rm-gii rm-giiagent">Jorge Rendon</li>
        <li class="rm-gii"><a href="tel:5213334967996">+52 1 33 3496 7996</a></li>
        <li class="rm-gii"><a href="mailto:jrendon@robertomalca.com">jrendon@robertomalca.com</a></li>
      </ul>
    </li>
    <li class="rm-glitem">
      <div class="rm-glititle">Guadalajara, Mexico</div>
      <ul class="rm-ginfo">
        <li class="rm-gii rm-giiagent">Lolita Felix</li>
        <li class="rm-gii"><a href="tel:5213334967915">+52 1 33 3496 7915</a></li>
        <li class="rm-gii"><a href="mailto:lfelix@robertomalca.com">lfelix@robertomalca.com</a></li>
      </ul>
    </li>
    <li class="rm-glitem">
      <div class="rm-glititle">Mexico City, Mexico</div>
      <ul class="rm-ginfo">
        <li class="rm-gii rm-giiagent">Patricia Fuentes</li>
        <li class="rm-gii"><a href="tel:5215517005062">+52 1 55 1700 5062</a></li>
        <li class="rm-gii"><a href="mailto:pfuentes@robertomalca.com">pfuentes@robertomalca.com</a></li>
      </ul>
    </li>
    <li class="rm-glitem">
      <div class="rm-glititle">Monterrey, Mexico</div>
      <ul class="rm-ginfo">
        <li class="rm-gii rm-giiagent">Mireya Villarreal</li>
        <li class="rm-gii"><a href="tel:5218183095153">+52 1 81 8309 5153</a></li>
        <li class="rm-gii"><a href="mailto:mvillarreal@robertomalca.com">mvillarreal@robertomalca.com</a></li>
      </ul>
    </li>

    <li class="rm-glitem">
      <div class="rm-glititle">Querétaro, Mexico</div>
      <ul class="rm-ginfo">
        <li class="rm-gii rm-giiagent">Nash Sanchez</li>
        <li class="rm-gii"><a href="tel:5214423433085">+52 1 442 343 3085</a></li>
        <li class="rm-gii"><a href="mailto:nash@robertomalca.com">nash@robertomalca.com</a></li>
      </ul>
    </li>
  </ul>
</article>

<footer class="rm-footer rm-mw">
  <span class="rm-fcopy">Copyright© <?php echo date('Y'); ?> Roberto Malca. All rights reserved</span>
  <div class="rm-fnetworks">
    <?php if (!empty( get_theme_mod('idx_social_media' )['facebook'] )): ?>
      <a class="rm-icon-facebook" href="<?php echo $flex_idx_info["social"]["facebook_social_url"]; ?>" title="Facebook"><span>Facebook</span></a>
    <?php endif; ?>
    <?php if (!empty(get_theme_mod('idx_social_media' )['twitter']  )): ?>
      <a class="rm-icon-twitter" href="<?php echo $flex_idx_info["social"]["twitter_social_url"]; ?>" title="Twitter"><span>Twitter</span></a>
    <?php endif; ?>
    <?php if (!empty( get_theme_mod('idx_social_media' )['google'] )): ?>
      <a class="rm-icon-google-plus" href="<?php echo $flex_idx_info["social"]["gplus_social_url"]; ?>" title="Google+"><span>Google+</span></a>
    <?php endif; ?>
    <?php if (!empty( get_theme_mod('idx_social_media' )['youtube'] )): ?>
      <a class="rm-icon-youtube" href="<?php echo $flex_idx_info["social"]["youtube_social_url"]; ?>" title="Youtube"><span>Youtube</span></a>
    <?php endif; ?>
    <?php if (!empty( get_theme_mod('idx_social_media' )['linkedin'] )): ?>
      <a class="rm-icon-linked" href="<?php echo $flex_idx_info["social"]["linkedin_social_url"]; ?>" title="Linkedin"><span>Linkedin</span></a>
    <?php endif; ?>
  </div>
  <div class="rm-ftremgroup">Design + Powered by <a class="rm-ftlink" href="http://www.tremgroup.com/" target="_blank">TREMGROUP</a></div>
</footer>

<div id="google_translate_element"></div>

<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/dgt/dgt-project-master.js"></script> 
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateInit"></script>

<script type="text/javascript">
  function googleTranslateInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,ru,es,pt,fr,it,de,zh-TW',
      multilanguagePage: true,
      autoDisplay: true,
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }
</script>

<div class="cta-container">
  <ul class="cta-wrapper">
    <li class="cta-item"><a class="cta-ilink cta-icon-celular" href="tel:<?php echo preg_replace('/[^\d+]/', '', $flex_idx_info['agent']['agent_contact_phone_number']); ?>">Llámanos</a></li>
    <li class="cta-item"><a class="cta-ilink cta-icon-correo" href="mailto:rmalca@robertomalca.com">Email</a></li>
    <li class="cta-item"><a class="cta-ilink cta-icon-chat" href="https://api.whatsapp.com/send?phone=+17863038841">Chat</a></li>
  </ul>
</div>
<?php echo do_shortcode('[tg_ppc id="61"]'); ?>