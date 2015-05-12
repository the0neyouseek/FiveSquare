// Fichier Definition de Module RequireJs
define([
    'jquery',
    'underscore',
    'backbone',
    'geoloc',
    'models/checkin',
    'text!../../../template/checkins/ajout.html',
    'googleMap!'
], function($,_,Backbone,Geoloc,CheckinModel,CheckinAddTemplate,gmaps) {

    var CheckinAddView = Backbone.View.extend({
        el: ".col-md-12",
        template: _.template(CheckinAddTemplate),
        events: {
            "submit .form": "saveCheckin"
        },
        saveCheckin: function(event) {
            console.log("Submit form");
            event.preventDefault();
            formResult = $(event.currentTarget).serializeArray();
            checkin = new CheckinModel();
            for (var i = 0; i < 2; i++) {
                checkin.set(formResult[i].name,formResult[i].value);
            }

            console.log(checkin);
            checkin.save(null,{success: function(model, response, options) {
                console.log(response);
                $('.col-md-12').append("<br><p class=\"alert alert-success\">Checkin envoyé avec succés !</p>");
            }, error:function(model, response, options) {
                console.log(response.status);
                $('.col-md-12').append("<br><p class=\"alert alert-warning\">Erreur lors de l'envoi du checkin.</p>");
            }});
        },
        render : function() {
            var geoloc = new Location(function (position) {
                var geocoder = new gmaps.Geocoder();
                var latlng = new gmaps.LatLng(position.coords.latitude,position.coords.longitude);
                $("#lat").val(position.coords.latitude);
                $("#lng").val(position.coords.longitude);
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            console.log(results[1].formatted_address);
                            $("#lieu").val(results[1].formatted_address);
                        } else {
                            console.log('Aucun résulat trouvé');
                        }
                    } else {
                        console.log('Erreur du Geocoder: ' + status);
                    }
                });
            });
            geoloc.getGeoLocation();

            $(this.$el).html(
                this.template({
                    adresse:"Galerie Lafayette Paris",
                    latitude: 45,
                    longitude: 5
                })
            );
        }
    });

    return CheckinAddView;
});