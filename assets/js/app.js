// Fichier Definition de Module RequireJs
define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router'
    ], function($,_,Backbone,bootstrap,Router) {

    var initialize = function() {
        Router.initialize();
    };

    return {
        initialize: initialize
    };

});