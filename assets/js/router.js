// Router avec RequireJs + Backbone
define([
    'jquery',
    'underscore',
    'backbone',
    'views/checkin/list',
    'views/checkin/detail',
    'views/checkin/ajout',
    'config'
], function($,_,Backbone,CheckInListView,CheckinDetailView,CheckinAddView,Config) {

    var Router = Backbone.Router.extend({
        routes : {
            "": "home",
            "checkin/:id":"checkin",
            "add":"checkinAdd"
        }
    });

    var initialize = function() {
        var router = new Router();
        $.ajaxPrefilter(function(options,originalOptions,jqXHR) {
            options.url = Config.apiServer+options.url;
            options.crossDomain = {
                crossDomain:true
            };
        });
        router.on('route:home', function() {
            checkInListView = new CheckInListView();
            checkInListView.render();

            console.log('Route: Home');
        });
        router.on('route:checkin', function(id) {
            checkinDetailView = new CheckinDetailView();
            checkinDetailView.render(id);

            console.log('Route: Detail du checkin');
        });
        router.on('route:checkinAdd',function() {
            checkinAddView = new CheckinAddView();
            checkinAddView.render();

            console.log('Route: Ajout de checkin');
        });
        Backbone.history.start();
    };

    require.config({
        googlemaps: {
            params: {
                key: Config.googleMapKey
            }
        }
    });

    return {
        initialize: initialize
    };
});