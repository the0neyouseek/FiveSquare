define(['underscore','backbone'], function(_,Backbone) {

    var CheckinModel = Backbone.Model.extend({
        urlRoot: '/checkin'
    });

    return CheckinModel;

});