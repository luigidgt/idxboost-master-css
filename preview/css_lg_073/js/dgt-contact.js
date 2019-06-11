(function($) {
    // handle inquiry contact form
    var flex_idx_contact_form;

    $(function () {
        // dom ready
        flex_idx_contact_form = $("#flex_idx_contact_form");

        if (flex_idx_contact_form.length) {
            flex_idx_contact_form.on("submit", function(event) {
                event.preventDefault();

                var _self = $(this);
                var contactSubmitData = _self.serialize();
                $('.idx_contact_email').val( $('.idx_contact_email_temp').val());

                $.ajax({
                    url: __flex_g_settings.ajaxUrl,
                    type: "POST",
                    data: contactSubmitData,
                    dataType: "json",
                    success: function(response) {
                        if (response.success) {
                            _self.trigger('reset');
                            $('#modal_properties_send').addClass('active_modal');
                            setTimeout(function() {
                                $('#modal_properties_send').find('.close').click();
                            }, 2000);
                        }
                    }
                });
            });
        }
    });

    // map
    google.maps.event.addDomListener(window, "load", function() {
        var flex_map_mini_view = $("#map");
        if (flex_map_mini_view.length) {
            var myLatLng2 = {
                lat: parseFloat(flex_map_mini_view.data('lat')),
                lng: parseFloat(flex_map_mini_view.data('lng'))
            };
            var miniMap = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: myLatLng2,
                styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e9e9e9"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 17
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 29
                    }, {
                        "weight": 0.2
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 18
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }, {
                        "lightness": 21
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#dedede"
                    }, {
                        "lightness": 21
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#ffffff"
                    }, {
                        "lightness": 16
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "saturation": 36
                    }, {
                        "color": "#333333"
                    }, {
                        "lightness": 40
                    }]
                }, {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f2f2f2"
                    }, {
                        "lightness": 19
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#fefefe"
                    }, {
                        "lightness": 20
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#fefefe"
                    }, {
                        "lightness": 17
                    }, {
                        "weight": 1.2
                    }]
                }]
            });
            var marker = new google.maps.Marker({
                position: myLatLng2,
                map: miniMap,
                icon: __flex_g_settings.templateDirectoryUrl + '/images/free-theme/marker.png'
            });
            $("#map").removeAttr("data-lat").removeAttr("data-lng");
        }
    });
})(jQuery);
