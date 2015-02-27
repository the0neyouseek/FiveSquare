// Fichier config pour RequireJs

require.config({
    paths: {
        jquery: 'vendor/jquery/dist/jquery',
        bootstrap: 'vendor/bootstrap-sass/assets/javascripts/bootstrap',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone'
    },
    shim: {
        'jquery': {
            export: '$'
        },
        'underscore': {
            export: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'backbone': {
            deps: ['underscore','jquery'],
            export: 'Backbone'
        }
    }
});

require(['app'], function(App) {
    App.initialize();
});