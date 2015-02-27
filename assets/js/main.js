// Fichier config pour RequireJs

require.config({
    paths: {
        jquery: 'vendor/jquery/dist/jquery',
        bootstrap: 'vendor/bootstrap-sass/assets/javascripts/bootstrap',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            export: 'bootstrap'
        },
        'underscore': {
            deps: ['jquery'],
            export: '_'
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