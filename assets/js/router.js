// Router avec RequireJs + Backbone
define([
    'jquery',
    'underscore',
    'backbone',
    'views/checkin/list',
    'config'
], function($,_,Backbone,checkInListView,Config) {

    var Router = Backbone.Router.extend({
        routes : {
            "": "home",
            "hello": "hello",
            "hello/:requete": "hello"
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
            checkInListView = new checkInListView();
            checkInListView.render();

            console.log('Home');
        });
        router.on('route:hello', function(name) {
            if (name !== null){
                console.log('hello '+name);
            } else {
                console.log('hello anonymous');
            }
        });
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});