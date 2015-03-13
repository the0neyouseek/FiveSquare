// Fichier Definition de Module RequireJs
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/checkins',
    'text!../../../template/checkins/list.html'
], function($,_,Backbone,CheckInCollection,CheckInListTemplate) {

    var CheckinListView = Backbone.View.extend({
        el: '.list-group',
        template: _.template(CheckInListTemplate),
        render: function() {
            var self = this;
            console.log('CheckinListView Render');
            checkInCollection = new CheckInCollection();
            checkInCollection.fetch({
                success: function(checkins) {
                    for (var i = 0; i < checkins.models.length; i++) {
                        self.$el.append(
                            self.template({
                                id:checkins.models[i].attributes.id,
                                checkinName:checkins.models[i].attributes.id
                                })
                            );
                    }
                }
            });
        }
    });

    return CheckinListView;
});