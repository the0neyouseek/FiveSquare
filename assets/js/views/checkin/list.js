// Fichier Definition de Module RequireJs
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/checkins'
    ], function($,_,Backbone,checkInCollection) {

    var CheckinListView = Backbone.View.extend({
        render: function() {
            console.log('CheckinListView Render');
            checkInCollection = new checkInCollection();
            checkInCollection.fetch({
                success: function(checkins) {
                    console.log(checkins.models);
                }
            });
        }
    });

    return CheckinListView;
});