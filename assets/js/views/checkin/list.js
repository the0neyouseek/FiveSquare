// Fichier Definition de Module RequireJs
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/checkins',
    'text!../../../template/checkins/list.html',
    'text!../../../template/checkins/map.html',
    'googleMap!'
], function($,_,Backbone,CheckInCollection,CheckInListTemplate,CheckinMapTemplate,gmaps) {

    var CheckinListView = Backbone.View.extend({
        el: '.col-md-12',
        template: _.template(CheckInListTemplate),
        mapTemplate: _.template(CheckinMapTemplate),
        render: function() {
            var self = this;
            console.log('CheckinListView Render');
            checkInCollection = new CheckInCollection();
            checkInCollection.fetch({
                success: function(checkins) {
                    self.$el.empty();
                    //template
                    self.$el.append("<h2>FiveSquare</h2>");
                    self.$el.append(
                        self.mapTemplate()
                    );
                    //googleMap
                    var mapOptions = {
                        zoom: 2,
                        center: new gmaps.LatLng(45,5),
                        mapTypeId: google.maps.MapTypeId.TERRAIN
                    };

                    var map = new google.maps.Map(document.getElementsByClassName("google-map")[0],mapOptions);

                    //liste des checkins
                    self.$el.append("<h2>Checkins récents</h2>");
                    self.$el.append("<div class=\"list-group\"></div>");
                    $list = $(".list-group");
                    //Affiche que les 10 + récents.
                    for (var i = 0; i < 10; i++) {
                        $list.append(
                            self.template({
                                id:checkins.models[i].attributes.id,
                                checkinName:checkins.models[i].attributes.id
                                })
                            );
                        //marker
                        var latlng = new gmaps.LatLng(checkins.models[i].attributes.lat,checkins.models[i].attributes.lng);
                        var marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            animation: google.maps.Animation.DROP,
                            title: 'Checkin n°'+i
                        });
                    }
                }
            });
        }
    });

    return CheckinListView;
});