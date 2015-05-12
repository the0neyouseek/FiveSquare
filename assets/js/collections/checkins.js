define(['underscore','backbone','models/checkin'], function(_,Backbone,Checkin) {

    var CheckInCollection = Backbone.Collection.extend({
        url: '/checkin',
        model: Checkin
    });

    return CheckInCollection;

});