//Pusher.logToConsole = true;
var socket;
var channel;
var fullSlider;

// @todo last opened property
var lastOpenedProperty;

socket = new Pusher(__flex_g_settings.pusher.app_key, {
  cluster: __flex_g_settings.pusher.app_cluster,
  encrypted: true,
  authEndpoint: __flex_g_settings.socketAuthUrl + "?ib_lead_token=" + Cookies.get("ib_lead_token")
});

if ("undefined" !== typeof Cookies.get("ib_lead_token")) {
  socket.subscribe(__flex_g_settings.pusher.presence_channel);
}

// socket.subscribe(__flex_g_settings.pusher.presence_channel);

// llamar cuando se suscribe login, register
// channel = socket.subscribe(__flex_g_settings.pusher.presence_channel);

/*------------------------------------------------------------------------------------------*/
/* Funcion que lanza el modal para casos especiales
/*------------------------------------------------------------------------------------------*/
function active_modal($modal) {
  if ($modal.hasClass('active_modal')) {
    jQuery('.overlay_modal').removeClass('active_modal');
    jQuery("html, body").animate({
      scrollTop: 0
    }, 1500);
  } else {
    $modal.addClass('active_modal');
    $modal.find('form').find('input').eq(0).focus();
    jQuery('html').addClass('modal_mobile');
  }
  close_modal($modal);
}

function close_modal($obj) {
  var $this = $obj.find('.close');
  $this.click(function () {
    var $modal = $this.closest('.active_modal');
    $modal.removeClass('active_modal');
    jQuery('html').removeClass('modal_mobile');
  });
}

/*------------------------------------------------------------------------------------------*/
/* Calculadora: Formateando resultados con comas (",")
/*------------------------------------------------------------------------------------------*/
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*------------------------------------------------------------------------------------------*/
/* Calculadora: Calulando el precio a mostrar
/*------------------------------------------------------------------------------------------*/
function validate_price(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

(function ($) {
  /*------------------------------------------------------------------------------------------*/
  /* Inicializando: Calculadora
  /*------------------------------------------------------------------------------------------*/
  $.fn.calculatemortgage = function () {
    $('#submit-mortgage').addClass('loading');

    $.ajax({
      url: __flex_g_settings.ajaxUrl,
      type: "POST",
      data: {
        'action': 'dgt_mortgage_calculator',
        purchase_price: $('.purchase_price_txt').val().replace(/,/g, '').replace(/\./g, '').replace('$', ''),
        down_payment: $('.down_payment_txt').val(),
        year_term: $('.term_txt').val(),
        interest_rate: $('.interest_rate_txt').val()
      },
      dataType: "json",
      success: function (response) {
        $('#submit-mortgage').removeClass('loading');
        $('.mortgage_mount_txt').text('$' + response.mortgage);
        $('.down_paymentamount_txt').text('$' + response.down_payment);
        $('.mortgage_amount_txt').text('$' + response.total_monthly);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(thrownError);
      }
    })
  };

  $(function () {
    /*------------------------------------------------------------------------------------------*/
    /* Calculadora eventos y funciones
    /*------------------------------------------------------------------------------------------*/
    $('#form-calculator').submit(function (e) {
      e.preventDefault();
      $(this).calculatemortgage();
    });

    $(document).on('click', '#calculator-mortgage', function (e) {
      e.preventDefault();
      var curr_price = $("#calculator-mortgage").data("price");
      $(".purchase_price_txt").val(curr_price);
      $('.mortgage_mount_txt').text('$0');
      $('.down_paymentamount_txt').text('$0');
      $('.mortgage_amount_txt').text('$0');
      $('#form-calculator').trigger('submit');
    });

    $('.purchase_price_txt').focusout(function (event) {
      $(this).val($(this).val().replace(/,/g, '').replace(/\./g, ''));
      $(this).val(numberWithCommas($('.purchase_price_txt').val()));
    });

    $(document).on("submit", "#flex-idx-property-form", function (event) {
      // $("#flex-idx-property-form").on("submit", function(event) {
      event.stopPropagation();
      event.preventDefault();
      var _self = $(this);
      $.ajax({
        url: __flex_g_settings.ajaxUrl,
        method: "POST",
        data: _self.serialize(),
        dataType: "json",
        success: function (data) {
          //data.message
          $('#modal_properties_send .body_md .ico_ok').text(word_translate.email_sent);
          active_modal($('#modal_properties_send'));
          setTimeout(function () {
            $('#modal_properties_send').find('.close').click();
          }, 2000);
        }
      });
    });

    /*------------------------------------------------------------------------------------------*/
    /* Mostrar y cerrar modales
    /*------------------------------------------------------------------------------------------*/
    var $bodyHtml = $('html');
    $(document).on('click', '.overlay_modal_closer', function () {
      var idModal = $(this).attr('data-id');
      if ("1" == __flex_g_settings.force_registration) {
        $('#' + idModal).find('.close-modal').click();
        return;
      }

      if ($('button[data-id="modal_login"]:eq(0)').is(":hidden")) {
        $('#' + idModal).find('.close-modal').click();
        return;
      }

      var idModal = $(this).attr('data-id');
      var parentModal = $(this).attr('data-frame');
      $('#' + idModal).removeClass('active_modal');
      $bodyHtml.removeClass(parentModal);
    });

    // @todo check modal
    $(document).on('click', '.close-modal', function (event) {
      event.stopPropagation();
      
      var idModal = $(this).attr('data-id');
      var parentModal = $(this).attr('data-frame');
      $('#' + idModal).removeClass('active_modal');
      $bodyHtml.removeClass(parentModal);
    });

    $(document).on('click', '.show-modal', function () {
      var $idModal = $(this).attr('data-modal'); //Identificador del Modal a mostrar
      var $positionModal = $(this).attr('data-position'); //Posición en la que se encuentra el Modal
      var $modal = $('#' + $idModal);
      var $modalImg = $('#' + $idModal).find('.lazy-img').attr('data-src'); //Consultamos si existe una imagen para mostrar en el Modal
      if (typeof ($modalImg) != 'undefined') {
        $('#' + $idModal).find('.lazy-img').attr('src', $modalImg).removeAttr('data-src');
      }
      if ($modal.hasClass('active_modal')) {
        $('.overlay_modal').removeClass('active_modal');
      } else {
        $modal.addClass('active_modal');
        if ($positionModal == 0) {
          $bodyHtml.addClass('modal_fmobile');
        } else {
          $bodyHtml.addClass('modal_mobile');
        }
      }
      var mapImg = $("#min-map").attr("data-map-img");
      if (typeof (mapImg) != 'undefined') {
        $("#min-map").css("background-image", "url('" + mapImg + "')").removeAttr("data-map-img");
      }
    });

    // handle socket auth
    /*
            if (__flex_g_settings.anonymous === 'yes') {
                if (localStorage.getItem('idxboost_credential')){
                    var objectCredential=JSON.parse(localStorage.getItem('idxboost_credential'));
                    if(objectCredential["user_name"].length>0 && objectCredential["user_pass"].length>0){
                        Cookies.set('ib_lead_token', objectCredential['ib_lead_token'], { expires: 30 });
                        window.location.reload(true);
                    }
                }
            }
    */
   
    // if (__flex_g_settings.anonymous === 'no') {
      // socket = new Pusher(__flex_g_settings.pusher.app_key, {
      //   cluster: __flex_g_settings.pusher.app_cluster,
      //   encrypted: true,
      //   authEndpoint: __flex_g_settings.socketAuthUrl
      // });

      // channel = socket.subscribe(__flex_g_settings.pusher.presence_channel);

      // socket.connection.bind('connected', function() {
      //     console.dir(arguments);
      // });
      //
      // channel.bind('pusher:subscription_succeeded', function(members) {
      //     console.group('[pusher:subscription_succeeded]');
      //     console.dir(members);
      //     console.groupEnd('[pusher:subscription_succeeded]');
      // });
      //
      // channel.bind('pusher:member_added', function(member) {
      //     console.group('[pusher:member_added]');
      //     console.dir(member);
      //     console.groupEnd('[pusher:member_added]');
      // });
      //
      // channel.bind('pusher:member_removed', function(member) {
      //     console.group('[pusher:member_removed]');
      //     console.dir(member);
      //     console.groupEnd('[pusher:member_removed]');
      // });
      //
      // channel.bind('pusher:subscription_error', function(status) {
      //     console.group('[pusher:subscription_error]');
      //     console.dir(status);
      //     console.groupEnd('[pusher:subscription_error]');
      // });
    // }

    idxboostTypeIcon();

    // handle sign in
    $('#formLogin').on("submit", function (event) {
      event.preventDefault();

      var objectCredential = [];
      var _self = $(this);
      var formData = _self.serialize();
      var usernameCache = '',
        passwordCache = '';
      var seriaLogin = _self.serializeArray();
      var textmessage='';

      $.ajax({
        url: __flex_g_settings.ajaxUrl,
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (response) {
          if (response.success === true) {
            console.dir(seriaLogin);

            var lead_token = response.lead_token;

            Cookies.set('ib_lead_token', lead_token, {
              expires: 30
            });

            if ("undefined" !== typeof socket) {
              socket.disconnect();

              socket = new Pusher(__flex_g_settings.pusher.app_key, {
                cluster: __flex_g_settings.pusher.app_cluster,
                encrypted: true,
                authEndpoint: __flex_g_settings.socketAuthUrl + "?ib_lead_token=" + Cookies.get("ib_lead_token")
              });
              
              socket.subscribe(__flex_g_settings.pusher.presence_channel);
            }

            //socket.subscribe(__flex_g_settings.pusher.presence_channel);

            // save last logged in username
            Cookies.set("_ib_last_logged_in_username", response.last_logged_in_username);

            // store first name
            Cookies.set("_ib_user_firstname", response.first_name);

            // store last name
            Cookies.set("_ib_user_lastname", response.last_name);

            // store phone
            Cookies.set("_ib_user_phone", response.phone);

            // store email
            Cookies.set("_ib_user_email", response.email);

            $("#_ib_fn_inq").val(response.first_name);
            $("#_ib_ln_inq").val(response.last_name);
            $("#_ib_em_inq").val(response.email);
            $("#_ib_ph_inq").val(response.phone);

            // dont close modal property
            //$(".close").click();

            __flex_g_settings.anonymous = "no";

            // track listing view
            $.ajax({
              type: "POST",
              url: __flex_g_settings.ajaxUrl,
              data: {
                action: "track_property_view",
                board_id: __flex_g_settings.boardId,
                mls_number: (typeof lastOpenedProperty === "undefined") ? "" : lastOpenedProperty
              },
              success: function(response) {
                console.log("track done for property #" + lastOpenedProperty);
              }
            });

            $("#user-options").html(response.output);
            $(".lg-wrap-login:eq(0)").html(response.output);
            $(".lg-wrap-login:eq(0)").addClass("active");

            // $("#modal_login").removeClass("active_modal");
            $(".overlay_modal").removeClass("active_modal");
            $('html').removeClass('modal_mobile');

            objectCredential = {
              'user_name': usernameCache,
              'user_pass': passwordCache,
              'logon_type': 'email',
              'ib_lead_token': lead_token
            };
            localStorage.setItem('idxboost_credential', JSON.stringify(objectCredential));

            if (response.message=='Invalid credentials, try again.') 
              textmessage=word_translate.invalid_credentials_try_again;
            else if (response.message=='Logged in succesfully.')
              textmessage=word_translate.logged_in_succesfully;

            swal({
              title: word_translate.good_job,
              text: textmessage,
              type: "success",
              timer: 1000,
              showConfirmButton: false
            });
          } else {
            if (response.message=='Invalid credentials, try again.') 
              textmessage=word_translate.invalid_credentials_try_again;
            else if (response.message=='Logged in succesfully.')
              textmessage=word_translate.logged_in_succesfully;
              sweetAlert(word_translate.oops, textmessage, "error");
          }
        }
      });
    });

    /*PASSWORD*/
    $(document).ready(function () {
      resetPassPath = window.location.search.split('?passtoken=');
      if (resetPassPath.length == 2) {
        $('li.login').click();
        $(".header-tab a").removeClass('active');
        $('#formReset #reset_email').attr('placeholder', 'Enter you new Password');
        $('#formReset #reset_email').attr('type', 'password');
        $('#formReset .action').val('flex_idx_get_resetpass');
        $('#formReset .tokepa').val(resetPassPath[1]);
        $("ul.header-tab li:nth-child(3) a").addClass('active');
        $('#modal_login h2').text(word_translate.welcome_back);
        $(".text-slogan").text(word_translate.sign_in_below);
        $(".item_tab").removeClass('active');
        $("#tabReset").addClass('active');
        $("#modal_login").addClass("tabResetHidden");
      }
    });

    // handle sign in
    $('#formReset').on("submit", function (event) {
      event.preventDefault();

      var _self = $(this);
      var formData = _self.serialize();

      $.ajax({
        url: __flex_g_settings.ajaxUrl,
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (response) {
          if (response.success === true) {
            var lead_token = response.lead_token;

            Cookies.set('ib_lead_token', lead_token, {
              expires: 30
            });

            $(".close").click();
            var text_mailbox='';
            if (response.message=='Check your mailbox'){
                text_mailbox=word_translate.check_your_mailbox;
            }else if (response.message=='Password Change'){
              text_mailbox=word_translate.password_change;
            }

            swal({
              title: word_translate.good_job,
              text: text_mailbox,
              type: "success",
              timer: 8000,
              showConfirmButton: false
            });
          } else {
            sweetAlert(word_translate.oops, response.message, "error");
          }
        }
      });
    });
    /*PASSWORD*/

    // handle sign up
    $("#formRegister").on("submit", function (event) {
      event.preventDefault();

      var _self = $(this);
      var formData = _self.serialize();
      var objectCredential = [];
      var usernameCache = '',
          passwordCache = '';
      var seriaLogin = _self.serializeArray();
      
      // hide registration form
      $("#modal_login").removeClass("active_modal");

      swal({
        title: word_translate.your_account_is_being_created,
        text: word_translate.this_might_take_a_while_do_not_reload_thepage,
        type: "info",
        showConfirmButton: false,
        closeOnClickOutside: false,
        closeOnEsc: false
      });

      $.ajax({
        url: __flex_g_settings.ajaxUrl,
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (response) {
          // if registration is sucessfully.
          if (true === response.success) {
            // stores into cookies current lead token
            Cookies.set('ib_lead_token', response.lead_token, {
              expires: 30
            });

            //socket.subscribe(__flex_g_settings.pusher.presence_channel);
            if ("undefined" !== typeof socket) {
              socket.disconnect();

              socket = new Pusher(__flex_g_settings.pusher.app_key, {
                cluster: __flex_g_settings.pusher.app_cluster,
                encrypted: true,
                authEndpoint: __flex_g_settings.socketAuthUrl + "?ib_lead_token=" + Cookies.get("ib_lead_token")
              });
              
              socket.subscribe(__flex_g_settings.pusher.presence_channel);
            }

            // save last logged in username
            Cookies.set("_ib_last_logged_in_username", response.last_logged_in_username);

            // store first name
            Cookies.set("_ib_user_firstname", response.first_name);

            // store last name
            Cookies.set("_ib_user_lastname", response.last_name);

            // store phone
            Cookies.set("_ib_user_phone", response.phone);

            // store email
            Cookies.set("_ib_user_email", response.email);

            $("#_ib_fn_inq").val(response.first_name);
            $("#_ib_ln_inq").val(response.last_name);
            $("#_ib_em_inq").val(response.email);
            $("#_ib_ph_inq").val(response.phone);

            // updates lead list menu HTML
            $("#user-options").html(response.output);
            $(".lg-wrap-login:eq(0)").html(response.output);
            $(".lg-wrap-login:eq(0)").addClass("active");

            $('html').removeClass('modal_mobile');

            // reset registration form
            _self.trigger('reset');

            // overwrite lead status globally
            __flex_g_settings.anonymous = "no";

            // track listing view
            $.ajax({
              type: "POST",
              url: __flex_g_settings.ajaxUrl,
              data: {
                action: "track_property_view",
                board_id: __flex_g_settings.boardId,
                mls_number: (typeof lastOpenedProperty === "undefined") ? "" : lastOpenedProperty
              },
              success: function(response) {
                console.log("track done for property #" + lastOpenedProperty);
              }
            });

            // notify user with success message

            var ib_log_message = response.message;
            if (response.message=='Logged in succesfully.'){
              ib_log_message=word_translate.logged_in_succesfully;
            }

            swal({
              title: word_translate.congratulations,
              text: ib_log_message,
              type: "success",
              showConfirmButton: false,
              closeOnClickOutside: true,
              closeOnEsc: true,
              timer: 3000
            });
            
            if ( ("undefined" !== typeof IB_IS_SEARCH_FILTER_PAGE) && (true === IB_IS_SEARCH_FILTER_PAGE) ) {
              // save filter for lead is it doesnt exists
              saveFilterSearchForLead();
            }

            if (typeof gtagfucntion == 'function') {
              gtagfucntion();
            } //to generate the google tag conversion of signed in user
          } else {
            // notify user with error message
            swal({
              title: word_translate.oops,
              text: response.message,
              type: "error",
              showConfirmButton: false,
              closeOnClickOutside: true,
              closeOnEsc: true,
              timer: 1500
            });

            setTimeout(function () {
              // show first screen of registration form
              $("#formRegister").find(".pr-step").removeClass("active");
              $("#formRegister").find(".pr-step:eq(0)").addClass("active");

              // show registration form
              $("#modal_login").addClass("active_modal");
            }, 1500);
          }
        }
      });
    });

    //TABS DEL MODAL DE LOGIN
    $(".header-tab a").click(function () {
      var loginHeight = 0;
      $(".header-tab a").removeClass('active');
      $(this).addClass('active');
      var tabId = $(this).attr('data-tab');
      var $loginText = "";
      var $resetText = "";
      var $registerText = "";
      switch (tabId) {
        case 'tabLogin':
          /*$("#modal_login h2").text(word_translate.welcome_back);*/

          var $dataText = $(this).attr("data-text");
          var $dataTextForce = $(this).attr("data-text-force");

          if ($(this).parents("#modal_login").hasClass("registration_forced")) {
            $loginText = $dataTextForce;
          } else {
            $loginText = $dataText;
          }

          $("#modal_login h2").html($loginText);
          $(".text-slogan").text(word_translate.sign_in_below);
          $(".modal_cm.social_items .footer_md").show();
          $("#modal_login").removeClass("tabResetHidden");
          break;

        case 'tabRegister':
          /*$("#modal_login h2").text(word_translate.register);*/
          var $dataText = $(this).attr("data-text");
          var $dataTextForce = $(this).attr("data-text-force");

          //if ($(this).parents("#modal_login").hasClass("registration_forced")) {
          if ("1" == __flex_g_settings.force_registration) {
            $registerText = $dataTextForce + "<span>Register for details</span>";
          } else {
            $registerText = $dataText;
          }

          $("#modal_login h2").html($registerText);
          $(".text-slogan").text(word_translate.join_to_save_listings_and_receive_updates);
          $(".modal_cm.social_items .footer_md").show();
          $("#modal_login").removeClass("tabResetHidden");
          break;

        case 'tabReset':
          /*$("#modal_login h2").text(word_translate.reset_password);*/

          var $dataText = $(this).attr("data-text");
          var $dataTextForce = $(this).attr("data-text-force");

          if ($(this).parents("#modal_login").hasClass("registration_forced")) {
            $resetText = $dataTextForce;
          } else {
            $resetText = $dataText;
          }

          $("#modal_login h2").html($resetText);
          $(".text-slogan").text(word_translate.sign_in_below);
          $(".modal_cm.social_items .footer_md").show();
          $("#modal_login").addClass("tabResetHidden");
          break;
      }

      $(".item_tab").removeClass('active');
      $("#" + tabId).addClass('active');
      loginHeight = $("#content-info-modal").height();
      $(".img_modal").css({
        'height': loginHeight + 'px'
      });
    });

    $(".flex-login-link").on("click", function (event) {
      event.preventDefault();
      active_modal($("#modal_login"));
    });

    $('.searchArea-container').click(function () {
      if (!$('ul#list-news-cates').is(":visible")) {
        $('ul#list-news-cates').slideDown();
      } else {
        $('ul#list-news-cates').hide();
      }
    });

    $('.modal_cm .close').click(function () {
      $('#modal_login, #overlay_modal, #modal_add_favorities, #modal_properties_send').removeClass('active_modal');
    });

    /*$('ul#user-options li').click(function() {var modal_acti = '#' + $(this).attr('data-modal');$(modal_acti).addClass('active_modal');});*/
    $('ul#user-options li').click(function () {
      var tabactive = '';
      var modal_acti = '#' + $(this).attr('data-modal');
      $(modal_acti).addClass('active_modal');
      tabactive = $(this).attr('data-tab');
      $('.active_modal .header-tab li a').removeClass('active');
      $(".header-tab li a[data-tab='" + tabactive + "']").addClass('active');
      $(".active_modal .header-tab li .active").click();
      $('html').addClass('modal_mobile');
    });

    $('#user-options .external-lg-item').click(function () {
      var tabactive = '';
      var modal_acti = '#' + $(this).attr('data-modal');
      $(modal_acti).addClass('active_modal');
      tabactive = $(this).attr('data-tab');
      $('.active_modal .header-tab li a').removeClass('active');
      $(".header-tab li a[data-tab='" + tabactive + "']").addClass('active');
      $(".active_modal .header-tab li .active").click();
    });

    $(document).on("click", "#user-options", function(event) {
      event.stopPropagation();
    });

    $(document).on("click", '.show_modal_login_active', function () {
      $('html').removeClass('modal_mobile');

      if (!$(".menu_login_active").hasClass("active_login")) {
        $(".menu_login_active").removeClass("disable_login").addClass("active_login");
      } else {
        $(".menu_login_active").removeClass("active_login").addClass("disable_login");
      }
    });

    $(document).on("click", function() {
      $(".menu_login_active").removeClass("active_login").addClass("disable_login");
    });

    $(document).on('click', '.languages-list .item-languages', function () {
      var $selectLanguage = $(this).attr('data-iso');
      switch ($selectLanguage) {
        case 'us':
          $($(".goog-te-menu-frame")).contents().find("span.text").each(function () {
            if ($(this).html() == "Inglés" || $(this).html() == "English" || $(this).html() == "english" || $(this).html() == "inglés") {
              $(this).click();
            }
          });
          $("#available-languages").find(".languages-text").text("EN");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-english");
          $(".languages-list .item-languages").removeClass("active");
          $(this).addClass("active");
          break;
        case 'ru':
          $($(".goog-te-menu-frame")).contents().find("span.text").each(function () {
            if ($(this).html() == "ruso" || $(this).html() == "Russian" || $(this).html() == "Russian" || $(this).html() == "русский") {
              $(this).click();
            }
          });
          $("#available-languages").find(".languages-text").text("RU");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-russian");
          $(".languages-list .item-languages").removeClass("active");
          $(this).addClass("active");
          break;
        case 'es':
          $($(".goog-te-menu-frame")).contents().find("span.text").each(function () {
            if ($(this).html() == "español" || $(this).html() == "Español" || $(this).html() == "Spanish") {
              $(this).click();
            }
          });
          $("#available-languages").find(".languages-text").text("ES");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-spanish");
          $(".languages-list .item-languages").removeClass("active");
          $(this).addClass("active");
          break;
        case 'pt':
          $($(".goog-te-menu-frame")).contents().find("span.text").each(function () {
            if ($(this).html() == "Portugués" || $(this).html() == "Portuguese" || $(this).html() == "português" || $(this).html() == "portugués") {
              $(this).click();
            }
          });
          $("#available-languages").find(".languages-text").text("BR");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-portuguese");
          $(".languages-list .item-languages").removeClass("active");
          $(this).addClass("active");
          break;
        case 'fr':
          $($(".goog-te-menu-frame")).contents().find("span.text").each(function () {
            if ($(this).html() == "francés" || $(this).html() == "French" || $(this).html() == "Francés") {
              $(this).click();
            }
          });
          $("#available-languages").find(".languages-text").text("FR");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-french");
          $(".languages-list .item-languages").removeClass("active");
          $(this).addClass("active");
          break;
        case 'it':
          $($(".goog-te-menu-frame")).contents().find("span.text").each(function () {
            if ($(this).html() == "italiano" || $(this).html() == "Italian" || $(this).html() == "Italiano") {
              $(this).click();
            }
          });
          $("#available-languages").find(".languages-text").text("IT");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-italy");
          $(".languages-list .item-languages").removeClass("active");
          $(this).addClass("active");
          break;
        case 'de':
          $($(".goog-te-menu-frame")).contents().find("span.text").each(function () {
            if ($(this).html() == "Alemán" || $(this).html() == "alemán" || $(this).html() == "Aleman" || $(this).html() == "aleman" || $(this).html() == "Germany" || $(this).html() == "germany" || $(this).html() == "German") {
              $(this).click();
            }
          });
          $("#available-languages").find(".languages-text").text("DE");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-german");
          $(".languages-list .item-languages").removeClass("active");
          $(this).addClass("active");
          break;
        case 'zh-TW':
          $($(".goog-te-menu-frame")).contents().find("span.text").each(function () {
            if ($(this).html() == "chino (tradicional)" || $(this).html() == "chino (Tradicional)" || $(this).html() == "Chinese (Traditional)" || $(this).html() == "hinese (traditional)" || $(this).html() == "中國（繁體）") {
              $(this).click();
            }
          });
          $("#available-languages").find(".languages-text").text("ZH");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-chinese");
          $(".languages-list .item-languages").removeClass("active");
          $(this).addClass("active");
          break;
      }
    });

    var googTrans = getCookie('googtrans'); // Devuelve esto: /en/en
    var dataLanguage = googTrans;
    if (googTrans !== '') {
      var cookieLanguage = dataLanguage.split('/')[2];
      $(".languages-list .item-languages").removeClass("active");
      switch (cookieLanguage) {
        case 'us':
          $("#available-languages").find(".languages-text").text("EN");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-english");
          $(".languages-list .item-languages[data-iso='" + cookieLanguage + "']").addClass("active");
          break;
        case 'ru':
          $("#available-languages").find(".languages-text").text("RU");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-russian");
          $(".languages-list .item-languages[data-iso='" + cookieLanguage + "']").addClass("active");
          break;
        case 'es':
          $("#available-languages").find(".languages-text").text("ES");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-spanish");
          $(".languages-list .item-languages[data-iso='" + cookieLanguage + "']").addClass("active");
          break;
        case 'pt':
          $("#available-languages").find(".languages-text").text("BR");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-portuguese");
          $(".languages-list .item-languages[data-iso='" + cookieLanguage + "']").addClass("active");
          break;
        case 'fr':
          $("#available-languages").find(".languages-text").text("FR");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-french");
          $(".languages-list .item-languages[data-iso='" + cookieLanguage + "']").addClass("active");
          break;
        case 'it':
          $("#available-languages").find(".languages-text").text("IT");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-italy");
          $(".languages-list .item-languages[data-iso='" + cookieLanguage + "']").addClass("active");
          break;
        case 'de':
          $("#available-languages").find(".languages-text").text("DE");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-german");
          $(".languages-list .item-languages[data-iso='" + cookieLanguage + "']").addClass("active");
          break;
        case 'zh-TW':
          $("#available-languages").find(".languages-text").text("ZH");
          $("#available-languages").find("#languages-map").removeClass().addClass("flag-chinese");
          $(".languages-list .item-languages[data-iso='" + cookieLanguage + "']").addClass("active");
          break;
      }
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    $('body').mouseup(function (e) {
      if (!$(".available-languages-content").is(e.target) && $(".available-languages-content").has(e.target).length === 0) {
        if ($(".available-languages-content").hasClass("list-show")) {
          $(".available-languages-content").removeClass("list-show");
        }
      }
    });

    // click social logins
    $(".flex-social-login-gplus").on("click", function (event) {
      event.preventDefault();
      // console.log('login with gplus');
    });

    $(".flex-social-login-fb").on("click", function (event) {
      event.preventDefault();
      // console.log('login with facebook');
    });

    $(document).on("click", ".flex-logout-link", function(event) {
      event.preventDefault();
      socket.unsubscribe(__flex_g_settings.pusher.presence_channel);
      
      Cookies.remove('ib_lead_token');
      Cookies.remove("_ib_user_firstname");
      Cookies.remove("_ib_user_lastname");
      Cookies.remove("_ib_user_phone");
      Cookies.remove("_ib_user_email");

      localStorage.removeItem('idxboost_credential');
      window.location.reload(false);
    });

    /*
    $(".flex-logout-link").on("click", function (event) {
      event.preventDefault();
      socket.unsubscribe(__flex_g_settings.pusher.presence_channel);
      Cookies.remove('ib_lead_token');
      localStorage.removeItem('idxboost_credential');
      window.location.reload(false);
    });
    */

    $(".flex-property-request-showing").on("click", function () {
      var _self = $(this);

      $('#form-scheduled').trigger('reset');

      var address_short = _self.data('address-short');
      var address_large = _self.data('address-large');
      var slug = _self.data('slug');
      var permalink = _self.data('permalink');
      var price = _self.data('price');
      var mls = _self.data('mls');

      var ss_f_heading = address_short + ' ' + address_large;

      // setup vars
      $("#ss_f_heading").html(ss_f_heading);
      $("#ss_f_mls").val(mls);
      $("#ss_f_permalink").val(permalink);
      $("#ss_f_address_short").val(address_short);
      $("#ss_f_address_large").val(address_large);
      $("#ss_f_slug").val(slug);
      $("#ss_f_price").val(price);

      $("#ss_preferred_time").val("");
      $("#ss_preferred_date").val("");

      // show modal
      active_modal($('#modal_schedule'));
    });

    /*
    $('#form-scheduled').on("submit", function (event) {
      event.preventDefault();

      var _self = $(this);
      var formData = _self.serialize();

      $.ajax({
        url: __flex_g_settings.ajaxUrl,
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (data) {
          // reset form && close modal
          _self.trigger("reset");
          $("#ss_preferred_time").val("");
          $("#ss_preferred_date").val("");

          $('.close-modal').click();

          // show success message
          active_modal($("#modal_properties_send"));

          setTimeout(function () {
            $('.close-modal').click();
          }, 1000);
        }
      });
    });
    */

    $(document).on('click', '#available-languages', function () {
      $(this).parent().toggleClass("list-show");
    });

    /*scrollFixedx('#full-main .title-conteiner');
    function scrollFixedx(conditional) {
        var $conditional = conditional;
        var $element = $($conditional + ".fixed-box");
        var $offset = $element.offset();
        if ($offset != null) {
          var $positionYelement = $offset.top + 100;
          $ventana.scroll(function() {
              var $scrollSize = $ventana.scrollTop();
              if ($scrollSize > $positionYelement) {
                  $cuerpo.addClass('fixed-active');
              } else {
                  $cuerpo.removeClass('fixed-active');
              }
          })
        }
    };*/
  });

})(jQuery);

/*------------------------------------------------------------------------------------------*/
/* Dando formato a los iconos de favoritos
/*------------------------------------------------------------------------------------------*/
function idxboostTypeIcon() {
  if (__flex_g_settings["params"]["view_icon_type"] == '1') {
    jQuery('.clidxboost-btn-check').addClass('clidxboost-icon-star');
    jQuery('.chk_save').addClass('clidxboost-icon-star');
  } else if (__flex_g_settings["params"]["view_icon_type"] == '2') {
    jQuery('.clidxboost-btn-check').addClass('clidxboost-icon-square');
    jQuery('.chk_save').addClass('clidxboost-icon-square');
  } else if (__flex_g_settings["params"]["view_icon_type"] == '0') {
    jQuery('.clidxboost-btn-check').addClass('clidxboost-icon-heart');
    jQuery('.chk_save').addClass('clidxboost-icon-heart');
  } else {
    jQuery('.clidxboost-btn-check').addClass('clidxboost-icon-heart');
    jQuery('.chk_save').addClass('clidxboost-icon-heart');
  }
}

/*------------------------------------------------------------------------------------------*/
/* Funcion que fixea los elementos
/*------------------------------------------------------------------------------------------*/
function scrollFixedElement(elemento) {
  var boxTop = elemento.offset().top;
  var boxHeight = elemento.outerHeight();
  var originalPos = boxHeight;
  jQuery(document).on("scroll", function (e) {
    if (jQuery("body").hasClass("fixed-active")) {
      if (jQuery(document).scrollTop() <= originalPos)
        jQuery("body").removeClass("fixed-active");
      return;
    }
    if ((originalPos = jQuery(document).scrollTop()) >= (boxTop + boxHeight)) {
      jQuery("body").addClass("fixed-active");
    }
  });
}

/*----------------------------------------------------------------------------------*/
/* Funciones extras
/*----------------------------------------------------------------------------------*/
(function ($) {

  /*------------------------------------------------------------------------------------------*/
  /* Tab detalles de la propiedad
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '.list-details h2', function () {
    if (!$(this).hasClass('no-tab')) {
      var $theLi = $(this).parent();
      var $theUl = $(this).next();
      if ($theLi.hasClass('active')) { // si está abierto
        $theLi.removeClass('active');
        $theUl.removeClass('show');
      } else { // si está cerrado
        $theLi.addClass('active');
        $theUl.addClass('show');
      }
    }
  });

  /*----------------------------------------------------------------------------------*/
  /* Show Password
  /*----------------------------------------------------------------------------------*/
  $('.showpassord').on('click', function (e) {
    e.preventDefault();
    var current = $(this).attr('action');

    if (current == 'hide') {
      $(this).prev().attr('type', 'text');
      $(this).addClass('blocked').attr('action', 'show');
    }

    if (current == 'show') {
      $(this).prev().attr('type', 'password');
      $(this).removeClass('blocked').attr('action', 'hide');
    }
  });

  /*------------------------------------------------------------------------------------------*/
  /* Asignando valor del select seleccionado en el item "Filtrar por" en la seccion de filtros
  /*------------------------------------------------------------------------------------------*/
  var $filterBy = $("#filter-by").find('select');
  var $textoFilterBy = $(".filter-text");
  $filterBy.change(function () {
    $textoFilterBy.text($(this).find('option:selected').text());
  }).trigger("change");

  /*------------------------------------------------------------------------------------------*/
  /* Preload
  /*------------------------------------------------------------------------------------------*/
  $(window).on("load", function (e) {
    var $preloaderItem = $('.wrap-preloader');
    if ($preloaderItem.length) {
      $preloaderItem.addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $preloaderItem.removeClass('fadeOut').remove();
      });
    }
  });

  /*------------------------------------------------------------------------------------------*/
  /* Show menú lateral
  /*------------------------------------------------------------------------------------------*/
  $("#show-mobile-menu").click(function () {
    $('body').toggleClass("opened-menu");
  });

  /*------------------------------------------------------------------------------------------*/
  /* Show menú lateral Buildings
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '#clidxboost-btn-ng', function () {
    $('body').toggleClass("opened-menu-ng");
    $('.r-overlay').addClass('clidxboost-mg-close');
  });

  $(document).on('click', '#clidxboost-close-menu-ng', function (e) {
    $('body').removeClass("opened-menu-ng");
    $('.r-overlay').removeClass('clidxboost-mg-close');
  });

  $(document).on('click', '.clidxboost-mg-close', function (e) {
    $('body').removeClass("opened-menu-ng");
    $('.r-overlay').removeClass('clidxboost-mg-close');
  });

  /*------------------------------------------------------------------------------------------*/
  /* Sub menu lateral Buildings
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '.clidxboost-child', function (e) {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(".clidxboost-child").removeClass("active");
      $(this).addClass("active");
    }
  });

  /*------------------------------------------------------------------------------------------*/
  /* Boton apply filters
  /*------------------------------------------------------------------------------------------*/
  $("#apply-filters-min").click(function () {
    $("#apply-filters").trigger("click");
  });

  /*------------------------------------------------------------------------------------------*/
  /* Boton de print
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '#print-btn', function (e) {
    e.preventDefault();
    var imgPrint = $('#full-slider .gs-wrapper-content:first-child').html();
    $("#imagen-print").html(imgPrint);
    $('#printMessageBox').fadeIn();
    $('#full-main').printArea({
      onClose: function () {
        $('#printMessageBox').fadeOut('fast');
      }
    });
  });

  /*------------------------------------------------------------------------------------------*/
  /* Boton full screen
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '#clidxboost-btn-flight', function () {
    console.log("activando");
    $(".clidxboost-full-slider .gs-fs").trigger("click");
  });

  /*------------------------------------------------------------------------------------------*/
  /* Acciones de mostrar: Mapa/Slider/Video
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '.option-switch', function () {
    
    if ($(this).hasClass("active")) {
      return;
    }
    $(".option-switch").removeClass("active");
    $(this).addClass("active");
    var view = $(this).data('view');
    switch (view) {
      case 'gallery':
        $("#map-view").removeClass('active');
        $("#full-slider").removeClass('active');
        break;
      case 'map':
        showMap();
        break;
    }
  });

  /*------------------------------------------------------------------------------------------*/
  /* Mini mapa que muestra el full map
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '#min-map', function () {
    showMap();
  });

  /*------------------------------------------------------------------------------------------*/
  /* Activando la lista de compartir
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '#show-shared', function () {
    $(".shared-content").toggleClass("active");
  });

  /*------------------------------------------------------------------------------------------*/
  /* Funcion que ejecuta el full map
  /*------------------------------------------------------------------------------------------*/
  function showMap() {
    $("#map-view").addClass('active');
    $(".option-switch").removeClass("active");
    if (!$("#show-map").hasClass("active")) {
      $("#show-map").addClass("active");
      $("#full-slider").addClass('active');
    }
    //mini map
    var flex_map_mini_view = $("#map-result");
    var myLatLng2 = {
      lat: parseFloat(flex_map_mini_view.data('lat')),
      lng: parseFloat(flex_map_mini_view.data('lng'))
    };
    var miniMap = new google.maps.Map(document.getElementById('map-result'), {
      zoom: 16,
      center: myLatLng2,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    });
    var marker = new google.maps.Marker({
      position: myLatLng2,
      map: miniMap
    });
  }

  /*------------------------------------------------------------------------------------------*/
  /* Login y register para los templates de LG
  /*------------------------------------------------------------------------------------------*/
  // @todo check openloginmodal
  $(document).on('click', '#lg-login, .lg-login', function (event) {
    event.stopPropagation();
    event.preventDefault();
    
    $("#user-options .login").trigger("click");
  });

  $(document).on('click', '#lg-register, .lg-register', function (event) {
    event.stopPropagation();
    event.preventDefault();

    $("#user-options .register").trigger("click");
  });

  /*------------------------------------------------------------------------------------------*/
  /* Botone de acciones en el resultado de busqueda - mobile
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '.content-rsp-btn .show-btn-actions', function () {
    $(this).parent().toggleClass("active");
  });

  $(document).on('click', '.hamburger-content #show-filters', function () {
    $('body').toggleClass("active-show-filters");
  });

  /*------------------------------------------------------------------------------------------*/
  /* Fixeando elementos
  /*------------------------------------------------------------------------------------------*/
  $(window).on('load', function () {
    $(".fixed-box").each(function () {
      var elemento = $(this);
      scrollFixedElement(elemento);
    });
  });

  /*------------------------------------------------------------------------------------------*/
  /* Activar menu de usuario en menu lateral
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '.lg-wrap-login', function () {
    $(this).toggleClass("show-login-list");
  });

  /*------------------------------------------------------------------------------------------*/
  /* Activar Select Luxury condos
  /*------------------------------------------------------------------------------------------*/
  $(document).on('click', '#btn-active-filters', function() {
    $("#filters").toggleClass("active-select");
  });

})(jQuery);

/*----------------------------------------------------------------------------------*/
/* Funciones para el detalle de propiedades (modal e internas)
/*----------------------------------------------------------------------------------*/
(function ($) {

  /*----------------------------------------------------------------------------------*/
  /* Funciones extras
  /*----------------------------------------------------------------------------------*/
  $(function() {
	  $("#result-search").on("click", ".show-modal-properties", function (event) {
      event.preventDefault();

      var _propertie = $(this).parents('.propertie');

	    if (("result-search" === _propertie.parent().attr("id")) && !$(event.target).hasClass("clidxboost-icon-arrow-select") && !$(event.target).hasClass("flex-favorite-btn")) {
	      if (_propertie.hasClass("ib-p-non-click")) {
	        return;
	      }

	      var mlsNum = _propertie.data("mls");

        if (__flex_g_settings.force_registration =='1'){
  	      if (__flex_g_settings.anonymous === 'yes') {
  	        active_modal($('#modal_login'));
  	        localStorage.setItem("ib_anon_mls", mlsNum);
  	        return;
  	      }
        }


	      //$('html').addClass('modal_mobile');
	      $('#modal_property_detail').addClass('active_modal');
	      $("#modal_property_detail .detail-modal").html('<span class="ib-modal-property-loading">Loading property details...</span>');

	      $.ajax({
	        type: "POST",
	        url: __flex_g_settings.ajaxUrl,
	        data: {
	          mlsNumber: mlsNum,
	          action: "load_modal_property"
	        },
	        success: function (response) {
	          $(document.body).addClass("modal-property-active");
	          $("#modal_property_detail .detail-modal").html(response);
	        },

          complete: function(){
            $('#full-main #clidxboost-data-loadMore-niche').trigger("click");
            loadFullSlider(".clidxboost-full-slider");
          }
	      });
	    }
	  });

	  /*$("#result-search").on("click", "a", function (event) {
	    if ($(this).hasClass("ib-refresh-tab")) {
	      return true;
	    }
	    event.preventDefault();
	  });*/

    $(document).on('click', '.overlay_modal_closer_pt, .close-modal-pt', function () {
      if ($('button[data-id="modal_login"]:eq(0)').is(":hidden")) {
        return;
      }

      var idModal = $(this).attr('data-id');
      $('#' + idModal).removeClass('active_modal');
      $("body").removeClass("modal-property-active").css({'overflow-y': 'auto'});
      $("html").removeClass("modal_mobile");
    });
	});

})(jQuery);

// CERRAR Y ABRIR MODALES CON LA FLECHA DE NAVEGACIÓN
(function($){

  let $aucCityDropdown = $("#auc_city_dropdown");
  
  const modals = {
    'search-modal': (action)=>{
     
      switch(action) {
        case 'close':
          $('body').removeClass('active-search-modal');
          $aucCityDropdown.hide();
          break;
        case 'open':
          $('body').addClass('active-search-modal');
          setTimeout(()=>{
            $aucCityDropdown.show();
          }, 800);
          break;
      }
    }
  }

  let backTypes = {

    modal: (pObj)=>{

      let actions = {

        close: (id)=>{
          modals[id]('close');
        },
        open: (id)=>{
          modals[id]('open');
        }
      }

      let theAction = actions[pObj.action];
      if (theAction !== undefined) theAction(pObj.id);
    }
  }

  $(window).on('popstate', function(e){
    var elState = e.originalEvent.state;
    if(elState !== null && elState !== undefined) {
      let bTypes = backTypes[elState.type];
      if(bTypes !== undefined) bTypes(elState);
    }
  });

  /*------------------------------------------------------------------------------------------*/
  /* Show modal search home
  /*------------------------------------------------------------------------------------------*/
  $("#clidxboost-modal-search").click(function () {
    let theObj = {
      type:'modal',
      id: 'search-modal'
    };

    if (!$('body').hasClass('active-search-modal')) {
      //console.log('no tiene la clase');
      theObj.action = 'close';
      history.pushState(theObj, null, null);
      theObj.action = 'open';
      history.pushState(theObj, null, null);
      modals[theObj.id]('open');
    } else {
      history.back();
    }

    setTimeout(function() {
      $("#flex_idx_single_autocomplete_input").focus();
    }, 200);
  });

  // Para subir o bajar el boton del chat DRIFF cuando se llega al final del scroll
  /* @todo drift*/
  const $ibWgrid = $('.ib-wgrid');
  if ($ibWgrid.length) {
    let ibWgridScroll = 0;
    $ibWgrid.on('scroll', function(){
      let currentScroll = $(this).scrollTop();
      let $finalScroll = $('.ib-gheader').height() + $('.ib-cproperties').height() - $(this).height();
      let $theBottom = Number($('#drift-widget').css('bottom').replace('px', ''));
      if (currentScroll > ibWgridScroll) {
        if (currentScroll >= $finalScroll) {
          if ($theBottom !== 74) $('#drift-widget').css('bottom', '74px');
        } 
      } else {
        if (currentScroll <= ($finalScroll - 60)) {
          if ($theBottom !== 24) $('#drift-widget').css('bottom', '24px');
        } 
      }
      ibWgridScroll = currentScroll;
    });
  };
  

  // trigger al Remove Boundaries
  $('body').on('click', '.ib-gnprb', ()=>{
    $('.ib-removeb-tg').click();
  });

  // trigger al all filters
  $('body').on('click', '.ib-gnpoall', ()=>{
    $('.ib-oiwrapper').click()
  });

  // trigger al clear
  $('body').on('click', '.ib-gnpclear', ()=>{
    $('.ib-dbclear').click();
  });

}(jQuery));

(function ($) {
  $(function() {
    if (typeof Cookies.get("_ib_last_logged_in_username") !== "undefined") {
      $("#txt_user").val(Cookies.get("_ib_last_logged_in_username"));
    }
  });
})(jQuery);

// Calcula la altura dinámicamente del wrapper del search
(function($){

const $flexIdxSearchFilter = $('#flex_idx_search_filter');
if ($flexIdxSearchFilter.length) {
  if($(window).width() >= 1024) {
    let heightMenos = $('.ib-filter-container').height() + $('#header').outerheight();
    if($('.gwr-breadcrumb').length) heightMenos += $('.gwr-breadcrumb').height();
    $flexIdxSearchFilter.css('height', 'calc(100vh - ' + (heightMenos + 2) + 'px)');
  }

  console.log("ib-filter="+$('.ib-filter-container').height()+"/height="+$('#header').outerheight()+"/breadcrumb="+$('.gwr-breadcrumb').height());

}

// abre la lista de sugerencias del auto complete en mobile
$(document.body).on('click', '#clidxboost-modal-search', ()=>{
  $('#ui-id-1').show();
});

}(jQuery));
