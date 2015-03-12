// Fichier Definition de Module RequireJs
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/checkins',
    'text!../../../template/checkins/list.html'
], function($,_,Backbone,checkInCollection,checkInListTemplate) {

    var CheckinListView = Backbone.View.extend({
        el: '.list-group',
        template: _.template(checkInListTemplate),
        render: function() {
            var self = this;
            console.log('CheckinListView Render');
            checkInCollection = new checkInCollection();
            checkInCollection.fetch({
                success: function(checkins) {
                    for (var i = 0; i < checkins.models.length; i++) {
                        console.log(checkins.models[i]);
                        
                        self.$el.append(
                            self.template({
                                id:checkins.models[i].attributes.id,
                                checkinName:checkins.models[i].attributes.created_at
                                })
                            );
                    }
                }
            });
        }
    });

    return CheckinListView;
});