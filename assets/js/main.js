// Fichier config pour RequireJs

require.config({
    paths: {
        jquery: 'vendor/jquery/dist/jquery',
        bootstrap: 'vendor/bootstrap-sass/assets/javascripts/bootstrap',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone',
        geoloc: 'tools/geoloc',
        text: 'vendor/requirejs-text/text',
        async: 'vendor/requirejs-plugins/src/async',
        googleMap: 'vendor/googlemaps-amd/src/googlemaps'
    },
    shim: {
        'jquery': {
            export: '$'
        },
        'geoloc': {
            export: 'geoloc'
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