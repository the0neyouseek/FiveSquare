// Fichier Definition de Module RequireJs
define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router'
    ], function($,_,Backbone,bootstrap,Router) {

    var initialize = function() {
        $('.navbar-brand').append('<sup>+</sup>');
        Router.initialize();
    };

    return {
        initialize: initialize
    };

});