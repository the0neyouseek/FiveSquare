define(['underscore','backbone'], function(_,Backbone) {

    var CheckInCollection = Backbone.Collection.extend({
        url: '/checkin'
    });

    return CheckInCollection;
    
});