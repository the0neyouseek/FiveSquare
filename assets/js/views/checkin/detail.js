// Fichier Definition de Module RequireJs
define([
    'jquery',
    'underscore',
    'backbone',
    'models/checkin',
    'text!../../../template/checkins/detail.html',
    'text!../../../template/checkins/map.html',
    'googleMap!'
], function($,_,Backbone,CheckinModel,CheckinDetailTemplate,CheckinMapTemplate,gmaps) {

    var CheckinDetailView = Backbone.View.extend({
        el: '.col-md-12',
        template: _.template(CheckinDetailTemplate),
        map_template: _.template(CheckinMapTemplate),
        render: function(checkinId) {
            var self = this;
            checkinModel = new CheckinModel({id:checkinId});
            checkinModel.fetch({
                success: function(checkin){
                    console.log(checkin);
                    var lieu = "lat: "+checkin.attributes.lat+", lng: "+checkin.attributes.lng;

                    self.$el.empty();
                    //template
                    self.$el.append(
                        self.template({
                            checkinId: checkin.attributes.id,
                            checkinName:lieu,
                            checkinDate:checkin.attributes.updated_at,
                            userName:checkin.attributes.user.name,
                            userPic:checkin.attributes.user.picture
                        })
                    );

                    //Lieu (Addresse avec Geocoder de Google)
                    var geocoder = new gmaps.Geocoder();
                    var latlng = new gmaps.LatLng(checkin.attributes.lat,checkin.attributes.lng);
                    geocoder.geocode({'latLng': latlng}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                console.log(results[1].formatted_address);
                                $("#lieu").html("<b>Lieu: </b>"+results[1].formatted_address);
                            } else {
                                console.log('Aucun résulat trouvé');
                            }
                        } else {
                            console.log('Erreur du Geocoder: ' + status);
                        }
                    });

                    //Google Map
                    self.$el.append(
                        self.map_template()
                    );

                    var mapOptions = {
                        zoom: 8,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.TERRAIN
                    };

                    var map = new google.maps.Map(document.getElementsByClassName("google-map")[0],mapOptions);

                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        animation: google.maps.Animation.DROP,
                        title: 'Checkin n°'+checkin.attributes.id
                    });
                }
            });
        }
    });

    return CheckinDetailView;
});