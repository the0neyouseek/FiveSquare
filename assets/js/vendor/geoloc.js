/**
* Geolocalisation basique
*/

function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPos,handle_error);
    } else {
        console.log("Pas de geoloc dispo");
    }
}

function showPos(position) {
    console.log("Latitude: "+ position.coords.latitude + " , Longitude: " +position.coords.longitude);
    return position;
}

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