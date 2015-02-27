// Router avec RequireJs + Backbone
define([
    'jquery',
    'underscore',
    'backbone',
    'views/checkin/list'
    ], function($,_,Backbone,checkInListView) {

    var Router = Backbone.Router.extend({
        routes : {
            "": "home",
            "hello": "hello",
            "hello/:requete": "hello"
        }
    });

    var initialize = function() {
        var router = new Router();
        router.on('route:home', function() {
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