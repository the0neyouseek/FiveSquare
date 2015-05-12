/**
* Geolocalisation basique
*/

function Location(callback) {
    this.callback = callback;
}

Location.prototype.getGeoLocation = function() {
    if (navigator.geolocation) {
        var self = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            self.callback(position);
        },handle_error);
    } else {
        console.log("Pas de geoloc dispo");
    }
};

// Gestion d'erreurs
function handle_error(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("%c User denied the request for Geolocation.","color:red");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("%c Location information is unavailable.","color:red");
            break;
        case error.TIMEOUT:
            console.log("%c The request to get user location timed out.","color:red");
            break;
        case error.UNKNOWN_ERROR:
            console.log("%c An unknown error occurred.","color:red");
            break;
    }
}