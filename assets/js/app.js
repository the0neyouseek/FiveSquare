// Fichier Definition de Module RequireJs
define(['jquery'], function($) {

    var initialize = function() {
        $('.navbar-brand').append('<sup>+</sup>');
    };

    return {
        initialize: initialize
    };

});