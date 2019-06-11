<?php
/**
 * Template Name: USP Page
 * Template Post Type: page
 */

global $flex_idx_info;
global $dgtForms;

get_header();
$templatePath = get_template_directory_uri() . '/project';

$flex_theme_options = get_option('theme_mods_flexidx');
  $idx_contact_phone = isset($flex_idx_info['agent']['agent_contact_phone_number']) ? sanitize_text_field($flex_idx_info['agent']['agent_contact_phone_number']) : '';
  $idx_contact_email = isset($flex_idx_info['agent']['agent_contact_email_address']) ? sanitize_text_field($flex_idx_info['agent']['agent_contact_email_address']) : '';
  $idx_contact_address = isset($flex_idx_info['agent']['agent_address']) ? sanitize_text_field($flex_idx_info['agent']['agent_address']) : '';
  $idx_contact_zip_code = isset($flex_idx_info['agent']['agent_zip_code']) ? sanitize_text_field($flex_idx_info['agent']['agent_zip_code']) : '';
  $idx_contact_state = isset($flex_idx_info['agent']['agent_state']) ? sanitize_text_field($flex_idx_info['agent']['agent_state']) : '';
  $idx_contact_city = isset($flex_idx_info['agent']['agent_city']) ? sanitize_text_field($flex_idx_info['agent']['agent_city']) : '';
  $agent_first_name = isset($flex_idx_info['agent']['agent_first_name']) ? sanitize_text_field($flex_idx_info['agent']['agent_first_name']) : '';
  $agent_last_name = isset($flex_idx_info['agent']['agent_last_name']) ? sanitize_text_field($flex_idx_info['agent']['agent_last_name']) : '';
  $idx_contact_lat = isset($flex_idx_info['agent']['agent_address_lat']) ? sanitize_text_field($flex_idx_info['agent']['agent_address_lat']) : '';
  $idx_contact_lng = isset($flex_idx_info['agent']['agent_address_lng']) ? sanitize_text_field($flex_idx_info['agent']['agent_address_lng']) : '';
?>

<main class="rm-main rm-mw">
  <div class="rm-mblock">
    <header class="rm-mheader"><span class="rm-msubtitle">Cuando se trata <br>de Miami Real Estate,</span>
      <h1 class="rm-mtitle">El equipo de <br>Roberto Malca<br>es tu mejor opción...</h1>
    </header>
    <button class="rm-btn-contact"><span class="rm-bcwrapper">Conectar con roberto</span></button>
  </div>
  <div class="rm-mpartners"><img src="<?php echo $templatePath; ?>/img/main/partners/forbes.png" alt="Forbes"><img src="<?php echo $templatePath; ?>/img/main/partners/modern-luxury-miami.png" alt="Modern Luxury Miami"><img src="<?php echo $templatePath; ?>/img/main/partners/oceandrive.png" alt="Oceandrive"><img src="<?php echo $templatePath; ?>/img/main/partners/inmobiliare.png" alt="Inmobiliare"><img src="<?php echo $templatePath; ?>/img/main/partners/resident.png" alt="Resident"><img src="<?php echo $templatePath; ?>/img/main/partners/golfdigest.png" alt="GolfDigest"></div>
</main>

<section class="rm-residences rm-mw">
  <header class="rm-reheader">
    <h2 class="rm-retitle">Propiedades de lujo</h2>
  </header>
  <div class="rm-slider-residences gs-container-slider" id="rm-reslider">

    <div class="rm-resitem" title="Missoni Baia">
      <a href="<?php echo site_url(); ?>/building/missoni-baia/">
      <h3 class="rm-reititle">Missoni Baia</h3>
      <div class="rm-resimg"><img src="<?php echo $templatePath; ?>/img/residencias/missoni-baia.jpg" alt="Missoni Baia"></div>
      </a>
    </div>

    <div class="rm-resitem" title="The Ritz-carlton">
      <a href="<?php echo site_url(); ?>/building/the-ritz-carlton/">
        <h3 class="rm-reititle">The Ritz-carlton</h3>
        <div class="rm-resimg"><img src="<?php echo $templatePath; ?>/img/residencias/the-ritz-carlton.jpg" alt="The Ritz-carlton"></div>
      </a>
    </div>

    <div class="rm-resitem" title="Aston Martin Residences">
      <a href="<?php echo site_url(); ?>/building/aston-martin/">
        <h3 class="rm-reititle">Aston Martin Residences</h3>
        <div class="rm-resimg"><img src="<?php echo $templatePath; ?>/img/residencias/aston-martin-residences.jpg" alt="Aston Martin Residences"></div>
      </a>
    </div>

    <div class="rm-resitem" title="Una Brickell">
      <a href="<?php echo site_url(); ?>/building/una-brickell/">
        <h3 class="rm-reititle">Una Brickell</h3>
        <div class="rm-resimg"><img src="<?php echo $templatePath; ?>/img/residencias/una-brickell.jpg" alt="Una Brickell"></div>
      </a>
    </div>

  </div>

    <!--   <a class="rm-reall" href="https://www.robertomalca.com/luxury-buildings/" title="Ver todos los desarrollos">Ver todos los desarrollos</a> -->
</section>

<article class="rm-bcta rm-mw">
  <div class="rm-cheader">
    <h2 class="rm-ctitle">Consulta al experto <br>en bienes raíces</h2>
    <span class="rm-ctxt">Roberto Malca <br>es tu experto de <br>condominios <br>de lujo en miami.</span>
  </div>
  <button class="rm-btn-contact"><span class="rm-bcwrapper">Conectar con roberto</span></button>
</article>

<article class="rm-about rm-mw">
  <div class="rm-ableft">
    <h2 class="rm-atitle">Roberto Malca Miami Luxury Real Estate</h2>
    <div class="rm-aparagraphs">
      <p>Roberto Malca tiene una pasión por el sector inmobiliario y se compromete a aportar valor agregado a cada transacción. Su enfoque principal de propiedades de lujo se basa en la comprensión del mercado y la comprensión que le permite atender las necesidades de una clientela exigente de todo el mundo, incluidos los Estados Unidos, América Latina y Europa.</p>
      <p>Miembro de la dinámica fuerza de ventas de Cervera Real Estate, Roberto ganó tanto un premio Quarterly Top Producer Award como el Most Improved Award en 2012. Representó exclusivamente a Epic Residences, uno de los rascacielos residenciales más prestigiosos de Miami con la distinción de ser uno de los únicos algunos desarrollos de clase mundial realizados por el estimado Ugo Colombo - Presidente de CMC Group - en conjunto con Alfredo y Diego Lowenstein de Lionstone Development y el Grupo Ponte Gadea. Otros proyectos anteriores también incluyen The Opera Tower con el Sr. Tibor Hollow, uno de los desarrolladores más reconocidos de la ciudad, un proyecto que Roberto vio desde las ventas de preconstrucción hasta su finalización. Roberto habla inglés y español con fluidez, y también tiene un conocimiento práctico del portugués.</p>
    </div>
  </div>
  <div class="rm-abright">
    <div class="rm-abrtxt"><span class="rm-abrta">Productor premiado <br>en Miami Luxury Real Estate </span><img class="rm-abrtb" src="<?php echo $templatePath; ?>/img/about/roberto-malca.svg" alt="Roberto Malca"></div>
  </div>
</article>

<article class="rm-bcta rm-mw rm-cta-theme2">
  <div class="rm-cheader">
    <h2 class="rm-ctitle">Cuando se trata de bienes <br>raices en Miami</h2>
    <span class="rm-ctxt">El equipo Roberto Malca <br>es tu mejor opción ...</span>
  </div>
  <button class="rm-btn-contact"><span class="rm-bcwrapper">Conectar con roberto</span></button>
</article>

<article class="rm-reasons rm-mw">
  <header class="rm-rheader">
    <h2 class="rm-rtitle">Razones por qué invertir en <br>Miami</h2><span class="rm-rsubtitle">Miami, <br>La ciudad global</span>
  </header>
  <div class="rm-slider-reasons gs-container-slider" id="rm-rslider">
    <div class="rm-rsiwrapper">
      <h3 class="rm-rsititle rm-icon-bank">1.- Próspero centro financiero</h3>
      <ul class="rm-rsilist">
        <li class="rm-rsilitem"><strong>La mayor concentración de bancos internacionales en el sur de la Florida: </strong>87 instituciones ﬁnancieras y 33 agencias de bancos internacionales.</li>
        <li class="rm-rsilitem">0 % de impuesto sobre la renta estatal en South Florida.</li>
        <li class="rm-rsilitem"><strong>Puerta de entrada a América Latina: </strong>Sede de más de 1400 corporaciones multinacionales.</li>
        <li class="rm-rsilitem">Miami es categorizada entre las 20 ciudades del mundo con mayor producto regional bruto.</li>
        <li class="rm-rsilitem">Miami esta clasiﬁcada en la novena posición a nivel internacional por su actividad económica.</li>
      </ul>
    </div>
    <div class="rm-rsiwrapper">
      <h3 class="rm-rsititle rm-icon-bag">2.- Próspero centro financiero</h3>
      <ul class="rm-rsilist">
        <li class="rm-rsilitem"><strong>Aeropuerto Internacional de Miami: </strong>Viaja a 150 destinos internacionales.</li>
        <li class="rm-rsilitem"><strong>Puerto de Miami: </strong>El puerto internacional de pasajeros n.º 1 y uno de los mayores socios comerciales de China. Sede internacional de cinco líneas de crucero importantes.</li>
        <li class="rm-rsilitem"><strong>All Aboard Florida (tren de mediana velocidad): </strong>Conecta Miami con Tampa. Representa un impacto económico directo de USD $6400 millones en la economía de Florida para los próximos ocho años.</li>
        <li class="rm-rsilitem"><strong>La ciudad n.º 20 para turistas internacionales en el mundo: </strong>7.8 millones en 2016; 8 millones en 2017 con un crecimiento del 3.1 % (CNN Travel, nov. de 2017).</li>
      </ul>
    </div>
    <div class="rm-rsiwrapper">
      <h3 class="rm-rsititle rm-icon-palm-tree">3.- Estilo de vida primera clase</h3>
      <ul class="rm-rsilist">
        <li class="rm-rsilitem"><strong>Educación: </strong>La University of Miami está clasificada como una de las 150 mejores del mundo. La Escuela de Negocios de la Florida Int. University está dentro de las 10 mejores de Estados Unidos/dentro de las 15 mejores en el mercado de bienes raíces internacional.</li>
        <li class="rm-rsilitem"><strong>Arte y entretenimiento: </strong>El centro de Miami tiene la mayor concentración de instituciones culturales del sudeste de Estados Unidos. Sede de la feria internacional de arte contemporáneo Art Basel Miami Beach.</li>
        <li class="rm-rsilitem"><strong>Playas: </strong>135 km (84 millas) de costa del Océano Atlántico, 24 km (15 millas) de las playas más famosas del mundo. Miami es la única ciudad “subtropical” importante de Estados Unidos continental; con una temperatura promedio de 75 °F/23 °C.</li>
      </ul>
    </div>
  </div>
</article>

<article class="rm-bcta rm-mw rm-cta-theme3">
  <div class="rm-cheader">
    <h2 class="rm-ctitle">Consulta al experto <br>en bienes raíces</h2>
    <span class="rm-ctxt">Si busca adquirir una residencia<br> de lujo en Miami.</span>
  </div>
  <button class="rm-btn-contact"><span class="rm-bcwrapper">Conectar con roberto</span></button>
</article>

<section class="rm-testimonials rm-mw">
  <h2 class="rm-ttitle">Testimonios <br>de clientes</h2>
  <!-- nota, determinar que el item del slider sea ARTICLE-->
  <div class="rm-slider-testimonials gs-container-slider" id="rm-tsslider">
  	<div class="rm-tsitem">
      <div class="rm-tsiparagraph">
        <p>“I have enjoyed working with you and appreciate your attentiveness to my concerns and questions.  Your proactive approach to marketing the condominium provides results. I would not hesitate to recommend or have you list a property in the future. Best of luck to going forward.” </p>
      </div>
      <address class="rm-tsi-autor rm-stars rm-stars-five">
        Ann Olheiser 
        <span class="rm-tsia-profession">Vice President | Real Estate Asset Manager | U.S. Bank Wealth Management</span>
      </address>
    </div>
    <div class="rm-tsitem">
      <div class="rm-tsiparagraph">
        <p>“Roberto Malca and his team did a terrific job in selling my condo in Miami. He went out of his way in bringing people to view the unit and had Open Houses with marvelous food spreads on the dining room table. I highly recommend Roberto Malca and his team.”</p>
      </div>
      <address class="rm-tsi-autor rm-stars">
        Ms. Paxton Quigley 
        <span class="rm-tsia-profession">Theater Producer</span>
      </address>
    </div>
    <div class="rm-tsitem">
      <div class="rm-tsiparagraph">
        <p>“When I wanted to buy a luxury condo home in Miami Beach, it was hard to find the right realtor. I found Roberto. Working with Roberto was amazing, he is intelligent , honest, very patient, and extremely pleasant to work with. I can’t stress enough how pleased and satisfied I am that he was able to locate and negotiate the best price for my condo on the beach in a really great building. Roberto was very effective getting answers and was always available for any questions. I really appreciate his dedication to getting the job done right. I highly recommend Roberto Malca to anyone looking for the hardest working, professional and most knowledgable realtor who will really work for you to find the perfect luxury condo at the best price.” </p>
      </div>
      <address class="rm-tsi-autor rm-stars rm-stars-five">William Kurinsky</address>
    </div>
  </div>
</section>

<section class="rm-cform rm-mw">
  <div class="rm-cfbleft"><img class="rm-cfimg" src="<?php echo $templatePath; ?>/img/footer/bg-left.jpg" alt="#" title="#"></div>
  <div class="rm-cfbright">
    <button class="rm-close-modal"><span>Close Modal</span></button>
    <div class="rm-cfbr-wrapper">
      <header class="rm-cfbr-header">
        <h2 class="rm-cfbr-title">Roberto <br>Malca</h2>
        <span class="rm-cfbr-stitle">Top Producer en Miami Luxury Real Estate</span>
      </header>
      <div class="rm-cfbr-paragraph">Complete el formulario para solicitar una consulta privada.</div>
      <div class="rm-cfwrapper">
        <?php echo do_shortcode('[flex_idx_contact_form]'); ?>
      </div>
    </div>
  </div>
</section>

<?php get_template_part('blocks/footer-custom'); ?>
<script src="<?php echo $templatePath; ?>/js/lib/jquery-3.3.1.min.js"></script>
<script src="<?php echo $templatePath; ?>/js/plugin/greatslider.jquery.min.js"></script>
<script src="<?php echo $templatePath; ?>/js/usp.min.js"></script>
<?php wp_footer(); ?>
  </body>
</html>